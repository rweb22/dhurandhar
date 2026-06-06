#!/usr/bin/env python3
"""
Resolve workflow customization by merging base, team, and user config files.
"""

import argparse
import sys
from pathlib import Path

try:
    import tomli  # Python < 3.11
except ImportError:
    import tomllib as tomli  # Python >= 3.11

import json


def load_toml(file_path):
    """Load a TOML file and return its contents."""
    try:
        with open(file_path, 'rb') as f:
            return tomli.load(f)
    except FileNotFoundError:
        return {}
    except Exception as e:
        print(f"Error loading {file_path}: {e}", file=sys.stderr)
        return {}


def deep_merge(base, override):
    """
    Deep merge two dictionaries.
    - Scalars: override replaces base
    - Dicts: recursively merge
    - Lists: append (for simple lists) or replace matching entries (for keyed lists)
    """
    if not isinstance(base, dict) or not isinstance(override, dict):
        return override

    result = base.copy()

    for key, value in override.items():
        if key in result:
            if isinstance(result[key], dict) and isinstance(value, dict):
                result[key] = deep_merge(result[key], value)
            elif isinstance(result[key], list) and isinstance(value, list):
                # Check if it's an array of tables with 'code' or 'id' keys
                if result[key] and isinstance(result[key][0], dict):
                    if 'code' in result[key][0] or 'id' in result[key][0]:
                        # Keyed array - replace matching, append new
                        result[key] = merge_keyed_arrays(result[key], value)
                    else:
                        # Simple array of tables - append
                        result[key].extend(value)
                else:
                    # Simple array - append
                    result[key].extend(value)
            else:
                # Scalar override
                result[key] = value
        else:
            result[key] = value

    return result


def merge_keyed_arrays(base, override):
    """Merge arrays of tables that have 'code' or 'id' keys."""
    key_field = 'code' if base and 'code' in base[0] else 'id'
    result = base.copy()
    base_keys = {item.get(key_field) for item in base if key_field in item}

    for item in override:
        item_key = item.get(key_field)
        if item_key and item_key in base_keys:
            # Replace existing entry
            result = [i if i.get(key_field) != item_key else item for i in result]
        else:
            # Append new entry
            result.append(item)

    return result


def resolve_customization(skill_root, key):
    """
    Resolve customization by merging base → team → user configs.
    
    Args:
        skill_root: Path to the skill directory
        key: The top-level key to extract (e.g., 'workflow')
    
    Returns:
        Merged configuration dictionary for the specified key
    """
    skill_root = Path(skill_root)
    skill_name = skill_root.name

    # Determine project root (parent of _pnp directory)
    project_root = skill_root
    while project_root.parent != project_root:
        if (project_root / '_pnp').exists():
            break
        project_root = project_root.parent
    else:
        project_root = Path.cwd()

    # Load config files in order
    base_config = load_toml(skill_root / 'customize.toml')
    team_config = load_toml(project_root / '_pnp' / 'custom' / f'{skill_name}.toml')
    user_config = load_toml(project_root / '_pnp' / 'custom' / f'{skill_name}.user.toml')

    # Merge configurations
    merged = base_config
    merged = deep_merge(merged, team_config)
    merged = deep_merge(merged, user_config)

    # Extract the requested key
    result = merged.get(key, {})

    return result


def main():
    parser = argparse.ArgumentParser(
        description='Resolve workflow customization from TOML config files'
    )
    parser.add_argument(
        '--skill',
        required=True,
        help='Path to skill root directory'
    )
    parser.add_argument(
        '--key',
        required=True,
        help='Top-level key to extract (e.g., "workflow")'
    )

    args = parser.parse_args()

    result = resolve_customization(args.skill, args.key)
    print(json.dumps(result, indent=2))


if __name__ == '__main__':
    main()

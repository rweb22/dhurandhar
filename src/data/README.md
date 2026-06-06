# Data

This directory contains data files that your agents and skills can reference.

## What Goes Here?

Any structured data that your agents or skills need:
- Configuration files
- Reference data (YAML, JSON, CSV)
- Templates
- Lookup tables
- API endpoints
- Resource registries

## Example: Resource Registry

**sources.yaml:**
```yaml
resources:
  - name: "Example API"
    url: "https://api.example.com"
    category: "external-api"
    description: "Example API for demonstration"
    auth_required: true
    
  - name: "Documentation Site"
    url: "https://docs.example.com"
    category: "documentation"
    description: "Official documentation"
    auth_required: false
```

## Example: Configuration

**settings.yaml:**
```yaml
application:
  name: "My Application"
  version: "1.0.0"
  
api_endpoints:
  production: "https://api.example.com"
  staging: "https://api-staging.example.com"
```

## Installation

Data files are copied to `_hellow/data/` during installation and can be referenced by your agents and skills.

## Referencing Data in Skills

In your SKILL.md files:

```markdown
## Data Sources

Load available resources from: `{project-root}/_hellow/data/sources.yaml`

Filter by category or use the most appropriate resource for the user's needs.
```

## Best Practices

- Use YAML or JSON for structured data
- Include descriptions for each item
- Organize by category or type
- Keep data focused on your domain
- Version your data files if they change frequently

#!/bin/bash
# Dhurandhar Installation Script
# Usage: bash <(curl -fsSL https://raw.githubusercontent.com/rweb22/dhurandhar/main/install.sh)

set -e

echo "🏹 Dhurandhar Framework Installer"
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Error: git is not installed. Please install git first."
    exit 1
fi

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Determine target directory
if [ -z "$1" ]; then
    TARGET_DIR="$(pwd)"
else
    TARGET_DIR="$1"
fi

echo "📁 Installing to: $TARGET_DIR"
echo ""

# Create temporary directory
TEMP_DIR=$(mktemp -d)
trap "rm -rf $TEMP_DIR" EXIT

# Clone repository
echo "📥 Downloading Dhurandhar..."
git clone --quiet https://github.com/rweb22/dhurandhar.git "$TEMP_DIR/dhurandhar"

# Install dependencies
echo "📦 Installing dependencies..."
cd "$TEMP_DIR/dhurandhar"
npm install --silent --no-progress > /dev/null 2>&1

# Run installer
echo "⚙️  Running installer..."
node tools/installer/dhurandhar-cli.js install -d "$TARGET_DIR" -y

echo ""
echo "✅ Installation complete!"
echo ""
echo "Next steps:"
echo "  1. Open your AI IDE (Cursor, Claude Code, Augment, etc.)"
echo "  2. Type: /yudhishthira"
echo "  3. Follow the Pandavas through all 5 phases"
echo ""
echo "Documentation: https://github.com/rweb22/dhurandhar"

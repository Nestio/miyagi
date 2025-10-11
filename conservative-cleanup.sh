#!/bin/bash

# Conservative Asset Cleanup Script
# This script removes only the most obviously unused assets

echo "🧹 Starting conservative asset cleanup..."

# Create backup
mkdir -p backup/static
cp -r static backup/
echo "💾 Backup created in backup/static/"

# Remove old release notes (definitely unused)
echo "🗑️  Removing old release notes..."
rm -rf static/release-notes/

# Remove old API docs (definitely unused)
echo "🗑️  Removing old API documentation..."
rm -rf static/api/

# Remove old Dyte-specific images (definitely unused)
echo "🗑️  Removing old Dyte images..."
rm -f static/img/dyte-docs-card.png
rm -f static/img/gdpr_docs.png
rm -f static/img/soc-compliant-1.png
rm -f static/img/vector.png

# Remove old Dyte logos (definitely unused)
echo "🗑️  Removing old Dyte logos..."
rm -f static/logo/dark.svg
rm -f static/logo/dyte_dark_logo.svg
rm -f static/logo/dyte.svg
rm -f static/logo/light.svg

echo "✅ Conservative cleanup completed!"
echo "📊 Removed:"
echo "   - Old release notes"
echo "   - Old API documentation"
echo "   - Old Dyte images and logos"
echo ""
echo "💾 Backup available in: backup/static/"
echo "🔄 Run 'npm run build' to test your site"

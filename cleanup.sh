#!/bin/bash

# PERSMON EMS - Final Open Source Cleanup Script

echo "🧹 Running final cleanup for open source release..."
echo "================================================="

# Remove build artifacts
echo "📦 Removing build artifacts..."
find . -name "*.tsbuildinfo" -type f -delete 2>/dev/null
find . -name "dist" -type d -exec rm -rf {} + 2>/dev/null
find . -name "build" -type d -exec rm -rf {} + 2>/dev/null

# Remove sensitive files
echo "🔒 Removing sensitive files..."
find . -name ".env.production" -type f -delete 2>/dev/null
find . -name ".env.local" -type f -delete 2>/dev/null

# Remove OS-specific files
echo "🗂️  Removing OS-specific files..."
find . -name ".DS_Store" -type f -delete 2>/dev/null
find . -name "Thumbs.db" -type f -delete 2>/dev/null
find . -name "desktop.ini" -type f -delete 2>/dev/null

# Remove IDE files
echo "💻 Removing IDE-specific files..."
rm -rf .vscode 2>/dev/null
rm -rf .idea 2>/dev/null

# Make scripts executable
echo "🔧 Making scripts executable..."
chmod +x setup.sh 2>/dev/null
chmod +x deploy.sh 2>/dev/null

echo ""
echo "✅ Cleanup completed!"
echo "📋 Project is ready for open source release"
echo ""
echo "Next steps:"
echo "1. Review all files for any remaining personal information"
echo "2. Test the setup script: ./setup.sh"
echo "3. Update the repository URL in package.json and README.md"
echo "4. Create a new GitHub repository"
echo "5. Push the code: git add . && git commit -m 'Initial open source release' && git push"
echo ""
echo "🎉 Happy open sourcing!"

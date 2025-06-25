# PERSMON EMS - Final Open Source Cleanup Script (Windows)

Write-Host "🧹 Running final cleanup for open source release..." -ForegroundColor Green
Write-Host "=================================================" -ForegroundColor Green

# Remove build artifacts
Write-Host "📦 Removing build artifacts..." -ForegroundColor Blue
Get-ChildItem -Path . -Recurse -Name "*.tsbuildinfo" | Remove-Item -Force -ErrorAction SilentlyContinue
Get-ChildItem -Path . -Recurse -Name "dist" -Directory | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue
Get-ChildItem -Path . -Recurse -Name "build" -Directory | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue

# Remove sensitive files
Write-Host "🔒 Removing sensitive files..." -ForegroundColor Blue
Get-ChildItem -Path . -Recurse -Name ".env.production" | Remove-Item -Force -ErrorAction SilentlyContinue
Get-ChildItem -Path . -Recurse -Name ".env.local" | Remove-Item -Force -ErrorAction SilentlyContinue

# Remove OS-specific files
Write-Host "🗂️  Removing OS-specific files..." -ForegroundColor Blue
Get-ChildItem -Path . -Recurse -Name ".DS_Store" | Remove-Item -Force -ErrorAction SilentlyContinue
Get-ChildItem -Path . -Recurse -Name "Thumbs.db" | Remove-Item -Force -ErrorAction SilentlyContinue
Get-ChildItem -Path . -Recurse -Name "desktop.ini" | Remove-Item -Force -ErrorAction SilentlyContinue

# Remove IDE files
Write-Host "💻 Removing IDE-specific files..." -ForegroundColor Blue
Remove-Item -Path ".vscode" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path ".idea" -Recurse -Force -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "✅ Cleanup completed!" -ForegroundColor Green
Write-Host "📋 Project is ready for open source release" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Review all files for any remaining personal information" -ForegroundColor White
Write-Host "2. Test the setup script: .\setup.ps1" -ForegroundColor White
Write-Host "3. Update the repository URL in package.json and README.md" -ForegroundColor White
Write-Host "4. Create a new GitHub repository" -ForegroundColor White
Write-Host "5. Push the code: git add . && git commit -m 'Initial open source release' && git push" -ForegroundColor White
Write-Host ""
Write-Host "🎉 Happy open sourcing!" -ForegroundColor Green

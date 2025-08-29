# PowerShell script to convert JS/JSX files to TypeScript
# This script will help identify and convert remaining files

Write-Host "TypeScript Conversion Helper Script" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green

# Get all remaining JS/JSX files
$jsFiles = Get-ChildItem -Path "src" -Recurse -Include "*.js","*.jsx" | Select-Object FullName

Write-Host "`nRemaining files to convert:" -ForegroundColor Yellow
Write-Host "============================" -ForegroundColor Yellow

foreach ($file in $jsFiles) {
    Write-Host $file.FullName -ForegroundColor Cyan
}

Write-Host "`nTotal files remaining: $($jsFiles.Count)" -ForegroundColor Red

Write-Host "`nTo convert a file manually:" -ForegroundColor Green
Write-Host "1. Copy the JS/JSX file content" -ForegroundColor White
Write-Host "2. Create a new .ts or .tsx file with the same name" -ForegroundColor White
Write-Host "3. Add proper TypeScript types" -ForegroundColor White
Write-Host "4. Update import paths to use relative paths" -ForegroundColor White
Write-Host "5. Delete the original JS/JSX file" -ForegroundColor White

Write-Host "`nCommon TypeScript patterns to add:" -ForegroundColor Green
Write-Host "- Add 'use client' directive for Next.js components" -ForegroundColor White
Write-Host "- Add proper interface definitions" -ForegroundColor White
Write-Host "- Add type annotations for function parameters" -ForegroundColor White
Write-Host "- Update import paths to be relative" -ForegroundColor White

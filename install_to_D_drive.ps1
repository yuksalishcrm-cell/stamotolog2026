$Target = "D:\My Project\Stamotolog"

Write-Host "Creating project folder: $Target" -ForegroundColor Cyan
New-Item -ItemType Directory -Force -Path $Target | Out-Null

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$Source = Join-Path $ScriptDir "Stamotolog_No_Docker"

if (Test-Path $Source) {
    Copy-Item -Path "$Source\*" -Destination $Target -Recurse -Force
    Write-Host "Files copied to $Target" -ForegroundColor Green
} else {
    Write-Host "Source folder not found. Please unzip the archive first." -ForegroundColor Red
}

Write-Host ""
Write-Host "Next commands:" -ForegroundColor Yellow
Write-Host "cd `"$Target\backend`""
Write-Host "copy .env.example .env"
Write-Host "npm install"
Write-Host "npx prisma generate"
Write-Host "npx prisma migrate dev --name init"
Write-Host "npm run dev"
Write-Host ""
Write-Host "Open another PowerShell:"
Write-Host "cd `"$Target\frontend`""
Write-Host "copy .env.example .env"
Write-Host "npm install"
Write-Host "npm run dev"

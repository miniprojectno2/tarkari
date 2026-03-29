# Quick Render Deploy Script for Windows
# This script helps verify the project is ready for Render deployment

Write-Host "🚀 Tarkari Render Deployment Pre-flight Check" -ForegroundColor Cyan
Write-Host "=============================================="
Write-Host ""

# Check Node version
Write-Host "📦 Node Version:" -ForegroundColor Yellow
node --version
Write-Host ""

# Check npm/pnpm
Write-Host "📦 Package Manager:" -ForegroundColor Yellow
if (Get-Command pnpm -ErrorAction SilentlyContinue) {
    pnpm --version
    $PKG_MGR = "pnpm"
} else {
    npm --version
    $PKG_MGR = "npm"
}
Write-Host ""

# Check if dependencies are installed
Write-Host "📚 Dependencies:" -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Write-Host "✅ node_modules found" -ForegroundColor Green
} else {
    Write-Host "❌ node_modules not found - run: $PKG_MGR install" -ForegroundColor Red
}
Write-Host ""

# Check .env.example
Write-Host "🔐 Environment Variables:" -ForegroundColor Yellow
if (Test-Path ".env.example") {
    Write-Host "✅ .env.example found" -ForegroundColor Green
} else {
    Write-Host "❌ .env.example missing" -ForegroundColor Red
}

if (Test-Path ".env.local") {
    Write-Host "⚠️  .env.local exists locally (won't be pushed to Render)" -ForegroundColor Yellow
} else {
    Write-Host "ℹ️  No .env.local (will need to add vars in Render dashboard)" -ForegroundColor Cyan
}
Write-Host ""

# Check build
Write-Host "🔨 Testing Build:" -ForegroundColor Yellow
Write-Host "Running: $PKG_MGR run build"
& $PKG_MGR run build
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build successful" -ForegroundColor Green
} else {
    Write-Host "❌ Build failed - fix errors above" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Check lint
Write-Host "✨ Linting:" -ForegroundColor Yellow
Write-Host "Running: $PKG_MGR run lint"
& $PKG_MGR run lint
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ No lint errors" -ForegroundColor Green
} else {
    Write-Host "⚠️  Lint warnings (non-critical)" -ForegroundColor Yellow
}
Write-Host ""

# Git status
Write-Host "📝 Git Status:" -ForegroundColor Yellow
if (Test-Path ".git") {
    Write-Host "✅ Git repository found" -ForegroundColor Green
    $gitStatus = git status --porcelain
    if ($gitStatus) {
        Write-Host "⚠️  Uncommitted changes detected" -ForegroundColor Yellow
        git status --short
    } else {
        Write-Host "✅ Working directory clean" -ForegroundColor Green
    }
} else {
    Write-Host "❌ Not a git repository - initialize with: git init" -ForegroundColor Red
}
Write-Host ""

Write-Host "=============================================="
Write-Host "✅ Pre-flight check complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Create MongoDB Atlas cluster"
Write-Host "2. Push to GitHub: git push origin main"
Write-Host "3. Go to https://dashboard.render.com"
Write-Host "4. Create new Web Service"
Write-Host "5. Connect your GitHub repo"
Write-Host "6. Add environment variables"
Write-Host "7. Deploy!"
Write-Host ""
Write-Host "📖 Full guide: RENDER_DEPLOYMENT.md"
Write-Host "✅ Checklist: RENDER_CHECKLIST.md"

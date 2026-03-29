#!/bin/bash
# Quick Render Deploy Script
# This script helps verify the project is ready for Render deployment

echo "🚀 Tarkari Render Deployment Pre-flight Check"
echo "=============================================="
echo ""

# Check Node version
echo "📦 Node Version:"
node --version
echo ""

# Check npm/pnpm
echo "📦 Package Manager:"
if command -v pnpm &> /dev/null; then
    pnpm --version
    PKG_MGR="pnpm"
else
    npm --version
    PKG_MGR="npm"
fi
echo ""

# Check if dependencies are installed
echo "📚 Dependencies:"
if [ -d "node_modules" ]; then
    echo "✅ node_modules found"
else
    echo "❌ node_modules not found - run: $PKG_MGR install"
fi
echo ""

# Check .env.example
echo "🔐 Environment Variables:"
if [ -f ".env.example" ]; then
    echo "✅ .env.example found"
else
    echo "❌ .env.example missing"
fi

if [ -f ".env.local" ]; then
    echo "⚠️  .env.local exists locally (won't be pushed to Render)"
else
    echo "ℹ️  No .env.local (will need to add vars in Render dashboard)"
fi
echo ""

# Check build
echo "🔨 Testing Build:"
echo "Running: $PKG_MGR run build"
if $PKG_MGR run build; then
    echo "✅ Build successful"
else
    echo "❌ Build failed - fix errors above"
    exit 1
fi
echo ""

# Check lint
echo "✨ Linting:"
echo "Running: $PKG_MGR run lint"
if $PKG_MGR run lint; then
    echo "✅ No lint errors"
else
    echo "⚠️  Lint warnings (non-critical)"
fi
echo ""

# Git status
echo "📝 Git Status:"
if [ -d ".git" ]; then
    echo "✅ Git repository found"
    if [ -z "$(git status --porcelain)" ]; then
        echo "✅ Working directory clean"
    else
        echo "⚠️  Uncommitted changes detected"
        git status --short
    fi
else
    echo "❌ Not a git repository - initialize with: git init"
fi
echo ""

echo "=============================================="
echo "✅ Pre-flight check complete!"
echo ""
echo "Next steps:"
echo "1. Create MongoDB Atlas cluster"
echo "2. Push to GitHub: git push origin main"
echo "3. Go to https://dashboard.render.com"
echo "4. Create new Web Service"
echo "5. Connect your GitHub repo"
echo "6. Add environment variables"
echo "7. Deploy!"
echo ""
echo "📖 Full guide: RENDER_DEPLOYMENT.md"
echo "✅ Checklist: RENDER_CHECKLIST.md"

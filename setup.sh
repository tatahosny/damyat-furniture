#!/bin/bash

# دمياط للأثاث - Damyat Furniture Setup Script

echo "🎉 Welcome to Damyat Furniture!"
echo "=================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js is installed: $(node --version)"
echo ""

# Navigate to project directory
echo "📁 Setting up the project..."
cd "$(dirname "$0")"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Copy environment file
if [ ! -f ".env" ]; then
    echo "🔧 Creating .env file..."
    cp .env.example .env
    echo "✅ .env file created. Please edit it with your settings."
else
    echo "ℹ️  .env file already exists."
fi

echo ""
echo "=================================="
echo "✨ Setup Complete! ✨"
echo "=================================="
echo ""
echo "📝 Next steps:"
echo ""
echo "1. Start development server:"
echo "   npm run dev"
echo ""
echo "2. Open your browser:"
echo "   http://localhost:3000"
echo ""
echo "3. For more information, check:"
echo "   - README.md"
echo "   - QUICK_START.md"
echo "   - DEPLOYMENT.md"
echo ""
echo "📚 Documentation:"
echo "   - API_DOCS.md - API endpoints"
echo "   - BACKEND_SETUP.md - Backend setup"
echo "   - SEO_GUIDE.md - SEO optimization"
echo ""
echo "🚀 Ready to build amazing things!"
echo ""

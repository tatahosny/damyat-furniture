@echo off
REM دمياط للأثاث - Damyat Furniture Setup Script

echo 🎉 Welcome to Damyat Furniture!
echo ==================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js is installed: %NODE_VERSION%
echo.

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

REM Copy environment file
if not exist ".env" (
    echo 🔧 Creating .env file...
    copy .env.example .env
    echo ✅ .env file created. Please edit it with your settings.
) else (
    echo ℹ️  .env file already exists.
)

echo.
echo ==================================
echo ✨ Setup Complete! ✨
echo ==================================
echo.
echo 📝 Next steps:
echo.
echo 1. Start development server:
echo    npm run dev
echo.
echo 2. Open your browser:
echo    http://localhost:3000
echo.
echo 3. For more information, check:
echo    - README.md
echo    - QUICK_START.md
echo    - DEPLOYMENT.md
echo.
echo 📚 Documentation:
echo    - API_DOCS.md - API endpoints
echo    - BACKEND_SETUP.md - Backend setup
echo    - SEO_GUIDE.md - SEO optimization
echo.
echo 🚀 Ready to build amazing things!
echo.
pause

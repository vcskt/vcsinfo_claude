#!/bin/bash
set -e

echo "🚀 VCS Info Development Environment"
echo "===================================="

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install
fi

# Check environment
if [ ! -f ".env.local" ]; then
  echo "⚠️  .env.local not found. Create it from .env.example"
  cp .env.example .env.local
  echo "✓ .env.local created. Please edit with your config."
fi

# Kill any existing processes on ports 3000 and 4200
lsof -ti:3000,4200 | xargs kill -9 2>/dev/null || true

echo ""
echo "🔄 Starting services..."
echo ""
echo "   API (NestJS):   http://localhost:3000/api"
echo "   Web (Angular):  http://localhost:4200"
echo ""
echo "Press Ctrl+C to stop all services"
echo ""

# Start API in background
(
  echo "Starting API..."
  npm run dev:api
) &
API_PID=$!

# Wait for API to be ready
sleep 3

# Start Web
(
  echo "Starting Web..."
  npm run dev:web
) &
WEB_PID=$!

# Wait for both
wait

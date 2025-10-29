#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

echo "🔎 Verifying Vercel CLI installation..."
if ! command -v vercel &> /dev/null
then
    echo "❌ Vercel CLI could not be found."
    echo "Please install it globally by running: npm install -g vercel"
    exit 1
fi

echo "🚀 Starting production deployment to Vercel..."

# --- Deploy Backend API ---
echo "📦 Deploying backend API (biz-forecaster-api)..."
cd biz-forecaster-api || exit

echo "⚙️  Running local build to check for errors..."
npm run build

echo "🚀 Pushing to Vercel for production deployment..."
# The 'vercel link' command you ran previously created a .vercel folder here,
# so this command knows which project to deploy to.
vercel --prod
cd .. || exit

# --- Deploy Frontend ---
echo "📦 Deploying frontend (biz-forecaster-frontend)..."
cd biz-forecaster-frontend || exit

echo "⚙️  Running local build to check for errors..."
npm run build

echo "🚀 Pushing to Vercel for production deployment..."
# This command will deploy to the frontend project you linked.
vercel --prod
cd .. || exit

echo "✅ Both deployments have been triggered successfully."
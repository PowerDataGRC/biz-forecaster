#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

COMMIT_MSG="$1"

# Check if a commit message was provided as an argument.
if [ -z "$COMMIT_MSG" ]; then
  echo "💬 Please enter a commit message:"
  read COMMIT_MSG

  # If the user still didn't enter anything, exit.
  if [ -z "$COMMIT_MSG" ]; then
    echo "❌ Error: Commit message cannot be empty."
    exit 1
  fi
fi

# 1. Stage all changes.
echo "⚙️  Staging all changes..."
git add .

# 2. Commit the changes with the provided message.
echo "📝 Committing changes with message: \"$COMMIT_MSG\""
git commit -m "$COMMIT_MSG"

# 3. Push to the main branch on origin to trigger Vercel deployment.
echo "🚀 Pushing to origin main..."
git push origin main

echo "✅ Push successful! Vercel deployment has been triggered."

#!/bin/bash

echo "Setting up build deployment..."

npx prettier --write .

npm run build

while true; do
  read -p "Deploy via (g)it or (v)ercel? [v]: " deploy_method
  deploy_method=${deploy_method:-v}  # Default to vercel deploy

  #major update
  if [[ "$deploy_method" == "g" ]]; then
    echo "→ Deploying via Git..."

    git add .

    read -p "Enter commit message: " msg
    git commit -m "$msg"
    git push -u origin main

    echo "✅ Pushed to GitHub!"
    break

  #minor update  
  elif [[ "$deploy_method" == "v" ]]; then
    echo "→ Deploying via Vercel..."

    vercel --prod

    echo "✅ Deployed to Vercel!"
    break

  else
    echo "❌ Invalid input. Please enter 'g' for Git or 'v' for Vercel."
  fi
done
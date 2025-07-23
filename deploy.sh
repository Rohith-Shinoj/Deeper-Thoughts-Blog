#!/bin/bash
set -e

echo "Setting up build deployment..."

npx prettier --write .

npm run build

echo "✅ Build successful"
echo 

while true; do
  read -p $'\e[31mDeploy via (g)it or (v)ercel? (default vercel):\e[0m ' deploy_method #red
  
  deploy_method=${deploy_method:-v}  # Default to vercel deploy

  #major update
  if [[ "$deploy_method" == "g" ]]; then
    echo "→ Deploying via Git..."
    echo

    git add .

    read -p $'\e[31mEnter commit message:\e[0m ' msg

    git commit -m "$msg"
    git push -u origin main

    echo "✅ Pushed to GitHub!"
    echo "⏳ Waiting for Vercel deployment. Check logs at https://vercel.com/rohith-shinojs-projects/deeper-thoughts-blog/deployments"
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


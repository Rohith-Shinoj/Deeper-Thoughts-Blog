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
    echo "⏳ Waiting for Vercel deployment..."

    VERCEL_TOKEN="6Xm357xDV14tLgPbqICTPYtE"
    PROJECT="deeper-thoughts-blog"

    # Poll the latest deployment
    DEPLOYMENT_URL=""
    for i in {1..10}; do
    DEPLOYMENT_JSON=$(curl -s -H "Authorization: Bearer $VERCEL_TOKEN" "https://api.vercel.com/v6/deployments?projectId=$PROJECT&limit=1")
    DEPLOYMENT_URL=$(echo "$DEPLOYMENT_JSON" | grep -o '"url":"[^"]*' | cut -d'"' -f4)

    if [ -n "$DEPLOYMENT_URL" ]; then
        echo "✅ Deployment started at https://$DEPLOYMENT_URL"
        break
    else
        sleep 3
    fi
    done

    if [ -n "$DEPLOYMENT_URL" ]; then
    echo "🔍 Opening logs in browser..."
    open "https://$DEPLOYMENT_URL" 
    else
    echo "❌ Failed to retrieve deployment info."
    fi
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


#!/bin/bash

if [ "$VERCEL_ENV" != "" ]; then
    echo "Déploiement sur Vercel détecté"
    
    git config --global user.email "deploy@vercel.com"
    git config --global user.name "Vercel Deploy"
fi

version=$(cat config.json | grep -o '"version": "[^"]*"' | cut -d'"' -f4)

IFS='.' read -r -a version_parts <<< "$version"
major="${version_parts[0]}"
minor="${version_parts[1]}"
patch="${version_parts[2]}"

patch=$((patch + 1))

new_version="$major.$minor.$patch"

current_date=$(date +%Y-%m-%d)

cat > config.json << EOF
{
    "version": "$new_version",
    "lastUpdate": "$current_date"
}
EOF

echo "Version mise à jour : $new_version"

if [ "$VERCEL_ENV" != "" ]; then
    git add config.json
    git commit -m "Auto-increment version to $new_version"
    
    if [ "$GITHUB_TOKEN" != "" ]; then
        git push https://$GITHUB_TOKEN@github.com/$VERCEL_GIT_REPO_OWNER/$VERCEL_GIT_REPO_SLUG.git HEAD:main
    fi
fi 
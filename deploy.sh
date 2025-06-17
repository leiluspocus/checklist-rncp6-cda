#!/bin/bash

# Vérification si nous sommes dans un environnement Vercel
if [ "$VERCEL_ENV" != "" ]; then
    echo "Déploiement sur Vercel détecté"
    
    # Configuration de Git si nous sommes sur Vercel
    git config --global user.email "deploy@vercel.com"
    git config --global user.name "Vercel Deploy"
fi

# Lecture de la version actuelle
version=$(cat config.json | grep -o '"version": "[^"]*"' | cut -d'"' -f4)

# Séparation de la version
IFS='.' read -r -a version_parts <<< "$version"
major="${version_parts[0]}"
minor="${version_parts[1]}"
patch="${version_parts[2]}"

# Incrémentation du patch
patch=$((patch + 1))

# Nouvelle version
new_version="$major.$minor.$patch"

# Date courante
current_date=$(date +%Y-%m-%d)

# Mise à jour du fichier config.json
cat > config.json << EOF
{
    "version": "$new_version",
    "lastUpdate": "$current_date"
}
EOF

echo "Version mise à jour : $new_version"

# Si nous sommes sur Vercel, commit et push des changements
if [ "$VERCEL_ENV" != "" ]; then
    git add config.json
    git commit -m "Auto-increment version to $new_version"
    
    # Si nous avons un token GitHub, push les changements
    if [ "$GITHUB_TOKEN" != "" ]; then
        git push https://$GITHUB_TOKEN@github.com/$VERCEL_GIT_REPO_OWNER/$VERCEL_GIT_REPO_SLUG.git HEAD:main
    fi
fi 
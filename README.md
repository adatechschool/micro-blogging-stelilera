# 🐦 Snappy – Plateforme de microblogging

Snappy est une plateforme sociale combinant les meilleures fonctionnalités de Twitter et Instagram, permettant aux utilisateurs de partager du contenu, interagir en temps réel et explorer des tendances.

## 🚀 Technologies utilisées  
- **Front-end** : Pug JS 
- **Back-end** : Express JS 
- **Base de données** : PostgreSQL avec Prisma
- **Architecture** : MVC  

## 🔥 Fonctionnalités principales  
- ✅ **Publication et interaction** : Les utilisateurs peuvent poster du contenu,  ( à venir : commenter et réagir avec des likes).  
- ✅ **Système de fil d’actualité** : Affichage fluide des publications en temps réel.  
- ✅ **Gestion des comptes** : Inscription, connexion et profil utilisateur personnalisé.  
- ✅ **Optimisation des données** : Stockage efficace via PostgreSQL et Prisma.  

## 🏗️ Structure du projet  
📂 `models/` – Définition des schémas de données avec Prisma  
📂 `views/` – Templates dynamiques en Pug JS  
📂 `controllers/` – Gestion des requêtes  
📂 `routes/` – Définition des endpoints API  

## 🤝 Collaboration  
Projet réalisé par **une équipe de 4 développeuses**, avec une méthodologie agile pour assurer une évolution progressive du produit.  

## 📌 Installation & utilisation  

### 🛠️ Prérequis  
Avant de commencer, assurez-vous d’avoir installé :  
- [Node.js](https://nodejs.org/)  
- [PostgreSQL](https://www.postgresql.org/)  
- [Prisma CLI](https://www.prisma.io/docs/getting-started)  

### 🚀 Étapes d’installation  

1️⃣ **Cloner le projet**  

git clone: git@github.com:adatechschool/micro-blogging-stelilera.git

2️⃣ **Installer les dépendences**

npm install 

3️⃣ **Configurer la base de donnée**

npx prisma migrate dev

4️⃣ **Lancer le serveur**

npm run dev

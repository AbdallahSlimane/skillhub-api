# Skillhub API

## Prérequis
- [Docker](https://www.docker.com/) et [Docker Compose](https://docs.docker.com/compose/)
- [Node.js](https://nodejs.org/) (version 14+ recommandée)
- npm

## Installation

1. **Cloner le dépôt**  
   ```bash
   git clone https://github.com/ton-utilisateur/skillhub-api.git
   cd skillhub-api
   ```

2. **Configurer les variables d’environnement**  
   - Copier le fichier `.env.exemple` en `.env` :  
     ```bash
     cp .env.exemple .env
     ```  
   - Renseigner les valeurs nécessaires (nom de BDD, identifiants, etc.).

3. **Démarrer la base de données**  
   - Lancer Docker Compose :  
     ```bash
     docker-compose up -d
     ```  
   - Le script `init.sql` (dans `config/` ou à la racine) sera exécuté au premier démarrage pour créer et hydrater la base de données.

4. **Installer les dépendances**  
   ```bash
   npm install
   ```

5. **Lancer l’API**  
   - En mode développement :  
     ```bash
     npm run dev
     ```  
   - L’API devrait maintenant être accessible sur le port configuré dans le fichier `.env`.

## Structure du projet
- **`docker-compose.yml`** : Décrit les services Docker (PostgreSQL, etc.).  
- **`init.sql`** : Script d’initialisation de la BDD (monté dans le container PostgreSQL).  
- **`src/`** : Contient le code source de l’API (routes, controllers, services…).  

## Endpoints
- Les endpoints principaux (ex : `/users`, `/articles`, `/votes`, etc.) sont définis dans l’API.  
- Reporte-toi au code ou à la documentation pour plus de détails.

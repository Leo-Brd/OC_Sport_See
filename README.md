<img width="147" height="53" alt="image" src="https://github.com/user-attachments/assets/2ca9d800-967d-45c3-a2c2-955ae45308bd" />

# SportSee — Tableau de bord analytique sportif

Projet 12 de la formation OpenClassrooms Développeur React.

SportSee est une application de suivi d'activité sportive qui affiche les données d'un utilisateur sous forme de graphiques interactifs.

---

## Prérequis

- [Node.js](https://nodejs.org/) v18+
- npm ou yarn

---

## Installation

### 1. Frontend

```bash
npm install
```

### 2. Backend

```bash
cd backend
npm install
```

---

## Configuration

Copie le fichier d'exemple et adapte les valeurs :

```bash
cp .env.example .env
```

### Variables d'environnement (`.env`)

| Variable          | Description                                              | Exemple                      |
|-------------------|----------------------------------------------------------|------------------------------|
| `VITE_BACKEND_URL` | URL du serveur backend                                  | `http://localhost:3000`      |
| `VITE_USE_MOCK`    | `true` = données mock (sans backend), `false` = API réelle | `false`                  |

---

## Lancer le projet

### Mode développement avec données mock (sans backend)

Pas besoin de lancer le backend. Il suffit de mettre dans `.env` :

```env
VITE_USE_MOCK=true
```

Puis :

```bash
npm run dev
```

### Mode développement avec le vrai backend

Dans `.env` :

```env
VITE_USE_MOCK=false
VITE_BACKEND_URL=http://localhost:3000
```

Démarrer le backend :

```bash
cd backend
npm start
```

Puis dans un autre terminal, démarrer le frontend :

```bash
npm run dev
```

L'application sera disponible sur [http://localhost:5173](http://localhost:5173).

---

## Accéder au profil d'un utilisateur

L'URL doit contenir un paramètre `userId` correspondant à l'identifiant de l'utilisateur :

```
http://localhost:5173/?userId=12
http://localhost:5173/?userId=18
```

Les utilisateurs disponibles dans le mock sont :
- **12** — Jules Dovineau
- **18** — Marina Ratorez

---

## Structure du projet

```
src/
├── assets/              # Icônes SVG
├── components/
│   ├── dashboard/
│   │   ├── dailyActivityChart/    # Graphique barres — activité quotidienne
│   │   ├── averageSessionChart/   # Line chart — durée moyenne des sessions
│   │   ├── performanceChart/      # Radar chart — types de performance
│   │   ├── scoreChart/            # Radial bar — score objectif journalier
│   │   └── userKeyData/           # Calories, protéines, glucides, lipides
│   ├── header/
│   ├── sidebar/
│   └── userGreeting/
├── hooks/
│   ├── useUserData.jsx        # Hook générique de fetch (mock ou API)
│   └── useDashboardData.js    # Hook centralisé avec formatage des données
└── mocks/
    ├── users.json
    ├── activity.json
    ├── averageSessions.json
    ├── performance.json
    └── mockService.js         # Service de simulation des appels API
```

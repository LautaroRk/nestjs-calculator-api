<!-- Install dependencies -->
## 1. Install dependencies
```bash
$ npm install
```

<!-- Add required env variables -->
## 2. Add required env variables
Create a `.env` file in the root directory and add the following variables:
```bash
DB_HOST
DB_PORT
DB_NAME
DB_USERNAME
DB_PASSWORD

RANDOM_ORG_URL=https://api.random.org/json-rpc/2/invoke
RANDOM_ORG_API_KEY

JWT_SECRET
```

<!-- Populate operations table -->
## 3. Populate operations table
```bash
$ npm run populate
```

<!-- Start the app -->
## 4. Start the app
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```


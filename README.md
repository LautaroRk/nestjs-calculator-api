<!-- Install dependencies -->
## 1. Install dependencies
```bash
$ npm install
```

<!-- Add required env variables -->
## 2. Add required env variables
Create a `.env` file in the root directory and add the following variables:
```bash
DB_HOST=sql10.freesqldatabase.com
DB_PORT=3306
DB_NAME=sql10714592
DB_USERNAME=sql10714592
DB_PASSWORD=ZtcWkF8cRV

RANDOM_ORG_URL=https://api.random.org/json-rpc/2/invoke
RANDOM_ORG_API_KEY=0c864d9e-794e-4ce5-83bd-98c4aad148cf

JWT_SECRET=ajshfbakdbgkadbjgna
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


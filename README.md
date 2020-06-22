# CeFi-Frontend

Zero Collateral frontend integration with CeFi infrastructure.

## Environment

Secrets are held in `.development-secrets.json` see src/util/constants.tsx for
required environment variables.

## Building

To build the production code, run ```npm build```.

## Running

To run the production application, use ```PORT=8080 npm start```.

## Development

Start the UI in development mode with:

```npm run start:dev```

Start the server with:

```bash
PLAID_CLIENT_ID=5ec44b05f35e35031238d348 PLAID_SECRET=asdfwefg233dffsf \
PLAID_PUBLIC_KEY=8f8e5a63107fc2027a5768a1571988 PLAID_PRODUCTS=transactions \
PLAID_COUNTRY_CODES=US,CA,GB,FR,ES,IE PLAID_ENV=sandbox \
npm start
```

## Documentation

This app uses JSDocs. To generate documentation in the docs folder, run:
```npm run docs```

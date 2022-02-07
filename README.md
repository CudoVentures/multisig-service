# multisig-service

**multisig-service** is the backend to the **cudos-multisig-wallet** with a Postgres database for the multisigs, their transactions and signatures. Running on **Express** and using **Sequelize** to communicate with the database

## Prerequisites

1. **NodeJS** and **npm** installations are required
2. Installation of **Postgres** is also required (some GUI/database explorer for Postges is also useful. **pgAdmin** or **DBeaver** are decent options)
3. Create an empty database

## Installation

1. Clone the repo, open a terminal and install dependencies

```console
npm install
```

2. Run **Sequelize** migrations to create the tables

```console
npm run migrate
```

## Running the app

1. in **_/database/config.json_** set the configuration of your database

```json
{
	"development": {
		"username": "postgres", <= postgres username
		"password": 12345, <= posrgres password
		"database": "multisig", <= name of the database
		"host": "127.0.0.1",
		"dialect": "postgres"
	}
}
```

2. Start the server

```console
npm run start:dev
```

## TODOS

1. Cleanup **swagger.json** from template code (and potentially rename to **openApi.json**)
2. Setup and use **.env** for configuration settings (database username and password)
3. Update **cors** policy to include only the domain of our **front-end**

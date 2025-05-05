# Summary of implemented features

- user can create a account
- user can Login into a settigs page
- user can add links
- user can remove links
- user can edit links
- user can see a list of links in a public page

# Scope decisions and key trade-offs

- the stach is React, nodeJs and postgresDB
- Also use sequelize to db

# Setup and run instructions

## Main folder

- docker-compose up 

## API

- npm install
- npx sequelize-cli db:migrate
- npm start

## Client

- npm install
- npm run dev
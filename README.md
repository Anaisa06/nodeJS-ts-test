# NodeJS-Typescript Test

## How to run the project

### Step 1: Create and use database

First, create the database and use it:

```sql
CREATE DATABASE EcomFast;

USE EcomFast;
```

### Step 2: Install dependencies to make everything work

```bash
npm install
```

### Step 3: Run the project

This will create the tables in the database automatically

```bash
npm install
```

### Step 4: Add default values to the database

For the project to work correctly, we need to add some default stuff into our database

```sql
INSERT INTO roles (name) VALUES ("admin"), ("client");

INSERT INTO entities (name) VALUES ("order"), ("user");

INSERT INTO permissions (role_id, entity_id, can_create, can_update, can_delete, can_get) VALUES
(1, 1, true, true, true, true),
(1, 2, true, true, true, true),
(2, 1, true, true, false, true),
(2, 2, true, true, false, true);
```
#### Now you can use the server. Remember to create a new user and login to be able to use every endpoint.

## Dependencies

The project has a buch of dependencies that are necessary and useful to work in the best way. Some of them are:

* Express and @types/express
* Typescript
* Nodemon
* dotenv
* mysql2
* sequelize, sequelieze-typescript and @types/sequelize
* bcrypt and @types/bcrypt
* jsonwebtoken
* tsyringe
* ts-node and @types/node



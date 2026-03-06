# Library-Management-System

    This is a librar managemnet system API Backend for the management of users and the books 

# Routes and the Endpoints

## /users

GET: Get all the list of users in the system

POST: Create/register a new user

## /users/{id}

GET: Get a user by their ID

POST: Updating a user by their ID 

DELETE: Declaring a user by their ID (checking if the user still has an issue book) && (is there any fine/penalty to be connected)


## /user/subscription-details/{id}

GET: Get a user subscription detail by their ID
    
    >> Data of subscription
    >> Valid till?
    >> Fine if any?


## /books

GET: Get all the book in the system

POST: Add a new book to the system 


## /books/{id}

GET: Get a book by its ID

POST: Update the book by its ID

DELETE: Delete a book by its ID


## /books/issued
GET: Get all the issued books

## /books/issued/withFine

GET: Get all issued books with their fine amount

## Subscription Types

    >> Basic (3 months)
    >> Standard (6 months)
    >> Premium (12 months)


    >> If a user missed the renewal date, then user should be collected with $100
    >> If a user misses his subscription, then user is expected to pay $100 
    >> If a user misses both renewal & subscription, then the collected amount should be $200

## Commands:

npm init npm i express npm i nodemon --save-dev


npm run dev --> to start te appln


To restore node_modules and package-lock.json --> npm i/npm install


npm i mongoose npm install mongodb

npm i dotenv

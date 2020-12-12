# users-system-api

This is a simple REST API for user accounts. It has the following operations:
- user creation
- user sign in and JWT generation
- user deletion

## Purpose

The purpose of this repo is provide a demonstration of how a system can use a Node RESTful service to log in a user with an account
using JSON web tokens and Mongoose JS.

## How to use

This system requires Node to be installed and can be used with a few simple steps:

1. create a .env file in the root folder of this project with the following variables:

    PORT=  
    DB=  
    JWT_KEY=  

*PORT* is the port number that the system will use. *DB* is the MongoDB address the system will connect to. *JWT_KEY* is the secret key used
to sign the JWT tokens.

2. Use `npm start` to run the system on the port specified in the .env file.

You can log an existing user in and receive a JWT token using Postman by sending a POST request to the system with the following schema:


    username: {  
          type: String,  
          required: true,  
          unique: true,  
          minLength: 3,  
          maxLength: 20  
      },  
      email: {  
          type: String,  
          required: true,  
          unique: true,  
          match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/  
      },  
      password: {  
          type: String,  
          required: true,  
          minLength: 6  
      }  

For example, you can send:


    {  
        "username": "username",  
        "email": "email@mail.com",  
        "password": "password"  
    }  


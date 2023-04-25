# Revision_M6_backend
- API documentation for Flights Booking System

## 1. Overview

- Basic API endpoint = `https://revision-m6-backend.vercel.app/`.
- ALl requests must be secure i'e `https://` not `http://`,

## 2. Authentication

- This app uses Token based authentication and authorization.
- A user must register in order to get a token.

## 3. User

- Registration 👤
    - URL: `https://revision-m6-backend.vercel.app/register`;
    - Method: `POST`
    - Parameters:
        ```
        {
            name: string, (required)
            email: string, (required)
            password: string, (required, min length: 5)
        }
        ```
    - Responses
        - 201(Success): `{msg: Registration Successful}`
        - 402(Missing parameters): `{msg: Please provide name, email and password}`
        - 409(Conflict): `{msg: Account already exists}`

- Login 👤
    - URL: `https://revision-m6-backend.vercel.app/login`;
    - Method: `POST`
    - Parameters:
        ```
        {
            email: string, (required)
            password: string, (required, min length: 5)
        }
        ```
    - Responses
        - 201(Success): `{msg: Login Successful}`
        - 402(Missing parameters): `{msg: Please provide email and password}`
        - 404(Not Found): `{msg: Account does not exists}`

## 4 Flights
- Get All flights ✈️
    - URL: `https://revision-m6-backend.vercel.app/flights`;
    - Authenticated route
    - Method: `GET`
    - Parameters: None
    - Responses
        - 201(Success): `{data: flights_data...}`
        - 401(Unauthorized): `{msg: You are not logged in}`

- Get flight by id 🛩️
    - URL: `https://revision-m6-backend.vercel.app/flights/id`;
    - Authenticated route 
    - Method: `GET`
    - Parameters: None
    - Responses
        - 201(Success): `{data: flights_data...}`
        - 401(Unauthorized): `{msg: You are not logged in}`
        - 402(Invalid Parameters): `{msg: Invalid ID}`

- Add flights 🛫
    - URL: `https://revision-m6-backend.vercel.app/flights`;
    - Authenticated route
    - Method: `POST`
    - Parameters: None
    - Responses
        - 201(Success): `{msg: Flight added ✈️}`
        - 402(Missing parameters): `{msg: Please provide ...}`
        - 401(Unauthorized): `{msg: You are not logged in}`

- Update Flights 🛫
    - URL: `https://revision-m6-backend.vercel.app/flights/id`;
    - Authenticated route
    - Method: `PATCH/PUT`
    - Parameters: `{updates...}` and id as params
    - Responses
        - 201(Success): `{msg: Flight updated 🛫}`
        - 401(Unauthorized): `{msg: You are not logged in}`
        - 402(Invalid data): `{msg: Invalid ID}`

- Delete Flights 🛬
    - URL: `https://revision-m6-backend.vercel.app/flights/id`;
    - Authenticated route
    - Method: `DELETE`
    - Parameters: id as params
    - Responses
        - 201(Success): `{msg: Flight deleted 🛬}`
        - 401(Unauthorized): `{msg: You are not logged in}`
        - 402(Invalid data): `{msg: Invalid ID}`

## 5 Bookings

- Book a flight 🛩️
    - URL: `https://revision-m6-backend.vercel.app/bookings`;
    - Authenticated route
    - Method: `POST`
    - Parameters:
    ```
    {
        flightID: 'id...'
    }
    ```
    - Responses
        - 204(Success): No response
        - 401(Unauthorized): `{msg: You are not logged in}`
        - 402(Invalid data): `{msg: Invalid ID}`

- See all Bookings 🎫
    - URL: `https://revision-m6-backend.vercel.app/bookings`;
    - Authenticated route
    - Method: `GET`
    - Parameters: None
    - Responses
        - 201(Success): `{data:[bookings...]}`
        - 401(Unauthorized): `{msg: You are not logged in}`
# Launch

To launch the project, run the following command in your terminal:

```bash
docker-compose up --build
```
---

# Keys :

## API :

### Exchange api :

    https://www.abstractapi.com/api/exchange-rate-api

### Meteo api :

    https://openweathermap.org/

### Api youtube :

    google apis youtube v3

## Server:

### MongoDB :

    https://www.mongodb.com/atlas/database

---

# Back-end

---

Authentication
## Register

### Create a new user account.

    URL: /register
    Method: POST
    Request body:
        email (required, string): user email address
        password (required, string): user password
    Response:
        message (string): success message

## Login

### Authenticate user and get access token.

    URL: /login
    Method: POST
    Request body:
        email (required, string): user email address
        password (required, string): user password
    Response:
        accessToken (string): JWT access token

## Login google

### Authenticate user and get access token.

    URL: /logingoogle
    Method: POST
    Request body:
        email (required, string): user email address
    Response:
        accessToken (string): JWT access token

## Logout

### Destroy user session.

    URL: /logout
    Method: GET
    Response:
        message (string): success message

---

# User

## Get all users

### Get a list of all users.

    URL: /
    Method: GET
    Response:
        users (array): array of user objects

## Get single user

### Get a single user by ID.

    URL: /:id
    Method: GET
    Response:
        user object (without password field)
    Error Response:
        message (string): error message

## Delete user

### Delete a user by ID.

    URL: /:id
    Method: DELETE
    Response:
        message (string): success message
    Error Response:
        message (string): error message

## Add widget

### Add a new widget to a user.

    URL: /:id/widget
    Method: POST
    Request body:
        widget (object): widget object to add
    Response:
        message (string): success message
    Error Response:
        message (string): error message

## Delete widget

### Delete a widget from a user.

    URL: /:id/widget/:widgetId
    Method: DELETE
    Response:
        message (string): success message
    Error Response:
        message (string): error message

## Get user widgets

### Get a list of widgets associated with a user.

    URL: /:id/widget
    Method: GET
    Response:
        widgets (array): array of widget objects
    Error Response:
        message (string): error message

## Update widget

### Update a widget associated with a user.

    URL: /:id/widget/:widgetId
    Method: PUT
    Request body:
        widget (object): updated widget object
    Response:
        message (string): success message
    Error Response:
        message (string): error message

---

# Widget :

## Weather Widget
### City Temperature

### Display temperature for a city.

    URL: /weather/city_temperature
    Query Parameters:
        city (required, string): name of the city to get temperature for
    Response:
        temperature (number): temperature in Celsius for the specified city

## Exchange Widget
## Exchange Rate

### Display exchange rate for a currency.

    URL: /exchange/exchange_rate
    Query Parameters:
        currency_base (required, string): base currency code
        currency_target (required, string): target currency code
    Response:
        rate (number): exchange rate for the specified currencies

## YouTube Widget
## YouTube Video

### Display number of views for a video.

    URL: /youtube/youtube_video
    Query Parameters:
        video_id (required, string): ID of the video to get views for
    Response:
        views (number): number of views for the specified video
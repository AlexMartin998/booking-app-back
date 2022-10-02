# Booking App - Back end

## Running the app

### Running with local configuration

```
# install dependencies
yarn
npm i

# run in dev mode on port $PORT
yarn dev
npm run dev
```

### Running with Docker

Running the app with docker on port 3300

```
docker compose up --build
```

Running the app in a development environment with docker on port 3300

```
docker compose -f docker-compose-dev.yml up --build
```

## View demo

- You can log in with: `adrian@test.com` and password `test123`
- Available cities: `london`, `madrid`, `berlin`

[Demo](https://booking-app-react-alxadr.netlify.app)

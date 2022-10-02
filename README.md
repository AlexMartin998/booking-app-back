# Booking App - Back end

## Running the app

### Running with local configuration

```
# install dependencies
npm i

# run in dev mode on port 3000
npm run dev

# generate production build
npm run build

# run generated content in dist folder on port 3000
npm run start
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

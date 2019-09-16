# Field services dashboard
This is a simple field services app to show the current location of drivers and
vehicles preforming field service tasks. A companion app from the drivers' side
is needed to make a complete system.

## Set up
1. Install `docker` and `docker-compose`
2. Run `docker-compose up`
3. Go to `localhost:8080` for dashboard, and `localhost:4000` for GraphQL
Playground.

This repository has a simple db dump that contain some mock data to seed the
database for demo purposes. To load them, shell into the db docker instance and
run the following:

```
cd dbdump
mongorestore
```

## License
ISC license

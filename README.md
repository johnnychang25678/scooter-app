# Scooter APP
A REST API service for creating, updating and searching scooters. Build with `Nest.js`, `MySQL` and `TypeORM`.

## start with docker-compose
```
docker-compose -f docker-compose.yml up
```
The backend service will start at http://localhost:3000 locally

## API documentation
- GET /scooters: search for scooters data, support query params
- POST /scooters: create a scooter data
- PUT /scooters/{id}: update a scooter data by id 
- **For detailed documentation, start the app and go to (generated with swagger): http://localhost:3000/api**
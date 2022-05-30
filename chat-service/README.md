# Chat Microservice
> 
> ## Components: Python chat backend API using redis
>
> ## Based on: https://developer.redis.com/howtos/chatapp/
>
> ## Intended function: provide chat EventSource stream and backend interface as a microservice 
>
> ## Setup: use: 'cp .env.example .env' inside the 'chat-service/backend' directory
>
> ## To run, use: 'docker-compose up' within the 'chat-service' directory
>
> ## Container endpoint: http://localhost:8080/

# API Routes:

## GET /login
> ### Request Example:
> > {"username": "Adam}
> ### Response Example:
> > ```
> > Status Code: 200
> >
> >{
> >    "id": "1",
> >    "username": "Adam"
> >}
> > ```

## GET /logout
> ### Request Example:
> > { "username": "Bob } 
> ### Response Example:
> > ```
{
    "message": "User 4 has been logged out"
}
> > ```

## GET /users/online
> ### Request Example:
> > No Request Parameters
> ### Response Example:
> > ```
> > Status Code: 200
> > 
> > {
> >     "1":{
> >             "id": 1,
> >             "online": true,
> >             "username": "Adam"
> >         },
> >     "2":{
> >             "id": 2,
> >             "online": true,
> >             "username": "Kyle"
> >         },
> >     "3":{
> >             "id": 3,
> >             "online": true,
> >             "username": "Taylor"
> >         }
> > }
> > ```

## GET /rooms/user_id
> ### Request Example:
> > No Request Parameters
> > e.g. user_id = 1
> ### Response Example:
> > ```
> > Status Code: 200
> > 
> > [
> >     {
> >         "id": "1:3",
> >         "names": [
> >             [
> >                 "Adam"
> >             ],
> >             [
> >                 "Taylor"
> >             ]
> >         ]
> >     },
> >     {
> >         "id": "1:2",
> >         "names": [
> >             [
> >                 "Adam"
> >             ],
> >             [
> >                 "Kyle"
> >             ]
> >         ]
> >     },
> >     {
> >         "id": "0",
> >         "names": [
> >             "General"
> >         ]
> >     }
> > ]
> > ```

## GET /users/online
> ### Request Example:
> > No Request Parameters
> ### Response Example:
> > ```
> > Status Code: 200
> > {
> >     "1": {
> >         "id": "1",
> >         "online": true,
> >         "username": "Adam"
> >     },
> >     "2": {
> >         "id": "2",
> >         "online": true,
> >         "username": "Kyle"
> >     }
> > }
> > ```
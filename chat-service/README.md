# Chat Microservice
> 
> # Components: Python chat backend API using redis
>
> ## Based on: https://developer.redis.com/howtos/chatapp/
>
> ## Intended function: provide chat EventSource stream and backend interface as a chat microservice. 
>
> ## Setup: add the contents of 'chat.example.env' to the main .env file in the root directory.
>
> ## To run by itself, use: 'docker-compose up --build' within the 'chat-service' directory.
>
> ## To run as part of  the Full Stack Application, use 'docker-compose up' in the 'LendAHand' directory.
>
> # Container endpoint: http://localhost:8080/
>
> ### See 'seed-data.redis' in the backend directory for data storage and access examples.

# API Routes:

## POST /login
> ### Request Example:
> > JSON: {"username": "Adam"}
> ### Response Example:
> > ```
> > Status Code: 200
> >
> >{
> >    "id": "1",
> >    "username": "Adam"
> >}
> > ```

## GET /me
> ### Request Example:
> > No Request Parameters
> ### Response Example:
> > ```
> > Status Code: 200
> >
> >{
> >    "id": "5",
> >    "username": "Ed"
> >}
> > ```

## POST /logout
> ### Request Example:
> > JSON: { "username": "Bob" } 
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
> > Request Parameter: user_id
> > e.g. user_id = 1 (GET /rooms/1)
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

## GET /users
> ### Request Example:
> > Request Parameters: ids[]
> > List: ids[] = [1,2]
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

## GET /room/<room_id>/messages
> ### Request Example:
> > Request Parameters
> > e.g. room_id = 2:3 (GET /room/2:3/messages)
> ### Response Example:
> > ```
> > Status Code: 200
> > [
> > {
> >     "date": 1654459449.3766682,
> >     "from": 2,
> >     "message": "What's up?",
> >     "roomId": "2:3"
> > },
> > {
> >     "date": 1654459339.4714031,
> >     "from": 3,
> >     "message": "Hey",
> >     "roomId": "2:3"
> > }
> > ]
> > ```
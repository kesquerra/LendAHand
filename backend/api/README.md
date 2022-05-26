# Build Backend:
> Requires .env file in base directory
> 
> [Example .env file](../example.env) 
>
> In backend directory: 
> ```
> cargo run
> ```


# API Routes:

## GET /api/status
> ### Request Example:
> > No Request Parameters
> ### Response Example:
> > ```
> > Status Code: 200
> >
> > {
> >     "api_active": true,
> >     "db_active": true
> > }
> > ```


## GET /api/user
> ### Request Example:
> > No Request Parameters
> ### Response Example:

> > ```
> > Status Code: 200
> >
> > [
> >     {
> >         "id": 1,
> >         "username": "testuser1",
> >         "password": "testpassword1"
> >     },
> >     {
> >         "id": 2,
> >         "username": "testuser2",
> >         "password": "testpassword2"
> >     }
> > ]
> > ```

## POST /api/user
> ### Request Example:
> > ```
> > {
> >     "username": "db_createduser1",
> >     "password": "db_password1"
> > }
> > ```
> ### Response Example:
> > ```
> > Status Code: 201
> >
> > {
> >     "id": 3,
> >     "username": "db_createduser1",
> >     "password": "db_password1"
> > }
> > ```

## GET /api/user/{id}
> ### Request Example:
> > id: integer
> ### Response Example:
> > ```
> > Status Code: 200
> >
> > {
> >     "id": 3,
> >     "username": "db_createduser1",
> >     "password": "db_password1"
> > }
> > ```

## DELETE /api/user/{id}
> ### Request Example:
> > id: integer
> ### Response Example:
> > ```
> > Status Code: 204
> > ```

## GET /api/user/{id}/owns
> ### Request Example:
> > id: integer
> ### Response Example:
> > ```
> > Status Code: 200
> >
> > [
> >     {
> >         "id":9,
> >         "name":"testitem1",
> >         "is_lent_item":true,
> >         "img_uri":"img1.jpg",
> >         "lend_start":"2022-05-25T05:49:22.473895+00:00",
> >         "lend_end":"2022-05-25T05:49:22.473943+00:00",
> >         "owner_id":1,
> >         "borrower_id":2
> >     }
> > ]
> > ```

## GET /api/user/{id}/borrows
> ### Request Example:
> > id: integer
> ### Response Example:
> > ```
> > Status Code: 200
> >
> > [
> >     {
> >         "id":9,
> >         "name":"testitem1",
> >         "is_lent_item":true,
> >         "img_uri":"img1.jpg",
> >         "lend_start":"2022-05-25T05:49:22.473895+00:00",
> >         "lend_end":"2022-05-25T05:49:22.473943+00:00",
> >         "owner_id":1,
> >         "borrower_id":2
> >     }
> > ]
> > ```


## GET /api/item
> ### Request Example:
> > No Request Parameters
> ### Response Example:

> > ```
> > Status Code: 200
> >
> > [
> >     {
> >         "id":1,
> >         "name":"testitem1",
> >         "is_lent_item":true,
> >         "img_uri":"img1.jpg",
> >         "lend_start":"2022-05-16T18:59:01.139024-07:00",
> >         "lend_end":"2022-05-16T18:59:01.139032-07:00"
> >     }
> > ]
> > ```

## POST /api/item
> ### Request Example:
> > ```
> > {
> >         "name":"testitem1",
> >         "img_uri":"img1.jpg",
> >         "lend_start":"2022-05-16T18:59:01.139024-07:00",
> >         "lend_end":"2022-05-16T18:59:01.139032-07:00",
> >         "owner_id: 1
> > }
> > ```
> ### Response Example:
> > ```
> > Status Code: 201
> >
> > {
> >         "id":1,
> >         "name":"testitem1",
> >         "is_lent_item":true,
> >         "img_uri":"img1.jpg",
> >         "lend_start":"2022-05-16T18:59:01.139024-07:00",
> >         "lend_end":"2022-05-16T18:59:01.139032-07:00"
> > }
> > ```

## GET /api/item/{id}
> ### Request Example:
> > id: integer
> ### Response Example:
> > ```
> > Status Code: 200
> >
> > {
> >         "id":1,
> >         "name":"testitem1",
> >         "is_lent_item":true,
> >         "img_uri":"img1.jpg",
> >         "lend_start":"2022-05-16T18:59:01.139024-07:00",
> >         "lend_end":"2022-05-16T18:59:01.139032-07:00"
> > }
> > ```

## DELETE /api/item/{id}
> ### Request Example:
> > id: integer
> ### Response Example:
> > ```
> > Status Code: 204
> > ```

## POST /api/auth
> ### Request Example:
> > ```
> > {
> >     "username": "db_createduser1",
> >     "password": "db_password1"
> > }
> > ```
> ### Response Example:
> > ```
> > Status Code: 200
> >
> > {
> >     "id": 3,
> >     "username": "db_createduser1",
> >     "password": "db_password1"
> > }
> > ```
# Blog challange

This project holds a sample of an application that runs on `express` and `typescript` with a `mongodb` instance in a `docker` container

# How to run
1. Make sure docker and npm are installed
2. copy .env.example to .env file and add the desired values
3. run `npm i`
4. run `npm run docker:up`
5. run `npm run dev`

At this point you should be able to hit the api using `postman`, `insomina` or `curl`

# Endpoints 

#### GET /api/posts/
This Endpoint will return all posts and its comments

```
curl --location 'http://localhost:3000/api/posts'
```

Example respose:
```
[
    {
        "_id": "66847fb6f7ae6e081f994e77",
        "title": "first post",
        "text": "this is my first post",
        "createdAd": "2024-07-02T22:31:18.022Z",
        "comments": [
            {
                "text": "comments ",
                "createdAt": "2024-07-02T22:31:30.558Z",
                "_id": "66847fc2f7ae6e081f994e7b"
            },
            {
                "text": "another comments ",
                "createdAt": "2024-07-02T22:32:03.536Z",
                "_id": "66847fe38137429d2da15010"
            }
        ],
        "__v": 0
    }
]
```

#### POST api/posts
This endpoint will add an post (if it not already exists) to the mongodb instance

It expects an object of type 
```
{
    "title": "first post",
    "text": "this is my first post"
}
```

```
curl --location 'http://localhost:3000/api/posts' \
--header 'Content-Type: application/json' \
--data '{
    "title": "first post",
    "text": "this is my first post"
}'
```

Response will be either StatusCode === 204 indicating a succesful insert
or Statuscode === 409 indicating a conflict (unsucesful) insert

#### GET /api/posts/:id
This endpoint will return a give post with its comments

```
curl --location 'http://localhost:3000/api/posts/:id'
```
 
Example response:
```
{
    "_id": "66847fb6f7ae6e081f994e77",
    "title": "first post",
    "text": "this is my first post",
    "createdAd": "2024-07-02T22:31:18.022Z",
    "comments": [
        {
            "text": "comments ",
            "createdAt": "2024-07-02T22:31:30.558Z",
            "_id": "66847fc2f7ae6e081f994e7b"
        },
        {
            "text": "another comments ",
            "createdAt": "2024-07-02T22:32:03.536Z",
            "_id": "66847fe38137429d2da15010"
        }
    ],
    "__v": 0
}
```

#### POST api/posts/:id/comments
This endpoint will add comments object to a given post

It expects an object of type 
```
{
    "text": "your comment here"
}
```

Response will be either StatusCode === 200 indicating a succesful insert
or Statuscode === 400 indicating a post not found/unsucesful insert

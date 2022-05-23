## Group Progress Report 5/22
#### FullStack Spring, 2022

#### Team: Adam, Taylor, Kyle

---

#### Stand-up Recap

This week we added components to the web application, to include API routes, front end pages, and dynamic CI/CD pipelines to support builds for both frontend and backend to ensure build correctness and deployment to Github Pages.

---

#### Weekly Progress

| Taylor Noah | `Frontend` |
| -- | -- |



| Kyle Esquerra | `Backend` | 
| -- | -- |

This week I've updated the API to be more readable, with separating API routes into separate files depending on the entity. I've also extended the backend API to cover routes for items within the lending application, to support creation, deletion and querying. I've also added Postgres migrations for the database to include the creation of tables.
I added support for Docker to include a docker-compose yaml to create a postgres image in support of the backend Rust image, which deploys dynamically from set environment variables in .env.docker.
The API documentation has also been updated to contain the available routes.


| Adam Taitano | `DevOps` | 
| -- | -- |



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

I started this week by adding a basic rendered page to all the links the appbar has buttons for (Lend, Request, Profile, Login). I met with Casey and Katherine to laern how to
smoothly navigate between pages and use a background image that is consistant across all pages. I created a layout and Card system for the Lend page which displays all Lend
Item's information. Currently is uses local mock data. In effort to move away from local mock data and use backend mock data I implemented an httpService and
a backendStatusService. The former connects to the backend and the latter logs information to the console to confirm the connection on app start.



| Kyle Esquerra | `Backend` | 
| -- | -- |

This week I've updated the API to be more readable, with separating API routes into separate files depending on the entity. I've also extended the backend API to cover routes for items within the lending application, to support creation, deletion and querying. I've also added Postgres migrations for the database to include the creation of tables.
I added support for Docker to include a docker-compose yaml to create a postgres image in support of the backend Rust image, which deploys dynamically from set environment variables in .env.docker.
The API documentation has also been updated to contain the available routes.


| Adam Taitano | `DevOps` | 
| -- | -- |

My primary focus this week, although not demonstrated in commits, has been to figure out how to fully deploy our final project. Last week I failed at deploying our frontend as a static page via GitHub Pages, despite being able to demonstrate it on my own cloned test-repo (I am thinking it might have to do with permissions). Instead of worrying about this temporary measure, I chose our final deployment strategy: use GitHub Actions and docker-compose to build and push docker images of each component (backend, frontend, microservices x 3) to DigitalOcean's Container Registry, and deploy these images to Droplets. We have claimed our domain ('lendahand.ninja'), and I am hopeful it will all come together by the end of this term.
We created a new GitHub organization with a cloned repo to work on from now on, so that everyone has the ability to modify settings, actions and secrets.
Additionally, I am working on a minimally functional CRUD backend for my chat-service. 


## Group Progress Report 5/15
#### FullStack Spring, 2022

#### Team: Adam, Taylor, Kyle

---

#### Stand-up Recap

This week we laid out our groundwork for the project and setup our initial work. We had a meeting where we discussed our SQL schema, pull request reviews process, possible CI/CD pipeline utilities, and some other topics to ensure we were all on the same page and our work would be aligned.

---

#### Weekly Progress

| Taylor Noah | `Frontend` |
| -- | -- |

This week I created the initial landing page layout with an appbar and some buttons. I also added some initial pages for Lend, Request, Profile, and Login. I took Login a bit further adding a form to fill out. Currently it just console logs the info in the form and displays “Hello [inserted name] !”.


| Kyle Esquerra | `Backend` | 
| -- | -- |

I've created a skeleton for the Rust backend internal API. I've implemented logging for debugging with the API, retrieval of data from postgres databases and simple GET endpoints for user data, and a status endpoint to identify the status of the db connection and API. 
I've also created a skeleton for the microservice Golang backend external API. This API contains simple endpoints and retrieval from postgres databases, with logging in progress. 
I've implemented basic API documentation for the endpoints, along with moving the internal configurations to .env. 

| Adam Taitano | `DevOps` | 
| -- | -- |

I've pushed the initial CI/CD for our React frontend to use static publishing onto our GitHub Pages url, and added the start of CI for our rust backend. Hopefully these two GitHub Actions workflows will be solidified in the next few days, so they can be useful during implementation. I am fleshing out the structure for my chat microservice, and spent a considerable amount of time understanding how to use redis. At the very least, the chat is containerized with docker-compose. 

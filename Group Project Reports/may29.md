## Group Progress Report 5/29
#### FullStack Spring, 2022

#### Team: Adam, Taylor, Kyle

---

#### Stand-up Recap

This week, we discussed the SQL schema to update fields to allow for multiple borrows on the same item. We went over the integration of the frontend with the backend, along with the containerization of both. We updated our goals to be in line with the project requirements reducing the microservices to the messaging service.


---

#### Weekly Progress

| Taylor Noah | `Frontend` |
| -- | -- |


| Kyle Esquerra | `Backend` | 
| -- | -- |

I've updated the SQL tables in the containerized backend DB to have the user/item relation tables, along with moving lend dates to the relational table for multiple borrows.
I've updated handling to handle optional fields and relational table fields. I added endpoints to view user owned items, and user borrowed items (GET api/user/:id/:owns|borrows). 
I added bcrypt password hashing for user passwords and updated the API documentation to contain the updated information for endpoints, and added the new endpoints.


| Adam Taitano | `DevOps` | 
| -- | -- |

I keep moving the goalpost in terms of DevOps. Although I acknowledge certian workflows are preset (e.g. CodeQL), I have struggled with understanding why the workflows 
I attempt fail (e.g. gh-pages). I tested a potential deployment strategy using GitHub Action's self-hosted runner, but realized it wasn't very automatic. It required
me to keep an open shell running, and manually restart the frontend whenever updates to main occur. I still haven't found an optimal deployment strategy, but it's looking like 
docker-compose will be used, and possibly kuburnetes, since mostly everything is containerized. I am finalizing the chat backend API microservice, and aiming to finish a 
crude frontend component by Wednesday.

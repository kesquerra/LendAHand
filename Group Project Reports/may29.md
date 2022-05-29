## Group Progress Report 5/22
#### FullStack Spring, 2022

#### Team: Adam, Taylor, Kyle

---

#### Stand-up Recap

This week we are getting closer to a functioning full-stack app. We met after class on Wednesday to synchronize our backend and frontend implementation.
The end-goal is in sight, and we are working dilligently to build out our minimum viable product before the initial deadline.

---

#### Weekly Progress

| Taylor Noah | `Frontend` |
| -- | -- |


| Kyle Esquerra | `Backend` | 
| -- | -- |


| Adam Taitano | `DevOps` | 
| -- | -- |

I keep moving the goalpost in terms of DevOps. Although I acknowledge certian workflows are preset (e.g. CodeQL), I have struggled with understanding why the workflows 
I attempt fail (e.g. gh-pages). I tested a potential deployment strategy using GitHub Action's self-hosted runner, but realized it wasn't very automatic. It required
me to keep an open shell running, and manually restart the frontend whenever updates to main occur. I still haven't found an optimal deployment strategy, but it's looking like 
docker-compose will be used, and possibly kuburnetes, since mostly everything is containerized. I am finalizing the chat backend API microservice, and aiming to finish a 
crude frontend component by Wednesday.

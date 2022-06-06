# FullStack-GroupProject-Spring22
Group project repo for FullStack WebDevelopment at PSU, Spring 2022. 

Prof: Casey Bailey.

Requires .env file in base directory: [Example](https://github.com/Grad-2/LendAHand/blob/main/example.env)

| Team Member   | Lead Role   | 
| ------------- | ----------- | 
| Adam Taitano  | `DevOps`    |
| Taylor Noah   | `Frontend`  |
| Kyle Esquerra | `Backend`   | 


---
## Purpose
---
Today, there is an overabundance of just about everything.  
This causes two issues. Items not use and items gone to waste.  

How often do you use that ladder sitting in the shed?  
Does everyone on the block or in the aprtment building really need thier own personal ladder? Probably not. Most of the time it isn't being used.  

Do you have a trip coming up and know that you're going to have get rid of some food before leaving?  
Most of us might just throw it away. That creates more waste. Why not give it to a nerighbor?  

But how do we know who to ask for a ladder? How do we know which neighbor could use our food? We don't have time to ask all our neighbors who has what and who needs what.  

That's where Lend A Hand comes in!  

Lend A Hand is a website that allows people to connect to eachother so that they can lend or borrow items to and from eachother.  

Users are able to:
 - Add an item to the Lend List if they want people to know that they have an item  that could be borrowed. 
 - Put out a request on the Request List for an item so that another friendly user reaches out to them to complete their request!

This way, people can save thier money, create less waste, and even create community.  
All by Lending A Hand.


---
## To Run
---
1) Run the cmd: `git clone https://github.com/Grad-2/LendAHand.git`  
2) Create a file called `.env` in the base directory (LendAHand).  
3) Add these lines to the `.env` file you just created:  
> HOST="0.0.0.0"  
	POSTGRES_PASSWORD="postgres"  
	POSTGRES_DB="lah_db"  
	POSTGRES_USER="postgres"  
	POSTGRES_PORT=5432  
	BACKEND_PORT=9000  
	FRONTEND_PORT=3000  
	REDIS_HOST="127.0.0.1"  
	REDIS_PASSWORD=null  
	REDIS_ENDPOINT_URL=redis://redis:6379  
	REDIS_PORT=6379  
	SESSION_TYPE=redis  
	CHAT_CONFIG=backend.config.ConfigDev  
	CHAT_PORT=8080
3) In the directory `LendAHand/backend/api` create a file called `.env.docker` and place the above lines in this file as well.
4) In the base directory run the cmd: `docker compose up`
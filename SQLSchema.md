Tables
- Messages
- Items
- User
- Profile (maybe)


Items
 - id
 - name: varchar
 - lend / recieve ; boolean ?
 - imguri
 - lend-start-timestamp
 - lend-end

REL-Item/User
 - Item
 - User-Owner
 - User-Borrower: can be null  

User
  - id
  - name
	- password


Messages
 - id
 - user1
 - user2
 - message
 - timestamp

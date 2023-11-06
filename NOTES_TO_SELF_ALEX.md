If you've pulled the repo for the first time, do some setup:
npm init
npm install next
npm install prisma

Setup the MySQL server on your local machine:
- Download and install MySQL
- Create a new database (if you want) then USE it or USE an existing one
	- CREATE DATABASE <database_name>
	- USE <database_name>
- Create the Ticket table in this database, just copy and paste the following 
	text into the MySQL command terminal in this file: 
		.\prisma\migrations\20231104183440_init\migration.sql
- Open Environment Variables > User Variables > New, and enter:
	- Variable Name: DATABASE_URL
	- Variable Value: mysql://user:password@localhost:3306/<database_name>


Start the program:
npm run dev

Ignore all of that if you're going to use Docker,
just start the WLS, launch ubuntu, "code .",
run "docker compose up" and everything's ready

Access the website:
http://localhost:3000/

Creating a ticket to use with MySQL using CURL from powershell:
1) Create the header: (tell the method to use JSON and the origin of the request is localhost)
$headers = @{                                                                                              
    "Content-Type" = "application/json"
    "Origin" = "http://localhost"
}


2) Create the body: (just pass in a json object of the required data to create the ticket)
$body = @{
    "user_emails" = "user@gmail.com"
    "agent_emails" = "agent@sccs.swarthmore.edu"
    "body" = "put some text here for the body idk"  
} | ConvertTo-Json


$body = @{
    "id" = 10
} | ConvertTo-Json

3) Invoke the REST method to POST:
Invoke-RestMethod -Uri "http://localhost:3000/api/create_ticket" -Method Post -Headers $headers -Body $body

Invoke-RestMethod -Uri "http://localhost:3000/api/delete_tickets" -Method Delete -Headers $headers -Body $body
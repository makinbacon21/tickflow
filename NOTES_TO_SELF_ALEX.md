Start the program:
npm run dev

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


3) Invoke the REST method to POST:
Invoke-RestMethod -Uri "http://localhost:3000/api/create_ticket" -Method Post -Headers $headers -Body $body
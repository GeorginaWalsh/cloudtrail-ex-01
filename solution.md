Brief description regarding my approach to the assignment:

    Docker:
        I had to install and set up Docker for this assignment. I usually use VS code to do any coding but there was an initial hiccup between Docker and VS Code that was quickly resolved. (VS code refused to admit Docker existed but running both as admin worked).
        I used the provided steps to set up the image and container but this was my first time using Docker so it will likely have little involvement with my attempt at the assignment.
    
    
    Anomaly Detection Script:
        Initially I was going to start at the beginnning of the policy list and work my way down the list. I ended up putting some time into trying to check for unique login credentials and MFA. I have little experience reading cloudtrail logs and thought that I just didn't recognise how the signs of unigue credentials or a MFA sign in were recorded. When nothing was being detected in multiple files I then searched for the terms "login" or "sign" and realised that none of the logs contained this data. 

        I had though that each point in the policy would be a factor I could approach to detect in the logs so I put more time than I would have liked into this endevour but we live and we learn. Check what I can review from the data before trying to analyse what doesn't exist. As there was no logs regarding a login, I couldn't approach "account lockout" or "password policy". It is unlikely that the logs would record the password anyway for security.

        IPs were recorded within the logs so it was possible to check if they fell within the provided ranges. The IPs also made it possible to check the location of the event. A list of other countries that have approval wasn't included. 

        As the services used are mentioned in the logs, the next checks I did were related to them. The first check related to services will call out anything that falls outside of the approved services, while the second check will call out any logs where production S3 buckets and EC2 instances are deleted or modified.


    Assumptions/Reasoning:
        I manually added a risk level to the anomalies. Initially I had deemed all of them to be a high risk, after all a person logging in from an identified region, and unpermitted services being run are all quite alarming to see. In the end I decided that, just for this assignment, IP and location anomalies would be marked as "Medium". I only lowered this score because I believe that I may be catching too many logs with these checks, it could very well be that I am catching employees who are from an approved list of other counties. For example, one of the people who kept turning up was "eva", a lot of the IPs she used were would begin with "102.54.32.", which could be her main residence of work, with anything outside of this being a sign of a person who travels frequently for work or otherwise. It definitely is something to be investigated and I would rank it as "High Risk" if I had a better idea of how common it may be that an employee may end up needing to sign in from an IP deemed out of a suitable range or country.

        I left the service checks as "High Risk", particularly regarding production resources. An instance or bucket being deleted could cause a momentous amount of damage to a company as processes and data are ended or deleted. I do know that it could be seen as slightly contradictory that using S3 services are permitted but I have their use flagged within the critical resource check but I tried to limit any contradiction by specifying what commands could be troublesome.

        I know that I probably should have had everything be printed into a single report but keeping them separated allowed me to compare the outputs I was receiving. It was also useful as the first report was returning a smaller amount of anomalies which made it easier and faster to see if the checks were working.

        I wish I could say that I wrote everything myself but I'd like to believe I'm an honest person. I have very limited experience with writing in javascript, especially without any provided notes or insructions. Coming up with functions on the spot that would scan through the data is not something I could easily make, but it is something I can at least read. Unless I understand the code that I am using, I am very unlikely to just use it without question. If I want to make modifications, if I want to take a function, and use it on another field, I want to know what I need to change otherwise it could lead to multiple errors and the script not running at all. I am not afraid to learn more regarding Javascript or any other language, I will not claim to be an expert in them.

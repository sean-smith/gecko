# User Login

As a current user, I want to log in so that I may use the service. When a user opens the appliation, they are presented with a login screen that prompts them to login with Uber. When they click login, they are deeplinked into the uber app where they accept the permissions that we require. Once the user clicks accept, they are deeplinked back to our app and have been successfully logged in.

Should the user not have the Uber app, they will be redirected to a webpage that will have them login to their uber app and accept the permissions.

Should the user fail to complete the login procedure they will be presented with the same login button that they started with.

![Login Diagram](/img/login_uml.png)


## Happy Path
1. Chooses "Sign in with Uber". (This is the only option)
2. We request an app token from the Uber API.
3. User is redirected to Uber website.
4. User Signs in or creates account 
5. Clicks "Allow" when prompted for authorization.
6. User is redirected to home page
7. Session Id is stored in our DB

## Bad Path
1. User doesn't click login.
  * We do nothing
2. Token requested but no response
  * Display error message "Please try again later"
3. Uber Website is down.
  * User is displayed with login button again if they go back to our page. 
  * We have no control over Uber
4. User doesn't have account
  * Uber prompts them to create account
5. User doesn't click allow
  * We tell the user "Uber Permissions required, please try again."
6. User is not successfully redirected to home page
  * We will reconfigure the redirect URI
  * We will detect this by montioring login statistics using something Google analytics.
7. Session Id is not stored
  * We try our store request again
  * We log an error to our log


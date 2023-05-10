
## User Stories

**Surveyor User Stories:**
- As a surveyor, I want to be able to easily locate the member login button on the website.
- As a surveyor, I want to be able to securely login with my credentials.
- As a surveyor, I want to be able to reset my password if I forget it.
- As a surveyor, I want to be able to view my surveyor dashboard after login.
- As a surveyor, I want to be able to quickly access and view incomplete addresses.
- As a surveyor, I want to be able to generate a map with all incomplete addresses to streamline my work.

**Admin User Stories:**
- As an admin, I want to be able to easily locate the admin login button on the website.
- As an admin, I want to be able to securely login with my credentials.
- As an admin, I want to be able to reset my password if I forget it.
- As an admin, I want to be able to view the admin dashboard after login.
- As an admin, I want to be able to create, edit, view, and delete Authorized  Users accounts with appropriate privileges.
- As an admin, I want to be able to update, edit, view, and delete home addresses in the system.
- As an admin, I want to be able to update, edit, view, and delete surveyors in the system.
- As an admin, I want to be able to update, edit, view, and delete survey records in the system.

**User Stories:**
- As an Authorized, I want to be able to securely login with my credentials.
- As an Authorized, I want to be able to reset my password if I forget it.
- As an Authorized, I want to be able to view the information and functionality that the admin has given me access to.
- As an Authorized, I want to be able to logout securely.


## API Routes
| Verb   | URI Pattern        | Request Body      | Headers   | Action              |
|--------|--------------------|-------------------|-----------|---------------------|
| POST   | `/sign-in`         | **credentials**   | N/A       | user sign-in      
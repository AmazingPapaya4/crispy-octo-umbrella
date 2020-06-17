# Paypay's Fullstack Challenge

### Brief description

Web application that allows employees to submit feedback to fellow employees.

### Requirements

- Admin View
  - Add, remove, update, view employees
  - Add, update, view performance reviews
  - Assign employees to participate in another employee's performance review
- Employee View
  - List of performance reviews requiring feedback
  - Submit feedback
  
### Assumptions and omissions

- Application is made for one company and their employees.
- Any form of notification such as emailing users is left out at a cost of user experience.

### Diagrams

![Database design](https://user-images.githubusercontent.com/63290143/84590855-ec2c7f80-ae74-11ea-9f11-0616f76611f2.png)


### Run scripts

Set up backend
```
cd project_directory
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cd application
./manage.py migrate
```

Create a superuser
```
./manage.py createsuperuser
```

Note: Set at least 1 user as admin in `http://localhost:8000/adminusers/customuser/`

Set up React (for development). Parcel is used to bundle scripts.
```
cd application/frontend
npm install
npm start
```

Start application
```
./manage.py runserver --insecure
```
Note: insecure flag is used to route 404 to react during development. Not for production

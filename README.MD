#### Jobs API

1. Language: JavaScript, NodeJs
2. Framewrork: Express
3. Database: MongoDB
4. Documentation > open the swagger.yaml file

#### Setup

```bash
npm install && npm start > to install required packages and start up nodemon
```

#### Database Connection

1. Import connect.js
2. Invoke in start()
3. Setup .env in the root
4. Add MONGO_URI with correct value

#### Routers

- auth.js
- jobs.js

#### Register User

- Validate - name, email, password - with Mongoose
- Hash Password (with bcryptjs)
- Save User
- Generate Token
- Send Response with Token

#### Login User

- Validate - email, password - in controller
- If email or password is missing, throw BadRequestError
- Find User
- Compare Passwords
- If no user or password does not match, throw UnauthenticatedError
- If correct, generate Token
- Send Response with Token

### Get all Jobs
- Gets you all the jobs you created
- 
### Get Single Job
- Search a job using a specific ID

### Update Job
- Update a Specific Chosen Job

### Delete Job
- Delete a single job

#### Security features

- helmet
- cors
- xss-clean
- express-rate-limit





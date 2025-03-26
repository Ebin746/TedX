
# 🌐 TedX Cusat App
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://semver.org)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://example.com/build)

A platform for managing user details and authentication for TedX Cusat.

## Features

*   🔧 **User Authentication**: Secure signup and login functionalities.
*   🔑 **Password Management**: Forgot password and reset password features.
*   👤 **User Profile**: Storing and managing user details (fullName, email, age, tedXID).
*   📧 **Email Integration**: Sending password reset links via email.
*   🔒 **Data Security**: Hashing passwords with bcryptjs for secure storage.
*   🚀 **Deployment**: Ready for deployment on platforms like Heroku or AWS.

## Tech Stack

| Category     | Technologies                                                     | Documentation                                                                                     |
|--------------|------------------------------------------------------------------|---------------------------------------------------------------------------------------------------|
| Frontend     | _(Assumed to be a separate client-side application)_           | N/A                                                                                               |
| Backend      | [Node.js][nodejs-url], [Express][express-url]                    | [Node.js Docs][nodejs-docs], [Express Docs][express-docs]                                       |
| Database     | [MongoDB][mongodb-url], [Mongoose][mongoose-url]                  | [MongoDB Docs][mongodb-docs], [Mongoose Docs][mongoose-docs]                                     |
| Authentication | [jsonwebtoken][jsonwebtoken-url], [bcryptjs][bcryptjs-url]        | [jsonwebtoken Docs][jsonwebtoken-docs], [bcryptjs Docs][bcryptjs-docs]                         |
| Email | [nodemailer][nodemailer-url] | [nodemailer Docs][nodemailer-docs] |
| Other        | [dotenv][dotenv-url], [body-parser][body-parser-url]           | [dotenv Docs][dotenv-docs], [body-parser Docs][body-parser-docs]                                   |
| Development  | [nodemon][nodemon-url]                                          | [nodemon Docs][nodemon-docs]                                                                      |

## Quick Start

### Prerequisites

*   [Node.js][nodejs-url] (v18 or higher)
*   [MongoDB][mongodb-url] (Running instance)

### Installation

bash
git clone [repo-url]
cd project
npm install
# or
yarn install


### Environment

Create a `.env` file in the project root with the following variables:

env
PORT=3000
DATA_BASE_URL=mongodb://localhost:27017/tedxcusat
JWT_SECRET=your-secret-key
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-email-password


> [!NOTE]
> Replace `your-secret-key`, `your-email@gmail.com`, and `your-email-password` with your actual secret key and email credentials.  Ensure the `DATA_BASE_URL` points to your MongoDB instance.

## Development

### Commands

bash
npm run start   # Start the server with nodemon
# or
yarn start


### Testing

The project currently does not have explicit testing configured.  Consider implementing unit tests using a framework like Jest.

## API Reference

| Method | Endpoint            | Body                                        | Response                                                              |
|--------|---------------------|---------------------------------------------|-----------------------------------------------------------------------|
| POST   | /auth/signup        | { username, password, fullName, email, age, tedXID } | 200 OK - { message: "Successfully registered", userInfo }          |
| POST   | /auth/login         | { username, password }                      | 200 OK - { message: "success fully logined ",userInfo} |
| POST   | /auth/forgot-password | { email }                                   | 200 OK - { status: true, message: "Email sent successfully on Given email;" } |
| POST   | /auth/reset-password/:token | { password }                   | 200 OK - {  message: "Password updated successfully" } |

## Deployment

### Dockerfile

dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install --omit=dev
EXPOSE 3000
CMD ["npm", "start"]


### Platform Guides

*   **Heroku**:  Create a Heroku app, configure environment variables, and deploy the Dockerfile.
*   **AWS**: Use AWS Elastic Beanstalk or ECS to deploy the Docker container.

## Contributing

1.  Create a new branch: `feat/new-feature` or `bugfix/issue-123` or `chore/update-dependencies`.
2.  Commit your changes with a descriptive message: `feat: Add user authentication`.
3.  Create a pull request to the `main` branch.

> [!NOTE]
> Pull requests should be well-documented and include any necessary tests.

[nodejs-url]: https://nodejs.org/
[express-url]: https://expressjs.com/
[mongodb-url]: https://www.mongodb.com/
[mongoose-url]: https://mongoosejs.com/
[dotenv-url]: https://www.npmjs.com/package/dotenv
[body-parser-url]: https://www.npmjs.com/package/body-parser
[nodemon-url]: https://www.npmjs.com/package/nodemon
[nodejs-docs]: https://nodejs.org/dist/latest-v18.x/docs/api/
[express-docs]: https://expressjs.com/en/4x/api.html
[mongodb-docs]: https://www.mongodb.com/docs/
[mongoose-docs]: https://mongoosejs.com/docs/
[dotenv-docs]: https://github.com/motdotla/dotenv#readme
[body-parser-docs]: https://github.com/expressjs/body-parser
[nodemon-docs]: https://github.com/remy/nodemon#readme
[jsonwebtoken-url]: https://www.npmjs.com/package/jsonwebtoken
[jsonwebtoken-docs]: https://github.com/auth0/node-jsonwebtoken
[bcryptjs-url]: https://www.npmjs.com/package/bcryptjs
[bcryptjs-docs]: https://www.npmjs.com/package/bcryptjs
[nodemailer-url]: https://nodemailer.com/about/
[nodemailer-docs]: https://nodemailer.com/

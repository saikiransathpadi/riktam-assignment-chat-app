# Project Name

Chat Application - Riktam

## Table of Contents

- [Description](#description)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Installing Dependencies](#installing-dependencies)
  - [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Description

Chat app similar to any web based chat applicaiton for communication this includes features like, login, chats, communication through messages, logout, admin user, group chat etc.

## Prerequisites

To understand the codebase a good understanding of NodeJs / Javascript is required.

## Getting Started

Make sure you have installed NodeJs in your system.

### Installing Dependencies

```
# Navigate to the project directory and install backend dependencies
cd chat-app
npm install


```

## API Endpoints

1. **Create User**
   - Method: POST
   - Endpoint: `/user/create`

2. **Update User**
   - Method: POST
   - Endpoint: `/user/update/:user_id`

3. **User Login**
   - Method: POST
   - Endpoint: `/user/login`

4. **User Logout**
   - Method: POST
   - Endpoint: `/user/logout`

5. **Search User**
   - Method: GET
   - Endpoint: `/user/search`

6. **Get User**
   - Method: GET
   - Endpoint: `/user`

7. **Get User Chats**
   - Method: GET
   - Endpoint: `/chat`

8. **Create Group Chat**
   - Method: POST
   - Endpoint: `/chat/group/create`

9. **Update Group Chat**
   - Method: POST
   - Endpoint: `/chat/group/update/:chatId`

9. **Send Message**
   - Method: POST
   - Endpoint: `/message`

9. **Get Chat Messages**
   - Method: Get
   - Endpoint: `/message/gchat/:chatId`


## Technologies Used

List the technologies, frameworks, and libraries used in the project.

- Node.js
- Express
- MongoDB

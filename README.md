# Task Manager API

## Overview

A simple REST API built with **Node.js** and **Express.js** that supports CRUD operations for managing tasks. Tasks are stored in-memory (no database).

Each task contains:

- `id`
- `title`
- `description`
- `completed`

---

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start the server:

```bash
node app.js
```

Server runs at:

```text
http://localhost:3000
```

---

## API Endpoints

### Create Task

```http
POST /tasks
```

Request Body:

```json
{
	"title": "Learn Express",
	"description": "Build CRUD APIs",
	"completed": false
}
```

### Get All Tasks

```http
GET /tasks
```

### Get Task By ID

```http
GET /tasks/:id
```

### Update Task

```http
PUT /tasks/:id
```

Request Body:

```json
{
	"title": "Updated Task",
	"completed": true
}
```

### Delete Task

```http
DELETE /tasks/:id
```

---

## Testing

Use Postman or Thunder Client with the following base URL:

```text
http://localhost:3000/tasks
```

Test the APIs in this order:

1. Create a task (POST)
2. Get all tasks (GET)
3. Get task by ID (GET)
4. Update task (PUT)
5. Delete task (DELETE)

---

## Note

Data is stored in-memory and will be lost when the server restarts.

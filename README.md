# Veil

A modern anonymous confession platform built for open expression, clean interaction, and minimal distraction.

Veil allows users to anonymously share thoughts, experiences, confessions, rants, or stories through a topic-based feed system with a smooth real-time experience.

Designed with a dark modern UI and lightweight full-stack architecture, the project focuses on simplicity while still delivering dynamic social-platform behavior.

---

## Preview

```txt
Anonymous • Love • Today, 11:42 PM

"I still think about someone I met two years ago."
```

---

# Features

- Anonymous confession posting
- Topic-based filtering
- Live search functionality
- Like / unlike system
- Relative timestamps
- Dynamic feed rendering
- No page reload interactions
- Modular backend routing
- MongoDB persistence

---

# Tech Stack

## Frontend

- HTML5
- Tailwind CSS
- Vanilla JavaScript

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

---

# Architecture

```txt
Frontend UI
     ↓
Vanilla JS Fetch API
     ↓
Express.js Routes
     ↓
MongoDB Database
```

---

# Project Structure

```txt
Veil/
│
├── models/
│   └── Confession.js
│
├── public/
│   ├── img/
│   └── script.js
│
├── routes/
│   ├── like.js
│   └── post.js
│
├── src/
│
├── main.js
├── index.html
├── package.json
└── README.md
```

---

# Current Functionality

Users can currently:

- Create anonymous confessions
- Browse all confessions
- Filter confessions by topic
- Search confessions live
- Like and unlike posts
- View timestamps dynamically


---

# Running Locally

## 1. Clone the Repository

```bash
git clone https://github.com/itz-lakshya/veil.git
```

---

## 2. Move Into Project Directory

```bash
cd veil
```

---

## 3. Install Dependencies

```bash
npm install
```

---

## 4. Start MongoDB Locally

Make sure MongoDB is running on:

```txt
mongodb://localhost:27017
```

---

## 5. Run the Server

```bash
node main.js
```

---

## 6. Open in Browser

```txt
http://localhost:3000
```

---

# Engineering Concepts Practiced

This project explores practical full-stack development concepts including:

- CRUD operations
- API routing
- Dynamic DOM rendering
- Async frontend/backend communication
- MongoDB querying
- Modular project structure
- Frontend state updates
- Real-time UI interaction patterns

---

# Future Improvements

Planned future additions include:

- Trending feed
- Authentication system
- Comment system
- Better combined search/filtering
- Real-time updates using sockets
- Admin moderation tools
- Responsive mobile improvements
- Deployment

---


# Status

Currently in active development.

---

# Author

Lakshya.

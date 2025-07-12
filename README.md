
# devTinder

A modern, full-stack web application for developers to connect, chat, and collaborate—think "Tinder for Developers."  
[Live Demo](https://devtinder.biz/)

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Links](#links)

---

## About

**devTinder** is a platform where developers can discover, connect, and chat with other developers. It features a swipe-based feed, real-time chat, connection requests, and a membership system with PayPal integration.

- **Frontend Repo:** [devtinderfront](https://github.com/anubhavpratap/devtinderfront)
- **Backend Repo:** [devtinder](https://github.com/anubhavpratap/devtinder)
- **Live Site:** [devtinder.biz](https://devtinder.biz/)

---

## Features

- 🔥 Swipe-based developer feed
- 💬 Real-time chat (Socket.io)
- 🤝 Connection requests & management
- 📝 User profiles with editing
- 💎 Membership plans (PayPal integration)
- 🛡️ Authentication & protected routes
- 🎨 Responsive UI (Tailwind CSS + DaisyUI)

---

## Tech Stack

**Frontend:**
- React (with Vite)
- Redux Toolkit
- React Router
- Tailwind CSS & DaisyUI
- Axios
- Socket.io-client
- PayPal React SDK

**Backend:**  
See [devtinder](https://github.com/anubhavpratap/devtinder) for details.

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

```bash
git clone https://github.com/anubhavpratap/devtinderfront.git
cd devtinderfront
npm install
```

### Running Locally

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (default Vite port).

> **Note:** The frontend expects the backend to be running at `http://localhost:7777` in development.

---

## Project Structure

```
src/
  components/      # React components (Feed, Chat, Profile, etc.)
  utils/           # Redux slices, constants, socket setup
  App.jsx          # Main app with routes
  main.jsx         # Entry point
  index.css        # Tailwind/DaisyUI styles
public/            # Static assets
```

---

## Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request


---

## Links

- [Frontend Repo](https://github.com/anubhavpratap/devtinderfront)
- [Backend Repo](https://github.com/anubhavpratap/devtinder)
- [Live Site](https://devtinder.biz/)

---

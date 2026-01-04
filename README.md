# HackFLOW OS 🟢

> HackFLOW OS is a productivity and project management platform designed for hackers, makers, and small teams. It combines Flow Tracking, Scope Management, Demo Evaluation, Team Collaboration, and Progress Tracking in one lightweight web application.  

---

## 🔥 Features

### **Core Modules**
1. **Flow Engine / Momentum Logic**
   - Detects current state: 🟢 In Flow, 🟡 Thinking, 🔴 Stuck
   - 25-min work sessions (Pomodoro-style)
   - Momentum score and streak tracker
   - (Planned) Gemini AI integration for suggestions  

2. **Scope Killer**
   - Input feature list and classify tasks: ❌ Kill, ⚠️ Later, ✅ Ship
   - Optional Roast mode (ElevenLabs voice)
   - Frontend logic simulates AI decisions  

3. **Demo Arena**
   - Input project description
   - AI judges provide feedback and boredom score
   - Text-to-speech feedback for engagement  

4. **Team Module**
   - Create / join teams
   - Track team flow score
   - View team member avatars and status  

5. **Progress Tracker**
   - Track stages from idea → init → deploy
   - Shows percentage of completion and progress bars  

6. **Gamification**
   - Badges and streak tracking
   - Momentum score circular ring  

### **Auxiliary / Optional Modules**
- User Profile (avatar, name, stats)
- Navbar + static pages: Home, Features, About, Community
- Mock Notifications / Requests
- HackMap / Hacker Hub (static map and member listings)

---

## ⚡ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React.js, Tailwind CSS, React Router |
| State Management | React Context API |
| AI Simulation | Mocked Gemini AI Responses (frontend) |
| Voice | Browser TTS / ElevenLabs integration optional |
| Storage | LocalStorage (frontend) |
| Future Backend | Node.js + Express + MongoDB |
| Auth | Auth0 (planned) |

---

## 💻 Getting Started

### Prerequisites

* Node.js 18+ installed
* npm or yarn package manager

### Install Dependencies

```bash
npm install
# or
yarn install
```

### Run Development Server

```bash
npm run dev
# or
yarn dev
```

The app will be available at `http://localhost:5173` (Vite default).

---

## 🧩 Usage

1. Navigate to the **Workspace** from the Station page.
2. Select an idea (or create one).
3. Use the sidebar to switch between:

   * Team Module
   * Flow Engine
   * Scope Killer
   * Demo Arena
   * Progress Tracker
4. Interact with modules to simulate project workflow and track progress.

> **Note:** All AI responses and data are currently mocked for a frontend-first MVP.

---

## 🚀 Future Enhancements

* **MongoDB Integration**: persist user data, flow sessions, scope analysis, and demo attempts.
* **Auth0 Authentication**: secure API routes and associate actions with user ID.
* **Gemini AI Integration**: real AI suggestions for Flow Engine, Scope Killer, Demo Arena.
* **ElevenLabs Voice Integration**: AI Coach and Demo Judge voices.
* **HackMap with real users**: Leaflet integration with dynamic team & hacker data.

---

## 📜 License

This project is **MIT Licensed**. Feel free to fork and contribute.

---

## ✨ Author

**Khushal Sarode**

---

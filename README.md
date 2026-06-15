# DeshiLeague 🏆

DeshiLeague is a React Native based sports tournament management application designed for organizers, clubs/managers, and players. The platform simplifies tournament creation, team management, live score tracking, and player performance monitoring across multiple sports.

## 📱 Supported Sports

- Cricket
- Football

---

# 📲 Download App

Download DeshiLeague from Google Play Store:

[Google Play Store](https://play.google.com/store/apps/details?id=com.deshileague.app)

Or visit directly:

https://play.google.com/store/apps/details?id=com.deshileague.app

## 🚀 Features

### 🔐 Authentication

- Phone Number Based Login
- Role Based Access Control
- Secure User Authentication

---

# 👥 User Roles

## 1. Organizer

Organizers are responsible for creating and managing tournaments.

### Features

- Create Account
- Edit Profile
- Tournament Management
  - Create Tournament
  - Edit Tournament
  - Delete Tournament
- Support Tournament Formats:
  - Knockout Tournament
  - League Tournament
- Team Configuration
  - 4 Teams Tournament
  - 6 Teams Tournament
- Automatic Fixture/Schedule Generation
- Match Management
- Toss Management
- Live Score Management
- Scorecard Maintenance
- Tournament Monitoring

---

## 2. Club / Manager

Managers can create teams and participate in tournaments.

### Features

- Create Account
- Edit Profile
- Team Management
- Create Team
- Add Players to Team
- Remove Players from Team
- Join Tournaments
- View Team Performance
- Participate in Custom Matches

---

## 3. Player

Players can join teams and track their activities.

### Features

- Create Account
- Edit Profile
- View Team Details
- View Tournament Details
- View Match Information
- View Upcoming Matches
- View Performance History
- Participate Through Team Registration

---

# 📊 Live Score System

All user roles can access live match updates.

### Features

- Real-Time Score Updates
- Live Match Tracking
- Detailed Scorecards
- Toss Result Tracking
- Match Statistics
- Tournament Standings

---

# 🏅 Tournament Features

### Tournament Types

#### Knockout Tournament

- Single Elimination Format
- Automatic Bracket Generation

#### League Tournament

- Round Robin Matches
- Points Table Management
- Automatic Standings Calculation

---

# ⚽ Custom Match Feature

Apart from tournaments, users can create and participate in custom matches.

### Features

- Create Custom Match
- Team vs Team Matches
- Live Score Updates
- Match Statistics

---

# 📂 Project Structure

```text
app/
├── (auth)/
│
├── (tabs)/
│   ├── managers/
│   ├── organizers/
│   ├── players/
│   ├── _layout.tsx
│   └── index.tsx
│
├── _layout.tsx
└── +not-found.tsx

assets/
components/
constants/
hooks/
scripts/
```

### Folder Description

| Folder | Description |
|----------|-------------|
| app/(auth) | Authentication screens and flows |
| app/(tabs) | Main application navigation |
| organizers | Organizer related screens |
| managers | Club/Manager related screens |
| players | Player related screens |
| components | Reusable UI components |
| constants | Application constants |
| hooks | Custom React hooks |
| assets | Images, icons, and static files |
| scripts | Utility scripts |

---

# 🛠️ Tech Stack

- React Native
- Expo Router
- TypeScript
- PNPM
- REST API Integration

---

# 🎯 Core Workflow

### Organizer

Create Tournament → Configure Teams → Auto Fixture Generation → Toss → Live Score Management → Tournament Completion

### Club/Manager

Create Team → Add Players → Join Tournament → Play Matches

### Player

Join Team → Participate in Matches → Track Performance → View Upcoming Matches

---

# 📈 Future Enhancements

- Tournament Analytics
- Team Ranking System
- Player Ranking System
- Push Notifications
- Match Highlights
- Referee Panel
- Tournament Sponsorship Management

---

## 📄 License

This project is developed and maintained by the DeshiLeague Team.

---

### DeshiLeague

**Play. Compete. Manage.**
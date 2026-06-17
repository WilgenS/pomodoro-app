# Pomodoro Mobile Application

A premium React Native (Expo + TypeScript) mobile application developed as part of the Pomodoro productivity stack.

## Tech Stack
* **Framework**: React Native with Expo
* **Language**: TypeScript
* **Navigation**: React Navigation (Stack + Bottom Tab Navigator)
* **Data Fetching**: React Query (TanStack Query) & Axios
* **Forms & Validation**: React Hook Form & Zod
* **State Management**: Zustand (with AsyncStorage persistence)
* **Styling**: Styled Components (`styled-components/native`)
* **Local Notifications**: `expo-notifications`
* **Unit Testing**: Vitest

---

## Features
1. **JWT Authentication**: Passwordless registration and login using email/name with AsyncStorage token persistence and Axios interceptors for automatic Bearer token injection and refresh cycles.
2. **Dashboard**: Summarizes deep work hours, completed sessions, and tasks. Includes custom native charts and an achievements list.
3. **Pomodoro Timer**:
   - Time formatted in MM:SS with work, short break, and long break states.
   - Start, Pause, Resume, Reset, and Quick Complete controls.
   - Beautiful SVG circular progress ring.
   - Local OS notifications scheduled to trigger when the timer completes.
   - Background tracking synchronization: compares target expiration timestamp to current system time to update the countdown even if the app goes to the background.
4. **Task Management (CRUD)**:
   - Full CRUD (Create, Read, Update, Delete) for focus targets.
   - Complete status checkbox and estimation progress tracking.
   - Tab filtering (All / Todo / Completed).
5. **Theme Customization**: Responsive dark and light mode toggle via the profile view, fully styled with consistent color schemes.

---

## Getting Started

### 1. Prerequisites
Ensure you have the following installed on your system:
* Node.js (v18+)
* pnpm (`npm install -g pnpm`)
* Expo Go app installed on your physical iOS/Android device (to test wirelessly) OR an Android Emulator / iOS Simulator.

### 2. Install Dependencies
Run from the root of the monorepo to resolve all packages:
```bash
pnpm install
```

### 3. Start the Backend
Navigate to the backend directory, ensure your PostgreSQL database is running, apply migrations/seed, and start the development server:
```bash
# In apps/backend/
npx prisma migrate dev
pnpm run start:dev
```
*The backend will boot on `http://localhost:3000` exposing credentials endpoints and updated Bearer Token JWT strategies.*

### 4. Run the Mobile App
Navigate to the mobile directory and start the Expo dev server:
```bash
# In apps/mobile/
pnpm run start
```
* **To run on Android Emulator**: Press `a` in the terminal.
* **To run on iOS Simulator**: Press `i` in the terminal.
* **To run on a physical device**: Scan the QR code displayed in the terminal using the Expo Go app on your phone (ensure your computer and phone are connected to the same Wi-Fi network).

---

## Running Unit Tests
To run the Vitest suite for the mobile store and helper states:
```bash
# From root
pnpm --filter mobile run test

# Or from apps/mobile
pnpm run test
```

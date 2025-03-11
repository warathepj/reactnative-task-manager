# เลี้ยงกาแฟผู้พัฒนา

!["Alt text"](https://warathepj.github.io/js-ai-gallery/public/image/promptpay-20.png)

# Task Manager App

A modern, cross-platform task management application built with React Native and Expo. Features a clean, intuitive interface and persistent storage.

## Features

- ✅ Create and manage tasks
- 🔄 Mark tasks as complete/incomplete
- 💾 Persistent storage
- 📱 Cross-platform (iOS, Android, Web)
- 🎨 Modern UI with smooth animations

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- For iOS development: macOS with Xcode
- For Android development: Android Studio with SDK

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/warathepj/reactnative-task-manager.git
   cd reactnative-task-manager
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the App

Start the development server:

```bash
npx expo start
```

This will open the Expo Developer Tools in your browser. From there, you can:

- Press `a` to open on Android emulator
- Press `i` to open on iOS simulator
- Press `w` to open in web browser
- Scan the QR code with Expo Go app on your mobile device

## Project Structure

```
my-task-manager/
├── app/                   # Main application code
│   ├── (tabs)/           # Tab-based navigation
│   │   ├── index.tsx     # Main tasks screen
│   │   └── explore.tsx   # Explore screen
│   └── _layout.tsx       # Root layout configuration
├── components/           # Reusable components
├── constants/           # App constants and theme
├── database/           # Database configuration
├── hooks/              # Custom React hooks
└── assets/            # Images, fonts, and other static files
```

## Technology Stack

- [Expo](https://expo.dev/) - Development platform
- [React Native](https://reactnative.dev/) - Core framework
- [Expo Router](https://docs.expo.dev/router/introduction/) - File-based routing
- [SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite/) - Local database
- [React Navigation](https://reactnavigation.org/) - Navigation library

## Development

### Custom Components

The app uses several custom themed components:

- `ThemedText` - Text component with theme support
- `ThemedView` - View component with theme support
- `ThemedButton` - Button component with theme support

### Database Operations

Task data is stored using SQLite (native) or WebStorage (web), providing:

- Task creation
- Task completion toggling
- Persistent storage across app restarts

### Styling

The app uses a combination of:

- StyleSheet for static styles
- Dynamic theming for dark/light mode
- Custom colors defined in `constants/Colors.ts`

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- Icons provided by [Expo Symbols](https://github.com/expo/expo/tree/main/packages/expo-symbols)


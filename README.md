# TaskHub

TaskHub is a web-based task management tool built with TypeScript, React.js, Tailwind CSS, Vite, and Firebase. It helps teams organize and track their projects, tasks, and deadlines efficiently.

## Features

- **Project Management**: Create and manage projects to keep tasks organized and focused.
- **Task Tracking**: Track tasks with details such as name, description, due date, priority, and assigned team members.
- **Calendar Integration**: View tasks and project deadlines on a calendar for better planning and scheduling.
- **Team Collaboration**: Collaborate with team members by assigning tasks, adding comments, and sharing updates.
- **Notifications**: Receive notifications for upcoming task deadlines, task assignments, and updates.
- **User Permissions**: Control access to tasks and projects with customizable user permissions.
- **Firebase Integration**: Store and sync data in real-time using Firebase Firestore for seamless collaboration across teams.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your local machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/taskhub.git
   ```

2. Navigate to the project directory:

   ```bash
   cd taskhub
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up Firebase:

   - Create a new project on the [Firebase Console](https://console.firebase.google.com/).
   - Set up Firebase Authentication and Firestore for your project.
   - Copy your Firebase project configuration.
   - Create a `.env` file in the project root and add your Firebase configuration:

     ```plaintext
     VITE_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
     VITE_FIREBASE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN
     VITE_FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
     VITE_FIREBASE_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET
     VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER_ID
     VITE_FIREBASE_APP_ID=YOUR_FIREBASE_APP_ID
     ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open your web browser and navigate to `http://localhost:3000` to access TaskHub.

### Usage

- Sign up for an account or log in if you already have one.
- Create projects and tasks, assign them to team members, and track their progress.
- View tasks and project deadlines on the calendar for better planning and scheduling.
- Collaborate with team members by adding comments, sharing updates, and receiving notifications.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- Built with [TypeScript](https://www.typescriptlang.org/), [React.js](https://reactjs.org/), [Tailwind CSS](https://tailwindcss.com/), [Vite](https://vitejs.dev/), and [Firebase](https://firebase.google.com/).
- Calendar component powered by [FullCalendar](https://fullcalendar.io/).

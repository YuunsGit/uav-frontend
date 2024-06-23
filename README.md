![uav](https://github.com/YuunsGit/uav-frontend/assets/42357900/57d23715-600d-4b03-9b68-c9499a5ae998)

# UAV Monitoring App - [uav.yunusemre.dev](https://uav.yunusemre.dev/)
The UAV Monitoring App is a user-friendly web application designed for managing drones, their assigned tasks, and the images they capture. It interfaces with the [UAV API](https://github.com/YuunsGit/uav-backend/), ensuring a streamlined and maintainable workflow. This document provides detailed instructions on installation, configuration, and usage of the UAV Monitoring App.

Live preview of the application: [uav.yunusemre.dev](https://uav.yunusemre.dev/)

## Prerequisites
Before installing the UAV Monitoring App, ensure that you have the following prerequisites installed on your system:

- Node.js (v14.x or higher)
- pnpm (v6.x or higher)

> You need to have the [UAV API](https://github.com/YuunsGit/uav-backend/) installed and running.

## Installation

1. Clone the repository
   
   ```sh
   git clone https://github.com/YuunsGit/uav-frontend.git
   ```

2. Navigate to the project directory and install the necessary dependencies using `pnpm`
   
   ```sh
   cd uav-frontend
   pnpm install
   ```

3. Create a `.env` or `.env.local` file in the root directory of the project and specify the `VITE_API_URL` to point to your UAV API endpoint
   
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

## Tech Stack:
- **<ins>Vue</ins>** as frontend framework
- **<ins>TypeScript</ins>** for typesafe development
- **<ins>Tailwind CSS</ins>** for utility CSS
- **<ins>shadcn/ui</ins>** for reusable components
- **<ins>Vue Router</ins>** for router
- **<ins>VeeValidate</ins>** for form library
- **<ins>Zod</ins>** for input validation
- **<ins>TanStack Table</ins>** for managing tables
- **<ins>Vercel</ins>** for app deployment

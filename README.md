
# Kerala Migrant Health  (Frontend)

the frontend for a digital platform designed to manage health records for migrant workers in Kerala. It aims to bridge the gap in healthcare access, improve public health surveillance, and ensure equitable medical services for all.

-----

## Core Features

This application features three distinct portals tailored to the specific needs of each user group:

  * Government Portal: An administrative dashboard for officials to manage health centers, broadcast alerts, generate reports, and view analytics.
  * Hospital Portal: A comprehensive interface for hospital staff to register new workers, manage patient records (CRUD), view alerts, and print health IDs.
  * Worker Portal: A personal and secure dashboard for migrant workers to view their digital health ID card, check medical history, and find nearby health centers.

-----

## Tech Stack & Libraries

This project is a modern, responsive web application built with the following technologies:

  * **Framework**: Next.js (with App Router)
  * **Language**: TypeScript
  * **Styling**: Tailwind CSS

### Key Libraries Installed

  * **`lucide-react`**: A comprehensive and lightweight icon library.
  * **`recharts`**: A composable charting library for creating data visualizations.
  * **`react-hot-toast`**: Provides simple and elegant pop-up notifications for user feedback.
  * **`html-to-image`**: A utility to convert DOM nodes into downloadable images (used for the Health ID card).

-----

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

You need to have **Node.js** (version 18.x or higher) and **npm** installed on your computer.

### Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone <your-repository-url>
    ```

2.  **Navigate to the project directory:**

    ```bash
    cd frontend
    ```

3.  **Install all dependencies:**
    This single command will install Next.js, React, Tailwind CSS, and all the libraries listed above.

    ```bash
    npm install lucide-react recharts react-hot-toast html-to-image
    ```

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

5.  **Open the application:**
    Open your browser and navigate to **[http://localhost:3000](https://www.google.com/search?q=http://localhost:3000)**.

-----

## Next Steps & Future Development

While the frontend prototype is comprehensive, the following steps are required to make it a production-ready application:

  * **Backend Integration**: Connect the frontend to a secure backend API and database.
  * **Authentication**: Implement a robust authentication system with JWT and protected routes.
  * **Global State Management**: Use a tool like React Context or Zustand to manage the logged-in user's state.
  * **API Data Fetching**: Replace all mock data with real API calls using a library like TanStack Query.

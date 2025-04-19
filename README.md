# :zap: Large-scale CRUD Table with Advanced Filtering and Sorting

<br>

## :hammer_and_wrench: Requirements for Running the Project

You can run the project in two ways:

### Without Docker

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- A package manager such as **npm** or **yarn**

### With Docker

You only need:

- A **command-line environment**
- [Docker](https://www.docker.com/) installed

> No need to install Node.js or any package manager locally.

<br>

## :running: Run the project

### :whale: Running the Project with Docker

If you want to run the project using Docker, all you need is Docker installed. Follow the steps below:

#### Steps to Run the Project with Docker:

1. **Pull the Image from Docker Hub:**
   First, pull the project's image from Docker Hub:

```bash
 docker pull hnigh/large-scale-crud-table:initial
```

2. **Run the Project with Docker:**

```bash
 After pulling the image, you can run the project inside a container:
```

This command will create a container named my-crud-app and map port 5173 on your system to port 5173 inside the container.

2. **Access the Project:**
   Now, you can access the project by navigating to http://localhost:5173 in your browser.

## :computer: Running the Project Locally (Without Docker)

If you prefer to run the project locally, follow these steps:

### Steps to Run the Project Locally:

1. **Clone the Repository:**
   First, clone the repository from GitHub:

   ```bash
   git clone https://github.com/HaniehGhassemi/large-scale-crud-table.git
   ```

2. **Navigate to the Project Directory:**
   open the project with any editor

3. **Install Dependencies:**
   Use your package manager (npm or yarn) to install the dependencies:

For npm:

```bash
npm install
```

Or for yarn:

```bash
yarn
```

4. **Run the Project:**
   Now, you can start the development server:

For npm:

```bash
npm run dev
```

Or for yarn:

```bash
yarn dev
```

5. **Access the Project:**
   Once the server is running, you can access the project by navigating to http://localhost:5173 in your browser.

<br>

## :test_tube: Running the Tests

To run the test files for the project, follow these steps:

### With UI:

To run the tests with the UI:

```bash
yarn test:ui
```

### Without UI:

To run the tests without the UI:

```bash
yarn test
```

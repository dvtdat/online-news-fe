<div align="center">

<h3 align="center">Online News Platform</h3>

<p align="center">
A convenient printing service application for university students.
<br />
</p>
</div>
ing services for university students.

### Built With

<a id="built-with"></a>

- [React](https://react.dev/)
- [TanStack Router](https://tanstack.com/router/latest)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://zustand.surge.sh/)

<a id="getting-started"></a>

## Getting Started

<a id="prerequisites"></a>

### Prerequisites

Before using the application, ensure you have [Node.js](https://nodejs.org/en) installed (LTS version recommended).

<a id="installation"></a>

### Installation

Since the application has not been deployed to a domain yet, you can run it locally by following these steps:

1. **Download Source Code**  
   Clone or download the source code from the repository and extract it to a directory of your choice.

2. **Open a Terminal**  
   Launch a terminal or shell (Command Prompt, PowerShell, Bash, etc.).

3. **Navigate to the Project Directory**  
   Change the directory to the root folder of the project by running:

```bash
cd <path_to_project_folder>
```

4. **Install Dependencies**  
   Install the required dependencies by running:

```bash
yarn
```

5. **Start the Application**  
   Run the following command to start the client-side application:

```bash
yarn dev
```

The application should now be running on `http://localhost:3000`.

## Convention

The entire project is configurated with ESLint and Prettier to ensure code consistency and quality. Read more about the rules in the `eslint.config.js` and `.prettierrc` files.

## Git & Commit Convention

To maintain a clean and organized version history, we follow specific conventions for using Git:

1. **Every feature must be coded on a separate branch**:

Before starting work on a new feature, create a new branch using the following command:

```
git checkout -b feature-branch-name main
```

Replace `feature-branch-name` with a descriptive name for your feature. The `main` branch is the branch you're branching from. Branch names should start with `feat/`, `fix/`, or `chore/` followed by a descriptive name. Example: `feat/scheduler`.

2. **Commit Message Conventions**:

- **feat**: for new features
- **fix**: for bug fixes
- **chore**: for maintenance tasks, such as updating dependencies or refactoring code
- **docs**: for documentation changes
- **style**: for code style changes (such as formatting)
- **refactor**: for code refactoring

Commit messages should be concise and descriptive, summarizing the changes made.

3. **Opening Pull Requests**:

- Once you've completed your work on a feature branch, open a pull request (PR) on GitHub.
- Provide a clear title and description for your PR, detailing the changes made.
- Assign relevant reviewers and labels to your PR.

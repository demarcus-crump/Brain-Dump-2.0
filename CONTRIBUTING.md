# Contributing to Brain Dump 2.0

Thank you for your interest in contributing to Brain Dump 2.0! We appreciate your help in making this project better.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Submitting Changes](#submitting-changes)
- [Style Guidelines](#style-guidelines)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## 🤝 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

**Bug Report Template:**

```markdown
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected behavior**
A clear description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
 - OS: [e.g. macOS, Windows, Linux]
 - Browser: [e.g. Chrome 120, Safari 17]
 - Node Version: [e.g. 18.0.0]
 - Project Version: [e.g. 1.0.0]

**Additional context**
Add any other context about the problem here.
```

### Suggesting Features

Feature suggestions are welcome! Before creating a feature request, please check if it has already been suggested. When suggesting a feature:

**Feature Request Template:**

```markdown
**Is your feature request related to a problem?**
A clear description of what the problem is.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
Any alternative solutions or features you've considered.

**Additional context**
Add any other context, mockups, or screenshots about the feature request.
```

### Pull Requests

We actively welcome your pull requests! Here's how to contribute:

1. **Fork the repository** and create your branch from `main`
2. **Make your changes** following our style guidelines
3. **Test your changes** thoroughly
4. **Update documentation** if needed
5. **Ensure the code builds** without errors
6. **Submit a pull request** with a clear description

## 🛠️ Development Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Google Gemini API key

### Setup Steps

1. **Fork and clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Brain-Dump-2.0.git
   cd Brain-Dump-2.0
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   Add your Gemini API key to `.env.local`:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open the app:**
   Navigate to `http://localhost:5173`

### Project Structure

Familiarize yourself with the project structure:

```
Brain-Dump-2.0/
├── components/         # React components
├── services/          # API services (Gemini integration)
├── docs/              # Documentation
├── App.tsx            # Main app component
├── constants.ts       # App constants and agent configs
├── types.ts           # TypeScript types
└── index.tsx          # Entry point
```

## 📝 Submitting Changes

### Pull Request Process

1. **Update the README.md** if your changes affect user-facing features or setup
2. **Update documentation** in the `docs/` folder if you're changing architecture
3. **Follow the coding style** described below
4. **Write clear commit messages** using the format:
   ```
   type(scope): description
   
   Examples:
   feat(agents): add new processing step to Sparky
   fix(ui): correct cursor position on mobile
   docs(readme): update installation instructions
   style(components): format code according to prettier
   ```

5. **Ensure your PR description** clearly describes the problem and solution:
   ```markdown
   ## Description
   Brief description of what this PR does
   
   ## Motivation and Context
   Why is this change needed? What problem does it solve?
   
   ## How Has This Been Tested?
   Describe how you tested your changes
   
   ## Screenshots (if applicable)
   Add screenshots for UI changes
   
   ## Types of changes
   - [ ] Bug fix (non-breaking change which fixes an issue)
   - [ ] New feature (non-breaking change which adds functionality)
   - [ ] Breaking change (fix or feature that would cause existing functionality to change)
   - [ ] Documentation update
   ```

### Review Process

- Maintainers will review your PR within a few days
- We may suggest changes, improvements, or alternatives
- Once approved, a maintainer will merge your PR

## 🎨 Style Guidelines

### TypeScript/JavaScript

- Use **TypeScript** for all new files
- Follow the existing code style (we use standard React/TypeScript conventions)
- Use **functional components** with hooks
- Use **meaningful variable names** (no single letters except in loops)
- **Comment complex logic** but avoid obvious comments
- Keep functions **small and focused** (single responsibility)

### React Components

```typescript
// Good component structure
import React from 'react';
import { ComponentProps } from './types';

interface Props {
  title: string;
  onAction: () => void;
}

const MyComponent: React.FC<Props> = ({ title, onAction }) => {
  // Component logic here
  
  return (
    <div>
      {/* JSX here */}
    </div>
  );
};

export default MyComponent;
```

### Naming Conventions

- **Components:** PascalCase (e.g., `AgentDisplay.tsx`)
- **Files:** PascalCase for components, camelCase for utilities
- **Functions:** camelCase (e.g., `runListieAgent`)
- **Constants:** UPPER_SNAKE_CASE (e.g., `AGENT_ORDER`)
- **Types/Interfaces:** PascalCase (e.g., `AgentConfig`)

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests after the first line

### CSS/Styling

- Use **Tailwind utility classes** where possible
- Keep inline styles minimal and organized
- Use the design tokens defined in `docs/DESIGN_SYSTEM.md`
- Follow the color palette for agent colors

### Testing

While this project doesn't currently have automated tests, please:

- **Manually test** all changes thoroughly
- Test in **multiple browsers** (Chrome, Firefox, Safari)
- Test **responsive behavior** on different screen sizes
- Verify that **existing functionality** still works

## 🐛 Reporting Bugs

Bugs are tracked as GitHub issues. Create an issue and include:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** to demonstrate the steps
- **Describe the behavior you observed** and why it's a problem
- **Explain the behavior you expected** instead
- **Include screenshots or GIFs** if applicable
- **Include your environment details** (OS, browser, Node version)

## 💡 Suggesting Features

Feature requests are also tracked as GitHub issues. When suggesting a feature:

- **Use a clear and descriptive title**
- **Provide a detailed description** of the suggested feature
- **Explain why this feature would be useful** to most users
- **List any alternatives** you've considered
- **Include mockups or examples** if you have them

## 🎯 Good First Issues

Look for issues labeled `good first issue` if you're new to the project. These are typically:

- Bug fixes with clear reproduction steps
- Documentation improvements
- Small UI enhancements
- Adding tests (if we add testing infrastructure)

## 💬 Questions?

- Check the [documentation](./docs/) first
- Search existing issues to see if your question has been answered
- Open a new issue with the `question` label
- Reach out to the maintainers

## 🙏 Thank You!

Your contributions make this project better for everyone. We appreciate your time and effort!

---

**Remember:** You spill it. We distill it. 🧠✨

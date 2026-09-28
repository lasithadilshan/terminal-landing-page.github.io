# Contributing to Terminal Landing Page

First off, thank you for considering contributing to the **Terminal Landing Page**! 🎉 Contributions from the community help make this project better for everyone.

Please take a moment to review this document before submitting your contribution.

---

## 📜 Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please ensure you treat everyone in the community with respect and empathy.

---

## 💡 How Can I Contribute?

### 1. Reporting Bugs

If you encounter an issue or unexpected behavior:
1. Check the [existing Issues](https://github.com/lasithadilshan/terminal-landing-page.github.io/issues) to ensure it hasn't already been reported.
2. Open a new issue using a descriptive title.
3. Include:
   - A clear description of the bug.
   - Steps to reproduce the issue.
   - Expected vs. actual behavior.
   - Your device, browser, and OS version.
   - Screenshots or console error logs if applicable.

### 2. Suggesting Enhancements

Have an idea for a cool terminal feature, new command, or theme?
1. Open an issue with the label `enhancement`.
2. Explain what the enhancement is, why it would be beneficial, and any potential implementation details or mockups.

### 3. Submitting Pull Requests (PRs)

We welcome pull requests for bug fixes, performance improvements, new themes, and terminal features!

---

## 🛠️ Development Workflow

This project is intentionally designed with **zero build steps** and **no complex toolchains**—pure HTML5, CSS3, and Vanilla JavaScript.

### Step 1: Fork and Clone
1. Fork the repository on GitHub.
2. Clone your fork locally:
   ```bash
   git clone https://github.com/<your-username>/terminal-landing-page.github.io.git
   cd terminal-landing-page.github.io
   ```

### Step 2: Create a Feature Branch
Create a branch with a descriptive name:
```bash
git checkout -b feature/new-theme
# or
git checkout -b fix/mobile-modal-overflow
```

### Step 3: Run and Test Locally
Serve the directory locally using any lightweight HTTP server:
```bash
# Using Python 3
python3 -m http.server 8000

# Or using Node.js
npx serve .
```
Open [http://localhost:8000](http://localhost:8000) in your browser.

### Step 4: Make Your Changes
Please adhere to the [Coding Guidelines](#-coding-guidelines) below.

### Step 5: Test Across Devices
Before submitting, verify that:
- The page renders properly in multiple screen sizes (Desktop, Tablet, Mobile).
- Modals scale responsively and remain within viewport bounds.
- No console errors or warnings appear in Developer Tools.
- Color themes switch cleanly and text maintains strong contrast (WCAG standards).

### Step 6: Commit Your Changes
We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` A new feature or theme
- `fix:` A bug fix
- `docs:` Documentation changes
- `style:` Formatting or CSS tweaks with no logic change
- `refactor:` Code refactoring without behavioral changes
- `perf:` Performance optimizations

Example:
```bash
git commit -m "feat: add solarized dark theme option"
```

### Step 7: Push and Open a Pull Request
1. Push your changes to your fork:
   ```bash
   git push origin feature/new-theme
   ```
2. Open a Pull Request against the `main` branch of `lasithadilshan/terminal-landing-page.github.io`.
3. Provide a clear summary of what your PR accomplishes and reference any related issues (e.g., `Closes #12`).

---

## 📐 Coding Guidelines

- **HTML**:
  - Keep markup semantic (`<nav>`, `<main>`, `<header>`, `<footer>`, `<button>`).
  - Maintain accessibility attributes (`aria-label`, `aria-controls`, `role`).
  - Ensure all external links include `target="_blank" rel="noopener noreferrer"`.
- **CSS**:
  - Use the established CSS Custom Properties (`--primary`, `--bg-surface`, etc.) to support theme switching.
  - Avoid adding unnecessary large CSS libraries; prioritize Vanilla CSS.
  - Keep responsive media queries clean and tested down to 320px screen widths.
- **JavaScript**:
  - Use modern, clean ES6+ (arrow functions, template literals, `const`/`let`).
  - Keep logic modular and avoid pollutive global variables.
  - Preserve the singleton window handling in `js/main.js` to prevent DOM duplication.

---

## 💬 Questions?

If you have any questions or need guidance on contributing, feel free to open an issue or reach out via [email](mailto:dilshantilakaratne29@gmail.com).

Thank you for helping improve the **Terminal Landing Page**! 🚀

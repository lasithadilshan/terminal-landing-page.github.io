# 📖 Welcome to the Terminal Landing Page Wiki

Welcome to the official documentation and architecture guide for the **Terminal Landing Page & Developer Portfolio**.

This wiki provides in-depth technical documentation, architectural decisions, customization guides, and workflow details for extending the terminal interface.

🔗 **Live Deployment:** [https://lasithadilshan.github.io/terminal-landing-page.github.io/](https://lasithadilshan.github.io/terminal-landing-page.github.io/)  
📦 **Source Repository:** [lasithadilshan/terminal-landing-page.github.io](https://github.com/lasithadilshan/terminal-landing-page.github.io)

---

## 📑 Table of Contents

1. [Architecture Overview](#-architecture-overview)
2. [Core Components](#-core-components)
   - [1. Terminal Window & Shell](#1-terminal-window--shell)
   - [2. Command Line Interface (CLI)](#2-command-line-interface-cli)
   - [3. WinBox Modal Engine](#3-winbox-modal-engine)
   - [4. Multi-Theme Engine](#4-multi-theme-engine)
   - [5. CRT Retro Phosphor Overlay](#5-crt-retro-phosphor-overlay)
3. [Developer Guides](#-developer-guides)
   - [How to Add a New CLI Command](#how-to-add-a-new-cli-command)
   - [How to Add a New Theme](#how-to-add-a-new-theme)
   - [How to Update Modal Content](#how-to-update-modal-content)
4. [Deployment & Cache Invalidation](#-deployment--cache-invalidation)

---

## 🏗️ Architecture Overview

The project is intentionally built with **zero external build pipelines** and **no heavy JavaScript frameworks**. It leverages native web primitives for maximum performance, instantaneous load times, and longevity:

```
┌─────────────────────────────────────────────────────────────┐
│                       Browser Viewport                      │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │               CRT Scanline Overlay                  │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │             Terminal Window Container               │   │
│   │  ┌───────────────────────────────────────────────┐  │   │
│   │  │ Titlebar Controls (close, minimize, theme)    │  │   │
│   │  ├───────────────────────────────────────────────┤  │   │
│   │  │ Direct Modules Navigation (./about, ./contact)│  │   │
│   │  ├───────────────────────────────────────────────┤  │   │
│   │  │ Terminal Body: Prompt, Social Cards, CLI Row  │  │   │
│   │  ├───────────────────────────────────────────────┤  │   │
│   │  │ Statusbar (Mode, Encoding, Live Clock, Specs) │  │   │
│   │  └───────────────────────────────────────────────┘  │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
│   ┌───────────────────────┐     ┌───────────────────────┐   │
│   │  WinBox Modal: About  │     │ WinBox Modal: Contact │   │
│   └───────────────────────┘     └───────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

- **Runtime Footprint**: Less than 35 KB total uncompressed assets.
- **Rendering**: Instant Critical Rendering Path (CRP) without blocking CSS `@import` or render-blocking scripts.
- **Accessibility**: Full WCAG AAA color contrast, semantic HTML5, and skip-link keyboard navigation.

---

## 🧩 Core Components

### 1. Terminal Window & Shell
* Located in `index.html` (`.terminal-window`).
* Emulates macOS/Unix terminal conventions:
  - Red, yellow, and green traffic lights with interactive hover feedback.
  - Title displaying session user (`guest@lasitha-terminal:~ (zsh)`).
  - Statusbar displaying current mode (`NORMAL`), charset (`UTF-8`), and real-time clock updating every 1000ms.

### 2. Command Line Interface (CLI)
* Handled in `js/main.js` via `executeCommand(rawInput)`.
* **Command History**: Stores executed commands in `commandHistory` array, navigable with <kbd>↑</kbd> and <kbd>↓</kbd> arrow keys.
* **Tab Completion**: Matches input prefix against `validCommands` on <kbd>Tab</kbd> keydown.
* **Command Chips**: Clicking any `.cli-tag` chip populates and triggers the command automatically.

### 3. WinBox Modal Engine
* Wrapped around [WinBox.js](https://github.com/nextapps-de/winbox).
* **Singleton Lifecycle**: Prevents duplicate modals or broken DOM detachment. Clicking `./about` while the window is already open unminimizes and focuses it with a toast message.
* **Responsive Coordinate Bounds**: Dynamically recalculates modal bounds (`width`, `height`, `left`, `top`) based on `window.innerWidth` and `window.innerHeight`.
* **Node Preservation**: Clones the hidden modal template (`.cloneNode(true)`) so content remains intact when windows are closed and reopened.
* **Keyboard Escape**: Global listener dismisses the topmost active modal on <kbd>Esc</kbd>.

### 4. Multi-Theme Engine
* Configured using CSS Custom Properties in `css/style.css`.
* Supported themes:
  - `matrix`: Classic Matrix Neon Green (`#00ff66`) on Obsidian Black.
  - `cyberpunk`: Cyber Neon Cyan (`#00f0ff`) on Deep Navy.
  - `amber`: Amber Phosphor (`#ffb000`) on Warm Charcoal.
  - `dracula`: Dracula Purple (`#bd93f9`) on Midnight Violet.
* Selected theme is persisted in `localStorage` under `terminal_theme` and synchronized in real time with active WinBox headers.

### 5. CRT Retro Phosphor Overlay
* Toggleable via the `CRT` badge button or typing `crt` in the CLI.
* Uses repeating linear gradients to simulate vintage cathode-ray tube scanlines and chromatic aberration.
* Preference saved in `localStorage` under `terminal_crt`.

---

## 🛠️ Developer Guides

### How to Add a New CLI Command

1. Open `js/main.js`.
2. Add the command name to `validCommands`:
   ```javascript
   const validCommands = ['about', 'contact', 'socials', 'skills', 'projects', 'theme', 'crt', 'clear', 'help']
   ```
3. Add a `case` in `executeCommand(rawInput)`:
   ```javascript
   case 'projects':
     showToast('Opening projects showcase...')
     window.open('https://github.com/lasithadilshan?tab=repositories', '_blank', 'noopener,noreferrer')
     break
   ```

### How to Add a New Theme

1. Open `css/style.css`.
2. Define the new attribute selector with color tokens:
   ```css
   [data-theme="solarized"] {
     --bg-base: #002b36;
     --bg-surface: rgba(7, 54, 66, 0.92);
     --primary: #268bd2;
     --primary-glow: rgba(38, 139, 210, 0.25);
     --border-color: rgba(38, 139, 210, 0.25);
     --shadow-terminal: 0 25px 60px -15px rgba(0, 0, 0, 0.75), 0 0 35px var(--primary-glow);
   }
   ```
3. Open `js/main.js` and register the theme in the `themes` dictionary:
   ```javascript
   solarized: { primary: '#268bd2', name: 'Solarized Blue' }
   ```
4. Add an `<option>` to the `#theme-select` dropdown in `index.html`:
   ```html
   <option value="solarized">Solarized Blue</option>
   ```

---

## 🚀 Deployment & Cache Invalidation

The site is served statically via **GitHub Pages**.

### Cache-Busting Rule
When updating stylesheets or scripts, always update the cache-busting query parameter in `index.html`:
```html
<link rel="stylesheet" href="css/style.css?v=2.1" />
<script defer src="js/main.js?v=2.1"></script>
```
This forces intermediate CDN edge caches and visitor browsers to bypass cached assets and immediately download updated files.

---

*Authored by Lasitha Dilshan Thilakarathna &bull; 2026*

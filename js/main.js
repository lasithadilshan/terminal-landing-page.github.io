/**
 * Terminal Landing Page - Interactive Logic & Window Management
 * Lasitha Dilshan
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // State & Window Instances
  // --------------------------------------------------------------------------
  let aboutBox = null
  let contactBox = null
  const commandHistory = []
  let historyIndex = -1

  // DOM Elements
  const body = document.body
  const aboutBtn = document.querySelector('#about')
  const contactBtn = document.querySelector('#contact')
  const helpBtn = document.querySelector('#cmd-help')
  const clearBtn = document.querySelector('#cmd-clear')
  const themeSelect = document.querySelector('#theme-select')
  const crtToggle = document.querySelector('#crt-toggle')
  const terminalForm = document.querySelector('#terminal-form')
  const cliInput = document.querySelector('#cli-input')
  const statusClock = document.querySelector('#status-clock')
  const copyToast = document.querySelector('#copy-toast')
  const cliTags = document.querySelectorAll('.cli-tag')

  const aboutTemplate = document.querySelector('#about-content')
  const contactTemplate = document.querySelector('#contact-content')

  // Available Theme configurations
  const themes = {
    matrix: { primary: '#00ff66', name: 'Matrix Green' },
    cyberpunk: { primary: '#00f0ff', name: 'Cyber Neon' },
    amber: { primary: '#ffb000', name: 'Amber Phosphor' },
    dracula: { primary: '#bd93f9', name: 'Dracula Purple' },
  }

  // --------------------------------------------------------------------------
  // Theme Management
  // --------------------------------------------------------------------------
  function applyTheme(themeKey, save = true) {
    if (!themes[themeKey]) themeKey = 'matrix'
    body.setAttribute('data-theme', themeKey)
    if (themeSelect) themeSelect.value = themeKey

    // Update active WinBox header backgrounds if open
    const currentPrimary = themes[themeKey].primary
    if (aboutBox && aboutBox.setBackground) {
      aboutBox.setBackground(currentPrimary)
    }
    if (contactBox && contactBox.setBackground) {
      contactBox.setBackground(currentPrimary)
    }

    if (save) {
      try {
        localStorage.setItem('terminal_theme', themeKey)
      } catch (e) {
        // LocalStorage fallback
      }
    }
  }

  // Initialize saved theme
  try {
    const savedTheme = localStorage.getItem('terminal_theme')
    if (savedTheme && themes[savedTheme]) {
      applyTheme(savedTheme, false)
    }
  } catch (e) {}

  if (themeSelect) {
    themeSelect.addEventListener('change', (e) => {
      applyTheme(e.target.value)
    })
  }

  // --------------------------------------------------------------------------
  // CRT Scanline Overlay Toggle
  // --------------------------------------------------------------------------
  function toggleCrt(forceState) {
    const isActive = forceState !== undefined 
      ? forceState 
      : !body.classList.contains('crt-active')
    
    body.classList.toggle('crt-active', isActive)
    if (crtToggle) {
      crtToggle.setAttribute('aria-pressed', isActive ? 'true' : 'false')
    }

    try {
      localStorage.setItem('terminal_crt', isActive ? '1' : '0')
    } catch (e) {}
  }

  try {
    if (localStorage.getItem('terminal_crt') === '1') {
      toggleCrt(true)
    }
  } catch (e) {}

  if (crtToggle) {
    crtToggle.addEventListener('click', () => toggleCrt())
  }

  // --------------------------------------------------------------------------
  // Live Status Bar Clock
  // --------------------------------------------------------------------------
  function updateClock() {
    if (!statusClock) return
    const now = new Date()
    const hours = String(now.getHours()).padStart(2, '0')
    const mins = String(now.getMinutes()).padStart(2, '0')
    const secs = String(now.getSeconds()).padStart(2, '0')
    statusClock.textContent = `${hours}:${mins}:${secs} LOCAL`
  }
  updateClock()
  setInterval(updateClock, 1000)

  // --------------------------------------------------------------------------
  // Toast Notification
  // --------------------------------------------------------------------------
  let toastTimer = null
  function showToast(message) {
    if (!copyToast) return
    copyToast.textContent = message
    copyToast.classList.add('show')
    clearTimeout(toastTimer)
    toastTimer = setTimeout(() => {
      copyToast.classList.remove('show')
    }, 2400)
  }

  // --------------------------------------------------------------------------
  // Responsive WinBox Coordinates
  // --------------------------------------------------------------------------
  function getWindowBounds(offsetX = 0, offsetY = 0, isAbout = false) {
    const isMobile = window.innerWidth <= 600
    const defaultDesktopWidth = isAbout ? 550 : 500
    const defaultDesktopHeight = isAbout ? 530 : 470
    const width = isMobile ? Math.min(window.innerWidth - 20, 390) : Math.min(window.innerWidth - 40, defaultDesktopWidth)
    const height = isMobile ? Math.min(window.innerHeight - 50, 520) : Math.min(window.innerHeight - 60, defaultDesktopHeight)
    
    let left
    let top

    if (isMobile) {
      left = Math.max(10, Math.round((window.innerWidth - width) / 2))
      top = Math.max(15, Math.round((window.innerHeight - height) / 2) + offsetY)
    } else {
      left = Math.min(window.innerWidth - width - 20, Math.max(30, 60 + offsetX))
      top = Math.min(window.innerHeight - height - 30, Math.max(30, 50 + offsetY))
    }

    return { width, height, left, top }
  }

  function getThemeColor() {
    const currentTheme = body.getAttribute('data-theme') || 'matrix'
    return (themes[currentTheme] && themes[currentTheme].primary) || '#00ff66'
  }

  // --------------------------------------------------------------------------
  // WinBox Modal Management
  // --------------------------------------------------------------------------
  function openAbout() {
    if (aboutBox) {
      if (aboutBox.min) aboutBox.minimize()
      aboutBox.focus()
      showToast('About window brought to front')
      return
    }

    if (typeof WinBox === 'undefined') {
      console.error('WinBox is not loaded')
      return
    }

    const bounds = getWindowBounds(0, 0, true)
    // Clone node so reopening never runs out of content
    const content = aboutTemplate.cloneNode(true)
    content.removeAttribute('id')

    aboutBox = new WinBox({
      title: 'About Me - Lasitha Dilshan',
      width: `${bounds.width}px`,
      height: `${bounds.height}px`,
      x: bounds.left,
      y: bounds.top,
      mount: content,
      onfocus: function () {
        this.setBackground(getThemeColor())
      },
      onblur: function () {
        this.setBackground('#333333')
      },
      onclose: function () {
        aboutBox = null
      }
    })

    aboutBox.setBackground(getThemeColor())
  }

  function openContact() {
    if (contactBox) {
      if (contactBox.min) contactBox.minimize()
      contactBox.focus()
      showToast('Contact window brought to front')
      return
    }

    if (typeof WinBox === 'undefined') {
      console.error('WinBox is not loaded')
      return
    }

    const bounds = getWindowBounds(window.innerWidth <= 600 ? 0 : 70, window.innerWidth <= 600 ? 20 : 50)
    const content = contactTemplate.cloneNode(true)
    content.removeAttribute('id')

    // Attach copy button listeners to the cloned content
    const copyBtns = content.querySelectorAll('.copy-btn')
    copyBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const textToCopy = btn.getAttribute('data-copy')
        if (textToCopy && navigator.clipboard) {
          navigator.clipboard.writeText(textToCopy).then(() => {
            showToast(`Copied to clipboard: ${textToCopy}`)
          }).catch(() => {
            showToast(`Failed to copy: ${textToCopy}`)
          })
        }
      })
    })

    contactBox = new WinBox({
      title: 'Contact - Get in Touch',
      width: `${bounds.width}px`,
      height: `${bounds.height}px`,
      x: bounds.left,
      y: bounds.top,
      mount: content,
      onfocus: function () {
        this.setBackground(getThemeColor())
      },
      onblur: function () {
        this.setBackground('#333333')
      },
      onclose: function () {
        contactBox = null
      }
    })

    contactBox.setBackground(getThemeColor())
  }

  // --------------------------------------------------------------------------
  // Navigation & Button Click Listeners
  // --------------------------------------------------------------------------
  if (aboutBtn) aboutBtn.addEventListener('click', openAbout)
  if (contactBtn) contactBtn.addEventListener('click', openContact)
  
  if (helpBtn) {
    helpBtn.addEventListener('click', () => executeCommand('help'))
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => executeCommand('clear'))
  }

  // Quick CLI tags
  cliTags.forEach(tag => {
    tag.addEventListener('click', () => {
      const cmd = tag.getAttribute('data-cmd')
      if (cmd) {
        if (cliInput) cliInput.value = cmd
        executeCommand(cmd)
      }
    })
  })

  // --------------------------------------------------------------------------
  // Command Line Interpreter
  // --------------------------------------------------------------------------
  const validCommands = ['about', 'contact', 'socials', 'skills', 'theme', 'crt', 'clear', 'cls', 'help', 'whoami', 'date', 'close', 'exit']

  function executeCommand(rawInput) {
    const trimmed = rawInput.trim()
    if (!trimmed) return

    // Save to history
    commandHistory.push(trimmed)
    historyIndex = commandHistory.length

    const parts = trimmed.split(/\s+/)
    const cmd = parts[0].toLowerCase()
    const arg = parts[1] ? parts[1].toLowerCase() : ''

    switch (cmd) {
      case 'about':
      case './about':
        openAbout()
        break

      case 'contact':
      case './contact':
        openContact()
        break

      case 'socials':
      case 'links':
      case 'ls': {
        const socialsSection = document.querySelector('#socials-heading')
        if (socialsSection) {
          socialsSection.scrollIntoView({ behavior: 'smooth' })
        }
        showToast('Viewing social links')
        break
      }

      case 'skills':
        showToast('Skills: Generative AI, RAG, LangChain, Python, FastAPI, Angular, React')
        openAbout()
        break

      case 'theme':
        if (arg && themes[arg]) {
          applyTheme(arg)
          showToast(`Switched theme to ${themes[arg].name}`)
        } else {
          showToast(`Available themes: ${Object.keys(themes).join(', ')}`)
        }
        break

      case 'crt':
        toggleCrt()
        showToast(`CRT Effect ${body.classList.contains('crt-active') ? 'Enabled' : 'Disabled'}`)
        break

      case 'whoami':
        showToast('Lasitha Dilshan Thilakarathna - AI Engineer & Full-Stack Engineer (Virtusa)')
        break

      case 'date':
        showToast(new Date().toString())
        break

      case 'close':
      case 'exit':
        if (aboutBox) aboutBox.close()
        if (contactBox) contactBox.close()
        showToast('Closed active windows')
        break

      case 'clear':
      case 'cls':
        if (cliInput) cliInput.value = ''
        showToast('Terminal cleared')
        break

      case 'help':
      case '--help':
      case '-h':
      default:
        showToast(`Available: ${validCommands.join(', ')}`)
        break
    }

    if (cliInput) cliInput.value = ''
  }

  // Handle Form Submission
  if (terminalForm) {
    terminalForm.addEventListener('submit', (e) => {
      e.preventDefault()
      if (cliInput) {
        executeCommand(cliInput.value)
      }
    })
  }

  // Keyboard navigation for CLI input (History & Tab Autocomplete)
  if (cliInput) {
    cliInput.addEventListener('keydown', (e) => {
      // History UP
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        if (commandHistory.length > 0 && historyIndex > 0) {
          historyIndex--
          cliInput.value = commandHistory[historyIndex]
        }
      }
      // History DOWN
      else if (e.key === 'ArrowDown') {
        e.preventDefault()
        if (historyIndex < commandHistory.length - 1) {
          historyIndex++
          cliInput.value = commandHistory[historyIndex]
        } else {
          historyIndex = commandHistory.length
          cliInput.value = ''
        }
      }
      // Tab Autocomplete
      else if (e.key === 'Tab') {
        e.preventDefault()
        const current = cliInput.value.trim().toLowerCase()
        if (current) {
          const match = validCommands.find(c => c.startsWith(current))
          if (match) {
            cliInput.value = match
          }
        }
      }
    })
  }

  // Global Escape key listener to close active windows
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (contactBox) {
        contactBox.close()
      } else if (aboutBox) {
        aboutBox.close()
      }
    }
  })
})

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

document.querySelector('#year').textContent = new Date().getFullYear();


// Menu photo accordion: click a menu item to reveal its photo directly below it.
const menuButtons = document.querySelectorAll('.menu-item-button');

menuButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const panelId = button.getAttribute('aria-controls');
    const panel = document.getElementById(panelId);
    const wasOpen = button.getAttribute('aria-expanded') === 'true';

    // Keep the page tidy: only one menu photo is open at a time.
    menuButtons.forEach((otherButton) => {
      const otherPanel = document.getElementById(otherButton.getAttribute('aria-controls'));
      otherButton.setAttribute('aria-expanded', 'false');
      if (otherPanel) otherPanel.classList.remove('is-open');
    });

    if (!wasOpen && panel) {
      button.setAttribute('aria-expanded', 'true');
      panel.classList.add('is-open');
    }
  });
});

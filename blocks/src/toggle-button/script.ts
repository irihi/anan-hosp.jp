window.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector<HTMLDivElement>('.blk-Header');
  const button = document.querySelector<HTMLButtonElement>('.toggle-button__button');
  
  if (header && button) {
    button.addEventListener('click', () => {
      header.classList.toggle('is-style-open');
    });
  }
});
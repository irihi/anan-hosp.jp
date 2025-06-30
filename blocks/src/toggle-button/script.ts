window.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector<HTMLDivElement>('.blk-Header');
  
  if (header) {
    header.addEventListener('click', () => {
      header.classList.toggle('is-style-open');
    });
  }
});
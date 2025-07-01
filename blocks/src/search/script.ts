const attachEvent = (button: HTMLButtonElement, form: HTMLFormElement) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    form.classList.toggle('is-style-open');
  })
};

const init = () => {
  const searches = document.querySelectorAll<HTMLDivElement>('.blk-Search');

  searches.forEach(search => {
    const button = search.querySelector<HTMLButtonElement>('.blk-Search__button');
    const form = search.querySelector<HTMLFormElement>('.blk-Search__form');

    if (button && form) {
      attachEvent(button, form);
    }
  });
};

window.addEventListener('DOMContentLoaded', init, {});
const PagetopInit = () => {
  const buttons = document.querySelectorAll<HTMLButtonElement>('.blk-PageTop__button');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }, {});
  });
};

window.addEventListener('DOMContentLoaded', PagetopInit, {});
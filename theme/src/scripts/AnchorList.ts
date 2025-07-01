export const AnchorListInit = () => {
  const links = document.querySelectorAll<HTMLAnchorElement>('.blk-AnchorList a');
  const offset = document.querySelector('.blk-Header')?.clientHeight;

  links.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();

      const targetStr = link.getAttribute('href');

      if (targetStr && /^#/.test(targetStr)) {
        const target = document.getElementById(targetStr.replace('#', ''));

        if (target) {
          const scrollY = window.pageYOffset;
          const rect = target.getBoundingClientRect();

          console.log(scrollY);

          window.scrollTo({
            top: scrollY + rect.top - (offset ? offset * 2 : 0),
            behavior: 'smooth',
          });
        }
      }

      return false;
    }, {});
  });
};

window.addEventListener('DOMContentLoaded', AnchorListInit, {});
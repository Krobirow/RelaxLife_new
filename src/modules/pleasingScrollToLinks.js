const pleasingScrollToLinks = () => {
  const menu = document.querySelector('.popup-menu-nav');
  const menuLi = menu.querySelectorAll('.popup-menu-nav__item > a');

  const btnFooterScrollUp = document.querySelector('.button-footer');
  const footerLinkScrollUp = btnFooterScrollUp.firstElementChild;

  // Функция для скролла с учетом смещения на 40 пикселей
  const scrollToElementWithOffset = (element, offset = 40) => {
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };

  // Событие для кнопки в футере
  footerLinkScrollUp.addEventListener('click', e => {
    e.preventDefault();
    const getId = footerLinkScrollUp.getAttribute('href');
    const targetElement = document.querySelector(getId);

    if (targetElement) {
      scrollToElementWithOffset(targetElement, 40); // Скроллим с учетом смещения на 40px
    }
  });

  // Событие для всех ссылок в меню
  for (let key of menuLi) {
    key.addEventListener('click', e => {
      e.preventDefault();
      const linkId = key.getAttribute('href');
      const targetElement = document.querySelector(linkId);

      if (targetElement) {
        scrollToElementWithOffset(targetElement, 40); // Скроллим с учетом смещения на 40px
      }
    });
  }
};

export default pleasingScrollToLinks;

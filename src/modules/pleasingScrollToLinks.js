const pleasingScrollToLinks = () => {
  const btnFooterScrollUp = document.querySelector('.button-footer');
  const footerLinkScrollUp = btnFooterScrollUp.firstElementChild;

  // Scroll function with offset
  const scrollToElementWithOffset = (element, offset = 40) => {
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };

  // Handler function for both menu links and the footer button
  const handleScrollEvent = (e) => {
    let target = e.target;

    // Handling footer scroll button click
    if (target === footerLinkScrollUp) {
      e.preventDefault();
      const targetElement = document.querySelector(target.getAttribute('href'));
      if (targetElement) {
        scrollToElementWithOffset(targetElement, 40);
      }
    }

    // Handling menu links click
    if (target.closest('.popup-menu-nav__item > a')) {
      e.preventDefault();
      const link = target.closest('.popup-menu-nav__item > a');
      const targetElement = document.querySelector(link.getAttribute('href'));
      if (targetElement) {
        scrollToElementWithOffset(targetElement, 40);
      }
    }
  };

  // Adding one listener for both click and touchend events on the body
  document.body.addEventListener('click', handleScrollEvent);
  document.body.addEventListener('touchend', handleScrollEvent);
};

export default pleasingScrollToLinks;

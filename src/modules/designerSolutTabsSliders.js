const designerSolutTabsSliders = () => {
  const designsContainer = document.getElementById('designs');
  const designsBtnContainer = document.getElementById('designs-list');
  const designsBtnList = document.querySelectorAll('.designs-nav__item');

  const sliderCountTotal = document.getElementById('slideCountDesignTotal');
  const sliderCountCurrent = document.getElementById('slideCountDesignCurrent');

  const tabsArrLeft = document.getElementById('nav-arrow-designs_left');
  const tabsArrRight = document.getElementById('nav-arrow-designs_right');

  const sliders = [
    document.querySelector('.designs-slider__style1'),
    document.querySelector('.designs-slider__style2'),
    document.querySelector('.designs-slider__style3'),
    document.querySelector('.designs-slider__style4'),
    document.querySelector('.designs-slider__style5')
  ];

  const previews = document.querySelectorAll('.designePrevBlock'); // Превью блоки для каждого слайдера

  let currentSliderIndex = 0;
  let currentSlideIndex = 0;
  let count = 0;
  const stepSize = 200;
  let touchEventHandled = false;

  const getSliderBounds = () => designsBtnContainer.getBoundingClientRect();
  const getTabBounds = (index) => designsBtnList[index].getBoundingClientRect();
  const getTotalWidth = () => designsBtnContainer.scrollWidth;
  const getVisibleWidth = () => designsBtnContainer.parentElement.offsetWidth;

  const updateButtonsState = () => {
    const firstTabBounds = getTabBounds(0);
    const lastTabBounds = getTabBounds(designsBtnList.length - 1);
    const sliderBounds = getSliderBounds();

    tabsArrLeft.disabled = (firstTabBounds.left - 20) >= sliderBounds.left;
    tabsArrRight.disabled = (lastTabBounds.right + 20) <= sliderBounds.right;
  };

  const translate = (direction) => {
    const totalWidth = getTotalWidth();
    const visibleWidth = getVisibleWidth();

    const newCount = count + direction * stepSize;
    const maxScroll = totalWidth - visibleWidth;

    count = Math.max(Math.min(newCount, 0), -maxScroll);

    designsBtnContainer.style.transition = 'transform 0.3s ease-in-out';
    designsBtnContainer.style.transform = `translateX(${count}px)`;

    updateButtonsState();
  };

  const updateSlide = (direction) => {
    const currentSlider = sliders[currentSliderIndex];
    const totalSlides = currentSlider.children.length;

    currentSlideIndex += direction;

    if (currentSlideIndex < 0) {
      currentSlideIndex = totalSlides - 1;
    } else if (currentSlideIndex >= totalSlides) {
      currentSlideIndex = 0;
    }

    // Обновляем слайды
    Array.from(currentSlider.children).forEach((slide, i) => {
      slide.style.display = i === currentSlideIndex ? 'block' : 'none';
    });

    // Обновляем счетчик слайдов
    sliderCountCurrent.innerHTML = currentSlideIndex + 1;

    updateActivePreview(currentSlideIndex); // Обновляем активное превью
  };

  const updateActivePreview = (index) => {
    const activePreviewBlock = previews[currentSliderIndex]; // Превью для активного слайдера

		previews.forEach((previewBlockItem) => {
			if (previewBlockItem) {
				previewBlockItem.classList.remove('visible')
			}
		})

		activePreviewBlock.classList.add("visible");

    // Сбрасываем активные классы на всех превью
    Array.from(activePreviewBlock.children).forEach((preview) => {
      const previewInner = preview.querySelector('.preview-block__item-inner');
      if (previewInner) {
        previewInner.classList.remove('preview_active');
      }
    });

    // Добавляем активный класс к текущему превью
    const activePreviewInner = activePreviewBlock.children[index].querySelector('.preview-block__item-inner');

    if (activePreviewInner) {
      activePreviewInner.classList.add('preview_active');
    }
  };

  const handleTabSwitch = (index) => {
    currentSliderIndex = index;
    currentSlideIndex = 0;

    designsBtnList.forEach((btn, i) => {
      btn.classList.remove('active');
      sliders[i].style.display = 'none';
      previews[i].style.display = 'none'; // Скрываем все превью
    });

    designsBtnList[index].classList.add('active');
    sliders[index].style.display = 'block';
    previews[index].style.display = 'flex'; // Отображаем превью для текущего слайдера

    // Обновляем счетчики слайдов
    sliderCountTotal.innerHTML = sliders[index].children.length;
    sliderCountCurrent.innerHTML = 1;

    updateActivePreview(0); // Подсветить первый превью после переключения таба
  };

  const handleEvent = (e) => {
    const target = e.target;

    if (e.type === 'touchend') {
      touchEventHandled = true;
    } else if (e.type === 'click' && touchEventHandled) {
      touchEventHandled = false;
      return;
    }

    // Переключение вкладок
    if (target.closest('.designs-nav__item')) {
      const tabIndex = Array.from(designsBtnList).indexOf(target.closest('.designs-nav__item'));
      handleTabSwitch(tabIndex);
    }

    // Навигация по слайдерам
    if (target.closest('#design_left')) {
      updateSlide(-1);
    } else if (target.closest('#design_right')) {
      updateSlide(1);
    }

    // Прокрутка вкладок слайдера
    if (target.closest('#nav-arrow-designs_left')) {
      translate(1);
    } else if (target.closest('#nav-arrow-designs_right')) {
      translate(-1);
    }

    // Нажатие на превью-элемент
    if (target.closest('.preview-block__item')) {
      const previewItems = Array.from(previews[currentSliderIndex].children);
      const previewIndex = previewItems.indexOf(target.closest('.preview-block__item'));

      currentSlideIndex = previewIndex;
      updateSlide(0); // Обновляем слайд
    }
  };

  designsContainer.addEventListener('click', (e) => handleEvent(e));
  designsContainer.addEventListener('touchend', (e) => handleEvent(e));

  window.addEventListener('resize', () => {
    count = 0;
    designsBtnContainer.style.transform = `translateX(0px)`;
    updateButtonsState();
  });

  updateButtonsState();
  handleTabSwitch(0);
};

export default designerSolutTabsSliders;

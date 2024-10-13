const greetingsSlider = () => {
  const slides = document.querySelectorAll('.greetings-slider__slide');
  const indicatorsContainer = document.querySelector('.greetings-slider__indicators');
  const sliderWrapper = document.querySelector('.greetings-slider-wrap');
  
  let currentSlide = 0;
  let autoSlideInterval;

  // Добавляем точки (индикаторы)
  slides.forEach((_, index) => {
    const indicator = document.createElement('span');
    if (index === 0) indicator.classList.add('active');
    indicatorsContainer.appendChild(indicator);
  });
  
  const indicators = document.querySelectorAll('.greetings-slider__indicators span');

  // Функция для переключения слайдов
  const changeSlide = (index) => {
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    currentSlide = (index + slides.length) % slides.length; // Бесконечный цикл
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
  };

  // Переключение на следующий слайд
  const nextSlide = () => {
    changeSlide(currentSlide + 1);
  };

  // Переключение на предыдущий слайд
  const prevSlide = () => {
    changeSlide(currentSlide - 1);
  };

  // Автоматическое переключение каждые 4 секунды
  const startAutoSlide = () => {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, 4000);
  };

  const stopAutoSlide = () => {
    clearInterval(autoSlideInterval);
  };

  // Запуск слайдера
  startAutoSlide();

  // === Добавляем логику для свайпов и перетягивания ===
  let startX = 0;
  let endX = 0;
  let isDragging = false;

  // Обработка начала касания или клика
  const handleTouchStart = (e) => {
    startX = e.touches ? e.touches[0].clientX : e.clientX;
    isDragging = true;
    stopAutoSlide(); // Останавливаем автопереключение во время свайпа или перетаскивания
  };

  // Обработка движения
  const handleTouchMove = (e) => {
    if (!isDragging) return;
    endX = e.touches ? e.touches[0].clientX : e.clientX;
  };

  // Обработка окончания свайпа или клика
  const handleTouchEnd = () => {
    stopAutoSlide();
    if (!isDragging) return;
    const distance = endX - startX;
    
    // Если свайп вправо (перетягивание влево) — переключаем на предыдущий слайд
    if (distance > 50) {
      prevSlide();
    }
    
    // Если свайп влево (перетягивание вправо) — переключаем на следующий слайд
    if (distance < -50) {
      nextSlide();
    }

    // Сбрасываем переменные
    isDragging = false;
    startAutoSlide(); // Запускаем автопереключение после свайпа
  };

  // Обработка кликов по стрелкам и индикаторам с использованием делегирования событий
  sliderWrapper.addEventListener('click', (e) => {
    if (e.target.closest('#nav-arrow-greetings_left')) {
      // Клик по левой стрелке
      prevSlide();
    } else if (e.target.closest('#nav-arrow-greetings_right')) {
      // Клик по правой стрелке
      nextSlide();
    } else if (e.target.closest('.greetings-slider__indicators span')) {
      // Клик по точке индикатора
      const index = [...indicators].indexOf(e.target);
      changeSlide(index);
    }
  });

  // Останавливаем автопереключение при наведении на слайдер
  sliderWrapper.addEventListener('mouseenter', stopAutoSlide);
  sliderWrapper.addEventListener('mouseleave', startAutoSlide);

  // Добавляем события для касания (мобильные устройства)
  sliderWrapper.addEventListener('touchstart', handleTouchStart);
  sliderWrapper.addEventListener('touchmove', handleTouchMove);
  sliderWrapper.addEventListener('touchend', handleTouchEnd);
};

export default greetingsSlider;

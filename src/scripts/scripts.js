document.addEventListener('DOMContentLoaded', () => {
  const prevButton = document.querySelector('.carousel-button.prev');
  const nextButton = document.querySelector('.carousel-button.next');
  const carouselContainer = document.querySelector('.carousel-container');
  const slides = document.querySelectorAll('.carousel-slide');
  let currentIndex = 0;
  let autoPlayInterval;

  const updateCarousel = () => {
      const slideWidth = slides[0].clientWidth;
      carouselContainer.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  };

  const showNextSlide = () => {
      currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
      updateCarousel();
  };

  const showPrevSlide = () => {
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
      updateCarousel();
  };

  nextButton.addEventListener('click', () => {
      clearInterval(autoPlayInterval);
      showNextSlide();
      autoPlayInterval = setInterval(showNextSlide, 5000);
  });

  prevButton.addEventListener('click', () => {
      clearInterval(autoPlayInterval);
      showPrevSlide();
      autoPlayInterval = setInterval(showNextSlide, 5000);
  });

  const startAutoPlay = () => {
      autoPlayInterval = setInterval(showNextSlide, 5000);
  };

  window.addEventListener('resize', updateCarousel);
  startAutoPlay();
});

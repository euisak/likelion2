// 베스트 상품
document.addEventListener('DOMContentLoaded', function() {
    const imageSets = document.querySelectorAll('input[type="radio"][name="imageSet"]');
    const imageContainer = document.getElementById('imageContainer');

    imageSets.forEach(function(radio) {
      radio.addEventListener('change', function() {
        // 모든 이미지 세트 숨기기
        document.querySelectorAll('.image-set').forEach(function(set) {
          set.classList.remove('active');
        });

        // 선택된 이미지 세트 보여주기
        if (radio.checked) {
          let imageSet = document.getElementById(radio.value);
          if (imageSet) {
            imageSet.classList.add('active');
          }
        }
      });
    });
  });

//챌린지
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelector('.slides');
    const indicators = document.querySelectorAll('.indicator');
    const totalImages = indicators.length;
    let currentIndex = 0;

    function updateSlider() {
      slides.style.transform = `translateX(-${currentIndex * 300}px)`;
      indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
      });
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % totalImages;
      updateSlider();
    }

    updateSlider();
    setInterval(nextSlide, 4000);
  });
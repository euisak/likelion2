//이달의 소식_년,월 표기
document.addEventListener("DOMContentLoaded", function() {
  const dateElements = document.getElementsByClassName('monthly-news_day');
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더합니다.
  for (let element of dateElements) {
    element.textContent = `${year}년 ${month}월`;
  }
});


//베스트 상품
document.addEventListener('DOMContentLoaded', function() {
const imageSets = document.querySelectorAll('input[type="radio"][name="imageSet"]');

// 초기 상태 설정
function updateLabels() {
    imageSets.forEach(function(radio) {
        const label = radio.parentElement;
        if (radio.checked) {
            label.classList.add('selected');
            // 기본적으로 '전체' 버튼과 연결된 이미지 세트 표시
            let imageSet = document.getElementById(radio.value);
            if (imageSet) {
                imageSet.classList.add('active');
            }
        } else {
            label.classList.remove('selected');
        }
    });
}

// 초기화
updateLabels();

imageSets.forEach(function(radio) {
    radio.addEventListener('change', function() {
        // 모든 이미지 세트 숨기기
        document.querySelectorAll('.best-product_image-set').forEach(function(set) {
            set.classList.remove('active');
        });

        // 선택된 이미지 세트 보여주기
        if (radio.checked) {
            let imageSet = document.getElementById(radio.value);
            if (imageSet) {
                imageSet.classList.add('active');
            }
        }

        // 모든 라벨 스타일 초기화
        imageSets.forEach(function(r) {
            r.parentElement.classList.remove('selected');
        });

        // 선택된 라벨 스타일 적용
        radio.parentElement.classList.add('selected');
    });
});
});



//챌린지
document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelector('.challenge_slides');
  const indicators = document.querySelectorAll('.indicator');
  const totalImages = indicators.length;
  let currentIndex = 0;

  function updateSlider() {
    slides.style.transform = `translateX(-${currentIndex * 25}%)`;
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
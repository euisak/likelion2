function updateDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
    const day = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day} 기준`;
    // HTMLCollection에서 첫 번째 요소 선택
    const dateElement = document.getElementsByClassName('store-new-date')[0];
    if (dateElement) {
        dateElement.textContent = formattedDate;
    }
}

// DOMContentLoaded 이벤트가 발생하면 updateDate 함수를 호출
document.addEventListener('DOMContentLoaded', (event) => {
    updateDate();

    // 하루에 한 번 날짜를 갱신
    setInterval(updateDate, 24 * 60 * 60 * 1000); // 24시간 = 86400000밀리초
});

//[storeDetails.pug] 5일뒤 날짜 구하기
function formatDate(date) {
    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    const month = date.getMonth() + 1; // 0-based index
    const day = date.getDate();
    const dayOfWeek = daysOfWeek[date.getDay()];
    return `${month}월${day}일 (${dayOfWeek}) 도착 예정`;
  }

  function updateDate() {
    const today = new Date();
    const futureDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5);
    document.getElementById('date-display').textContent = formatDate(futureDate);
  }

  document.addEventListener('DOMContentLoaded', updateDate);

//[storeDetails.pug]사진에 마우스 올리면 사진 병경
document.addEventListener('DOMContentLoaded', function() {
    const thumbnails = document.querySelectorAll('.productImage');
    const bigImage = document.getElementById('productThumbnail');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('mouseover', function() {
            const newSrc = this.src; // 썸네일의 src 속성을 가져옴
            bigImage.src = newSrc; // 큰 이미지의 src를 변경
        });
    });
});

//[storeDetails.pug] +1, -1 클릭 버튼
document.addEventListener('DOMContentLoaded', () => {
    // Get references to the DOM elements
    const increaseButton = document.getElementById('increase');
    const decreaseButton = document.getElementById('decrease');
    const counterDisplay = document.getElementById('counter');

    // Function to get the current counter value as a number
    function getCounterValue() {
        return parseInt(counterDisplay.textContent, 10);
    }

    // Function to update the display with the current counter value
    function updateDisplay(value) {
        counterDisplay.textContent = value;
    }

    // Increase counter value
    increaseButton.addEventListener('click', () => {
        const currentValue = getCounterValue();
        updateDisplay(currentValue + 1);
    });

    // Decrease counter value with check to keep it non-negative
    decreaseButton.addEventListener('click', () => {
        const currentValue = getCounterValue();
        if (currentValue > 0) {
            updateDisplay(currentValue - 1);
        }
    });
});
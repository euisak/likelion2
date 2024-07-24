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

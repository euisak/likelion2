/*월요일마다 날짜 갱신*/
document.addEventListener("DOMContentLoaded", function() {
    const dateElements = document.getElementsByClassName('store-best-date');

    function getMonday(date) {
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
        return new Date(date.setDate(diff));
    }

    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const today = new Date();
    const monday = getMonday(today);
    const formattedDate = `${formatDate(monday)} 기준`;

    for (let element of dateElements) {
        element.textContent = formattedDate;
    }
});
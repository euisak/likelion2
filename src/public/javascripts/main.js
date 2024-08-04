$(document).ready(function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        displayEventTime: false, // This will hide the time label

        
        events: [
            {
                title: "아침 러닝 챌린지",
                start: "2024-08-05",
                end: "2024-08-12" // Ensure end date is properly formatted
            },
            {
                title: "like lion",
                start: "2024-07-22T10:00:00",
                end: "2024-07-27T18:00:00",
                backgroundColor: '#ff9f89', // Custom background color
                borderColor: '#ff9f89', // Custom border color
                textColor: '#ffffff' // Custom text color
            }
        ]
    });
    calendar.render();
});

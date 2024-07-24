//상단바 메뉴 방문중인 링크 글자색 다르게하는 함수
document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll('.home-header_nav-links');
    const activeLink = localStorage.getItem('activeLink');

    // 페이지가 로드될 때 활성 링크를 설정
    if (activeLink) {
        const activeElement = document.querySelector(`.home-header_nav-links[data-id="${activeLink}"]`);
        if (activeElement) {
            activeElement.classList.add('active');
        }
    }

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            // 모든 링크의 'active' 클래스 제거
            links.forEach(link => link.classList.remove('active'));

            // 현재 클릭된 링크에 'active' 클래스 추가
            event.currentTarget.classList.add('active');

            // 현재 클릭된 링크를 localStorage에 저장
            const linkId = event.currentTarget.getAttribute('data-id');
            localStorage.setItem('activeLink', linkId);
        });
    });
  });
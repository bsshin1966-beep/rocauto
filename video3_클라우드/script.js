document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('toggle-theme');
    
    // Check local storage for saved theme preference
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (themeToggleBtn) themeToggleBtn.textContent = 'Toggle Light Mode';
    }

    if (themeToggleBtn) {
        // Toggle theme on button click
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            let newTheme = 'light';
            let btnText = 'Toggle Dark Mode';
            
            if (currentTheme !== 'dark') {
                newTheme = 'dark';
                btnText = 'Toggle Light Mode';
            }

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            themeToggleBtn.textContent = btnText;
        });
    }

    // Language Toggle Logic
    // ==========================================
    // 다국어(한국어/영어) 영상 전환 로직
    // ==========================================
    const videoIframe = document.getElementById('my-video'); // 구글 드라이브 iframe 요소를 가져옵니다.
    const langToggleBtn = document.getElementById('lang-toggle-btn'); // 언어 전환 버튼 요소를 가져옵니다.
    
    // 두 요소가 모두 페이지에 존재할 때만 로직을 실행합니다.
    if (videoIframe && langToggleBtn) {
        const langText = langToggleBtn.querySelector('.lang-text'); // 버튼 내부의 텍스트(KR/EN) 요소를 가져옵니다.
        let currentLang = 'ko'; // 현재 선택된 언어 상태를 저장하는 변수 (기본값: 한국어 'ko')
        
        // Iframe의 경우 자체 컨트롤러(재생, 일시정지 등)가 내장되어 있어 자바스크립트로 상태를 감지하기 어렵습니다.
        // 따라서 언어 선택 버튼을 항상 화면에 노출시키기 위해 'show-controls' 클래스를 추가합니다.
        const wrapper = document.querySelector('.video-wrapper');
        if (wrapper) {
            wrapper.classList.add('show-controls');
        }

        // 언어 전환 버튼 클릭 시 실행되는 이벤트 리스너
        langToggleBtn.addEventListener('click', () => {
            // 현재 언어가 한국어('ko')인 경우 -> 영어로 전환
            if (currentLang === 'ko') {
                currentLang = 'en'; // 상태를 영어로 변경
                // iframe의 src 속성을 영어 영상의 구글 드라이브 미리보기 링크로 교체합니다.
                videoIframe.src = 'https://drive.google.com/file/d/1g4Yfcw3w2jC0GfyEreV8aE7VKn4B6GkD/preview';
                langText.textContent = 'EN'; // 버튼 텍스트를 'EN'으로 변경
            
            // 현재 언어가 영어('en')인 경우 -> 한국어로 전환
            } else {
                currentLang = 'ko'; // 상태를 한국어로 변경
                // iframe의 src 속성을 한국어 영상의 구글 드라이브 미리보기 링크로 교체합니다.
                videoIframe.src = 'https://drive.google.com/file/d/1XIoVlCrY8_j8_1U-IzGkUiXJI6frC216/preview';
                langText.textContent = 'KR'; // 버튼 텍스트를 'KR'으로 변경
            }
        });
    }
});

// 유튜브 관련 함수 삭제됨

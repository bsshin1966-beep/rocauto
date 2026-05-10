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
    const video = document.getElementById('my-video');
    const langToggleBtn = document.getElementById('lang-toggle-btn');
    
    if (video && langToggleBtn) {
        const langText = langToggleBtn.querySelector('.lang-text');
        let currentLang = 'ko';

        const wrapper = document.querySelector('.video-wrapper');
        let hideTimeout;
        
        function showControls() {
            if (!wrapper) return;
            wrapper.classList.add('show-controls');
            clearTimeout(hideTimeout);
            
            if (!video.paused) {
                hideTimeout = setTimeout(() => {
                    wrapper.classList.remove('show-controls');
                }, 2500);
            }
        }

        if (wrapper) {
            wrapper.classList.add('show-controls');
            wrapper.addEventListener('mousemove', showControls);
            wrapper.addEventListener('mouseenter', showControls);
            wrapper.addEventListener('mouseleave', () => {
                if (!video.paused) {
                    wrapper.classList.remove('show-controls');
                }
            });
            
            video.addEventListener('play', showControls);
            video.addEventListener('pause', () => {
                wrapper.classList.add('show-controls');
                clearTimeout(hideTimeout);
            });
        }

        langToggleBtn.addEventListener('click', () => {
            const isPaused = video.paused;
            const currentTime = video.currentTime;
            
            // 1. 자막 트랙 태그 가져오기
            const trackKo = video.querySelector('track[srclang="ko"]');
            const trackEn = video.querySelector('track[srclang="en"]');
            
            if (currentLang === 'ko') {
                currentLang = 'en';
                video.src = 'video_en.mp4';
                langText.textContent = 'EN';
                // 한국어 기본값 해제, 영어 기본값 설정
                if (trackKo) trackKo.removeAttribute('default');
                if (trackEn) trackEn.setAttribute('default', '');
            } else {
                currentLang = 'ko';
                video.src = 'video.mp4';
                langText.textContent = 'KR';
                // 영어 기본값 해제, 한국어 기본값 설정
                if (trackEn) trackEn.removeAttribute('default');
                if (trackKo) trackKo.setAttribute('default', '');
            }
            
            // 2. 비디오 다시 로드 (이때 default가 설정된 자막을 브라우저가 자동으로 활성화함)
            video.load();
            
            video.addEventListener('loadedmetadata', function onLoaded() {
                video.currentTime = currentTime;
                if (!isPaused) {
                    const playPromise = video.play();
                    if (playPromise !== undefined) {
                        playPromise.catch(e => console.log(e));
                    }
                }
                video.removeEventListener('loadedmetadata', onLoaded);
            });
        });
    }
});

// 유튜브 썸네일 클릭 시 현재 프레임에서 영상 로드 및 재생
window.loadYouTubeVideo = function(element) {
    element.style.cursor = 'default';
    element.onclick = null;
    element.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/VMazjZMqQkI?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>';
};

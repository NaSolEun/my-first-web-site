$(document).ready(function() {
    var icon = $('.icon');
    var cursorX = 0;
    var cursorY = 0;
    var iconX = 0;
    var iconY = 0;
    var delay = 0.06; // 통통 튀는 효과의 딜레이를 더 빠르게 설정
    var isBouncing = false; // 이동 중인지 여부를 나타내는 플래그

    // 마우스 움직임에 따른 아이콘 위치 업데이트
    $(document).mousemove(function(e) {
        cursorX = e.clientX;
        cursorY = e.clientY;
    });

    // 애니메이션 프레임 업데이트
    function animate() {
        requestAnimationFrame(animate);
        
        // 아이콘이 마우스 커서 오른쪽 아래에 위치하도록 설정
        iconX += (cursorX + 20 - iconX) * delay;
        iconY += (cursorY + 20 - iconY) * delay;
        
        icon.css({
            left: iconX + 'px',
            top: iconY + 'px',
        });

        // 통통튀는 효과를 추가 (한 번만 실행)
        if (!isBouncing) {
            icon.addClass('bounce');
            isBouncing = true; // 플래그 설정
        }
    }
    
    animate();

    redrawDotNav();

    var audio;


function playAudio() {
    audio.play();
}

function pauseAudio() {
    audio.pause();
}


// ground 이미지를 클릭할 때마다 이미지를 변경하는 함수
function toggleGroundImage() {
    var groundImg = document.getElementById("bg3-4");

    // 현재 이미지 파일 경로를 확인하여 변경합니다.
    if (groundImg.src.endsWith("ground.png")) {
        groundImg.src = "img/ground.gif";
    } else {
        groundImg.src = "img/ground.png";
    }
}

// ground 이미지를 클릭 이벤트에 연결
document.getElementById("bg3-4").addEventListener("click", toggleGroundImage);


// 페이지가 로드될 때 자동으로 음악 재생
window.onload = function() {
    audio = new Audio('https://www.youtube.com/your-audio-url.mp3'); // 음악 파일의 URL을 입력하세요.
    audio.loop = true; // 반복 재생 설정
    playAudio(); // 자동 재생
};


    // 스크롤 이벤트 등록
    $(window).bind('scroll', function(e) {
        parallaxScroll();
        redrawDotNav();
    
        var maxScroll = $(document).height() - $(window).height();
        var scrollPosition = $(this).scrollTop();
        var midScroll = maxScroll * 0.5;
        var brightness = 100;
    
        // 스크롤 위치에 따라 명도 적용
        if (scrollPosition > midScroll) {
            // 중간 이후에는 명도를 조절합니다.
            brightness = ((scrollPosition - midScroll) / (maxScroll - midScroll)) * 100;
            brightness = Math.min(100, brightness); // 최대 명도를 100으로 설정합니다.
        } else if (scrollPosition < 0) {
            // 음수인 경우 원래 색상 유지
            brightness = 100;
        }
    
        // 가장 아래에서는 명도가 최대로 밝아집니다.
        if (scrollPosition >= maxScroll) {
            brightness = 100;
        }
    
        // 스크롤 방향에 따라 명도 적용
        if (scrollPosition > $(this).data('lastScrollTop')) {
            // 아래로 스크롤할 때
            $('.dunkin-link').css('color', 'hsl(30, 100%, ' + brightness + '%)');
        } else {
            // 위로 스크롤할 때
            if (scrollPosition < midScroll && scrollPosition >= 0) {
                // 최상단에서 중간까지는 원래 색상을 유지합니다.
                $('.dunkin-link').css('color', '#ff8c28');
            }
        }
    
        // 현재 스크롤 위치를 저장하여 다음 스크롤 이벤트에서 사용합니다.
        $(this).data('lastScrollTop', scrollPosition);
    });

    /* Next/prev and primary nav btn click handlers */
    $('a.manned-flight').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 1000, function() {
            parallaxScroll(); // Callback is required for iOS
        });
        return false;
    });
    $('a.frameless-parachute').click(function() {
        $('html, body').animate({
            scrollTop: $('#frameless-parachute').offset().top
        }, 1000, function() {
            parallaxScroll(); // Callback is required for iOS
        });
        return false;
    });
    $('a.english-channel').click(function() {
        $('html, body').animate({
            scrollTop: $('#english-channel').offset().top
    }).animate( {
        scrollTop: $('#english-channel').offset().top
    }, 1000, function() {
        parallaxScroll(); // Callback is required for iOS
    });
    return false;
});
$('a.about').click(function() {
    $('html, body').animate({
        scrollTop: $('#about').offset().top
    }, 1000, function() {
        parallaxScroll(); // Callback is required for iOS
    });
    return false;
});

/* Show/hide dot lav labels on hover */
$('nav#primary a').hover(
    function() {
        $(this).prev('h1').show();
    },
    function() {
        $(this).prev('h1').hide();
    }
);

});

/* Scroll the background layers */
function parallaxScroll() {
    var scrolled = $(window).scrollTop();
    $('#parallax-bg1').css('top', (0 - (scrolled * .25)) + 'px');
    $('#parallax-bg2').css('top', (0 - (scrolled * .5)) + 'px');
    $('#parallax-bg3').css('top', (0 - (scrolled * .75)) + 'px');
}

/* Set navigation dots to an active state as the user scrolls */
function redrawDotNav() {
    var section1Top = 0;
    // The top of each section is offset by half the distance to the previous section.
    var section2Top = $('#frameless-parachute').offset().top - (($('#english-channel').offset().top - $('#frameless-parachute').offset().top) / 2);
    var section3Top = $('#english-channel').offset().top - (($('#about').offset().top - $('#english-channel').offset().top) / 2);
    var section4Top = $('#about').offset().top - (($(document).height() - $('#about').offset().top) / 2);;
    $('nav#primary a').removeClass('active');
    if ($(document).scrollTop() >= section1Top && $(document).scrollTop() < section2Top) {
        $('nav#primary a.manned-flight').addClass('active');
    } else if ($(document).scrollTop() >= section2Top && $(document).scrollTop() < section3Top) {
        $('nav#primary a.frameless-parachute').addClass('active');
    } else if ($(document).scrollTop() >= section3Top && $(document).scrollTop() < section4Top) {
        $('nav#primary a.english-channel').addClass('active');
    } else if ($(document).scrollTop() >= section4Top) {
        $('nav#primary a.about').addClass('active');
    }
}
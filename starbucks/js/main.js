const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector('input');

searchEl.addEventListener('click', function(){
  searchInputEl.focus();
});

searchInputEl.addEventListener('focus', function(){
  searchEl.classList.add('focused');
  searchInputEl.setAttribute('placeholder', '통합검색');/* setAttribute():html의 속성을 지정할때쓰는 메소드 */
});

searchInputEl.addEventListener('blur', function(){
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder', '');
});

// 전역배지
 const badgeEl = document.querySelector('header .badges'); 

 window.addEventListener('scroll', _.throttle(function(){
  console.log(window.scrollY);
  if (window.scrollY > 500) { 
    //배지 숨기기
    // gsap.to(애니메이션 처리할 요소 , 애니메이션 처리되는 지속시간(초 단위) , 옵션); // 옵션으로 객체데이터를 사용할 수 있다.
    gsap.to(badgeEl, .6, {
      opacity: 0,
      display:'none'
    });
    // 버튼 보이기!
    gsap.to('#to-top', .2, {
      x: 0
    });
  } else {
   // 배지 보이기
   gsap.to(badgeEl, .6, {
    opacity: 1,
    display:'block'
  });
  // 버튼 숨기기!
    gsap.to('#to-top', .2, {
      x: 100 //x축으로 100픽셀 이동
    });
  }
 }, 300)); 
// _.throttle(함수, 시간)


/* ScrollTo */
const toTopEl = document.querySelector('#to-top');
toTopEl.addEventListener('click', function(){
  gsap.to(window, .7, {
    scrollTo: 0 // 스크롤위치(window의)를 0픽셀 지점으로 옮겨주겠다. 0.7초 동안 
  }); 
});

 /* VISUAL */
const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function(fadeEl, index){
  // gsap.to(애니메이션 처리할 요소 , 애니메이션 처리되는 지속시간(초 단위) , 옵션);
  gsap.to(fadeEl, 1, {
    delay:(index + 1) * .7, // 0.7, 1.4, 2.1, 2.8초... 뒤에 동작 
    opacity: 1
  });
});

/* SWIPER */
// swiper(선택자, 옵션)
// swiper함수안에() 첫번째 인수로 css선택자 , 두번째로 옵션을 객체데이터 형식으로 넣어줌  
new Swiper('.notice-line .swiper', {
  direction:'vertical',  // direction 방향 , vertical 수직 
  autoplay: true, // autoplay 자동재생 여부
  loop: true // loop 반복재생 여부
});

new Swiper('.promotion .swiper', {
  // direction :'horizontal' 기본값으로 이미 들어가있어서 따로 명시할 필요가 없다.
  slidesPerView: 3, // 한번에 보여줄 슬라이드 개수 , 기본값은 1이다
  spaceBetween: 10, // 슬라이드 사이 여백
  centeredSlides: true, // 1번 슬라이드가 가운데 보이기
  loop: true,
  autoplay: {
    delay: 5000 //밀리세컨드 단위- 5초 // 기본값은 3초이다.
  },
  pagination: {
    el: '.promotion .swiper-pagination', // 페이지 번호 요소 선택자
    clickable: true // 사용자의 페이지 번호 요소 제어 가능 여부 // 클릭이 가능한지.
  },
  navigation: {
    prevEl: '.promotion .swiper-prev',
    nextEl: '.promotion .swiper-next'
  }
});

new Swiper('.awards .swiper', {
  autoplay: true,
  loop: true,
  spaceBetween: 30, //슬라이드 사이 여백
  slidesPerView:5, //한 화면에 몇개의 슬라이드를 보일것인지.
  navigation: {
    prevEl: '.awards .swiper-prev',
    nextEl: '.awards .swiper-next'
  }
});

/** toggle */
const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false; // true로 값이 버뀔수 있기떄문에 let사용
promotionToggleBtn.addEventListener('click', function(){
  isHidePromotion = !isHidePromotion //클릭 이벤트 발생시, isHidepromotion 의 (!)반대를 담아라.. (false이면 true의 값을 담는다.)
  if(isHidePromotion) { // if조건문에 true값이 들어오면,
    // 숨김 처리!
    promotionEl.classList.add('hide'); //promotionEl에 hide라는 클래스 추가됨 // 그 후 css스타일로 안보이게 처리하면된다.
  } else {
    // 보임 처리!
    promotionEl.classList.remove('hide');
  }
});
 
/* 반복 애니메이션 */ 

// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

function floatingObject(selector, delay, size) {
  //gsap.to(요소, 시간, 옵션);
  gsap.to(
    selector, // 선택자
    random(1.5, 2.5), // 애니메이션 동작 시간
    {  // 옵션
      y:size, //y축 으로 px만큼 이동
      repeat:-1, //repeat 반복 : -1 은 무한반복을 의미함.
      yoyo: true, //yoyo : 한번 재생된 애니메이션을 뒤로 재생
      ease: Power1.easeInOut, // 부자연스러운 애니메이션을 조정할수 있다.  구글 gsap easeing함수 
      delay: random(0, delay)
    }
  );
}
floatingObject('.floating1', 1, 15); 
floatingObject('.floating2', .5, 15); 
floatingObject('.floating3', 1.5, 20); 

/* ScrollMagic */ 
const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function(spyEl){
  new ScrollMagic
    .Scene({ // Scene: 스크롤매직이라는 자바스크립트 라이브러리를 통해서 특정한 요소를 감시하는 옵션을 지정해주는 메소드.
      triggerElement: spyEl, // 보여짐 여부를 감시할 요소를 지정
      triggerHook: .8 // 뷰포트를 시작하는 부분을 0, 끝나는 부분을 1로 볼때, 0.8의 지점에 hook(갈고리)를 걸고, 스크롤을해서 그 지점에 오면 trigger이됨// 화면기준
    }) 
    .setClassToggle(spyEl, 'show')
    .addTo(new ScrollMagic.Controller());  
});

/* 올해년도 계산 코드 */
const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear(); // 2023

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.

//onYouTubePlayerAPIReady 함수 이름은 Youtube IFrame Player API에서 사용하는 이름이기 때문에 다르게 지정하면 동작하지 않는다.
function onYouTubeIframeAPIReady() {
  //<div id="palyer"></div>
  new YT.Player('player', {
    videoId: 'Ym6d96nU9B4', // 최초 재생할 유튜브 영상 ID. 
    PlayerVars:{ //Vars 벨리어블이라는 변수의 약어
      autoplay: true, // 자동 재생 유무
      loop: true, // 반복 재생 유무 
      playlist: 'Ym6d96nU9B4' // 반복 재생할 유튜브 영상 ID 목록 // 반복 재생할 경우 적어줘야함
    },
    events: {
      onReady: function(event){ //객체 데이터안에 함수는 = 메소드임.
         event.target.mute() // 음소거 
      }
    }
  });
}
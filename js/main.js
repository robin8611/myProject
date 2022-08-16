//1단계 작업 폴더 준비하기 isotope.pkgd.min.js라는 플러그인 파일이 있고, 이 플러그인 파일의 기능을 가져와 직접 코드를 작성할 main.js
//파일이 있습니다. 2단계 레이아웃 구조 파악하기 작업을 시작하기 전에 레이아웃 구조를 살펴보겠습니다.
//크게 header와 main 영역으로 구성됩니다. header 영역에는 메뉴를 넣어 왼쪽 세로 방향에 위치시키고, main 영역에는 갤러리 이미지들과
//분류 버튼을 넣어 그룹화합니다. header 영역 안에는 h1 요소의 로고와 하단 SNS 메뉴를 만듭니다. 또한 main 영역 안에는 ul로 분류 기능
//을 제작하고, article 요소로 이미지와 정보를 묶어 주겠습니다. 3단계 세로형 메뉴 구조 레이아웃 제작하기

//자주 수정할 수 있는 정봇값들을 상단에 전역 변수로 설정
const frame = "section";
const box = "article";
const speed = '0.5s';
const activeClass = "on";
//클릭한 모든 버튼 변수에 저장
const btn = document.querySelectorAll("main ul li");
let grid; //플러그인의 정봇값이 담길 변수를 이곳에 전역으로 설정

//페이지 로드 이벤트
//이미지 소스를 활용한 모든 콘텐츠의 로딩이 완료되면
window.addEventListener("load", ()=>{
  init(); //화면 초기화 함수 호출
  filter(btn); //정렬 버튼 기능의 함수 호출
});

//화면 초기화 함수 정의
function init(){
  //변수 grid에 담길 결괏값이 다른 함수인 filter에서도 활용되어야 하므로
  //전역 변수로 선언
  grid = new Isotope(frame, { //배치할 요소를 감싸고 있는 부모 요소명
    itemSelector: box,        //배치할 요소명
    columnWidth: box,         //너빗값을 구할 요소명
    transitionDuration: speed //화면 재배치 시 요소가 움직이는 속도
  });
}

//정렬 버튼 기능의 함수 정의
function filter(arr){ //매개 변수 arr을 통해 반복하는 버튼 그룹을 인수로 전달
  //버튼의 개수만큼 반복해서
  for(let el of arr){
    //각 버튼에 클릭 이벤트 연결
    el.addEventListener("click", e=>{
      e.preventDefault();
      //변수 sort에 클릭한 대상의 자식인 a 요소의 href 속성값 저장
      const sort = e.currentTarget.querySelector("a").getAttribute("href");
      //grid에 저장된 결괏값을 불러와 재정렬 기능 연결
      grid.arrange({
        //옵션값으로 sort 변숫값 지정
        filter: sort
      });
      //다시 모든 버튼의 개수만큼 반복해서
      for(let el of arr){
        //각 버튼의 클래스명 "on"을 제거해 비활성화
        el.classList.remove(activeClass);
      }
      //클릭한 대상만 선택해서 클래스명 on을 추가해 활성화
      e.currentTarget.classList.add(activeClass);
    })
  }
}
//addEventListener 구문으로 window 요소, 즉 브라우저 요소 자체에 load 이벤트를 연결해 줍니다. 이 이벤트 문은 웹 페이지의 단순한
//DOM 출력뿐 아니라 그에 따른 다양한 이미지 소스까지 로딩이 모두 완료되어야 블록 안쪽 코드를실행합니다. isotope 플러그인은 이미
//지까지 모두 포함한 각 article 요소의 높잇값을 인식해야만 레이아웃을 정상으로 재배치할 수 있으므로 모든 이미지 소스의 로딩이
//완료될 때까지 기다렸다가 플러그인 기능을 호출해야 합니다. 맨 윗줄에는 배치할 요소의 부모 요소인 section을 입력하고 
//itemSelector와 columnWidth에는 실제로 재배치할 요소명인 article을 적용합니다. 8단계 미디어 쿼리를 이용하여 반응형 웹 제작하기

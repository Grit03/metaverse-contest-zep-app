# 제2회 혁신공유대학 메타버스 콘테스트
<div align="center">
<img alt="메타버스 콘테스트" height="auto" src="https://res.cloudinary.com/linkareer/image/fetch/f_auto/https://api.linkareer.com/attachments/131275" width="250px" style= />

**ZEP MAP 구축을 위한 앱 개발** <br>
***🏆 최우수상 (한국연구재단 이사장상) 수상*** <br>

</div>

## 🖥️ 프로젝트 소개
혁신공유대학을 메타버스 맵으로 구축하는 프로젝트입니다.<br>
저희 팀은 TESSERACT 라는 캠퍼스 이름 아래, ZEP이라는 메타버스 플랫폼을 통해서 맵을 구축했습니다.<br>
ZEP의 플랫폼 설명과 개발 환경 구축환경은 아래 블로그 글에서 확인할 수 있습니다.👇<br>
[🌐 메타버스 콘테스트 일지 (ZEP 개발 환경 구축)](https://velog.io/@dev_grit/메타버스-콘테스트-일지-ZEP-개발-환경-구축?)<br>


## 🕰️ 개발 기간
2022.10.22 ~ 2022.10.28


## 🪓 개발 스택
<img
    src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=JavaScript&logoColor=white"
  />
<img
  src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=TypeScript&logoColor=white"
/> <br>
`Javascript` 기반으로 되어 있는 `ZEP Script` 문법에 따라 개발하였습니다.<br>
API를 잘 활용하고 타입을 잘 맞추어 효율적으로 개발하기 위해 `Typescript`로 개발하였습니다.

## 🪄 결과 및 시연
⚠️ 현재는 맵이 대회 측 사업단에 귀속되어, 일부 기능 및 맵이 제대로 동작하지 않을 수 있습니다. <br>
[🌐 ZEP 혁신공유대학 맵 링크](https://zep.us/play/8Awlkg)


## 📌 기능

### 파일구조
```bash
.
├── MapExtension
├── Maze
├── roomScript
├── tesseractScript
└── weatherScript
```

### MapExtension
<img width="500" alt="image" src="https://user-images.githubusercontent.com/68225058/214534829-19f59fd7-585e-4260-8d09-73149246a338.png"> <br>
맵의 하단에 전체 맵의 모습과 사용자의 현재 위치를 표현하는 지도 앱을 개발하였습니다. `m` 키로 지도를 껐다 켰다 할 수 있습니다. <br>
맵의 크기를 크게 제작했기 때문에, 사용자가 자신의 현재 위치를 쉽게 파악할 수 없을 것이라 하여 해당 기능을 개발하게 되었습니다.
```javascript
window.addEventListener("message", function (e) {
  if (e.data.isInit) {
    switch (e.data.mapID) {
      case ROOM:
        bgImg.src = ROOM_IMG;
        document.querySelector("#loading").style.display = "none";
        break;
      case TESSERACT:
        bgImg.src = TESSERACT_IMG;
        document.querySelector("#loading").style.display = "none";
        break;
      //... 생략
      default:
        document.querySelector("#loading").innerHTML = "No Image";
    }
  var playerX = e.data.x;
  var playerY = e.data.y;
  var marker = document.querySelector("#marker");
  marker.style.left = playerX - 5 + "px";
  marker.style.top = playerY - 5 + "px";
});
```

맵 아이디에 따라 지도 앱의 배경 이미지가 바뀌도록 설정하였고, 플레이어의 위치를 실제 맵 크기에서의 플레이어의 좌표의 비율을 활용하여 표시하도록 하였습니다.

### roomScript
<img width="500" alt="image" src="https://user-images.githubusercontent.com/68225058/214535876-c13cd8ad-4281-489c-914a-d6b1e058a06f.png">
맵 접속 후 첫 화면이 되는 room 장소에 대한 스크립트입니다. <br>
맵에 담은 스토리를 팝업으로 띄우게 하고, 알람 소리를 추가하여 메타버스에 생동감을 불어넣었습니다. <br>

```typescript
import "zep-script";

ScriptApp.onJoinPlayer.Add(function (player) {
  player.playSound("book.mp3", false, true);
  player.playSound("alarm.mp3", false, true);
});
```

### Maze
<img width="500" alt="image" src="https://user-images.githubusercontent.com/68225058/214544343-e1ad3d44-136f-43f6-bd47-08e1cb353c86.png">

이벤트 맵으로 만든 미로 게임 맵에 대한 스크립트입니다. <br>
미로를 통과하면, 성공 애니메이션과 효과음이 나오도록 스크립트를 작성하였습니다.
```typescript
let hasShown = false;
ScriptApp.addOnLocationTouched("finished", function (player) {
  if (!hasShown) {
    player.playSound("success.mp3", false, true);

    let confetti = ScriptApp.showWidget(
      "complete.html",
      "middle",
      157 * 10,
      106 * 10
    );
    setTimeout(function () {
      confetti.destroy();
      confetti = null;
    }, 3000);
    hasShown = true;
  }
});
```

### tesseractScript
<img width="500" alt="image" src="https://user-images.githubusercontent.com/68225058/214543956-b0e67d58-1bdd-4bc4-898a-57e15a1e7c0e.png">

테서렉트 전체 캠퍼스의 모습을 담은 맵을 위한 스크립트입니다 <br>
`q` 버튼을 눌러 배경음악을 음소거할 수 있도록 설정하였습니다. <br>

**음소거 기능에 대한 코드**
```ts
ScriptApp.onJoinPlayer.Add(function (player) {
  player.playSound("TESSERACT_BGM.mp3", true, true);
  player.showCenterLabel(
    `q 버튼을 눌러 배경음악을 음소거 할 수 있습니다`,
    0xffffff,
    0x000000,
    100,
    2000
  );
  isSound = true;
});
```

**소리가 꺼지거나 켜졌을 때 키를 통해 동작하도록 하는 코드**
```ts
ScriptApp.addOnKeyDown(81, (player) => {
  if (isSound) {
    ScriptApp.stopSound();
    isSound = false;
  } else {
    player.playSound("TESSERACT_BGM.mp3", true, true);
    isSound = true;
  }
});
```

### weatherScript
<img width="500" alt="image" src="https://user-images.githubusercontent.com/68225058/214544114-7afe3be6-97de-4fff-b4d1-83078e93281b.png">

타이탄 공원 맵에 대한 스크립트입니다. <br>
`r`키를 눌러 달리거나 걸을 수 있도록 기능을 추가하여, 넓은 맵을 원활하게 이동할 수 있게 만들었습니다. <br>
```ts
// r 키를 누르면 동작하는 함수
ScriptApp.addOnKeyDown(82, function (player) {
  if (!isRunning) {
    player.moveSpeed = 150;
    player.title = "👟 달리기 모드";
    isRunning = true;
    player.playSound("run.mp3", false, true);
    player.sendUpdated();
  } else {
    player.moveSpeed = 80;
    player.title = "🚶🏻 걷기 모드";
    isRunning = false;
    player.playSound("walking.mp3", false, true);
    player.sendUpdated();
  }
});
```

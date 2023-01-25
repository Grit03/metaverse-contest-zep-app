/**
 * Copyright (c) 2022 ZEP Co., LTD
 */

let isRunning = false;
App.onJoinPlayer.Add(function (player) {
  player.showCenterLabel(`타이탄 공원에 오신걸 환영합니다!\nr 버튼을 눌러 달릴 수 있습니다 :)`, 0xffffff, 0x000000, 100, 2000);
  player.title = "🚶🏻 걷기 모드";
  player.playSound("walking.mp3", false, true);
  player.sendUpdated();
});

// r 키를 누르면 동작하는 함수
App.addOnKeyDown(82, function (player) {
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
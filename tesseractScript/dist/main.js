/**
 * Copyright (c) 2022 ZEP Co., LTD
 */

let isSound = false;
App.onJoinPlayer.Add(function (player) {
  player.playSound("TESSERACT_BGM.mp3", true, true);
  player.showCenterLabel(`q 버튼을 눌러 배경음악을 음소거 할 수 있습니다`, 0xffffff, 0x000000, 100, 2000); // 노란색 배경, 검정색 글씨로 표시하기
  isSound = true;
});
App.addOnKeyDown(81, player => {
  if (isSound) {
    App.stopSound();
    isSound = false;
  } else {
    player.playSound("TESSERACT_BGM.mp3", true, true);
    isSound = true;
  }
});
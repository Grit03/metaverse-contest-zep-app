/**
 * Copyright (c) 2022 ZEP Co., LTD
 */

import "zep-script";

let isSound = false;

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

ScriptApp.addOnKeyDown(81, (player) => {
  if (isSound) {
    ScriptApp.stopSound();
    isSound = false;
  } else {
    player.playSound("TESSERACT_BGM.mp3", true, true);
    isSound = true;
  }
});

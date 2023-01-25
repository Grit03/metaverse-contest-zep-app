/**
 * Copyright (c) 2022 ZEP Co., LTD
 */

import "zep-script";

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

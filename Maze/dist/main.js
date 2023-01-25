/**
 * Copyright (c) 2022 ZEP Co., LTD
 */

let hasShown = false;
App.addOnLocationTouched("finished", function (player) {
  if (!hasShown) {
    player.playSound("success.mp3", false, true);
    let confetti = App.showWidget("complete.html", "middle", 157 * 10, 106 * 10);
    setTimeout(function () {
      confetti.destroy();
      confetti = null;
    }, 3000);
    hasShown = true;
  }
});
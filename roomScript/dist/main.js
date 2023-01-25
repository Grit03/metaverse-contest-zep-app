/**
 * Copyright (c) 2022 ZEP Co., LTD
 */

App.onJoinPlayer.Add(function (player) {
  player.playSound("book.mp3", false, true);
  player.playSound("alarm.mp3", false, true);
});
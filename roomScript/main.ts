/**
 * Copyright (c) 2022 ZEP Co., LTD
 */

import { setTimeout } from "timers/promises";
import "zep-script";
import { ScriptPlayer } from "zep-script";

ScriptApp.onJoinPlayer.Add(function (player) {
  player.playSound("book.mp3", false, true);
  player.playSound("alarm.mp3", false, true);
});

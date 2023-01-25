/**
 * Copyright (c) 2022 ZEP Co., LTD
 */

import "zep-script";
import { ScriptPlayer } from "zep-script";

const ratio = 300 / ScriptMap.width;
const height = ScriptMap.height;
const mapID = ScriptApp.mapHashID;
const MAZE = "24wgbK";
let mapWidget = null;
let Player: ScriptPlayer = null;

const locationPresenter = (isInit: boolean) => {
  const x = Player.tileX * ratio;
  const y = Player.tileY * ratio;
  if (mapWidget) {
    mapWidget.sendMessage({
      isInit,
      mapID,
      x,
      y,
    });
  }
};

ScriptApp.onInit.Add(() => {
  ScriptApp.sayToAll(
    "누군가 지도 앱을 설치했습니다! m 버튼을 눌러 현재 위치를 볼 수 있는 맵을 on/off 할 수 있습니다! :)"
  );
});

// 플레이어가 입장할 때 동작하는 함수
ScriptApp.onJoinPlayer.Add(function (player) {
  Player = player;
  if (mapID == MAZE) {
    mapWidget.destroy();
    mapWidget = null;
  }
  mapWidget = player.showWidget("map.html", "bottomright", 300, height * ratio);
  locationPresenter(true);
});

ScriptApp.onUpdate.Add(function (dt) {
  if (Player) {
    if (Player.isMoving) {
      locationPresenter(false);
    }
  }
});

ScriptApp.addOnKeyDown(77, (player) => {
  if (!mapWidget) {
    mapWidget = player.showWidget(
      "map.html",
      "bottomright",
      300,
      height * ratio
    );
    locationPresenter(true);
  } else {
    mapWidget.destroy();
    mapWidget = null;
  }
});

ScriptApp.onDestroy.Add(function () {
  mapWidget.destroy();
  mapWidget = null;
});

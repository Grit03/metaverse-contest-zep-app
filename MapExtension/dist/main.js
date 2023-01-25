/**
 * Copyright (c) 2022 ZEP Co., LTD
 */

const ratio = 300 / Map.width;
const height = Map.height;
const mapID = App.mapHashID;
const MAZE = "24wgbK";
let mapWidget = null;
let Player = null;
const locationPresenter = isInit => {
  const x = Player.tileX * ratio;
  const y = Player.tileY * ratio;
  if (mapWidget) {
    mapWidget.sendMessage({
      isInit,
      mapID,
      x,
      y
    });
  }
};
App.onInit.Add(() => {
  App.sayToAll("누군가 지도 앱을 설치했습니다! m 버튼을 눌러 현재 위치를 볼 수 있는 맵을 on/off 할 수 있습니다! :)");
});

// 플레이어가 입장할 때 동작하는 함수
App.onJoinPlayer.Add(function (player) {
  Player = player;
  if (mapID == MAZE) {
    mapWidget.destroy();
    mapWidget = null;
  }
  mapWidget = player.showWidget("map.html", "bottomright", 300, height * ratio);
  locationPresenter(true);
});
App.onUpdate.Add(function (dt) {
  if (Player) {
    if (Player.isMoving) {
      locationPresenter(false);
    }
  }
});
App.addOnKeyDown(77, player => {
  if (!mapWidget) {
    mapWidget = player.showWidget("map.html", "bottomright", 300, height * ratio);
    locationPresenter(true);
  } else {
    mapWidget.destroy();
    mapWidget = null;
  }
});
App.onDestroy.Add(function () {
  mapWidget.destroy();
  mapWidget = null;
});
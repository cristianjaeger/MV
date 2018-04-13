/*:ko
 * @plugindesc 이벤트와 그림이 충돌했는 지를 확인하고 이벤트를 실행합니다.
 * @author 러닝은빛(biud436)
 * @help
 * =============================================================================
 * 스크립트 호출
 * =============================================================================
 *
 * 이벤트와 그림이 충돌했는 지를 확인하고 이벤트를 실행합니다 :
 *
 *    RS.PictureTool.runEventFromPictureBound(picId, eventId);
 *
 * =============================================================================
 * 버전 로그
 * =============================================================================
 * 2018.04.13 (v1.0.0) - 공개
 */

var RS = RS || {};
RS.PictureTool = RS.PictureTool || {};


(function ($) {

  $.isMap = function () {
    return SceneManager._scene instanceof Scene_Map;
  };

  /**
   * 픽처 찾기
   */
  $.findPicture = function (picId) {
    var container;
    if(!$.isMap()) return false;
    container = SceneManager._scene._spriteset._pictureContainer.children;
    if(!container) return false;
    return container[picId - 1];
  };

  /**
   * 그림의 영역 찾기
   */
  $.findPictureBound = function(picId) {
    var pic = $.findPicture(picId);
    if(!pic) return false;
    if(pic.frame) {
      return pic.frame
    } else {
      return new Rectangle(pic.x, pic.y, pic.width, pic.height);
    }
  };

  /**
   * 영역 안에 있는 이벤트 실행
   */
  $.runEventFromPictureBound = function (picId, eventId) {
    var pic = $.findPictureBound(picId);
    if(!pic) return false;

    var px = pic.x;
    var py = pic.y;
    var pw = pic.x + pic.width;
    var ph = pic.y + pic.height;

    var e = $gameMap.event(eventId);

    if(!e) return false;

    var sx = e.screenX();
    var sy = e.screenY();

    if( (sx < px) ||
    (sx > pw) ||
    (sy < py) ||
    (sy > ph)) {
      return false;
    }

    if(!$gameMap.isEventRunning()) {
      e.start();
    }

    return true;

  };

})(RS.PictureTool);
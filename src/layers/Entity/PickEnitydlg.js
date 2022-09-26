/**
 * @Description:
 * @author  ZQ
 * @date 2022/9/8 18:53:48
 */
import * as Cesium from 'cesium'

export  function OpenPopdlg(viewer) {

    let scene = viewer.scene;
    var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    handler.setInputAction(function (movement) {

        var pick = scene.pick(movement.position);
        if (pick !=null && pick.id.name) {

        } else {

        }

    },
    Cesium.ScreenSpaceEventType.LEFT_CLICK);

}
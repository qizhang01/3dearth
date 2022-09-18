/**
 * @Description:
 * @author  ZQ
 * @date 2022/2/8 18:53:48
 */
import * as Cesium from 'cesium'

export  function OpenPopdlg(viewer) {

    let scene = viewer.scene;
    var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    handler.setInputAction(function (movement) {
        var infoDiv = '<div id="trackPopUp" class="trackPopUp">' +
            '<div id="trackPopUpContent" class="cesium-popup" style="top:5px;left:0;">' +
            '<a class="cesium-popup-close-button" href="#">×</a>' +
            '<div class="cesium-popup-content-wrapper">' +
            '<div id="trackPopUpLink" class="cesium-popup-content"></div>' +
            '</div>' +'</div>' +'</div>';
            document.getElementById("cesiumContainer").append(infoDiv);

        var pick = scene.pick(movement.position);
        if (pick !=null && pick.id.name) {
            document.getElementById('trackPopUp').show();
            var content = '<table class="pure-table pure-table-horizontal"><tbody>' +
                '<thead style="color: #1398e0;text-align: left;vertical-align: bottom;"><tr><td colspan="2">皖东大学建筑</td></tr></thead>'+
                '<tr><th style="color:#1398e0;">建筑物名称：</th><td style="color:#1398e0;text-align: right;">'+ pick.id.name +'</td></tr>'+
                '<tr><th style="color:#1398e0;">楼  层：</th><td style="color:#1398e0;text-align: right;">'+ 6 +'&nbsp 层'+'</td></tr>'+
                '<tr><th style="color:#1398e0;">高  度：</th><td style="color:#1398e0;text-align: right;">'+ 20 + '&nbsp 米 '+'</td></tr>'+
                '</tbody></table>'
            var obj = { position: movement.position, content: content };
            infoWindow(obj);
            function infoWindow(obj) {
                var c = new Cesium.Cartesian2(obj.position.x, obj.position.y);
                var picked = scene.pick(obj.position);
                var id = Cesium.defaultValue(picked._batchId, picked.primitive.id);
                document.getElementsByClassName("cesium-selection-wrapper").show();
                document.getElementById('trackPopUpLink').empty();
                document.getElementById('trackPopUpLink').append(obj.content);
                positionPopUp(c); // 初始位置
                function positionPopUp(c) {
                    var x = c.x - (document.getElementById('trackPopUpContent').width()) / 2;
                    var y = c.y - (document.getElementById('trackPopUpContent').height());
                    document.getElementById('trackPopUpContent').css('transform', 'translate3d(' + x + 'px, ' + y + 'px, 0)');
                }
                document.getElementById('trackPopUp').show();
                document.getElementsByClassName('cesium-popup-close-button').click(function () {
                    document.getElementById('trackPopUp').hide();
                    document.getElementById('trackPopUpLink').empty();
                    document.getElementsByClassName("cesium-selection-wrapper").hide();
                    return false;
                });
                return id;
            }
        }
        else {
            document.getElementById('trackPopUp').hide();
        }

    },Cesium.ScreenSpaceEventType.LEFT_CLICK);


}
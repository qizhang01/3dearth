/**
 * @Description:
 * @author  ZQ
 * @date 2022/2/8 18:53:48
 */
import * as Cesium from 'cesium'
export default class LableEntityManage {
    constructor(viewer) {
        this.viewer = viewer;
    }

    AddLabeentity(){
        this.viewer.entities.add({
            name: '1号',
            position: Cesium.Cartesian3.fromDegrees(106.5330505371, 29.4914218783,300),
            label: { //文字标签
                text: 'ocbc上海',
                font: '500 30px Helvetica',// 15pt monospace
                scale: 0.5,
                style: Cesium.LabelStyle.FILL,
                fillColor: Cesium.Color.WHITE,
                pixelOffset: new Cesium.Cartesian2(110, -72),   //偏移量
                showBackground: true,
                backgroundColor: new Cesium.Color(26 / 255, 196 / 255, 228 / 255, 1.0)
            },
            // billboard: { //图标
            //     image: require('../../assets/images/div1.png'),
            //     scale: 1,
            //     pixelOffset: new Cesium.Cartesian2(100, -35),   //偏移量
            // },
        });
    }
}
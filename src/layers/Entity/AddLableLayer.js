/**
 * @Description:
 * @author  ZQ
 * @date 2022/2/8 18:53:48
 */
import * as Cesium from 'cesium'
import logo from '../../assets/images/location.png'
export default class LableEntityManage {
    constructor(viewer) {
        this.viewer = viewer;
    }

    AddLabeentity(){
        this.viewer.entities.add({
            name: '1号',
            id:"shanghai",
            position: Cesium.Cartesian3.fromDegrees(121.495, 31.240, 30000),
            // label: { //文字标签
            //     text: 'ocbc',
            //     font: '500 30px Helvetica',// 15pt monospace
            //     scale: 0.5,
            //     style: Cesium.LabelStyle.FILL,
            //     fillColor: Cesium.Color.WHITE,
            //     pixelOffset: new Cesium.Cartesian2(110, -72),   //偏移量
            //     showBackground: true,
            //     backgroundColor: new Cesium.Color(26 / 255, 196 / 255, 228 / 255, 1.0)
            // },
            billboard: { //图标
                // image: require('../../assets/images/div1.png'),
                image: logo,
                scale: 1,
                // pixelOffset: new Cesium.Cartesian2(100, -35),   //偏移量
            },
        });

        this.viewer.entities.add({
            name: '新加坡',
            id:"sigpore",
            position: Cesium.Cartesian3.fromDegrees(103.83, 1.36, 30000),
            billboard: { //图标,
                image: logo,
                scale: 1,
                // pixelOffset: new Cesium.Cartesian2(100, -35),   //偏移量
            },
        });

        this.viewer.entities.add({
            name: '曼谷',
            id:"tailand",
            position: Cesium.Cartesian3.fromDegrees(100, 13.785, 30000),
            billboard: { //图标
                image: logo,
                scale: 1,
            },
        });

        this.viewer.entities.add({
            name: '台北',
            id:"taipei",
            position: Cesium.Cartesian3.fromDegrees(120.9, 24.37, 30000),
            billboard: { //图标
                // image: require('../../assets/images/div1.png'),
                image: logo,
                scale: 1,
            },
        });

        this.viewer.entities.add({
            name: '香港',
            id:"hokong",
            position: Cesium.Cartesian3.fromDegrees(114.15, 22.45, 30000),
            billboard: { //图标
                // image: require('../../assets/images/div1.png'),
                image: logo,
                scale: 1,
            },
        });

        this.viewer.entities.add({
            name: '雅加达',
            id:"yajda",
            position: Cesium.Cartesian3.fromDegrees(106.367, -6.108, 30000),
            billboard: { //图标
                // image: require('../../assets/images/div1.png'),
                image: logo,
                scale: 1,
            },
        });

        this.viewer.entities.add({
            name: '伦敦',
            id:"lodon",
            position: Cesium.Cartesian3.fromDegrees(-2.137, 53.44, 30000),
            billboard: { //图标
                // image: require('../../assets/images/div1.png'),
                image: logo,
                scale: 1,
            },
        });
        this.viewer.entities.add({
            name: '纽约',
            id:"newyork",
            position: Cesium.Cartesian3.fromDegrees(-68.97, 45.99, 30000),
            billboard: { //图标
                // image: require('../../assets/images/div1.png'),
                image: logo,
                scale: 1,
            },
        });
    }
}
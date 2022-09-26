/**
 * @Description:
 * @author  ZQ
 * @date 2022/8 
 */
import * as Cesium from 'cesium'
import {EarthBaseConfig} from "../../config/config"
/**
 *
 * @param views
 * @param index
 * @constructor
 */
export function AddTerrainLayers(viewer,index=1) {
    var scene = viewer.scene;
    var terrainProvider;
    let type = EarthBaseConfig.EarthDEM[0].show;
    if(type){
        if (scene.terrainProvider._url){
            terrainProvider = new Cesium.EllipsoidTerrainProvider({});
        }
        else {
            terrainProvider = new Cesium.CesiumTerrainProvider({
                url : EarthBaseConfig.EarthDEM[0].url,
                requestWaterMask: true
            });
        }
        scene.terrainProvider = terrainProvider;
    }else {
        scene.terrainProvider = new Cesium.EllipsoidTerrainProvider({});
    }
}
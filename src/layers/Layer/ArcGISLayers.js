/**
 * @Description:
 * @author  ZQ
 * @date 2022/2/8 18:53:48
 */
/**
 *
 * @param viewer
 * @param index
 * @constructor
 */
import * as Cesium from 'cesium'
import {EarthBaseConfig} from "../../config/config"

export function AddArcGISLayers(viewer,index=0) {
    let  ArcGISLayer;
    let  EPSG;
    if(viewer ===undefined)
    {
        viewer = window.Scene.viewer;
    }
    if(viewer){
        for (let i = 0;i<EarthBaseConfig.ArcGISLayerImg.length;i++) {
            if (EarthBaseConfig.ArcGISLayerImg[i].tilingScheme === "EPSG:4326") {
                EPSG = new Cesium.GeographicTilingScheme();
            } else {
                EPSG = new Cesium.WebMercatorTilingScheme();
            }
            ArcGISLayer = new Cesium.ArcGisMapServerImageryProvider({
                url: EarthBaseConfig.ArcGISLayerImg[i].url,
                rectangle: new Cesium.Rectangle.fromDegrees(EarthBaseConfig.ArcGISLayerImg[i].rectangle[0],
                    EarthBaseConfig.ArcGISLayerImg[i].rectangle[1],
                    EarthBaseConfig.ArcGISLayerImg[i].rectangle[2],
                    EarthBaseConfig.ArcGISLayerImg[i].rectangle[3]),
                maximumLevel: EarthBaseConfig.ArcGISLayerImg[i].maximumLevel,
                tilingScheme: EPSG,
            });
            index  = 4;
            viewer.imageryLayers.addImageryProvider(ArcGISLayer, index);
        }
    }
}
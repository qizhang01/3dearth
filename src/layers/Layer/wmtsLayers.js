/**
 * @Description:
 * @author  ZQ
 * @date 2022/2/8 18:53:48
 */
import * as Cesium from 'cesium'
import {EarthBaseConfig} from "../../config/config"
/**
 *
 * @param viewer
 * @param WMTS
 * @param index
 * @param show
 * @constructor
 */
export function AddWMTSLayers(viewer,index=2) {
    if(viewer === undefined)
    {
        viewer = window.Scene.viewer;
    }
    let WMTSLayer ;
    let EPSG;
    let Rectangle= null;
    if(viewer){
        for(let i=0;i<EarthBaseConfig.WMTSLayerImg.length;i++){
            if(EarthBaseConfig.WMTSLayerImg[i].tilingScheme ==="EPSG:4326")
            {
                EPSG = new Cesium.GeographicTilingScheme();
                if(EarthBaseConfig.WMTSLayerImg[i].rectangle && EarthBaseConfig.WMTSLayerImg[i].rectangle.length>0){
                    Rectangle = new Cesium.Rectangle.fromDegrees(EarthBaseConfig.WMTSLayerImg[i].rectangle[0],
                        EarthBaseConfig.WMTSLayerImg[i].rectangle[1],
                        EarthBaseConfig.WMTSLayerImg[i].rectangle[2],
                        EarthBaseConfig.WMTSLayerImg[i].rectangle[3]);
                }

            }else {
                EPSG =new Cesium.WebMercatorTilingScheme();
            }
            WMTSLayer = new Cesium.WebMapTileServiceImageryProvider({
                url:EarthBaseConfig.WMTSLayerImg[i].url,
                layer:EarthBaseConfig.WMTSLayerImg[i].layer,
                subdomains:EarthBaseConfig.WMTSLayerImg[i].subdomains,
                style:EarthBaseConfig.WMTSLayerImg[i].style,
                format:EarthBaseConfig.WMTSLayerImg[i].format,
                tileMatrixSetID:EarthBaseConfig.WMTSLayerImg[i].tileMatrixSetID,
                tilingScheme: EPSG,
                tileMatrixLabels:EarthBaseConfig.WMTSLayerImg[i].tileMatrixLabels,
                maximumLevel:EarthBaseConfig.WMTSLayerImg[i].maximumLevel,
                rectangle:Rectangle,
                show:EarthBaseConfig.WMTSLayerImg[i].show,
            });
            index = EarthBaseConfig.WMTSLayerImg[i].index;
            viewer.imageryLayers.addImageryProvider(WMTSLayer,index);
            if(EarthBaseConfig.WMTSLayerImg[i].show !== undefined){
                viewer.imageryLayers.get(i).show = EarthBaseConfig.WMTSLayerImg[i].show;
            }
        }
    }else {
        console.log("viewer is 视图未能初始化不可添加图层");
    }
}



import React, { useState, useEffect } from 'react'
import { Panel } from '@/components/Panel'
import { Button, Modal, Carousel } from 'antd'
import 'cesium/Build/Cesium/Widgets/widgets.css'
import './index.css'
import * as Cesium from 'cesium'
import CesiumNavigation from 'cesium-navigation-es6'

import { AddArcGISLayers } from '@/layers/Layer/ArcGISLayers'
import { AddWMTSLayers } from '@/layers/Layer/wmtsLayers'
import { AddTerrainLayers } from '@/layers/Layer/TerrainLayer'
import logo from '../../assets/images/ocbc.png'
// import { OpenPopdlg } from '@/layers/Entity/PickEnitydlg'
import ViewerBase from '@/layers/Scene/ViewerBase'
import LableEntityManage from '@/layers/Entity/AddLableLayer'
import { EarthBaseConfig } from '@/config/config'

import GlobeRotate from '@/utils/globeAround'
type Options = {
    defaultResetView: any
    enableCompass: boolean
    enableZoomControls: boolean
    enableDistanceLegend: boolean
    enableCompassOuterRing: boolean
}
const contentStyle: React.CSSProperties = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
}
let globeRotate: any = null
const PageSub1: React.FC = () => {
    let viewer: any = null
    let viewbase: any = null
    const MousePosition = {
        lon: 0,
        lat: 0,
        height: 0,
        heading: 0,
        pitch: 0,
        roll: 0,
    }
    const [position, setPosition] = useState(MousePosition)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [startAround, setIfAround] = useState(true)
    useEffect(() => {
        init3dViewer()
        if (viewer) {
            InitSceneData(viewer)
        }
    }, [])
    const init3dViewer = () => {
        window.Scene = {}
        //home键位置
        Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(60.0, 60.0, 160, 9.0)
        //token
        Cesium.Ion.defaultAccessToken = EarthBaseConfig.Cesiumtoken
        viewer = new Cesium.Viewer('CesiumContainer', {
            //allowDataSourcesToSuspendAnimation: true,
            homeButton: true,
            animation: true, //是否显示动画控件
            baseLayerPicker: false, //是否显示图层选择控件
            geocoder: false, //是否显示地名查找控件
            timeline: true, //是否显示时间线控件
            navigationHelpButton: false, //是否显示帮助信息控件
            infoBox: false, //是否显示点击要素之后显示的信息
            sceneModePicker: true, //是否显示3D/2D选择器
            vrButton: false, //双屏模式,默认不显示false
            fullscreenButton: false,
            // CreditsDisplay: true,
            selectionIndicator: false,
            // readonlysceneModePicker: true,
            // selectedEntity: true,
            shadows: false,
            creditContainer: document.createElement('DIV'),
            imageryProvider: undefined,
            // imageryProvider: new Cesium.MapboxImageryProvider({
            //     mapId: "mapbox.satellite",
            //     accessToken: "pk.eyJ1IjoiZGVuZ3plbmdqaWFuIiwiYSI6ImNqbGhnbWo1ZjFpOHEzd3V2Ynk1OG5vZHgifQ.16zy39I-tbQv3K6UnRk8Cw",
            // }),
            //terrainProvider : globe_terrainProvider,
            sceneMode: Cesium.SceneMode.SCENE3D, // Cesium.SceneMode.SCENE2D Cesium.SceneMode.COLUMBUS_VIEW
        })

        /**
         * 地形深度测试 开启或者关闭
         */
        viewer.scene.globe.depthTestAgainstTerrain = true

        //关闭fxaa  最新的cesium已经将fxaa移到PostProcessStageCollection
        viewer.scene.fxaa = false

        //cesium的label的清晰度
        viewer.scene.postProcessStages.fxaa.enabled = false

        //隐藏Cesium动画控制控件
        viewer.animation.container.style.visibility = 'hidden'

        //隐藏Cesium时间线控制控件
        viewer.timeline.container.style.visibility = 'hidden'

        //隐藏版本信息用CSS控制
        viewer.scene.postProcessStages.fxaa.enabled = false

        let options: Options = {} as Options

        // 用于在使用重置导航重置地图视图时设置默认视图控制。接受的值是Cesium.Cartographic 和 Cesium.Rectangle.
        options.defaultResetView = Cesium.Rectangle.fromDegrees(60.0, 60.0, 160, 8.0)

        // 用于启用或禁用罗盘。true是启用罗盘，false是禁用罗盘。默认值为true。如果将选项设置为false，则罗盘将不会添加到地图中。
        options.enableCompass = true

        // 用于启用或禁用缩放控件。true是启用，false是禁用。默认值为true。如果将选项设置为false，则缩放控件将不会添加到地图中。
        options.enableZoomControls = true

        // 用于启用或禁用距离图例。true是启用，false是禁用。默认值为true。如果将选项设置为false，距离图例将不会添加到地图中。
        options.enableDistanceLegend = true

        // 用于启用或禁用指南针外环。true是启用，false是禁用。默认值为true。如果将选项设置为false，则该环将可见但无效。
        options.enableCompassOuterRing = true

        new CesiumNavigation(viewer, options)

        if (viewer) {
            window.Scene.viewer = viewer
            viewbase = new ViewerBase(viewer)
            viewbase.getCurMousePosition(callbackUPDataPosition)
            globeRotate = new GlobeRotate(viewer)
            globeRotate.start()
            let lable = new LableEntityManage(window.Scene.viewer)
            lable.AddLabeentity()
            createPrimitives()
            OpenPopdlg()
            drawLines()
        }
        // return viewer
    }
    const InitSceneData = async (viewer: any) => {
        await new AddWMTSLayers(viewer)
        await AddArcGISLayers(viewer)

        // await AddTerrainLayers(viewer);

        var shapemapbox = new Cesium.ArcGisMapServerImageryProvider({
            url: 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer',
        })
        viewer.imageryLayers.addImageryProvider(shapemapbox, 5)
    }
    const callbackUPDataPosition = (
        lon: number,
        lat: number,
        height: number,
        heading: number,
        pitch: number,
        roll: number
    ) => {
        setPosition({
            lon,
            lat,
            height,
            heading,
            pitch,
            roll,
        })
    }
    const goToShanghai = () => {
        globeRotate.stop()
        activeFlytoViwer([121.5354, 31.226, 1000], -10, -10, 0)
    }

    const goToShenzhen = () => {
        globeRotate.stop()
        console.log(globeRotate)
    }
    const toggleAround = () => {
        if (startAround) {
            globeRotate.stop()
        } else {
            globeRotate.start()
        }
        setIfAround(!startAround)
    }
    const handleCloseModal = () => {
        setIsModalOpen(false)
    }
    const drawLines = () => {
        //     const purpleArrow = window.Scene.viewer.entities.add({
        //         name: 'Purple straight arrow at height',
        //         polyline: {
        //             positions: Cesium.Cartesian3.fromDegreesArrayHeights([
        //                 -75,
        //                 43,
        //                 500000,
        //                 -125,
        //                 43,
        //                 500000,
        //             ]),
        //             width: 10,
        //             arcType: Cesium.ArcType.NONE,
        //             material: new Cesium.PolylineArrowMaterialProperty(Cesium.Color.PURPLE),
        //         },
        //     })

        const czml = [
            {
                id: 'document',
                name: 'CZML Geometries: Polyline',
                version: '1.0',
            },
            {
                id: 'toShanghai',
                name: 'Purple arrow at height',
                polyline: {
                    positions: {
                        cartographicDegrees: [103.83, 1.36, 500000, 121.495, 31.24, 500000],
                    },
                    material: {
                        polylineArrow: {
                            color: {
                                rgba: [148, 0, 211, 255],
                            },
                        },
                    },

                    width: 6,
                    clampToGround: true,
                },
            },
            {
                id: 'toShenzhen',
                name: 'Purple arrow at height',
                polyline: {
                    positions: {
                        cartographicDegrees: [103.83, 1.36, 500000, 110.66, 21.35, 500000],
                    },
                    material: {
                        polylineArrow: {
                            color: {
                                rgba: [148, 0, 211, 255],
                            },
                        },
                    },
                    // arcType: 'NONE',
                    width: 6,
                    clampToGround: true,
                },
            },
            {
                id: 'purple',
                name: 'toLondon',
                polyline: {
                    positions: {
                        cartographicDegrees: [103.83, 1.36, 500000, -2.24, 53.2, 500000],
                    },
                    material: {
                        polylineArrow: {
                            color: {
                                rgba: [148, 0, 211, 255],
                            },
                        },
                    },
                    // arcType: 'NONE',
                    width: 6,
                    clampToGround: true,
                },
            },
            {
                id: 'toWashington',
                name: 'Purple arrow at height',
                polyline: {
                    positions: {
                        cartographicDegrees: [103.83, 1.36, 500000, -68.9, 46.09, 500000],
                    },
                    material: {
                        polylineArrow: {
                            color: {
                                rgba: [148, 0, 211, 255],
                            },
                        },
                    },
                    // arcType: 'NONE',
                    width: 6,
                    clampToGround: true,
                },
            },
        ]

        const dataSourcePromise = Cesium.CzmlDataSource.load(czml)
        window.Scene.viewer.dataSources.add(dataSourcePromise)
    }

    const createPrimitives = () => {
        let rectangle = window.Scene.viewer.scene.primitives.add(
            new Cesium.Primitive({
                geometryInstances: new Cesium.GeometryInstance({
                    geometry: new Cesium.RectangleGeometry({
                        rectangle: Cesium.Rectangle.fromDegrees(80.0, 25.0, 130.0, 45.0),
                        vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
                    }),
                }),
                appearance: new Cesium.EllipsoidSurfaceAppearance({
                    aboveGround: false,
                    // material: new Cesium.Material({
                    //     fabric: {
                    //         type: 'SpecularMap',
                    //         uniforms: {
                    //             image: 'static/media/ocbc.png',
                    //             channel: 'r',
                    //         },
                    //     },
                    // }),
                }),
            })
        )
    }
    const OpenPopdlg = () => {
        let scene = window.Scene.viewer.scene
        var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas)
        handler.setInputAction(function(movement) {
            var pick = scene.pick(movement.position)
            if (pick != null && pick.id.id == 'polyline') {
                console.log('6666666666', pick.id.id)
                setIsModalOpen(true)
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
    }
    const addLoopPolyline = () => {}
    /**
     * 重写场景飞行定位类
     */
    const activeFlytoViwer = (position: any, heading: number, pitch: number, roll: number) => {
        window.Scene.viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(position[0], position[1], position[2]),
            complete: () => {
                setTimeout(() => {
                    // const polylines = new Cesium.PolylineCollection()
                    window.Scene.viewer.entities.add({
                        name: '边界',
                        id: 'polyline',
                        position: Cesium.Cartesian3.fromDegrees(121.53626, 31.2269, 0),
                        label: {
                            //文字标签
                            text: 'ocbc tower',
                            font: '500 30px Helvetica', // 15pt monospace
                            scale: 0.5,
                            style: Cesium.LabelStyle.FILL,
                            fillColor: Cesium.Color.WHITE,
                            showBackground: true,
                            backgroundColor: new Cesium.Color(26 / 255, 196 / 255, 228 / 255, 1.0),
                        },
                        polyline: new Cesium.PolylineGraphics({
                            positions: Cesium.Cartesian3.fromDegreesArray([
                                121.53626,
                                31.2269,
                                121.5342,
                                31.2262,
                                121.53468,
                                31.225,
                                121.53677,
                                31.2262,
                                121.53626,
                                31.2269,
                            ]),
                            material: Cesium.Color.BROWN,
                            width: 3.0,
                            clampToGround: true,
                        }),
                    })
                }, 500)
            },
        })
    }
    return (
        <Panel>
            <div>
                <section className="operate_button">
                    <Button onClick={goToShanghai}>上海</Button>
                    <Button onClick={goToShenzhen}>深圳</Button>
                    <Button onClick={toggleAround}>{startAround ? '停止' : '转动'}</Button>
                </section>
                <div className="status_location">
                    <label className="coordinate_location">
                        经度:{position.lon}°， 纬度:{position.lat}°， 视角海拔高度:{position.height}
                        米
                    </label>
                    <label id="coordinate_cameraheight">
                        航向角 {position.heading}°， 俯仰角 {position.pitch}°，滚转角{position.roll}
                    </label>
                </div>
                <div id="CesiumContainer"></div>
            </div>
            <Modal
                title="Basic Modal"
                visible={isModalOpen}
                onOk={handleCloseModal}
                onCancel={handleCloseModal}
            >
                <Carousel autoplay>
                    <div>
                        <h3 style={contentStyle}>1</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>2</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>3</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>4</h3>
                    </div>
                </Carousel>
            </Modal>
        </Panel>
    )
}
export default PageSub1

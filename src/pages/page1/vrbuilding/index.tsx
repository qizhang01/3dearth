import * as React from 'react'
import { Select } from 'antd'
import { Panel } from '@/components/Panel'
import * as Cesium from 'cesium'
import './index.css'
const { Option } = Select
let viewer: any = null
let osmBuildingsTileset: any = null

const Vrbuilding: React.FC = () => {
    React.useEffect(() => {
        init3dViewer()
    }, [])

    const init3dViewer = () => {
        viewer = new Cesium.Viewer('buildingContainer', {
            homeButton: false,
            animation: false, //是否显示动画控件
            baseLayerPicker: false, //是否显示图层选择控件
            geocoder: false, //是否显示地名查找控件
            timeline: false, //是否显示时间线控件
            navigationHelpButton: false, //是否显示帮助信息控件
            infoBox: false, //是否显示点击要素之后显示的信息
            sceneModePicker: false, //是否显示3D/2D选择器
            vrButton: false, //双屏模式,默认不显示false
            fullscreenButton: false,
            selectionIndicator: false,
            shadows: true,
            shouldAnimate: true,
            terrainProvider: Cesium.createWorldTerrain(),
        })
        const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)

        // Add Cesium OSM buildings to the scene as our example 3D Tileset.
        osmBuildingsTileset = Cesium.createOsmBuildings()
        viewer.scene.primitives.add(osmBuildingsTileset)

        // Set the initial camera to look at Seattle
        viewer.scene.camera.setView({
            destination: Cesium.Cartesian3.fromDegrees(-122.3472, 47.598, 370),
            orientation: {
                heading: Cesium.Math.toRadians(10),
                pitch: Cesium.Math.toRadians(-10),
            },
        })

        colorByMaterial()
        setTimeout(() => {
            createModel('glb/Air.glb', 500)
        }, 2000)
    }

    const colorByMaterial = () => {
        osmBuildingsTileset.style = new Cesium.Cesium3DTileStyle({
            defines: {
                material: "${feature['building:material']}",
            },
            color: {
                conditions: [
                    ['${material} === null', "color('white')"],
                    ["${material} === 'glass'", "color('skyblue', 0.5)"],
                    ["${material} === 'concrete'", "color('grey')"],
                    ["${material} === 'brick'", "color('indianred')"],
                    ["${material} === 'stone'", "color('lightslategrey')"],
                    ["${material} === 'metal'", "color('lightgrey')"],
                    ["${material} === 'steel'", "color('lightsteelblue')"],
                    ['true', "color('white')"], // This is the else case
                ],
            },
        })
    }
    // "../SampleData/models/CesiumAir/Cesium_Air.glb",
    // 5000.0
    const createModel = (url: string, height: number) => {
        viewer.entities.removeAll()
        // const position = Cesium.Cartesian3.fromDegrees(-122.3472, 47.518, height)
        // const heading = Cesium.Math.toRadians(-90)
        // const pitch = 0
        // const roll = 0
        // const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll)
        // const orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr)

        //Set bounds of our simulation time
        const start = Cesium.JulianDate.fromDate(new Date())
        const stop = Cesium.JulianDate.addSeconds(start, 360, new Cesium.JulianDate())

        //Make sure viewer is at the desired time.
        viewer.clock.startTime = start.clone()
        viewer.clock.stopTime = stop.clone()
        viewer.clock.currentTime = start.clone()
        viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP //Loop at the end
        viewer.clock.multiplier = 10

        //Generate a random circular pattern with varying heights.
        function computeCirclularFlight(lon: number, lat: number, radius: number) {
            const property = new Cesium.SampledPositionProperty()

            const time1 = Cesium.JulianDate.addSeconds(start, 100, new Cesium.JulianDate())
            const position1 = Cesium.Cartesian3.fromDegrees(-122.3472, 47.408, 370)

            property.addSample(time1, position1)

            const time2 = Cesium.JulianDate.addSeconds(start, 260, new Cesium.JulianDate())
            const position2 = Cesium.Cartesian3.fromDegrees(-122.3472, 47.598, 370)

            property.addSample(time2, position2)

            return property
        }

        //Compute the entity position property.
        const position1 = computeCirclularFlight(-112.110693, 36.0994841, 0.03)

        const entity = viewer.entities.add({
            name: url,
            //Set the entity availability to the same interval as the simulation time.
            availability: new Cesium.TimeIntervalCollection([
                new Cesium.TimeInterval({
                    start: start,
                    stop: stop,
                }),
            ]),
            //Show the path as a pink line sampled in 1 second increments.
            path: {
                resolution: 1,
                material: new Cesium.PolylineGlowMaterialProperty({
                    glowPower: 0.1,
                    color: Cesium.Color.YELLOW,
                }),
                width: 10,
            },
            position: position1,
            orientation: new Cesium.VelocityOrientationProperty(position1),
            model: {
                uri: url,
                minimumPixelSize: 128,
                maximumScale: 20000,
            },
        })
        viewer.trackedEntity = entity
    }

    const colorChange = () => {
        osmBuildingsTileset.style = new Cesium.Cesium3DTileStyle({
            color: {
                conditions: [
                    [
                        "${feature['building']} === 'apartments' || ${feature['building']} === 'residential'",
                        "color('cyan', 0.9)",
                    ],
                    [true, "color('white')"],
                ],
            },
        })
    }
    const handleChange = (value: string) => {
        if (value == '1') {
            colorByMaterial()
        } else if (value == '2') {
            colorChange()
        }
    }
    return (
        <Panel>
            <div className="container_view">
                <div id="buildingContainer" style={{ height: '100%' }}></div>
                <Select
                    defaultValue="1"
                    style={{ width: 120 }}
                    onChange={handleChange}
                    className="style_select"
                >
                    <Option value="1">默认颜色</Option>
                    <Option value="2">换肤功能</Option>
                </Select>
            </div>
        </Panel>
    )
}

export default Vrbuilding

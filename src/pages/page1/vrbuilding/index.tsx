import * as React from 'react'
import { Button } from 'antd'
import { Panel } from '@/components/Panel'
import * as Cesium from 'cesium'

let viewer: any = null

const Vrbuilding: React.FC = () => {
    React.useEffect(() => {
        init3dViewer()
    }, [])

    const init3dViewer = () => {
        viewer = new Cesium.CesiumWidget('buildingContainer', {
            terrainProvider: Cesium.createWorldTerrain(),
        })
        const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)

        // Add Cesium OSM buildings to the scene as our example 3D Tileset.
        const osmBuildingsTileset = Cesium.createOsmBuildings()
        viewer.scene.primitives.add(osmBuildingsTileset)

        // Set the initial camera to look at Seattle
        viewer.scene.camera.setView({
            destination: Cesium.Cartesian3.fromDegrees(-122.3472, 47.598, 370),
            orientation: {
                heading: Cesium.Math.toRadians(10),
                pitch: Cesium.Math.toRadians(-10),
            },
        })

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
        colorByMaterial()
    }
    // "../SampleData/models/CesiumAir/Cesium_Air.glb",
    // 5000.0
    const createModel = (url: string, height: number) => {
        viewer.entities.removeAll()

        const position = Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0503706, height)
        const heading = Cesium.Math.toRadians(135)
        const pitch = 0
        const roll = 0
        const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll)
        const orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr)

        const entity = viewer.entities.add({
            name: url,
            position: position,
            orientation: orientation,
            model: {
                uri: url,
                minimumPixelSize: 128,
                maximumScale: 20000,
            },
        })
        viewer.trackedEntity = entity
    }

    return (
        <Panel>
            <div id="buildingContainer"></div>
        </Panel>
    )
}

export default Vrbuilding

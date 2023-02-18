import React, { useEffect, useRef } from "react";
import { 
    ArcRotateCamera,
    UniversalCamera,
    CubeTexture,
    Scene,
    Engine,
    HemisphericLight,
    MeshBuilder,
    Mesh,
    Animation,
    SceneLoader,
    Angle,
    Vector3
} from "@babylonjs/core"
import '@babylonjs/loaders'; 
import PropertyList from "@/components/property-list/propertylist";
import Card from "@/components/card/card";
import {getProperties} from "@/services/getProperties"

export default function Metaverse() {

    const [isOpen, setIsOpen] = React.useState(false);
    const [properties, setProperties] = React.useState([]);
    const [metaverseIndex, setMetaverseIndex] = React.useState(-1);
    // const [scene, setScene] = React.useState(null);
    // const [engine, setEngine] = React.useState(null);
    let reactCanvas = useRef();
    let canvas;
    let scene;
    let engine;
    let homeModel;
    useEffect(() => {
        startRender();
        getpropertyList();
        setIsOpen(true);
    }, [])

    const startRender = () => {
        console.log("Start render call !");
        canvas = reactCanvas.current;
        // const engine = new Engine(canvas, antialias, engineOptions, adaptToDeviceRatio);
        console.log("canvas ===>",  canvas);
        engine = new Engine(canvas);
        // setEngine(engine)
        // Create a S scene
        scene = new Scene(engine);
        // setScene(scene);
        // const planeOptions = {
        //     size: 1,
        //     width: 1500,
        //     height: 1500,
        //     updatable: true,
        //     sideOrientation: 180
        // };
        // const plane = Mesh.CreatePlane("plane", 1, scene, true, 1);
        // plane.rotation = 1.5
        hdraEnv(scene);
        // Create a camera to view the scene
        const camera = new ArcRotateCamera(
                "Camera",
                6,
                1.56,
                20,
                new Vector3(4, 2, 2),
                scene
        ); 
        camera.attachControl(canvas, true); 
        camera.upperBetaLimit = Angle.FromDegrees(98).radians();
        camera.lowerBetaLimit = Angle.FromDegrees(63).radians();
        camera.lowerRadiusLimit = 0;
        camera.upperRadiusLimit = 8;
        camera.inputs.remove(camera.inputs.attached.keyboard);
        camera.checkCollisions=true;

        // Create a light to illuminate the scene 
        const light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene); 
        light.intensity = 0.7;
        engine.runRenderLoop(() => {
            if (scene) {
                scene.render();
            }
        });
        window.addEventListener("resize", function () {
            engine?.resize();
        });
    }

    const loadHome = async (homeUrl, scene) => {
        homeModel = await SceneLoader.ImportMesh(
            "",
            homeUrl,
            null,
            scene,
            (scene) => {
                console.log("home loaded success callback --->", scene)
            }
          );
    }

    const hdraEnv = (scene) => {
        scene.environmentTexture = new CubeTexture(
            "assets/texture/environment/environment.env",
            scene
          );
        // Import the .env file as a CubeTexture
        const texture = new CubeTexture("worldhomesenv3.env", scene);
        // Create a skybox mesh using this texture
        const skybox = scene.createDefaultSkybox(texture, false, 1000, 0, true);
    }

    const getpropertyList = () => {
        getProperties().then(list => {
            console.log('List from api ---->', list.data);
            setProperties(list.data);
        });
    }

    const changeHome = (id) => {
        const selectedHome = properties.findIndex((item) => item.id===id );
        setMetaverseIndex(selectedHome);
        console.log('scene inside change home', scene);
        if(scene)  scene.dispose();
        startRender();
        loadHome(properties[selectedHome].objectURL, scene, engine)
    }

    return <>
        <div className="bg-white">
            <PropertyList isOpen={isOpen} setIsOpen={setIsOpen}>
                {properties.map((property, index) => (
                    <Card property={property} key={index} changeHome={changeHome} />
                ))}
            </PropertyList>
            <canvas className="h-screen outline-none" ref={reactCanvas} />
        </div>
    </>;
}

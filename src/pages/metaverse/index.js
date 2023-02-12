import React, { useEffect, useRef } from "react";
import { 
    ArcRotateCamera,
    Scene,
    Engine,
    HemisphericLight,
    MeshBuilder,
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
    let reactCanvas = useRef();
    let canvas;
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
        const engine = new Engine(canvas);
        // Create a S scene
        const scene = new Scene(engine);

        // Create a camera to view the scene
        const camera = new ArcRotateCamera(
                "Camera",
                1.575301819374367,
                1.48,
                6,
                new Vector3(-2, 0.2, 4),
                scene
        ); 
        camera.attachControl(canvas, true); 
        camera.upperBetaLimit = Angle.FromDegrees(98).radians();
        camera.lowerBetaLimit = Angle.FromDegrees(63).radians();
        camera.lowerRadiusLimit = 0;
        camera.upperRadiusLimit = 8;
        camera.inputs.remove(camera.inputs.attached.keyboard);

        // Create a light to illuminate the scene 
        const light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene); 
        light.intensity = 0.7;

        loadHome("Modern Home.obj", scene, engine)
        engine.runRenderLoop(() => {
            if (scene) {
                scene.render();
            }
        });
        window.addEventListener("resize", function () {
            engine?.resize();
        });
    }

    const loadHome = (homeUrl, scene) => {
        SceneLoader.Append(
            "/assets/homes/home3/",
            homeUrl,
            scene,
            (scene) => {
                console.log("home loaded success callback --->", scene)
            }
          );
    }

    const getpropertyList = () => {
        getProperties().then(list => {
            console.log('List from api ---->', list.data);
            setProperties(list.data);
        });
    }

    return <>
        <div className="bg-white">
            <PropertyList isOpen={isOpen} setIsOpen={setIsOpen}>
                {properties.map((property, index) => (
                    <Card property={property} key={index}></Card>
                ))}
            </PropertyList>
            <canvas className="h-screen outline-none" ref={reactCanvas} />
        </div>
    </>;
}

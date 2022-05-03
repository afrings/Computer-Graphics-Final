import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

// define your vehicles here - remember, they need to be imported
// into the "main" program

export class unicycle extends GrObject {
    constructor() {
        let body = new T.Group();
        body.translateY(0.3);
        let barGeometry = new T.CylinderGeometry(0.125,0.125,2,20,20);
        let tl = new T.TextureLoader().load("../textures/metal.png");
        let material = new T.MeshStandardMaterial({
            color: 'white',
            roughness: 0.25,
            map: tl
        });
        let tireMaterial = new T.MeshStandardMaterial({color:'#545863'});

        let bar = new T.Mesh(barGeometry, material);
        bar.translateY(2);
        bar.translateZ(0.25);
        body.add(bar);
        bar = new T.Mesh(barGeometry, material);
        bar.translateY(2);
        bar.translateZ(-0.25);
        body.add(bar);

        let wheel = new T.Group();
        let i = 0;
        while (i < Math.PI * 2){
            bar = new T.Mesh(barGeometry, material);
            bar.scale.set(0.25,1,0.25);
            bar.translateY(1);
            wheel.add(bar);
            bar.rotateZ(i);
            i = i + Math.PI/5;

            bar = new T.Mesh(barGeometry, tireMaterial);
            bar.translateY(1);
            wheel.add(bar);
            bar.rotateZ(i);
            bar.rotateZ(Math.PI/2);
            bar.translateX(1);
            bar.scale.set(0.4,0.34,0.8);
        }
        wheel.scale.set(1.3,1.3,1);
        body.add(wheel);

        bar = new T.Mesh(barGeometry, material);
        bar.translateY(3);
        bar.rotateX(Math.PI/2);
        bar.scale.set(1,0.3,1);
        body.add(bar);

        bar = new T.Mesh(barGeometry, material);
        bar.translateY(3.7);
        bar.scale.set(1,0.8,1);
        body.add(bar);

        let seat = new T.Mesh(new T.CylinderGeometry(0.6,1.3,2.8,20,20), tireMaterial);
        seat.translateY(4.5);
        seat.rotateZ(Math.PI/2);
        seat.translateY(0.1);
        seat.scale.set(0.2,0.5,0.5);
        seat.rotateZ(Math.PI/20);
        body.add(seat);

        body.scale.set(0.5,0.5,0.5);

        super("building", body);
    }
}
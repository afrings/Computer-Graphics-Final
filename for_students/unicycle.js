import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { ShaderMaterial } from "../libs/CS559-Three/build/three.module.js";

// define your vehicles here - remember, they need to be imported
// into the "main" program

export class Unicycle extends GrObject {
    constructor() {
        let body = new T.Group();
        super("Unicycle", body);

        let shaderMat = new ShaderMaterial("./shaders/10-09-03.vs", "./shaders/10-09-03.fs", {
            side: T.DoubleSide,
            uniforms: {
                x:{value:0}
            },
        })

        body.translateY(0.3);
        let barGeometry = new T.CylinderGeometry(0.125,0.125,2,20,20);
        let tl = new T.TextureLoader().load("images/metal.jpg");
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

        this.wheel = new T.Group();
        this.wheel.translateY(1);
        let i = 0;
        while (i < Math.PI * 2){
            bar = new T.Mesh(barGeometry, shaderMat);
            bar.scale.set(0.25,1,0.25);
            this.wheel.add(bar);
            bar.rotateZ(i);
            i = i + Math.PI/5;

            bar = new T.Mesh(barGeometry, tireMaterial);
            this.wheel.add(bar);
            bar.rotateZ(i);
            bar.rotateZ(Math.PI/2);
            bar.translateX(1);
            bar.scale.set(0.4,0.34,0.8);
        }
        this.wheel.scale.set(1.3,1.3,1);
        body.add(this.wheel);

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
    }
    stepWorld(delta){
        this.wheel.rotateZ(delta/500);
    }
}
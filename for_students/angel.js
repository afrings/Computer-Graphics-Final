import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { Vector3 } from "../libs/CS559-Three/build/three.module.js";
import { OrbitControls } from "../libs/CS559-Three/examples/jsm/controls/OrbitControls.js";

export class SphereAngel extends GrObject {
    /**
   * an angel according to the Bible
   *
   * @param {Object} params
   */
    constructor (active_camera) {
        let group = new T.Group();
        super("SphereAngel", group);

        this.open = 0;
        this.active_camera = active_camera;

        this.angel = group;

        this.eye = new T.Group();
        this.angel.add(this.eye);

        let tveins = new T.TextureLoader().load("images/whiteveins.jpg");
        let white = new T.Mesh(new T.SphereGeometry(5,20,20), new T.MeshStandardMaterial({map:tveins}));
        white.scale.set(1,1,1);
        white.rotateY(Math.PI/2);
        this.eye.add(white);

        let tiris = new T.TextureLoader().load("images/watertexture.jpg");
        this.iris = new T.Mesh(new T.SphereGeometry(2.4,20,20), new T.MeshStandardMaterial({map:tiris}));
        this.iris.translateZ(4.3);
        this.iris.scale.set(1,1,0.3);
        this.eye.add(this.iris)

        this.pupil = new T.Mesh(new T.SphereGeometry(1,20,20), new T.MeshStandardMaterial({color:'black'}));
        this.eye.add(this.pupil);
        this.pupil.translateZ(4.9);
        this.pupil.scale.set(1,1,0.2);

        let tlid = new T.TextureLoader().load("images/eyelid.jpg");
        this.upperLid = new T.Mesh(new T.SphereGeometry(5.2,20,20,2*Math.PI, Math.PI), new T.MeshStandardMaterial({side: T.DoubleSide, map: tlid}));
        this.lowerLid = new T.Mesh(new T.SphereGeometry(5.22,20,20,2*Math.PI, Math.PI), new T.MeshStandardMaterial({side: T.DoubleSide, map: tlid}));
        this.eye.add(this.upperLid)
        this.eye.add(this.lowerLid);
        this.upperLid.rotateX(-Math.PI/1.5);
        this.lowerLid.rotateX(Math.PI/1.5);

        this.ring = new T.Group();
        this.angel.add(this.ring);
        let ringGeometry = new T.TorusGeometry(8, 1.5, 20, 50);
        let ringMaterial = new T.MeshStandardMaterial({map:tlid});
        this.smallRingGroup = new T.Group();
        this.ring.add(this.smallRingGroup);
        this.smallRing = new T.Mesh(ringGeometry, ringMaterial);
        this.smallRingGroup.add(this.smallRing);
        this.smallRingGroup.scale.set(1,1,0.75);

        this.eyes = [];
        for (let i = 0; i < 42; i++){
            let eyeClone = this.eye.clone(true);
            this.smallRingGroup.add(eyeClone);
            this.eyes.push(eyeClone);
            eyeClone.scale.set(0.25,0.25,0.25);
            eyeClone.rotateY(-Math.PI/2);
            eyeClone.rotateX(i*19);
            eyeClone.translateZ(9);
            eyeClone.rotateZ(Math.PI/2)
        }
        
        this.mediumRingGroup = this.smallRingGroup.clone(true);
        this.angel.add(this.mediumRingGroup);
        this.mediumRingGroup.scale.set(1.6,1.6,1.2);

        this.smallRingGroup.rotateX(Math.PI/2);
        this.smallRingGroup.rotateY(Math.PI/6);
        this.smallRingGroup.rotateX(Math.PI/6);

        this.mediumRingGroup.rotateX(Math.PI/6);
    }
    stepWorld(delta){
        let time = delta/2000;
        if (this.open > 0){
            this.open = this.open - 1;
            this.upperLid.rotateX(-Math.PI/180);
            this.lowerLid.rotateX(Math.PI/180);
            this.pupil.scale.y += 0.008;
            this.pupil.scale.x += 0.008;
        } else if (this.open > -600){
            this.open = this.open - 1;
        } else if (this.open > -630){
            this.open = this.open - 1;
            this.upperLid.rotateX(Math.PI/180);
            this.lowerLid.rotateX(-Math.PI/180);
            this.pupil.scale.y -= 0.008;
            this.pupil.scale.x -= 0.008;
        } else {
            this.open = 30;
        }

        this.mediumRingGroup.rotateZ(time*4 + this.open*(time/25));
        this.mediumRingGroup.rotateY(time*5);
        this.eye.lookAt(this.active_camera.position.x, this.active_camera.position.y, this.active_camera.position.z);
        //this.smallRingGroup.lookAt(this.active_camera.position.x, this.active_camera.position.y, this.active_camera.position.z);
        this.smallRingGroup.rotateZ(-time*2 + (this.open+10)*(time/25));
        this.smallRingGroup.rotateY(-time*3);
    }
}
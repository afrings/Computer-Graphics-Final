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
    constructor (humans, world) {
        let group = new T.Group();
        super("WheelAngel", group);

        this.open = 0;
        this.moveUp = 0;
        this.floatspeed = 2.5;
        this.direction = 1;
        this.humans = humans;
        this.human = this.humans.shift().objects[0];
        this.judgementCount = 0;
        this.judgement = 0;
        this.world = world;

        this.angel = new T.Group;
        group.add(this.angel);

        this.eye = new T.Group();
        this.angel.add(this.eye);

        let tveins = new T.TextureLoader().load("images/whitevein.jpg");
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
        this.smallRingGroup.scale.set(1,1,1);

        this.eyes = [];
        for (let i = 0; i < 30; i++){
            let eyeClone = this.eye.clone(true);
            this.smallRingGroup.add(eyeClone);
            this.eyes.push(eyeClone);
            eyeClone.scale.set(0.25,0.25,0.25);
            eyeClone.rotateY(-Math.PI/2);
            eyeClone.rotateX(i*2);
            eyeClone.translateZ(9.5);
        }
        
        this.mediumRingGroup = this.smallRingGroup.clone(true);
        this.angel.add(this.mediumRingGroup);
        this.mediumRingGroup.scale.set(1.7,1.7,1.7);

        this.smallRingGroup.rotateX(Math.PI/2);
        this.smallRingGroup.rotateY(Math.PI/6);
        this.smallRingGroup.rotateX(Math.PI/6);

        this.mediumRingGroup.rotateX(Math.PI/6);

        this.innereye = new T.Group();
        this.angel.add(this.innereye);
        this.innereye.add(new T.Mesh(new T.SphereGeometry(1, 20,20)));
        this.innereye.position.set(this.eye.position.x, this.eye.position.y, this.eye.position.z);

        this.heavenBeam = new T.Mesh(new T.CylinderGeometry(0.5,0.5,1000,20), new T.MeshStandardMaterial({opacity:0.0, transparent:true, color:'white'}));
        group.add(this.heavenBeam);
        this.heavenBeam.translateZ(25.25);
        this.heavenBeam.translateY(-465);
        this.heavenBeam.translateX(-0.1);
        
        this.hellBeam = new T.Mesh(new T.CylinderGeometry(0.5,0.5,1000,20), new T.MeshStandardMaterial({opacity:0.0, transparent:true, color:'red'}));
        group.add(this.hellBeam);
        this.hellBeam.translateZ(25.25);
        this.hellBeam.translateY(-465);
        this.hellBeam.translateX(-0.1);
    }
    stepWorld(delta){
        let time = delta/2000;
        this.judgementCount += time;
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

        for (let i = 0; i < this.eyes.length; i++){
            if (0 == 0){
                this.eyes[i].lookAt(this.human.position.x, this.human.position.y, this.human.position.z);
            }
        }

        for (let i = 0; i < this.mediumRingGroup.layers.length; i++){
            this.mediumRingGroup.layers[i].lookAt(this.human.position.x, this.human.position.y, this.human.position.z);
        }

        this.mediumRingGroup.rotateZ(time*4 + this.open*(time/25));
        this.mediumRingGroup.rotateY(time*5);
        this.smallRingGroup.rotateZ(-time + (this.open+10)*(time/25));
        this.smallRingGroup.rotateY(-time*3);

        this.innereye.lookAt(this.human.position.x, this.human.position.y, this.human.position.z);
        this.eye.quaternion.slerp(this.innereye.quaternion, time*10);

        
        if (this.angel.position.y > 7){
            this.direction = -1;
        } else if (this.angel.position.y < 3){
            this.direction = 1;
        }
        this.angel.translateY(time * this.floatspeed * this.direction);

        if((this.human.position.y >= 300 || this.human.position.y < -300)){
            if (this.judgementCount > 3){
                console.log(this.world)
                this.human = this.humans.shift().objects[0];
                this.judgementCount = 0;
                this.judgement = 0;
            }
            if(this.heavenBeam.material.opacity > 0.0){
                this.heavenBeam.material.opacity -= 0.05;
            }
            if(this.hellBeam.material.opacity > 0.0){
                this.hellBeam.material.opacity -= 0.05;
            }
        }
        if(this.human != undefined){
            if(this.judgementCount > 1.8){
                if(this.judgement == -1){
                    if(this.heavenBeam.material.opacity > 0.0){
                        this.heavenBeam.material.opacity -= 0.01;
                    }
                    if(this.hellBeam.material.opacity < 0.5){
                        this.hellBeam.material.opacity += 0.01;
                    }
                } else if (this.judgement == 1){
                    if(this.heavenBeam.material.opacity < 0.5){
                        this.heavenBeam.material.opacity += 0.01;
                    }
                    if(this.hellBeam.material.opacity > 0.0){
                        this.hellBeam.material.opacity -= 0.01;
                    }
                }
            }
            if(this.judgement == 0){
                this.judgement = Math.floor(Math.random()*3)-1;
            } else if (this.human.position.y < 15 && this.human.position.z > 10 && this.judgementCount < 2){
                this.human.translateY(time*15);
                this.human.translateZ(time*-5);
            } else if (this.judgementCount > 2 && this.human.position.y < 300) {
                this.human.translateY(time*600 * this.judgement);
                if(this.judgementCount > 2){
                    for (let i = 0; i < this.humans.length; i++){
                        if(this.humans[0].objects[0].position.z > 50){
                            this.humans[i].objects[0].translateZ(-time*10);
                        }
                    }
                }
            }
        }
    }
}
import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { Vector3 } from "../libs/CS559-Three/build/three.module.js";
import { OrbitControls } from "../libs/CS559-Three/examples/jsm/controls/OrbitControls.js";

export class Gate extends GrObject {
    /**
   * an angel according to the Bible
   *
   * @param {Object} params
   */
    constructor () {
        let group = new T.Group();
        super("Gate", group);

        this.leftdoor = new T.Group();
        this.rightdoor = new T.Group();
        group.add(this.leftdoor);
        group.add(this.rightdoor);
        this.leftdoor.translateX(-30);
        this.rightdoor.translateX(30);
        group.translateX(200);
        

        let tgold = new T.TextureLoader().load("images/goldtexture.jpg");
        let tmarble = new T.TextureLoader().load("images/marbletexture.jpg");
        let poleGeometry = new T.CylinderGeometry(2,2,60);
        let goldTexture = new T.MeshStandardMaterial({map:tgold});
        let pole = new T.Mesh(poleGeometry, goldTexture);
        let ball = new T.Mesh(new T.SphereGeometry(4,20,20), new T.MeshStandardMaterial({map:tmarble}));
        let base = new T.Mesh(new T.BoxGeometry(10,5,10), new T.MeshStandardMaterial({map:tmarble}));
        for( let i = 1; i < 100; i++){
            let newPole = pole.clone();
            let newBall = ball.clone();
            let topBall = ball.clone();
            let newBase = base.clone();
            this.leftdoor.add(newPole);
            this.leftdoor.add(newBall);
            this.leftdoor.add(topBall);
            this.leftdoor.add(newBase);
            newPole.translateX(-i * 10);
            newBall.translateX(-i * 10);
            newBall.translateY(Math.cos(Math.PI/4 * i)*8);
            topBall.translateX(-i * 10);
            topBall.translateY(30);
            newBase.translateX(-i * 10);
            newBase.translateY(-30)

            newPole = pole.clone();
            newBall = ball.clone();
            topBall = ball.clone();
            newBase = base.clone();
            this.rightdoor.add(newPole);
            this.rightdoor.add(newBall);
            this.rightdoor.add(topBall);
            this.rightdoor.add(newBase);
            newPole.translateX(i*10);
            newBall.translateX(i * 10);
            newBall.translateY(Math.cos(Math.PI/4 * i)*8);
            topBall.translateX(i * 10);
            topBall.translateY(30);
            newBase.translateX(i * 10);
            newBase.translateY(-30);
        }
    }
}
import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { GLTFLoader } from "../libs/CS559-Three/examples/jsm/loaders/GLTFLoader.js";

let humanCount = 0;
const loader = new GLTFLoader();
let humanModel = await loader.loadAsync("3DModels/human.gltf");
export class Human extends GrObject {
    /**
   * an angel according to the Bible
   *
   * @param {Object} params
   */
    constructor (id) {
        let group = new T.Group();
        let human = humanModel.scene.clone();
        super(`human-${++humanCount}`, group);
        this.time = 0;
        this.id = id;
        this.forward = 0;
        this.ridepoint = new T.Object3D();
        this.rideable = this.ridepoint;
        group.add(this.ridepoint);
        this.ridepoint.position.x = human.position.x;
        this.ridepoint.position.y = human.position.y;
        this.ridepoint.position.z = human.position.z;

        this.ridepoint.translateZ(16);
        this.ridepoint.translateX(2.7);
        this.ridepoint.translateY(2.5);

        this.ridepoint.lookAt(this.ridepoint.position.x, this.ridepoint.position.y - 0.25, this.ridepoint.position.z + 1);

        this.ridepoint.rotateY(Math.PI);
        human.scale.set(0.075,0.075,0.075);
        human.rotateY(0.09);
        human.translateY(-10);
        group.add(human);
    }
}
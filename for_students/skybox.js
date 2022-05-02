import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

export class Skybox extends GrObject {
    constructor () {
        let tl = new T.TextureLoader().load("/images/galaxy-skybox.jpg");
        let fakeskybox = new GrObject('fakeskybox', new T.Mesh(new T.SphereGeometry(100,100,20), new T.MeshStandardMaterial({side: T.DoubleSide, map: tl})));
        
        super("Skybox", fakeskybox);
    }
}
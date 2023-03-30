import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

export class Skybox extends GrObject {
    constructor () {
        let tl = new T.TextureLoader().load("images/galaxyskybox.jpg");
        let fakeskybox = new T.Mesh(new T.SphereGeometry(1000,1000,20), new T.MeshStandardMaterial({side: T.DoubleSide, map: tl}));
        
        super("Skybox", fakeskybox);
    }
}
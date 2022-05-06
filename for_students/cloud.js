import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

let cloudCount = 0;
export class Cloud extends GrObject {
    /**
   * an angel according to the Bible
   *
   * @param {Object} params
   */
    constructor () {
        let group = new T.Group();
        super(`cloud-${++cloudCount}`, group);

        let fluff = new T.Mesh(new T.SphereGeometry(5,20,20), new T.MeshStandardMaterial({color: 'white', transparent: true, opacity: 0.7}));
        
        for(let i = 0; i < 125; i++){
            let f = fluff.clone();
            group.add(f);
            f.position.y += (Math.floor(Math.random()*50) -25)/1.5;
            f.position.x += Math.floor(Math.random()*(100 - f.position.y*6)) -50;
            f.position.z += Math.floor(Math.random()*(100 - f.position.y*6)) -50;
            f.scale.x = 5 - Math.floor(Math.random()*2);
            f.scale.z = 5 - Math.floor(Math.random()*2);
            f.scale.y = 2 - Math.floor(Math.random());
        }
    }
}
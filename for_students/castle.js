import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { Mesh, MeshStandardMaterial } from "../libs/CS559-Three/build/three.module.js";
import { SimpleGroundPlane } from "../libs/CS559-Framework/GroundPlane.js";

export class Castle extends GrObject {
    /**
   * an angel according to the Bible
   *
   * @param {Object} params
   */
    constructor () {
        let group = new T.Group();
        super(`Castle`, group);
        let tcastle = new T.TextureLoader().load("images/castletexture.png");
        let base = new T.Mesh(new T.BoxGeometry(100,150,100), new MeshStandardMaterial({map:tcastle}));
        group.add(base);
        for (let i = 0; i < 4; i++){
            let tower = new T.Group();
            let pole = new T.Mesh(new T.CylinderGeometry(20,20,200,20), new MeshStandardMaterial({map:tcastle}));
            for (let j = 0; j < 9; j++){
                let spoke = new T.Mesh(new T.BoxGeometry(5,35,5), new MeshStandardMaterial({map:tcastle}));
                tower.add(spoke);
                spoke.translateY(95);
                spoke.rotateY(7 * j);
                spoke.translateX(20);
            }
            tower.add(pole);
            group.add(tower);
            tower.rotateY(2 * Math.PI * 1/8.3333 * Math.PI);
            for (let j = 0; j < i; j++){
                 tower.rotateY(Math.PI/2);
            }
            tower.translateX(70);
            tower.translateY(25);
        }
    }
}
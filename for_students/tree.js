import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

let treeCount = 0;
export class Tree extends GrObject{
    constructor(){
        let tree = new T.Group();
        let trunkGeometry = new T.CylinderGeometry(0.25,0.4,1,20,20);
        let trunkMaterial = new T.MeshStandardMaterial({color:'#1c0e00'});
        let trunk = new T.Mesh(trunkGeometry, trunkMaterial);
        trunk.translateY(-1);
        let branchGeometry = new T.SphereGeometry(1,20,20);
        let branchMaterial = new T.MeshStandardMaterial({color:'green'});
        let branch;
        let i = 0;
        let h = 10;
        while (i < h){
            branch = new T.Mesh(branchGeometry, branchMaterial);
            branch.scale.set((h - i)/5,0.5,(h -i)/5)
            branch.translateY(i/2);
            tree.add(branch);
            i++;
        }
        tree.add(trunk);
        tree.scale.set(0.5,0.5,0.5);
        super(`tree-${++treeCount}`, tree);
    }
}
/*jshint esversion: 6 */
// @ts-check

/**
 * Graphics Town Framework - "Main" File
 *
 * This is the main file - it creates the world, populates it with
 * objects and behaviors, and starts things running
 *
 * The initial distributed version has a pretty empty world.
 * There are a few simple objects thrown in as examples.
 *
 * It is the students job to extend this by defining new object types
 * (in other files), then loading those files as modules, and using this
 * file to instantiate those objects in the world.
 */

import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { WorldUI } from "../libs/CS559-Framework/WorldUI.js";
import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { Skybox } from "./skybox.js";
import { SphereAngel } from "./angel.js";
import { Unicycle } from "./unicycle.js";
import { Human } from "./human.js";
import { Gate } from "./gate.js";
import { Tree } from "./tree.js";
import { Cloud } from "./cloud.js";
import { Castle } from "./castle.js";

import {main} from "../examples/main.js";
import { GreaterDepth } from "../libs/CS559-Three/build/three.module.js";

/**m
 * The Graphics Town Main -
 * This builds up the world and makes it go...
 */

// make the world
let world = new GrWorld({
    width: 800,
    height: 600,
    groundplane: false // make the ground plane big enough for a world of stuff
});
world.groundplane = false;

// put stuff into the world

let unicycle = new Unicycle();
unicycle.setPos(59, -13, 35);
unicycle.setScale(3,3,3);
unicycle.objects[0].rotateX(-Math.PI/13);
world.add(unicycle);

let human;
let humans = [];
for (let i = 0; i < 800; i++){
    human = new Human(i);
    world.add(human)
    humans.push(human);
    human.setPos(0, 0, 50 + i * 5);
}

for (let i = 0; i < 17; i++){
    let tree = new Tree();
    tree.objects[0].scale.set(10,10,10);
    world.add(tree);
    tree.objects[0].translateX(-i*60 - 150);
    tree.objects[0].translateZ(-30);

    tree = new Tree();
    tree.setScale(10,10,10);
    world.add(tree);
    tree.objects[0].translateX(i*60 + 150);
    tree.objects[0].translateZ(-30);
}

world.add(new Skybox());

let target;
target = humans[0].objects[0];

let angel = new SphereAngel(humans, world);
angel.setPos(3.5,50,-120);
angel.setScale(7,7,7);
world.add(angel);

let gate = new Gate();
gate.setPos(0,34,25);
gate.setScale(1.5,1.5,1.5);
world.add(gate);

let heaven;
for (let i = 0; i < 4; i++){
    heaven = new Cloud();
    heaven.objects[0].rotateY(Math.PI/2 * i);
    heaven.setPos(0, 300, 60);
    world.add(heaven);
}

let heavenReception = new Castle();
world.add(heavenReception);
heavenReception.setPos(0, 370, 60);

world.active_camera.position.set(200,300,850);


// while making your objects, be sure to identify some of them as "highlighted"

///////////////////////////////////////////////////////////////
// because I did not store the objects I want to highlight in variables, I need to look them up by name
// This code is included since it might be useful if you want to highlight your objects here
function highlight(obName) {
    const toHighlight = world.objects.find(ob => ob.name === obName);
    if (toHighlight) {
        toHighlight.highlighted = true;
    } else {
        throw `no object named ${obName} for highlighting!`;
    }
}
// of course, the student should highlight their own objects, not these

highlight('human-50');
highlight('WheelAngel')
highlight('Unicycle');
highlight('Gate');
highlight('Skybox');
highlight('tree-1');
highlight('cloud-1');
highlight('Castle');


///////////////////////////////////////////////////////////////
// build and run the UI
// only after all the objects exist can we build the UI
// @ts-ignore       // we're sticking a new thing into the world
world.ui = new WorldUI(world);
// now make it go!
world.go();

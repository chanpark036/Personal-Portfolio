import Experience from "../Experience.js";
import * as THREE from "three";
import GSAP from "gsap";
import { RectAreaLightHelper } from "../../node_modules/three/examples/jsm/helpers/RectAreaLightHelper.js";
import { PointLightHelper } from "three";

export default class Room{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        
        this.lerp = {
            current: 0,
            target : 0,
            ease: 0.1,
        };

        this.setModel();
        this.setAnimation();
        this.onMouseMove();


    }

    setModel(){
        this.actualRoom.children.forEach(child=>{
            child.castShadow = true;
            child.receiveShadow = true;

            if(child instanceof THREE.Group){
                child.children.forEach((groupchild)=>{
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                })
            }

            if(child.name === "tank"){
                child.material = new THREE.MeshPhysicalMaterial();
                child.material.roughness = 0;
                child.material.color.set(0x549fdd);
                child.material.ior = 3;
                child.material.transmission = 1;
                child.material.opacity = 1;
            }

            if(child.name === "screen"){
                child.material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen,
                })
            }
        })


        const width = 0.3;
        const height = 0.3;
        const intensity = 5;
        const rectLight = new THREE.RectAreaLight( 0xffffff, intensity, width, height);
        rectLight.position.set( 5.2, 3.6, -0.5);
        rectLight.rotation.x = -Math.PI / 2;
        rectLight.rotation.z = -Math.PI / 4;
        this.actualRoom.add( rectLight );
        // const rectLightHelper = new RectAreaLightHelper( rectLight );
        // rectLight.add( rectLightHelper );



        const p1Light = new THREE.RectAreaLight( 0xffffff, 0.4, 0.65,0.4);
        p1Light.position.set( -2.75, 7.88, -4);

        p1Light.rotation.x = -Math.PI / 2
        p1Light.rotation.y = -Math.PI;
        p1Light.rotation.z = -Math.PI / 4-0.15;
        this.actualRoom.add( p1Light );
        // const p1Helper = new RectAreaLightHelper( p1Light );
        // p1Light.add( p1Helper );

        const p3Light = new THREE.RectAreaLight( 0xffffff, 0.4, 0.65,0.4);
        p3Light.position.set( -2.75, 6.5, -4);
        p3Light.rotation.x = -Math.PI / 2
        p3Light.rotation.y = -Math.PI;
        p3Light.rotation.z = -Math.PI / 4-0.15;
        this.actualRoom.add( p3Light );
        // const p3Helper = new RectAreaLightHelper( p3Light );
        // p1Light.add( p3Helper );

        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.21,0.21,0.21);
    }

    setAnimation(){
        this.mixer = new THREE.AnimationMixer(this.actualRoom);
        this.swim = this.mixer.clipAction(this.room.animations[0]);
        this.swim.play();
    }

    onMouseMove(){
        window.addEventListener("mousemove",(e)=>{
            this.rotation = ((e.clientX - window.innerWidth / 2) * 5)/ window.innerWidth;
            this.lerp.target = this.rotation * 0.1;
        })
    }

    resize(){

    }

    update(){
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );

        this.actualRoom.rotation.y = this.lerp.current;
        this.mixer.update(this.time.delta * 0.0009);
    }

}

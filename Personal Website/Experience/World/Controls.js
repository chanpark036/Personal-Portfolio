import Experience from "../Experience.js";
import * as THREE from "three";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";

export default class Controls{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.room = this.experience.world.room.actualRoom;
        this.rectLights = new Array(3);
        var counter = 0;
        this.room.children.forEach((child) => {
            if(child.type === "RectAreaLight") {
                this.rectLights[counter] = child;
                counter++;
            }
        });

        GSAP.registerPlugin(ScrollTrigger);

        this.setScrollTrigger();

    }

    setScrollTrigger(){
        ScrollTrigger.matchMedia({
            //desktop

            "(min-width: 969px)": () => {
                console.log("desktop")
                //reset
                this.room.scale.set(0.21,0.21,0.21);
                this.rectLights[0].width = 0.3;
                this.rectLights[0].height = 0.3;

                this.rectLights[1].width = 0.65;
                this.rectLights[1].height = 0.4;
                this.rectLights[2].width = 0.65;
                this.rectLights[2].height = 0.4;

                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                });
                this.firstMoveTimeline.to(this.room.position, {
                    x: () => {
                        return this.sizes.width * -0.00155;
                    },
                });


                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                });
                this.secondMoveTimeline.to(this.room.position, {
                    x: () => {
                        return this.sizes.width * 0.00055;
                    },
                    z: () => {
                        return this.sizes.height * -0.001;
                    }
                },"second");

                this.secondMoveTimeline.to(
                    this.room.scale, {
                        x: 0.5,
                        y: 0.5,
                        z: 0.5
                    }, "second");
                
                this.secondMoveTimeline.to(
                    this.rectLights[0], {
                        width: 0.3 * 3,
                        height: 0.3 * 3,
                    },"second");

                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                });
                this.thirdMoveTimeline.to(this.room.position, {
                    x: () => {
                        return this.sizes.width * -0.00115;
                    },
                    z: () => {
                        return this.sizes.height * 0.013;
                    }
                }, "same");

                this.thirdMoveTimeline.to(
                    this.room.scale, {
                        x: 0.7,
                        y: 0.7,
                        z: 0.7
                    }, "same");

                this.thirdMoveTimeline.to(this.rectLights[1].position, {
                    x: () => {
                        return -2.4;
                    },
                    y: () => {
                        return 7.87;
                    },
                    z: () => {
                        return -3.7;
                    }
                }, "same");

                this.thirdMoveTimeline.to(this.rectLights[2].position, {
                    x: () => {
                        return -2.4;
                    },
                    y: () => {
                        return 6.5;
                    },
                    z: () => {
                        return -3.7;
                    }
                }, "same");
                
                this.thirdMoveTimeline.to(
                    this.rectLights[1], {
                        width: 0.65 * 3.4,
                        height: 0.4*2,
                    },"same"
                );
                this.thirdMoveTimeline.to(
                    this.rectLights[2], {
                        width: 0.65 * 3.4,
                        height: 0.4*2,
                    },"same"
                );

            },

            //mobile
            "(max-width: 968px)": () => {
                console.log("mobile")

                //reset
                this.room.position.set(0,0,0);
                this.room.scale.set(0.2,0.2,0.2);
                this.rectLights[0].width = 0.2;
                this.rectLights[0].height = 0.2;

                this.rectLights[1].width = 0.65;
                this.rectLights[1].height = 0.4;
                this.rectLights[2].width = 0.65;
                this.rectLights[2].height = 0.4;

                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                }).to(this.room.scale,{
                    x: 0.2,
                    y: 0.2,
                    z: 0.2
                });

                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                });
                this.secondMoveTimeline.to(this.room.position, {
                    x: () => {
                        return this.sizes.width * -0.00155;
                    },
                    z: () => {
                        return this.sizes.height * -0.001;
                    }
                },"second");

                this.secondMoveTimeline.to(
                    this.room.scale, {
                        x: 0.5,
                        y: 0.5,
                        z: 0.5
                    }, "second");
                
                this.secondMoveTimeline.to(
                    this.rectLights[0], {
                        width: 0.3 * 3,
                        height: 0.3 * 3,
                    },"second");

                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                }).to(this.room.position,{
                    x: () => {
                        return this.sizes.width * -0.00005;
                    },
                    z: () => {
                        return this.sizes.height * 0.007;
                    }
                },"same").to(this.rectLights[0], {
                    width: 0.2 * 3,
                    height: 0.2 * 3
                },"same").to(this.rectLights[1], {
                    width: 0.65 * 2.3,
                    height: 0.3*2,
                },"same").to(this.rectLights[2], {
                    width: 0.65 * 2.3,
                    height: 0.3*2,
                },"same").to(this.rectLights[1].position, {
                    x: () => {
                        return -2.4;
                    },
                    y: () => {
                        return 7.87;
                    },
                    z: () => {
                        return -3.7;
                    }
                },"same").to(this.rectLights[2].position, {
                    x: () => {
                        return -2.4;
                    },
                    y: () => {
                        return 6.5;
                    },
                    z: () => {
                        return -3.7;
                    }
                },"same");

            },

        });
    }

    resize(){

    }

    update(){

    }

}

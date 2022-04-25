import { Node } from "../core/Node.js";
import { Sprite } from "../core/Sprite.js";
import { Label } from "../core/Label.js";

export class Card extends Node {
    constructor(index) {
        super();
        this.index = index;
        this.value = null;
        this._createSprite();
        this._createCover();
        this._createLabel();
    }
    _createSprite() {
        this.sprite = new Sprite();
        this.sprite.width = 110;
        this.sprite.height = 110;
        this.sprite.elm.style.borderRadius = "20px";
        this.addChild(this.sprite);
    }
    _createCover() {
        let cover = new Node();
        cover.width = 100;
        cover.height = 100;
        cover.elm.style.display = "block";
        cover.elm.style.backgroundColor = "#30BE96";
        cover.elm.style.border = "solid 5px #B2FFDA";
        cover.elm.style.borderRadius = "20px";
        this.cover = cover;
        this.addChild(this.cover);
    }
    _createLabel() {
        this.label = new Label();
        this.label.fontSize = 30;
        this.label.fontColor = "white";
        this.label.y = 35;
        this.label.x = 40;
        this.label.text = this.index;
        this.addChild(this.label);
    }
    setValue(value) {
        this.value = value;
        this.sprite.path = "./images/trucxanh" + value + ".jpg";
    }
    flipCard() {
        const tl = gsap.timeline({ paused: true });
        tl.to(this.sprite, { scaleX: 0, duration: 0 });
        tl.to(this.label, { scaleX: 0, duration: 0 });
        tl.to(this.cover, { scaleX: 0, duration: 0.2 });
        tl.to(this.sprite, { scaleX: 1, duration: 0.2 });
        tl.play();
    }
    flopCard() {
        const tl = gsap.timeline({ paused: true });
        tl.to(this.sprite, { scaleX: 0, duration: 0.2 });
        tl.to(this.cover, { scaleX: 1, duration: 0.2 });
        tl.to(this.label, { scaleX: 1, duration: 0.2 });
        tl.play();
    }
    scaleHideImage() {
        this.sprite.zIndex = 1;
        gsap.to(this.sprite,{scaleX: 1,scaleY: 1, width: 230, height:230,x:-50,y:-50, duration: 1});
        setTimeout(()=>{
            this.sprite.elm.style.display = "none";
        },1000)
    }
    // open() {
    //     this.cover.elm.style.display = "none";
    //     this.label.elm.style.display = "none";
    // }
    // close() {
    //     this.cover.elm.style.display = "block";
    //     this.label.elm.style.display = "block";
    // }
    // hide() {
    //     this.sprite.elm.style.display = "none";
    // }
}
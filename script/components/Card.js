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
        this.sprite.width = 100;
        this.sprite.height = 100;
        this.addChild(this.sprite);
    }
    _createCover() {
        let cover = new Node();
        cover.width = 100;
        cover.height = 100;
        cover.elm.style.display = "block";
        cover.elm.style.backgroundColor = "orange";
        cover.elm.style.border = "solid 1px blue";
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
    open() {
        this.cover.elm.style.display = "none";
        this.label.elm.style.display = "none";
    }
    close() {
        this.cover.elm.style.display = "block";
        this.label.elm.style.display = "block";
    }
    hide() {
        this.sprite.elm.style.display = "none";
    }
}
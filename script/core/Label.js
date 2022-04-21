import { Node } from "./Node.js";
export class Label extends Node {
    constructor() {
        super();
        this._text = "";
        this._size = 0;
        this._family = "";
        this._color = "";
        this._backgroundColor = "";
    }
    get text() {
        return this._text;
    }
    set text(value){
        this._text = value;
        this.elm.innerText = value;
    }
    get fontSize(){
        return this._size;
    }
    set fontSize(value){
        this._size = value;
        this.elm.style.fontSize = this._size + "px";
    }
    get fontFamily(){
        return this._family;
    }
    set fontFamily(value){
        this._family = value;
        this.elm.style.fontFamily = value;
    }
    get fontColor(){
        return this._color;
    }
    set fontColor(value){
        this._family = value;
        this.elm.style.color = value;
    }
    get backgroundColor(){
        return this._backgroundColor;
    }
    set backgroundColor(value){
        this._backgroundColor = value;
        this.elm.style.backgroundColor = value;
    }
}
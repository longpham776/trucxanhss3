import { Node } from "./Node.js";

export class Label extends Node {
    constructor() {
        super();
        this._text = "";
    }

    get text() {
        return this._text;
    }
    set text(value){
        this._text = value;
        this.elm.innerText = value;
    }
}
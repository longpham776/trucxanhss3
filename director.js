import { Sprite } from "./core/Sprite.js";
import { Node } from "./core/Node.js";
class Director {
    constructor() {
        const dt = 1 / 60;
        setInterval(() => {
            this._mainLoop(dt);
        }, dt);
        this._tweenObjects = [];
    }
    _mainLoop(dt) {
        this.update(dt);
    }
    update(dt) {
        this._tweenObjects.forEach(obj => {
            const { target, duration, props, start } = obj;
            let timer = Date.now() - start;
            for (let key in props) {
                const startValue = target["_startValue" + key];
                const endValue = props[key];
                const diff = (endValue - startValue) * (timer / duration);
                target[key] = startValue + diff;
                if (Date.now() >= start + duration) target[key] = endValue;
            }
            if (Date.now() > start + duration) {
                this._tweenObjects.splice(this._tweenObjects.indexOf(obj), 1);
            }
        });
    }
    createCard() {
        this.card = new Node();
        document.body.appendChild(this.card.elm);
        this.card.width = 100;
        this.card.height = 100;
        this.card.elm.style.backgroundColor = "orange";
        this.card.x = 0;
        this.card.y = 0;
    }
    flipCard() {
        const tl = gsap.timeline({paused: true});
        this.card.elm.style.backgroundColor = "orange";
        tl.to(this.card, {scaleX: 0, duration: 0.5, delay: 1});
        tl.call(()=>{
            this.card.elm.style.backgroundColor = "green";
        })
        tl.to(this.card, {scaleX: 1, duration: 0.5});
        tl.play();
    }
    tween(target, duration, props) {
        for (let key in props) {
            if (target[key] !== undefined) target["_startValue" + key] = target[key];
        }
        this._tweenObjects.push({ target, duration, props, start: Date.now() });
    }
}

window.director = new Director();
director.createCard();
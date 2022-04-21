import { Node } from "./core/Node.js";
import { Sprite } from "./core/Sprite.js";
import { Card } from "./components/Card.js";
import { Label } from "./core/Label.js";

class Game extends Node {
    constructor() {
        super();
        this.playGame();
    }
    _init() {
        document.getElementsByTagName("div")[0].innerHTML="";
        this._createCards();
        this._createScore();
        this.resetGame();
    }
    playGame(){
        this.play = new Label();
        this.play.elm.addEventListener("click",this._init.bind(this,this.play));
        this.play.x = 200;
        this.play.backgroundColor = "white";
        this.play.fontSize = 50;
        this.play.fontColor = "red";
        this.play.text = "Play Game";
        this.addChild(this.play);
    }
    _createCards() {
        this.cards = [];
        this.firstCard = null;
        this.secondCard = null;
        // for 
        for (let index = 0; index < 20;index++){
            this.card = new Card(index+1);
            this.card.elm.addEventListener("click",this.onClickCard.bind(this,this.card));
            this.card.elm.id = (index%10);
            this.card.setValue(index%10);
            let col = Math.floor(index/5);
            let row = index % 5;
            this.card.elm.style.top = col*100+"px";
            this.card.elm.style.left = row*100+"px";
            this.addChild(this.card);
            this.cards.push(this.card);
        }
    }
    _createScore(){
        this.score = 10000;
        this.label = new Label();
        this.label.fontSize = 50;
        this.label.fontColor = "black";
        this.label.y= -100;
        this.label.x = -0;
        this.label._family = "bold";
        this.label.text = "Score:" + this.score;
        this.label.score = this.score;
        this.addChild(this.label);
    }
    onClickCard(card){
        if(this.firstCard === null) {
            this.firstCard = card;
            this.firstCard.open();
        }
        else if((this.firstCard) && (this.secondCard === null)) {
            this.secondCard = card;
            if(this.firstCard.index === this.secondCard.index) this.secondCard=null;
            else{
                this.secondCard.open();
                setTimeout(() => {
                    this.compareCard(this.firstCard,this.secondCard);
                    this.firstCard = this.secondCard = null;    
                }, 500);
                console.log(this.firstCard);
                console.log(this.secondCard);
            }
        }
    }
    compareCard(firstCard,secondCard){
        if(firstCard.value === secondCard.value){
            this.score += 1000;
            this.label.text = "Score:" + this.score;
            console.log(this.score);
            firstCard.hide();
            secondCard.hide();
            console.log(true);
            console.log(this.cards);
        }else {
            this.score -= 500;
            this.label.text = "Score:" + this.score;
            console.log(this.score);
            firstCard.close();
            secondCard.close();
            console.log(false);
        }
        this.gameComplete();
    }
    resetGame(){
        this.reset = new Label();
        this.reset.elm.addEventListener("click",this._init.bind(this,this.play));
        this.reset.x = 330;
        this.reset.y = -100;
        this.reset.backgroundColor = "white";
        this.reset.fontSize = 40;
        this.reset.fontColor = "black";
        this.reset.text = "Reset";
        this.addChild(this.reset);
    }
    gameComplete(){
        let text = "You wanna try again! (Yes|No)";
        if(this.score <= 0) {
            if(confirm(text) == true) {
                this._init();
                this.resetGame();
            }else {
                document.getElementsByTagName("div")[0].innerHTML="";
                this.playGame();
            }
        }
    }
}

let game = new Game();
game.elm.id = "mainboard";
game.elm.style.left = "35%";
game.elm.style.top = "30%";
document.body.appendChild(game.elm);

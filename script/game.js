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
        this.soundId = {0:"music",1:"click",2:"match",3:"lose",4:"loading",5:"win"};
        this.count = 0;
        this._createCards();
        this._createScore();
        this.resetGame();
    }
    playGame(){
        this.play = new Label();
        this.play.elm.addEventListener("click",this._init.bind(this,this.play));
        this.play.x = 130;
        this.play.backgroundColor = "white";
        this.play.fontSize = 50;
        this.play.fontColor = "red";
        this.play.text = "PlayGame";
        this.addChild(this.play);
    }
    playSound(soundId){
        this.sound = new Audio("sounds/"+soundId+".wav");
        this.sound.play();
    }
    _createCards() {
        this.playSound(this.soundId[0]);
        setTimeout(()=>{
            this.playSound(this.soundId[0]);
            setTimeout(()=>{
                this.playSound(this.soundId[4]);
            },2000);
        },2000);
        
        this.cards = [];
        this.firstCard = this.secondCard = null;
        const tl = gsap.timeline({ paused: true });
        // for 
        for (let index = 0; index < 20;index++){
            this.card = new Card(index+1);
            this.addChild(this.card)
            tl.fromTo(this.card.elm,{x:200,y:150, opacity: 0.2},{x:200,y:150,opacity:1, duration: 0.1});
            tl.fromTo(this.card.elm,{x:200,y:150, opacity: 0},{x:3000,y:3000,opacity:0, duration: 0.1});
            tl.play();
            
        }
        setTimeout(()=>{
            for (let index = 0; index < 20;index++){
                this.card = new Card(index+1);
                this.card.elm.addEventListener("click",this.onClickCard.bind(this,this.card));
                this.card.elm.id = (index%10);
                this.card.setValue(index%10);
                let col = Math.floor(index/5);
                let row = index % 5;
                this.addChild(this.card);
                this.cards.push(this.card);
                // tl.fromTo(this.card.elm,{x:200,y:150, opacity: 0.2},{x:200,y:150,opacity:1, duration: 0.1});
                tl.fromTo(this.card,{x: 200,y: 150,opacity: 1},{ duration: 0.2, ease: "back.out(10)", x: row*100,y: col*100 });
                tl.play();
            }
        },4000);
    }
    _createScore(){
        this.score = 10000;
        this.scoreLabel = new Label();
        this.scoreLabel.fontSize = 50;
        this.scoreLabel.fontColor = "black";
        this.scoreLabel.y= -100;
        this.scoreLabel.x = -0;
        this.scoreLabel.text = "SCORE:";
        this.addChild(this.scoreLabel);
        this.label = new Label();
        this.label.id = "score";
        this.label.fontSize = 50;
        this.label.fontColor = "black";
        this.label.y= -100;
        this.label.x = 170;
        this.label.text = this.score;
        this.addChild(this.label);
    }
    onClickCard(card){
        this.playSound(this.soundId[1]);
        if(this.firstCard === null) {
            this.firstCard = card;
            this.firstCard.flipCard();
        }else if(this.secondCard === null) {
            this.secondCard = card;
            if(this.firstCard.index === this.secondCard.index) this.secondCard=null;
            else{
                this.secondCard.flipCard();
                setTimeout(() => {
                    this.compareCard(this.firstCard,this.secondCard);
                }, 1000);
                console.log(this.firstCard);
                console.log(this.secondCard);
            }
        }
    }
    compareCard(firstCard,secondCard){
        if(firstCard.value === secondCard.value){
            this.playSound(this.soundId[2]);
            this.count++;
            this.score += 1000;
            gsap.to(this.label,{text: this.score,duration: 1.5, snap:"text"});
            firstCard.scaleHideImage();
            secondCard.scaleHideImage();
            setTimeout(()=>{
                this.firstCard = this.secondCard = null;  
            },1000)
            console.log(true);
        }else {
            this.playSound(this.soundId[2]);
            this.score -= 500;
            gsap.to(this.label, {text: this.score,duration: 1.5, snap:"text"});
            console.log(this.score);
            firstCard.flopCard();
            secondCard.flopCard();
            setTimeout(()=>{
                this.firstCard = this.secondCard = null;  
            },1000)
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
        let lose = "You lose! Are you wanna try again! (Yes|No)";
        let win = "You win! Are you wanna try again! (Yes|No)";
        if(this.score <= 0) {
            this.playSound(this.soundId[3]);
            setTimeout(()=>{
                if(confirm(lose) == true) {
                    this._init();
                    this.resetGame();
                }else {
                    document.getElementsByTagName("div")[0].innerHTML="";
                    this.playGame();
                }
            },3200);
        }else if(this.count === 10){
            this.playSound(this.soundId[5]);
            setTimeout(()=>{
                if(confirm(win) == true) {
                    this._init();
                    this.resetGame();
                }else {
                    document.getElementsByTagName("div")[0].innerHTML="";
                    this.playGame();
                }
            },3200);
        }
    }
}

let game = new Game();
game.elm.id = "mainboard";
game.elm.style.left = "35%";
game.elm.style.top = "30%";
document.body.appendChild(game.elm);

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
        this.play.path = "./images/playButton_mouseclick.jpg";
        setTimeout(()=>{
            document.getElementsByTagName("div")[0].innerHTML="";
            this.soundId = {0:"music",1:"click",2:"match",3:"lose",4:"loading",5:"win"};
            this.count = 0;
            this._createCards();
            this._createScore();
            this.score += 10000;
            gsap.to(this.label,{text: this.score,duration: 6, snap:"text"});
            setTimeout(()=>{
                this.resetGame();
            },6000);
        },100);
    }
    playGame(){
        this.play = new Sprite();
        this.play.x = 130;
        this.play.height = 300;
        this.play.width = 300;
        this.play.path = "./images/playButton_mouseout.jpg";
        this.play.elm.addEventListener("click",this._init.bind(this,this.play));
        this.play.elm.addEventListener("mousemove",()=>{
            this.play.path = "./images/playButton_mousemove.jpg";
        });
        this.play.elm.addEventListener("mouseout",()=>{
            this.play.path = "./images/playButton_mouseout.jpg";
        });
        this.addChild(this.play);
    }
    resetGame(){
        this.reset = new Sprite();
        this.reset.x = 400;
        this.reset.y = -100;
        this.reset.height = 50;
        this.reset.width = 100;
        this.reset.path = "./images/resetButton_mouseout.jpg";
        this.reset.elm.addEventListener("click",this._init.bind(this,this.play));
        this.reset.elm.addEventListener("mousemove",()=>{
            this.reset.path = "./images/resetButton_mousemove.jpg";
        });
        this.reset.elm.addEventListener("mouseout",()=>{
            this.reset.path = "./images/resetButton_mouseout.jpg";
        });
        this.addChild(this.reset);
    }
    playSound(soundId){
        this.sound = new Audio("./sounds/"+soundId+".wav");
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
            this.card.elm.addEventListener("click",this.onClickCard.bind(this,this.card));
            this.card.elm.id = (index%10);
            this.card.setValue(index%10);
            this.cards.push(this.card);
            this.addChild(this.cards[index]);
            tl.fromTo(this.cards[index].elm,{x: 240,y: 190, opacity: 0.2,zIndex: 0},{x: 240,y: 190,opacity:1, duration: 0.1})
            tl.play();
       }
        setTimeout(()=>{
            for (let index = 0; index < 20;index++){
                let col = Math.floor(index/5);
                let row = index % 5;
                tl.fromTo(this.cards[index].elm,{x: 240,y: 190,opacity: 1},{ duration: 0.2,zIndex: 1, ease: "back.out(3)", x: row*120,y: col*120 });
                tl.play();
            }
        },2000);
    }
    _createScore(){
        this.score = 0;
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
        this.label.fontColor = "white";
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

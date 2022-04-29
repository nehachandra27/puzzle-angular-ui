import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-image-puzzle',
  templateUrl: './image-puzzle.component.html',
  styleUrls: ['./image-puzzle.component.css']
})
export class ImagePuzzleComponent implements OnInit {

  imageUrl: string = '../assets/sunflower.jpg';
  imageSize: number = 500;
  gridsize: number = 2;
  boxSize: number = 100 / (this.gridsize - 1);
  index: number = 0;
  totalBoxes: number = this.gridsize * this.gridsize;
  Image: any[] = [];
  imageName: string = this.imageUrl.substring(this.imageUrl.lastIndexOf('/') + 1).split('.')[0];
  difficulty: string = '2';
  steps: number = 0;
  ticks: string = '0:00';
  timer: any =timer(0, 1000);
  timeVar: any;
  gameComplete: Boolean = false;
  showAlert: Boolean = false;
  gamecompletedTime: number = 0;
  ticksinsecond: number = 0;

  indexes: number[] = [];
  position: number[] = [];
  ngOnInit() {
    this.startGame();
  }

  isSorted(indexes): Boolean {
    let i: number = 0;
    for (i = 0; i < indexes.length; i++) {
      if (indexes[i] !== i) {
        return false;
      }
    }
    return true;
  }

  randomize(imageParts: any[]): any[] {
    let i = 0, img: any[] = [], ran = 0;
    for (i = 0; i < imageParts.length; i++) {
      ran = Math.floor(Math.random() * imageParts.length);
      while (imageParts[ran] == null) {
        ran = Math.floor(Math.random() * imageParts.length);
      }
      img.push(imageParts[ran]);
      this.position.push(imageParts[ran].index);
      imageParts[ran] = null;
    }
    this.printIndexes(this.indexes);
    this.printIndexes(this.position);
    return img;
  }

  onDragStart(event: any, data: any): void {

    event.dataTransfer.setData('data', event.target.id);
  }
  onDrop(event: any, data: any): void {
    let origin = event.dataTransfer.getData('data');
    let dest = event.target.id;


    let originEl = document.getElementById(origin);
    let destEl = document.getElementById(dest);

    let origincss = originEl.style.cssText;
    let destcss = event.target.style.cssText;


    destEl.style.cssText = origincss;
    originEl.style.cssText = destcss;
    originEl.id = dest;
    destEl.id = origin;


    for (let i = 0; i < this.position.length; i++) {
      if (this.position[i].toString() === originEl.id) {
        this.position[i] = Number(destEl.id);
      } else if (this.position[i].toString() === destEl.id) {
        this.position[i] = Number(originEl.id);
      }

    }

    this.printIndexes(this.position);
    

    this.steps++;
    if(this.ticksinsecond>=300){
      alert("Sorry! You are disqualified from this game");
    }
    this.gameComplete = this.isSorted(this.position);
    if (this.gameComplete) {
      console.log("game completed ----------",this.ticks);

      console.log("this.ticks ----------", this.ticks);
      var gamecompletedTime = parseInt(this.ticks);


      console.log("game ticksinsecond  ----------", this.ticksinsecond);


       if(this.ticksinsecond <= 30){
        alert("You won $50!! Please fill your details below");
        
       } else if(this.ticksinsecond>30 && this.ticksinsecond<=60){
           alert("You won $10 !! Please fill your details below");
       } else if(this.ticksinsecond>60 && this.ticksinsecond<=120){
           alert("You won $5 !! Please fill your details below");
       } 
      if (this.timeVar) {
        this.timeVar.unsubscribe();


      }
    }

   
  }

  allowDrop(event): void {
    event.preventDefault();
    event.target.style.opacity = 1;
  }

  printIndexes(sorts: number[]): void {
    let i: number = 0, ind: string = '';
    for (i = 0; i < sorts.length; i++) {
      ind += sorts[i].toString() + ' , ';
    }
    console.log(ind);
  }

  reRandomize(): void {
    this.gameComplete = false;
    this.Image = this.randomize(this.Image);
  }

  startGame(): void {
    this.reset();
    this.initializeGame();
    this.breakImageParts();
    this.reRandomize();

    if (this.timeVar) {
      this.timeVar.unsubscribe();
    }
    this.timeVar = this.timer.subscribe(t => {

      console.log("time is --------",t);
      this.settime(t);


    });
    

  }

  settime(t: number): void {
 

    this.ticksinsecond = t;
    this.ticks = Math.floor(t / 60).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + ':' +
      (t % 60).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
      
  }
  breakImageParts(): void {
    for (this.index = 0; this.index < this.totalBoxes; this.index++) {
      const x: string = (this.boxSize * (this.index % this.gridsize)) + '%';
      const y: string = (this.boxSize * Math.floor(this.index / this.gridsize)) + '%';
      let img: ImageBox = new ImageBox();
      img.x_pos = x;
      img.y_pos = y;
      img.index = this.index;
      this.indexes.push(this.index);
      this.Image.push(img);
    }
    this.boxSize = this.imageSize / this.gridsize;
  }

  initializeGame(): void {

    this.gridsize = Number(this.difficulty);
    console.log(this.gridsize);
    this.boxSize = 100 / (this.gridsize - 1);
    this.index = 0;
    this.totalBoxes = this.gridsize * this.gridsize;
  }

  reset(): void {
    this.Image = [];
    this.indexes = [];
    this.position = [];
  }
}

class ImageBox {
  x_pos: string;
  y_pos: string;
  index: number;
}

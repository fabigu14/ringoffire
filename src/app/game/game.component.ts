import { Component, OnInit } from '@angular/core'
import { Game } from 'src/models/game';
import {MatDialog,} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  pickCardAnimation = false;
  animationCompleted = true;
  topCardFlipped = true;
  game: Game;
  currentCard: string;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);

  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop();
    
      this.pickCardAnimation = true;
      this.topCardFlipped = false;

      this.flipBackTopCard();
      setTimeout(() => {
        
        this.pickCardAnimation = false;
        this.game.playedCards.push(this.currentCard);
        
      }, 1000);
    }

  }

  flipBackTopCard(){
    setTimeout(() => {
      this.animationCompleted = false;
      this.topCardFlipped = true;
      
      setTimeout(() => {
        this.animationCompleted = true;
      }, 500);
    }, 250);
    
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent, {
      width: '250px',
    });
    dialogRef.afterClosed().subscribe(name => {
      this.game.players.push(name)
    });
  }
}


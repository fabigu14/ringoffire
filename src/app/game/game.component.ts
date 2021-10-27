import { Component, OnInit } from '@angular/core'
import { Game } from 'src/models/game';
import {MatDialog,} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';

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


  constructor(public firestore: AngularFirestore, public dialog: MatDialog) {
    
  }

  ngOnInit(): void {
    this.newGame();
    this
    .firestore
    .collection('games')
    .valueChanges()
    .subscribe((game) => {
      console.log(game);
      
    });
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);
    this
    .firestore
    .collection('games')
    .add(this.game.toJSON())

  }

  takeCard() {
    if (!this.pickCardAnimation) {

      this.removeFromStack();

      this.flipBackTopCard();

      this.nextPlayer();

      setTimeout(() => {
        
        this.addToPlayed();
        
      }, 950);
    }

  }

  nextPlayer(){
    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
  }

  removeFromStack(){
    this.currentCard = this.game.stack.pop();
    this.pickCardAnimation = true;
    this.topCardFlipped = false;
  }

  addToPlayed(){
    this.pickCardAnimation = false;
    this.game.playedCards.push(this.currentCard);
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
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
      
    });
  }
}


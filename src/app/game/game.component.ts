import { Component, OnInit } from '@angular/core'
import { Game } from 'src/models/game';
import { MatDialog, } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {


  game: Game;
  gameId: string;


  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
      this.gameId = params.id;
      this.subscribeGame();
    })

  }

  /*
  * This function subscribes data from a particular culum in the database(games-> id) 
  */
  subscribeGame() {
    this
      .firestore
      .collection('games')
      .doc(this.gameId)
      .valueChanges()
      .subscribe((game) => {
        this.updateGame(game);
      });
  }

  updateGame(game) {
    this.game.currentPlayer = game.currentPlayer;
    this.game.playedCards = game.playedCards;
    this.game.players = game.players;
    this.game.stack = game.stack;
    this.game.pickCardAnimation = game.pickCardAnimation;
    this.game.animationCompleted = game.animationCompleted;
    this.game.topCardFlipped = game.topCardFlipped;
    this.game.currentCard = game.currentCard;
  }

  newGame() {
    this.game = new Game();
  }

  saveGame() {
    this
      .firestore
      .collection('games')
      .doc(this.gameId)
      .update(this.game.toJSON());
      
  }

  takeCard() {
    if (!this.game.pickCardAnimation) {

      this.removeFromStack();

      this.flipBackTopCard();

      this.nextPlayer();
      this.saveGame();
      setTimeout(() => {

        this.addToPlayed();
        this.saveGame();
      }, 950);
    }

  }

  nextPlayer() {
    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
    
  }

  removeFromStack() {

    if(this.game.stack.length > 0){
      this.game.currentCard = this.game.stack.pop();
      this.game.pickCardAnimation = true;
      this.game.topCardFlipped = false;
    }
    else{
      this.game.resetStack();
    }
   
  }

  addToPlayed() {
    this.game.pickCardAnimation = false;
    this.game.playedCards.push(this.game.currentCard);
    
  }

  flipBackTopCard() {
    setTimeout(() => {
      this.game.animationCompleted = false;
      this.game.topCardFlipped = true;
      this.saveGame();

      setTimeout(() => {
        this.game.animationCompleted = true;
        this.saveGame();
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
        this.saveGame();
      }

    });
  }
}


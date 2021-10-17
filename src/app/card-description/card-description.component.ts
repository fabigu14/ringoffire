import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-description',
  templateUrl: './card-description.component.html',
  styleUrls: ['./card-description.component.scss']
})
export class CardDescriptionComponent implements OnInit, OnChanges {

  cardAction = [
    { title: 'Waterfall', description: 'Everyone has to start drinking at the same time. As soon as player 1 stops drinking, player 2 may stop drinking. Player 3 may stop as soon as player 2 stops drinking, and so on.' },
    { title: 'You', description: 'You decide who drinks' },
    { title: 'Me', description: 'Congrats! Drink a shot!' },
    { title: 'Category', description: 'Come up with a category (e.g. Colors). Each player must enumerate one item from the category.' },
    { title: 'Bust a jive', description: 'Player 1 makes a dance move. Player 2 repeats the dance move and adds a second one. ' },
    { title: 'Chicks', description: 'All girls drink.' },
    { title: 'Heaven', description: 'Put your hands up! The last player drinks!' },
    { title: 'Mate', description: 'Pick a mate. Your mate must always drink when you drink and the other way around.' },
    { title: 'Thumbmaster', description: 'You are the Thumbmaster! Put your thumb on the table, as soon as the other players realise, they have to put their thumb on the table to. Last one has to drink!' },
    { title: 'Men', description: 'All men drink.' },
    { title: 'Quizmaster', description: 'You are the Quizmaster! No one is allowed to answer your Questions, if they do, they have to drink.' },
    { title: 'Never have i ever...', description: 'Say something you nnever did. Everyone who did it has to drink.' },
    { title: 'Rule', description: 'Make a rule. Everyone needs to drink when he breaks the rule.' },
  ];

  title: string = '';
  description: string = '';
  @Input() card: string;
  @Input() players: number;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.card) {
      let cardNumber = +this.card.split('_')[1];
      this.title = this.cardAction[cardNumber - 1].title;
      this.description = this.cardAction[cardNumber - 1].description;
    }
  }

  resolveTitle(){
    let title;
    if (this.players == 0) {
      title = 'Add players';
    } else if(!this.card){
      title = 'Please pick a card';
    }
    else{
      title = this.title;
    }

    return title;
  }

  resolveDescription(){
    let description;
    if (this.players == 0) {
      description = 'Add players by clicking + button';
    } else if(!this.card){
      description = 'Please click on the card stack to pick a card';
    }
    else{
      description = this.description;
    }

    return description;
  }

}

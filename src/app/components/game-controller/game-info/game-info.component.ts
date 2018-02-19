import { Component, Input, OnInit } from '@angular/core';
import { Tetris } from '../../../models/tetris/tetris.model';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss']
})
export class GameInfoComponent implements OnInit {

  @Input() game: Tetris;
  @Input() isMultiplayer: boolean;
  @Input() difference: number;

  constructor() {
  }

  ngOnInit() {
  }

}

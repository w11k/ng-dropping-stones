import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss']
})
export class AudioComponent implements OnInit {

  @Input() speed: number;
  audio: HTMLAudioElement;

  constructor() {
  }

  ngOnInit() {
    this.audio = new Audio();
    this.audio.src = '/assets/korobeiniki.wav';
    this.audio.load();
    this.audio.playbackRate = this.speed;
    this.audio.loop = true;
    this.audio.play();
  }

}

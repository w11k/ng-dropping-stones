import { Injectable } from '@angular/core';

@Injectable()
export class AudioService {

  private audio: HTMLAudioElement;

  constructor() {
    this.audio = new Audio();
  }

  set volume(volume: number) {
    this.audio.volume = volume;
  }

  get speed(): number {
    return this.audio.playbackRate;
  }

  set speed(speed: number) {
    this.audio.playbackRate = speed;
  }

  play(filename: string, loop = false) {
    this.audio.src = `assets/${filename}`;
    this.audio.load();
    this.audio.loop = loop;
    this.audio.play();
  }

  pause() {
    this.audio.pause();
  }

}

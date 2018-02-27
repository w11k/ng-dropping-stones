import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HighscoreService } from '../../services/highscore/highscore.service';

@Injectable()
export class SinglePlayerGuard implements CanActivate {

  constructor(private score: HighscoreService,
              private router: Router) {
  }

  canActivate(): boolean {
    // const hasName = this.score.hasName();
    // if (!hasName) {
    //   this.router.navigate(['enter-name']);
    // }
    // return hasName;
    return true;
  }
}

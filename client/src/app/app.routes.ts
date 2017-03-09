import {Routes, RouterModule} from '@angular/router';
import {GameAppComponent} from "./component/game-app/game-app.component";
import {GameComponent} from "./component/game/game.component";
import {GameHighscoreComponent} from "./component/game-highscore/game-highscore.component";
import {GameConfigComponent} from "./component/game-config/game-config.component";

const routes: Routes = [
  {
    path: '',
    component: GameAppComponent,
  },
  {
    path: 'game',
    component: GameComponent
  },
  {
    path: 'highscore',
    component: GameHighscoreComponent
  },
  {
    path: 'config',
    component: GameConfigComponent
  },
];

export const routing = RouterModule.forRoot(routes);

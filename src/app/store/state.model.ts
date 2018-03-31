import { Tetris } from '../models/tetris/tetris.model';
import {SettingsState} from './settingsReducer';

export interface AppState {
  game: Tetris[];
  settings: SettingsState;
}

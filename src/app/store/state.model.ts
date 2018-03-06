import { Tetris } from '../models/tetris/tetris.model';
import {SettingsStore} from './settingsReducer';

export interface AppState {
  game: Tetris[];
  settings: SettingsStore;
}

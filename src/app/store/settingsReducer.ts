import {Action} from '@ngrx/store';

export enum SettingActionTypes {
  UpdateForm = 'UpdateForm',
  DeleteHighscore = 'DeleteHighscore',
}

export interface SettingsStore {
  forceReload: boolean;
  speed: number;
}

export class UpdateSettingsAction implements Action {
  readonly type = SettingActionTypes.UpdateForm;
  payload: Partial<SettingsStore>;

  constructor(payload: Partial<SettingsStore>) {
    this.payload = payload;
  }
}

export class DeleteHighscoreAction implements Action {
  readonly type = SettingActionTypes.DeleteHighscore;

  constructor() {
  }
}

export type SettingsActions = UpdateSettingsAction;

export const InitialSettingsStore: SettingsStore = {
  forceReload: false,
  speed: 4,
};

export function settingsReducer(state: SettingsStore = InitialSettingsStore, action: SettingsActions): SettingsStore {
  switch (action.type) {
    case SettingActionTypes.UpdateForm:
      return {...state, ...action.payload};
    default:
      return state;
  }

}

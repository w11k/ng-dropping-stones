export enum GAMESPEED {
  BEGINNER,
  INTERMEDIATE,
  ADVANCED,
  EXPERT,
  SUPER
}

export class GameSpeed{
  static getGameSpeedValue(gameSpeed: GAMESPEED): number {
    switch (gameSpeed) {
      case GAMESPEED.BEGINNER:
        return 800;
      case GAMESPEED.INTERMEDIATE:
        return 500;
      case GAMESPEED.ADVANCED:
        return 300;
      case GAMESPEED.EXPERT:
        return 200;
      case GAMESPEED.SUPER:
        return 150;
    }
  }

  static getGameSpeedTitle(gameSpeed: GAMESPEED): string {
    switch (gameSpeed) {
      case GAMESPEED.BEGINNER:
        return "Beginner";
      case GAMESPEED.INTERMEDIATE:
        return "Intermediate";
      case GAMESPEED.ADVANCED:
        return "Advanced";
      case GAMESPEED.EXPERT:
        return "Expert";
      case GAMESPEED.SUPER:
        return "Super";
    }
  }
}

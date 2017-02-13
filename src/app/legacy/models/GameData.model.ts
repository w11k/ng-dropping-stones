export class GameData {
  public gameStart = false;
  public gameEnd = false;
  public gamePause = false;
  public score = 0;
  public savedGameTime = null;
  public rotationLimit = 4;
  public patternLimit = 7;
  public cssAnimateTimeout = 300; // milliseconds
  public maxCustomPiece = 5;
  public customPieceWidth = 4;
  public availableColors = 5;
  public customColorChosen = '';
  public gameBoard = {
    borderWidth: 10,
    pieceWidthInPixel: 25, // match the pixel of piece in grid
    boardWidth: 10,
    boardHeight: 20
  };

  constructor(){}
}

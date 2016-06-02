export class Dice {
  faces: number;
  img: string;
  cant: number;
  
  public static equals(diceA : Dice, diceB : Dice){
    return diceA.faces === diceB.faces;
  }
}
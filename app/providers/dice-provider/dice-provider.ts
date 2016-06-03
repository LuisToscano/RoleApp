import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';
import {UtilsProvider} from '../../providers/utils-provider/utils-provider';
import {Dice} from '../../classes/dice'; 

@Injectable()
export class DiceProvider {
  private data: any = null;
  private config;

  constructor(public http: Http, private utilsProv : UtilsProvider) {
    this.config = this.utilsProv.getConfig();
  }

  load() {
    
    let that = this;
    
    if (this.data && this.data.hasOwnProperty(this.config.localStorage.userDicesTag)) {
      // already loaded data
      return Promise.resolve(that.data[that.config.localStorage.userDicesTag]);
    }

    // don't have the data yet
    return new Promise(resolve => {
        let userDicesStr = window.localStorage.getItem(that.config.localStorage.userDicesTag);
        if(that.utilsProv.variableExists(userDicesStr)){
          that.data = JSON.parse(userDicesStr);
        }else{
          that.data = that.config.localStorage.defaultUserDicesObj;
        }
        resolve(that.data[that.config.localStorage.userDicesTag]);
    });  
  }
  
  addDice(newDice : Dice){
    let that = this;
    return new Promise(resolve => {
        that.diceAlreadyExists(newDice).then(exists =>{
          if(exists){
            resolve(false);
          }else{
            that.data.userDices.push(newDice);
            window.localStorage.setItem(that.config.localStorage.userDicesTag, JSON.stringify(that.data));
            resolve(true); 
          }
        });
    });  
  }
  
  removeDice(oldDice : Dice){
    let that = this;
    return new Promise(resolve => {
        let index = that.userDiceExists(oldDice);
        if(index<0){
          resolve(false);
        }else{
          that.data.userDices.splice(index, 1 );
          window.localStorage.setItem(that.config.localStorage.userDicesTag, JSON.stringify(that.data));
          resolve(true);          
        }
    });  
  }
  
  diceAlreadyExists(testDice){
    let that = this;
    return new Promise(resolve => {
        resolve(that.defaultDiceExists(testDice)>=0  || that.userDiceExists(testDice)>=0);
      }
    );  
  }
  
  defaultDiceExists(testDice){
    console.log(this.defaultDices);
      for(let i = 0; i < this.defaultDices.length; i++){
        console.log(testDice, this.defaultDices[i], Dice.equals(testDice, this.defaultDices[i]));
        if(Dice.equals(testDice, this.defaultDices[i])){
          return i;
        }
      }
      return -1;
  }
  
  userDiceExists(testDice){
     let userDices = this.data.userDices;
      for(let i = 0; i < userDices.length; i++){
        if(Dice.equals(testDice, userDices[i])){
          return i;
        }
      }
      return -1;
  }
  
  getDefaultDices(){
    return this.defaultDices;
  }
  
    private defaultDices : Dice[] = [
        {'faces': 4,  'img': 'img/4dice.png',  'cant': 0},
        {'faces': 6,  'img': 'img/6dice.png',  'cant': 0},
        {'faces': 10, 'img': 'img/10dice.png', 'cant': 0},
        {'faces': 20, 'img': 'img/20dice.png', 'cant': 0}
    ];
}


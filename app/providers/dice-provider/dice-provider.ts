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
    return new Promise(resolve => {
        this.data.userDices.push(newDice);
        window.localStorage.setItem(this.config.localStorage.userDicesTag, JSON.stringify(this.data));
        resolve(true);
    });  
  }
  
  getDefaultDices(){
    return this.defaultDices;
  }
  
    private defaultDices = [
        {"faces": 4, "tag": "4 caras", "img": "img/4dice.png", "cant": 0},
        {"faces": 6, "tag": "6 caras", "img": "img/6dice.png", "cant": 0},
        {"faces": 10, "tag": "10 caras", "img": "img/10dice.png", "cant": 0},
        {"faces": 20, "tag": "20 caras", "img": "img/20dice.png", "cant": 0}
    ];
}


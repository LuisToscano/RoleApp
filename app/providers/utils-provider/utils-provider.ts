import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UtilsProvider {
  data: any = null;

  constructor(public http: Http) {}
  
  private config = {
    'localStorage' :{
      'userDicesTag' : 'userDices',
      'defaultUserDicesObj' : {
        'userDices' : []
      }
    },
    'dices' : {
           'MAX_DICES' : 10,
           'MIN_DICES' : 0,
           'default' : {
              'img' : 'img/new-dice.png',
              'faces' : 3,
              'cant' : 0
           }
    }
  };
  
  getConfig(){
    return this.config;
  }
  
   variableExists(check : any){
    return check!==null && typeof(check)!=='undefined';
  }
  
  getRandomNumber(topLimit : number){
    return Math.floor(Math.random() * topLimit) + 1
  }
}


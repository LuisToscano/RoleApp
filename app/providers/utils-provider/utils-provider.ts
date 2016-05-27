import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the UtilsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UtilsProvider {
  data: any = null;

  constructor(public http: Http) {}
  
  config = {
    'dices' : {
           'MAX_DICES' : 10,
           'MIN_DICES' : 0
    }
  };
  
   variableExists(check : any){
    return check!==null && typeof(check)!=='undefined';
  }
  
  getRandomNumber(topLimit : number){
    return Math.floor(Math.random() * topLimit) + 1
  }
}


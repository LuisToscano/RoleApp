import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the MessagesProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MessagesProvider {
  data: any = null;

  constructor(public http: Http) {}
  
  public messages = {
    'general' :{
      'loading' : 'Cargando...'
    },
    'home' :  {
        'title' : 'Prueba de dados',
        'newDice' : 'Crea uno nuevo (+)'
    },
    'modalCoin':{
      'title' : 'Moneda',
      'heads' : 'Cara',
      'tails' : 'Sello'
    },
    'modalDice' : {
      'title' : 'Resultados',
      'noDiceError' : 'No se han seleccionado dados'
    },
    'modalNewDice' : {
      'title' : 'Crear dado'
    }
  }
}


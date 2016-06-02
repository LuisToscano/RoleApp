import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MessagesProvider {
  data: any = null;

  constructor(public http: Http) {}
  
  public getMessages(){
    return this.messages;
  }
  
  private messages = {
    'general' :{
      'loading' : 'Cargando...'
    },
    'home' :  {
        'title' : 'Prueba de dados',
        'newDice' : 'Crear dado',
        'coin' : 'Moneda',
        'percent' : 'Porcentaje',
        'diceTag' : '{0} caras'
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
      'title' : 'Crear dado',
      'labelDiceName' : 'Nombre del dado',
      'labelDiceFaces': 'Número de caras',
      'submitButtonTag' : 'Crear dado',
      'diceAlreadyExistsError' : 'Ya existe un dado con el mismo nombre o número de caras'
    }
  }
}


import {Page, Modal, ViewController} from 'ionic-angular';
import {MathProvider} from '../../providers/math-provider/math-provider'; 

@Page({
  templateUrl: 'build/pages/modal-coin/modal-coin.html',
  providers: [MathProvider]
})
export class ModalCoin {
  public viewCtrl;
  private resultado : string;

  constructor(viewCtrl: ViewController, private myMath : MathProvider) {
    this.viewCtrl = viewCtrl;
    this.reload();
  }
  
  /*
  * Genera el resultado de manera aleatoria.
  * @return [string] respuesta
  * @method getCoinResult
  */
  getCoinResult(){

      let result = this.myMath.getRandomNumber(2),
      respuesta = '';
      
      switch(result){
        case 1: {
          respuesta = 'Cara';
          break;
        }
        
        case 2: {
          respuesta = 'Sello';
          break;
        }
      }
      
      return respuesta;
  }
  
  /*
  * Genera los resultados de manera aleatoria segun el numero de caras de los dados seleccionados.
  * @method reload
  */
  reload(){
    this.resultado = this.getCoinResult();
  }
  
  /*
  * Cierra el modal de resultados.
  * @method close
  */
  close() {
    this.viewCtrl.dismiss();
  }
}

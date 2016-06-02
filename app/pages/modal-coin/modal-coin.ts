import {Page, Modal, ViewController} from 'ionic-angular';
import {UtilsProvider} from '../../providers/utils-provider/utils-provider'; 
import {MessagesProvider} from '../../providers/messages-provider/messages-provider'; 

@Page({
  templateUrl: 'build/pages/modal-coin/modal-coin.html',
  providers: [UtilsProvider, MessagesProvider]
})
export class ModalCoin {
  private resultado : string;
  private messages;
  
  private static FACES =  2;

  constructor(public viewCtrl: ViewController, private utilsProv : UtilsProvider, private msgProvider : MessagesProvider) {}
  
  ngOnInit(){
    this.messages = this.msgProvider.getMessages();
    this.reload();
  }
  
  /*
  * Genera el resultado de manera aleatoria.
  * @return [string] respuesta
  * @method getCoinResult
  */
  getCoinResult(){

      let result = this.utilsProv.getRandomNumber(ModalCoin.FACES),
      respuesta = '';
      
      switch(result){
        case 1: {
          respuesta = this.messages.modalCoin.heads;
          break;
        }
        
        case 2: {
          respuesta = this.messages.modalCoin.tails;
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

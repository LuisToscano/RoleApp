import {Page, NavController, ViewController} from 'ionic-angular';
import {MessagesProvider} from '../../providers/messages-provider/messages-provider'; 

@Page({
  templateUrl: 'build/pages/modal-new-dice/modal-new-dice.html',
  providers: [MessagesProvider]
})
export class ModalNewDice {
  
  private messages;
  
  constructor(public nav: NavController, public viewCtrl: ViewController, private msgProv : MessagesProvider) {
    this.messages = msgProv.messages;
  }
  
  /*
    * Cierra el modal de crear dado.
    * @method close
    */
    close() {
      this.viewCtrl.dismiss();
    }
}

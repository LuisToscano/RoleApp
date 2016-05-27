import {Page, NavController, ViewController} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/modal-new-dice/modal-new-dice.html',
})
export class ModalNewDice {
  constructor(public nav: NavController, public viewCtrl: ViewController) {}
  
  /*
    * Cierra el modal de crear dado.
    * @method close
    */
    close() {
      this.viewCtrl.dismiss();
    }
}

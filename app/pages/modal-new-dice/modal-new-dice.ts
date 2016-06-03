import {Page, NavController, ViewController, NavParams} from 'ionic-angular';
import {MessagesProvider} from '../../providers/messages-provider/messages-provider';
import {UtilsProvider} from '../../providers/utils-provider/utils-provider'; 
import {Dice} from '../../classes/dice'; 

@Page({
  templateUrl: 'build/pages/modal-new-dice/modal-new-dice.html',
  providers: [MessagesProvider, UtilsProvider]
})
export class ModalNewDice {
  
  private messages;
  private utils;
  private newDice : Dice;
  private diceProv;
  
  constructor(public nav: NavController, public viewCtrl: ViewController, private msgProv : MessagesProvider, private utilsProv : UtilsProvider, private params : NavParams) {}
  
  ngOnInit(){
    this.messages = this.msgProv.getMessages();
    this.diceProv = this.params.get('diceProv');
    this.resetNewDice();
  }
  
  onSubmit(){
    let that = this;
    that.diceProv.addDice(that.newDice).then(
      success => {  if(success){that.close();} else {/* ERROR SAVING DICE */} }
    );
  }
  
  resetNewDice(){
    this.newDice = this.utilsProv.getConfig().dices.default;
  }
  
  /*
    * Cierra el modal de crear dado.
    * @method close
    */
    close() {
      this.viewCtrl.dismiss();
    }
}

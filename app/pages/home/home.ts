import {Page, Modal, NavController} from 'ionic-angular';  
import {Dice} from '../../classes/dice'; 
import {DiceProvider} from '../../providers/dice-provider/dice-provider'; 
import {MessagesProvider} from '../../providers/messages-provider/messages-provider'; 
import {UtilsProvider} from '../../providers/utils-provider/utils-provider';
import {ModalDice} from '../../pages/modal-dice/modal-dice'; 
import {ModalCoin} from '../../pages/modal-coin/modal-coin'; 
import {ModalNewDice} from '../../pages/modal-new-dice/modal-new-dice';  
import {OrderBy} from '../../pipes/order-by';  

@Page({
    templateUrl: 'build/pages/home/home.html',
    providers: [DiceProvider, MessagesProvider, UtilsProvider],
    pipes : [OrderBy]
})
export class HomePage {  
    private dices;
    private userDices : Dice[];
    private messages;
    private config;

    constructor(private nav: NavController, private diceProv : DiceProvider, private msgProv : MessagesProvider, private utilsProv : UtilsProvider) {}
    
    ngOnInit(){
        let that = this;
        this.messages = this.msgProv.getMessages();
        this.config = this.utilsProv.getConfig();
        this.dices = this.diceProv.getDefaultDices();
        this.diceProv.load().then(function(data){
            that.userDices = data;
        });
    }
    
    getDiceTag(index){
        let dice = this.dices[index];
        return String.format(this.messages.home.diceTag, dice.faces);
    }
    
    getUserDiceTag(index){
        let dice = this.userDices[index];
        return String.format(this.messages.home.diceTag, dice.faces);
    }
    
    /*
    * Agrega un dado del tipo seleccionado.
    * @param [number] index : índice del tipo de dado seleccionado.
    * @method addDice
    */
    addDice(index){
        if(this.dices[index].cant < this.config.dices.MAX_DICES){
            this.dices[index].cant = this.dices[index].cant + 1;
        }
    }
    
    /*
    * Reduce un dado al tipo seleccionado.
    * @param [number] index : índice del tipo de dado seleccionado.
    * @method removeDice
    */
    removeDice(index){       
       if(this.dices[index].cant > this.config.dices.MIN_DICES){
            this.dices[index].cant = this.dices[index].cant - 1;
       }
    }
    
    /*
    * Agrega un dado del tipo seleccionado.
    * @param [number] index : índice del tipo de dado seleccionado.
    * @method addDice
    */
    deleteDice(index){
       let oldDice = this.userDices[index];
       this.diceProv.removeDice(oldDice).then(success => {
           if(success){/* SUCCESSFULLY DELETED*/}else{ /* ERROR OCCURED */}
       });
    }
    
    /*
    * Muestra modal de resultados.
    * @method throwDice
    */
    throwDice(){
        let params = {
            dices : this.dices
        }
        this.showDiceModal(params);
    }
    
    /*
    * Crea y muestra el modal de resultados.
    * @param [Object] params : Parámetros a ser enviados al modal.
    * @method showDiceModal
    */
    showDiceModal(params) {
        let modalDice = Modal.create(ModalDice, params);
        this.nav.present(modalDice)
    }
    
    /*
    * Crea y muestra el modal de resultados.
    * @param [Object] params : Parámetros a ser enviados al modal.
    * @method showDiceModal
    */
    showCoinModal() {
        let modalCoin = Modal.create(ModalCoin);
        this.nav.present(modalCoin)
    }
    
    /*
    * Crea y muestra el modal de resultados.
    * @param [Object] params : Parámetros a ser enviados al modal.
    * @method showDiceModal
    */
    showNewDiceModal() {
        let params = {
            diceProv : this.diceProv
        };
        let modalNewDice = Modal.create(ModalNewDice, params);
        this.nav.present(modalNewDice);
    }
}
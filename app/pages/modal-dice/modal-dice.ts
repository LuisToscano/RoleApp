import {Page, Modal, ViewController, NavParams} from 'ionic-angular';
import {Dice} from '../../classes/dice'; 
import {UtilsProvider} from '../../providers/utils-provider/utils-provider'; 
import {MessagesProvider} from '../../providers/messages-provider/messages-provider'; 

@Page({
  templateUrl: "build/pages/modal-dice/modal-dice.html",
  providers: [UtilsProvider, MessagesProvider]
})

export class ModalDice {
  
  public viewCtrl;
  private dices : Dice[];
  private results : number[];
  private answersHTML : string;
  private messages;
  
  constructor(viewCtrl: ViewController, params: NavParams, private utilsProv : UtilsProvider, private msgProv : MessagesProvider) {
    this.messages = msgProv.messages;
    this.answersHTML = this.messages.general.loading,
    this.viewCtrl =   viewCtrl,
    this.dices    =   params.get('dices');
    this.reload();
  }
  
  /*
    * Genera el código HTML con los resultados del lance de dados.
    * @return [String] strAnswer
    * @method prepareAnswers
    */
  prepareAnswers(){
     let rowStart =       '<ion-row>',
     rowEnd =             '</ion-row>',
     colStart =           '<ion-col>',
     colStartSuccess =    '<ion-col class="success">',
     colStartFail     =   '<ion-col class="fail">',
     colEnd =             '</ion-col>',
     noDiceErrorMsg =     this.messages.modalDice.noDiceError,
     strAnswer = '',
     resultsPerRow = 4;
     
     if(this.results.length > 0){
        strAnswer = rowStart;
        let cont = 0;
        for(var i=0; i < this.results.length; i++){
          cont++;
          let result = this.results[i];
          
          switch(result){
            case 1:{
              strAnswer += colStartFail + result + colEnd;
              break;
            }
            
            case 20:{
              strAnswer += colStartSuccess + result + colEnd;
              break;
            }
            
            default:{
             strAnswer += colStart + result + colEnd;
              break;
            }
          }
          
          if(cont===resultsPerRow && i<(this.results.length-1)){
            cont = 0;
            strAnswer += rowEnd + rowStart;
          }
        }
        
        for(var j=0; j < (resultsPerRow - cont); j++){
          strAnswer += colStart+colEnd;
        }
        strAnswer += rowEnd;
      }
      else{
        strAnswer = rowStart + colStart + noDiceErrorMsg + colEnd + rowEnd;
      }
     
     return strAnswer;
  }
  
   /*
    * Genera los resultados de manera aleatoria segun el numero de caras de los dados seleccionados.
    * @return [Array] results
    * @method getDiceResults
    */
    getDiceResults(){
        let results = [],
        that = this;
        
        this.dices.forEach(function(dice) {
            if(dice.cant > 0){
               for(var i=0; i<dice.cant; i++){
                   results.push(that.utilsProv.getRandomNumber(dice.faces)); 
               }
            }
        });
        return results;
    }
    
    /*
    * Genera los resultados de manera aleatoria segun el numero de caras de los dados seleccionados.
    * @method reload
    */
    reload(){
      this.results = this.getDiceResults();
      this.answersHTML = this.prepareAnswers();
    }
    
    /*
    * Cierra el modal de resultados.
    * @method close
    */
    close() {
      this.viewCtrl.dismiss();
    }
}

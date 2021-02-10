<template>
 <v-row>
   <v-col cols="12" sm="12" md="12" class="app-calc">
      <div class="conteiner">
          <div class="content-calc">
              <div class="result">
                  <div class="input">
                      <small class="text">{{values}} </small>
                      <small v-if="stateCalc !== null" class="text">{{stateCalc}}</small>
                      <small v-if="stateCalc !== null" class="text">{{valuesToCalc}}</small>
                  </div>
                  <div class="result-input">
                        <span style="font-size: 40px;color:white;">{{result}}</span>
                  </div>
              </div>
              <div class="items">
                <v-btn  class ="btn" @click="Clear()">C</v-btn>
                <v-btn  class ="btn" @click="Clean()"><v-icon>mdi-backspace</v-icon></v-btn>
                <v-btn  class ="btn" @click="Square()"><v-icon>mdi-square-root</v-icon></v-btn>
                <v-btn  class ="btn" @click="SendState('/')">/</v-btn>
                <v-btn  class ="btn2" @click="CalcValues('7')">7</v-btn>
                <v-btn  class ="btn2" @click="CalcValues('8')">8</v-btn>
                <v-btn  class ="btn2" @click="CalcValues('9')">9</v-btn>
                <v-btn  class ="btn" @click="SendState('*')">x</v-btn>
                <v-btn  class ="btn2" @click="CalcValues('4')">4</v-btn>
                <v-btn  class ="btn2" @click="CalcValues('5')">5</v-btn>
                <v-btn  class ="btn2" @click="CalcValues('6')">6</v-btn>
                <v-btn  class ="btn" @click="SendState('-')">-</v-btn>
                <v-btn  class ="btn2" @click="CalcValues('1')">1</v-btn>
                <v-btn  class ="btn2" @click="CalcValues('2')">2</v-btn>
                <v-btn  class ="btn2" @click="CalcValues('3')">3</v-btn>
                <v-btn  class ="btn" @click="SendState('+')">+</v-btn>
                <v-btn  class ="btn2" @click="ChangeOperator()">+/-</v-btn>
                <v-btn  class ="btn2" @click="CalcValues('0')">0</v-btn>
                <v-btn  class ="btn2" @click="CalcValues('.')">.</v-btn>
                <v-btn  class ="btn-equal" @click="Calc()">=</v-btn>
              </div>
          </div>
      </div>
   </v-col>
 </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {
  Action,
  Getter
} from 'vuex-class';

@Component
export default class Home extends Vue {
  @Action SetStateCalc

  @Getter stateCalc

  private values: string = '';
  private valuesToCalc: string = '';
  private result: any = null;
  private amountCalc: number = 0;

  public async CalcValues(value: any): Promise<void>{
      if(this.stateCalc === null){
        this.values = this.values + value
      }else{
        this.valuesToCalc = this.valuesToCalc + value
      }
  }

  public async SendState(value: any): Promise<void>{
    await this.SetStateCalc({state: value})
  }

  public async Calc(): Promise<void>{
    this.amountCalc++
    switch(this.stateCalc){
        case '/':
            if(this.valuesToCalc === '' || this.valuesToCalc.length === 0 ){
              this.$swal('Ops!', 'Não é possível fazer divisão por 0', 'error')
            }else{
              if(this.amountCalc > 1){
                this.result = (parseFloat(this.result)/parseFloat(this.valuesToCalc)).toFixed(2)
              } else{
                this.result = (parseFloat(this.values)/parseFloat(this.valuesToCalc)).toFixed(2)
            }
            }
            break;
        case '*':
            if(this.amountCalc > 1){
              this.result = (parseFloat(this.result)*parseFloat(this.valuesToCalc)).toFixed(2)
            }else {
              this.result = (parseFloat(this.values)*parseFloat(this.valuesToCalc)).toFixed(2)
            }
            break;
        case '-':
            if(this.amountCalc > 1){
              this.result = (parseFloat(this.result)-parseFloat(this.valuesToCalc)).toFixed(2)
            }else{
              this.result = (parseFloat(this.values)-parseFloat(this.valuesToCalc)).toFixed(2)
            }
            
            break;
        case '+':
            if(this.amountCalc > 1){
               this.result = (parseFloat(this.result)+parseFloat(this.valuesToCalc)).toFixed(2)
            }else {
               this.result = (parseFloat(this.values)+parseFloat(this.valuesToCalc)).toFixed(2)
            }
            break;
    }
  }

  public async Clear(): Promise<void>{
      this.result = null;
      this.values = '';
      this.valuesToCalc = '';
      this.amountCalc = 0;
      await this.SetStateCalc({state: null});
  }

  public async Clean(): Promise<void>{
      if(this.stateCalc === null){
        this.values = this.values.substring(0, this.values.length-1)
      }else{
        this.valuesToCalc = this.valuesToCalc.substring(0, this.valuesToCalc.length-1)
      }
  }

  public async Square(): Promise<void>{
    this.result = (Math.sqrt(parseFloat(this.values))).toFixed(2); 
  }

  public async ChangeOperator(): Promise<void>{
    this.result = (this.result*-1).toFixed(2);
  }

  public SendKey(key: any): void{
    console.log(key);
  }
}
</script>
<style scoped>
.app-calc{
  display:flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height:  84vh;
  margin-top:50px;
}

.app-calc .conteiner {
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 80%;
}

.app-calc .conteiner .content-calc{
  display:flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.app-calc  .conteiner .content-calc .result {
  display:flex;
  flex-direction: column;
  width: 100%;
  height: 30%;
}

.app-calc  .conteiner .content-calc .result .input {
  display:flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content:flex-end;
  width: 100%;
  height: 40%;
  border:dotted;
  background: black;
}

.app-calc  .conteiner .content-calc .result .input .text {
  font-size: 18px;color:white;
}

.app-calc  .conteiner .content-calc .result .result-input {
  display:flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content:flex-end;
  width: 100%;
  height: 60%;
  border:dotted;
  background: black;
}


.app-calc  .conteiner .content-calc .items {
  display:flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex-grow: 0;
  width: 100%;
  height: 70%;
} 

.app-calc  .conteiner .content-calc .items .btn{
  height:20%;
  width:25%;
  font-size: 22px;
  color: white;
  background: black;
  opacity: 0.7;
}

.app-calc  .conteiner .content-calc .items .btn2{
  height:20%;
  width:25%;
  font-size: 22px;
  color: white;
  background: black;
  opacity: 0.8;
}

.app-calc  .conteiner .content-calc .items .btn-equal{
  height:20%;
  width:25%;
  font-size: 22px;
  color: white;
  background: orange;
}

</style>

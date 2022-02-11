<template>
  <div>
    <!--新規登録-->
    <template v-if="habitsRegist == 1">
     <div style="display:inline-block; border: 1px dotted green; margin: 3px 3px 3px 3px; padding: 2px;" @click="changeRegist2()">edit items</div>
     <br><br>
        <div v-if="habitsNameRegistArry[0] != null">
          <div>{{habitsNameRegistArry[0]}}</div>
          <input style="background-color:black; width:30%; border: 1px dotted green; color:green; font-family: 'OCRB'; font-size: 16px; padding: 2px;" type="text" @keyup.enter="habitsDbRegist" v-model="text0">
        </div>
        <div v-if="habitsNameRegistArry[1] != null">
          <div>{{habitsNameRegistArry[1]}}</div>
          <input style="background-color:black; width:30%; border: 1px dotted green; color:green; font-family: 'OCRB'; font-size: 16px; padding: 2px;" type="text" @keyup.enter="habitsDbRegist" v-model="text1">
        </div>
        <div v-if="habitsNameRegistArry[2] != null">
          <div>{{habitsNameRegistArry[2]}}</div>
          <input style="background-color:black; width:30%; border: 1px dotted green; color:green; font-family: 'OCRB'; font-size: 16px; padding: 2px;" type="text" @keyup.enter="habitsDbRegist" v-model="text2">
        </div>
        <div v-if="habitsNameRegistArry[3] != null">
          <div>{{habitsNameRegistArry[3]}}</div>
          <input style="background-color:black; width:30%; border: 1px dotted green; color:green; font-family: 'OCRB'; font-size: 16px; padding: 2px;" type="text" @keyup.enter="habitsDbRegist" v-model="text3">
        </div>
        <div v-if="habitsNameRegistArry[4] != null">
          <div>{{habitsNameRegistArry[4]}}</div>
          <input style="background-color:black; width:30%; border: 1px dotted green; color:green; font-family: 'OCRB'; font-size: 16px; padding: 2px;" type="text" @keyup.enter="habitsDbRegist" v-model="text4">
        </div>
        <div v-if="habitsNameRegistArry[5] != null">
          <div>{{habitsNameRegistArry[5]}}</div>
          <input style="background-color:black; width:30%; border: 1px dotted green; color:green; font-family: 'OCRB'; font-size: 16px; padding: 2px;" type="text" @keyup.enter="habitsDbRegist" v-model="text5">
        </div>
        <div v-if="habitsNameRegistArry[6] != null">
          <div>{{habitsNameRegistArry[6]}}</div>
          <input style="background-color:black; width:30%; border: 1px dotted green; color:green; font-family: 'OCRB'; font-size: 16px; padding: 2px;" type="text" @keyup.enter="habitsDbRegist" v-model="text6">
      </div>                
      <br>      
      <div style="display:inline-block; border: 1px dotted green; margin: 3px 3px 3px 3px; padding: 2px;" @click="habitsDbRegist()">regist</div> 
    </template>
    <!--項目の編集-->
    <template v-else-if="habitsRegist == 2">
      <div style="display:inline-block; border: 1px dotted green; margin: 3px 3px 3px 3px; padding: 2px;" @click="changeRegist1()">back</div>
      <br><br>
          <input style="background-color:black;  border: 1px dotted green; color:green; font-family: 'OCRB'; font-size: 16px; padding: 2px; width:50%;" type="text" @keyup.enter="changeRegist1" v-model="habitsNameRegistArry[0]">
          <br>
          <input style="background-color:black;  border: 1px dotted green; color:green; font-family: 'OCRB'; font-size: 16px; padding: 2px; width:50%;" type="text" @keyup.enter="changeRegist1" v-model="habitsNameRegistArry[1]">
          <br>
          <input style="background-color:black;  border: 1px dotted green; color:green; font-family: 'OCRB'; font-size: 16px; padding: 2px; width:50%;" type="text" @keyup.enter="changeRegist1" v-model="habitsNameRegistArry[2]">
          <br>
          <input style="background-color:black;  border: 1px dotted green; color:green; font-family: 'OCRB'; font-size: 16px; padding: 2px; width:50%;" type="text" @keyup.enter="changeRegist1" v-model="habitsNameRegistArry[3]">
          <br>
          <input style="background-color:black;  border: 1px dotted green; color:green; font-family: 'OCRB'; font-size: 16px; padding: 2px; width:50%;" type="text" @keyup.enter="changeRegist1" v-model="habitsNameRegistArry[4]">
          <br>
          <input style="background-color:black;  border: 1px dotted green; color:green; font-family: 'OCRB'; font-size: 16px; padding: 2px; width:50%;" type="text" @keyup.enter="changeRegist1" v-model="habitsNameRegistArry[5]">
          <br>
          <input style="background-color:black;  border: 1px dotted green; color:green; font-family: 'OCRB'; font-size: 16px; padding: 2px; width:50%;" type="text" @keyup.enter="changeRegist1" v-model="habitsNameRegistArry[6]">
      <br><br>
    </template>
    <!--記録の削除-->
    <template v-else-if="habitsRegist == 3">
      <br>
      <div style="display:inline-block; border: 1px dotted green; margin: 3px 3px 3px 3px; padding: 2px;" @click="habitsDbDelete()">delete</div>
      <br>
    </template>    
    </div>
</template>
<script>
import axios from "axios";
import { options } from "@/options";
import { functions } from "@/functions";

export default {
  mixins: [options, functions],
  methods: {
    changeRegist2(){
      this.$store.state.habitsRegist = 2;
    },
    changeRegist1(){
      this.$store.state.habitsRegist = 1;
    },     
    habitsDbRegist(){
  //habits_nameの登録
  let self = this;
  var habits_nameArry = this.$store.state.habitsNameRegistArry;
  for(let i=0; i < 7; i++){
    if(habits_nameArry[i] == null )
      habits_nameArry[i] = 0;
  }
  const params = new URLSearchParams();
  params.append('postData', JSON.stringify({
      userId:this.$store.state.userId,
      operationType:'INSERT', 
      operationTable:'habits_name', 
      update_id: this.$store.state.habitsUpdateId,
      regist_date: this.$store.state.editDate,
      edit_date: this.$store.state.editDate,
      habits_number_0: 'habits_1',
      habits_number_1: 'habits_2',
      habits_number_2: 'habits_3',
      habits_number_3: 'habits_4',
      habits_number_4: 'habits_5',
      habits_number_5: 'habits_6',
      habits_number_6: 'habits_7',
      habits_name_0: habits_nameArry[0],
      habits_name_1: habits_nameArry[1],
      habits_name_2: habits_nameArry[2],
      habits_name_3: habits_nameArry[3],
      habits_name_4: habits_nameArry[4],
      habits_name_5: habits_nameArry[5],
      habits_name_6: habits_nameArry[6],
      }));
  //axiosでPOST送信
  //.thenはプロミス系で非同期処理
  axios.post("http://localhost/listapi/api.php", params)
  .then(response => {
          console.log(response.data);
          self.loginFunction();
  })
  .catch(error => {
      console.log(error);
  });

  //URLSearchParams()のインスタンスを作ってその中のpostDataの中に
  //JSON型に変換したデータを格納している
  //habits_valueの登録
  params.append('postData', JSON.stringify({
      userId:this.$store.state.userId,
      operationType:'INSERT', 
      operationTable:'habits_value', 
      target_date: this.$store.state.editDate,
      edit_date: this.$store.state.editDate,
      habits_1: this.text0,
      habits_2: this.text1,
      habits_3: this.text2,
      habits_4: this.text3,
      habits_5: this.text4,
      habits_6: this.text5,
      habits_7: this.text6
      }));
  //axiosでPOST送信
  //.thenはプロミス系で非同期処理
  axios.post("http://localhost/listapi/api.php", params)
    .then(response => {
          console.log(response.data);
          self.loginFunction();
    })
    .catch(error => {
      console.log(error);
    }); 
   },

   habitsDbDelete(){
  //habits_name,habits_value のdelete処理
  let self = this;
  const params = new URLSearchParams();
  params.append('postData', JSON.stringify({
      userId:this.$store.state.userId,
      operationType:'DELETE', 
      operationTable:'habits', 
      regist_date: this.$store.state.editDate,
      edit_date: this.$store.state.editDate,
      target_date: this.$store.state.editDate
      }));
  //axiosでPOST送信
  //.thenはプロミス系で非同期処理
  axios.post("http://localhost/listapi/api.php", params)
  .then(response => {
          console.log(response.data);
          self.loginFunction();
  })
  .catch(error => {
      console.log(error);
  });
  
   }
  },
  updated(){

  }
}
</script>
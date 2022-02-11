<template>
    <div>
     <!--新規作成のフォーム -->
    <template v-if="this.$store.state.listRegist == 1">
      <!--更新をリアクティブにしてくれる関数 -->
        <p>regist new</p>
        <br>
        <input style="background-color:black;  border: 1px dotted green; color:green; font-family: 'OCRB'; font-size: 16px; padding: 2px;" type="text" @keyup.enter="dbRegist" v-model="listText">
        <!-- <div>deadline timer:
             <input style="background-color:black;  border: 1px dotted green; color:green; font-family: 'OCRB'; font-size: 16px; padding: 2px; width:30px;" type="text" @keyup.enter="dbRegist" v-model="listHour"> H
             <input style="background-color:black;  border: 1px dotted green; color:green; font-family: 'OCRB'; font-size: 16px; padding: 2px; width:30px;" type="text" @keyup.enter="dbRegist" v-model="listMinutes"> M
        </div> -->
        <br>
        <p> default soring number : {{ listRegistSortNumber }}</p>  
        <label>sorting number: </label>
        <input style="background-color:black;  border: 1px dotted green; color:green; font-family: 'OCRB'; font-size: 16px; padding: 2px; width:30px;" type="tel" @keyup.enter="dbRegist" v-model.number="registSortNumber" >
        <br><br>
        <div style="display:inline-block; border: 1px dotted green; margin: 3px 3px 3px 3px; padding: 2px;" @click="dbRegist()">regist</div>
    </template>

    <!--編集のフォーム -->
    <template v-else>
   
        <p>edit</p>
        <div style="display:inline-block; border: 1px dotted green; margin: 3px 3px 3px 3px; padding: 2px;" @click="registFunction()">regits new</div>
        <br><br>
        <p> editing text: </p>        
        <input style="background-color:black;  border: 1px dotted green; color:green; font-family: 'OCRB'; font-size: 16px; padding: 2px;" type="text" @keyup.enter="dbEdit" v-model="listEditText">
        <!-- <div>dead line: {{ listDeadline }}</div>
        <br>
        <div>change deadline:
             <input style="background-color:black;  border: 1px dotted green; color:green; font-family: 'OCRB'; font-size: 16px; padding: 2px; width:30px;" type="text" @keyup.enter="dbEdit" v-model="listHour"> H
             <input style="background-color:black;  border: 1px dotted green; color:green; font-family: 'OCRB'; font-size: 16px; padding: 2px; width:30px;" type="text" @keyup.enter="dbEdit" v-model="listMinutes"> M
        </div> -->
        <br>
     <p> soring number now : {{ this.$store.state.listSortNumber }}</p>        
        <label>change sorting number: </label>
        <input style="background-color:black;  border: 1px dotted green; color:green; font-family: 'OCRB'; font-size: 16px; padding: 2px; width:30px;" type="tel" @keyup.enter="dbEdit" v-model="editSortNumber" >
        <br><br>
        <div style="display:inline-block; border: 1px dotted green; margin: 7px 7px 7px 7px; padding: 2px;" @click="dbComplete()">complete</div>
        <br>
        <div style="display:inline-block; border: 1px dotted green; margin: 7px 7px 7px 7px; padding: 2px;" @click="dbDelete()">delete</div>
        <br>
        <div style="display:inline-block; border: 1px dotted green; margin: 7px 7px 7px 7px; padding: 2px;" @click="dbEdit()">edit</div>
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

   sortingId(){
    this.sortingUserId = this.listDataArry.map(item => item.user_id);
  },    
     registFunction(){
    this.$store.state.listRegist = !(this.$store.state.listRegist);
  },
    

  //sorting更新用の通信
  //更新の入力されたsorting numberによる場合分け
   dbRegist(){
  if(0 < Number(this.registSortNumber) && Number(this.registSortNumber) < Number(this.$store.state.listRegistSortNumber) ){
  const sortingParams = new URLSearchParams();
  for(let i=0; i < this.sortingUserId.length; i++ ){
    if( Number(this.registSortNumber) < Number(this.$store.state.listRegistSortNumber)){
      if( Number(this.registSortNumber) <= Number(this.sortingUserIdNumber[i])){
          sortingParams.append('postData', JSON.stringify({
          userId:this.$store.state.userId,
          operationType:'REGIST_SORTING', 
          operationTable:'list_data', 
          list_id: this.sortingUserId[i],
          sort_number: this.sortingUserIdNumber[i]
      }));
//axiosでPOST送信
//.thenはプロミス系で非同期処理
  axios.post("http://localhost/listapi/api.php", sortingParams)
  .then(response => {
          console.log(response.data);
  })
  .catch(error => {
      console.log(error);
    });
     }
    }
  }
    this.sortingNumber =  this.registSortNumber;
    } else{
     this.sortingNumber =  this.$store.state.listRegistSortNumber;
    }

  //URLSearchParams()のインスタンスを作ってその中のpostDataの中に
  //JSON型に変換したデータを格納している
  const params = new URLSearchParams();
  let self = this;
  params.append('postData', JSON.stringify({
      userId:this.$store.state.userId,
      operationType:'INSERT', 
      operationTable:'list_data', 
      list_text: this.listText, 
      target_date: this.$store.state.editDate,
      edit_date: this.$store.state.editDate,
      is_complete: '',
      is_active: '1',
      deadline: this.deadline,
      sort_number: this.sortingNumber,
      regist_date: '',
      update_date: '',
      delete_date: ''
      }));
  //axiosでPOST送信
  //.thenはプロミス系で非同期処理
  axios.post("http://localhost/listapi/api.php", params)
  .then(response => {
          console.log(response.data);
          //ログイン時の読み込み処理
          self.loginFunction();
  })
  .catch(error => {
      console.log(error);
  });

},

  //編集時のデータ通信処理
  //sorting更新用の通信
  //更新の入力されたsorting numberによる場合分け
     dbEdit(){
  let self = this;
  if ( 0 < Number(this.editSortNumber) && Number(this.editSortNumber) < Number(this.$store.state.listRegistSortNumber) ){
  const sortingParams = new URLSearchParams();
  for(let i=0; i < this.sortingUserId.length ; i++ ){
    //sorting numberの優先順位を上げる更新をするケース
      if(Number(this.editSortNumber) <= Number(this.sortingUserIdNumber[i]) && Number(this.sortingUserIdNumber[i]) < Number(this.$store.state.listSortNumber) ){
          sortingParams.append('postData', JSON.stringify({
          userId:this.$store.state.userId,
          operationType:'EDIT_SORTING', 
          operationTable:'list_data', 
          list_id: this.sortingUserId[i],
          sort_number: this.sortingUserIdNumber[i],
          sorting_method : 'plus'
      }));
  axios.post("http://localhost/listapi/api.php", sortingParams)
  .then(response => {
          console.log(response.data); 
  })
  .catch(error => {
      console.log(error);
    });
      
  } //sorting numberの優先順位を下げる更新をするケース
      if( Number(this.$store.state.listSortNumber) < Number(this.sortingUserIdNumber[i]) && Number(this.sortingUserIdNumber[i]) <= Number(this.editSortNumber) ){
          sortingParams.append('postData', JSON.stringify({
          userId:this.$store.state.userId,
          operationType:'EDIT_SORTING', 
          operationTable:'list_data', 
          list_id: this.sortingUserId[i],
          sort_number: this.sortingUserIdNumber[i],
          sorting_method : 'minus'
      }));
  axios.post("http://localhost/listapi/api.php", sortingParams)
  .then(response => {
          console.log(response.data);
  })
  .catch(error => {
      console.log(error);
    });
     }
   }
   this.sortingNumber = this.editSortNumber;
   
  } else if(Number(this.editSortNumber) >= Number(this.$store.state.listRegistSortNumber) ){
    this.sortingNumber = this.$store.state.listRegistSortNumber;
  } else {
    this.sortingNumber = this.$store.state.listSortNumber 
    }
  //編集のUPDATE通信
  const params = new URLSearchParams();
  params.append('postData', JSON.stringify({
      userId:this.$store.state.userId,
      operationType:'UPDATE', 
      operationTable:'list_data', 
      list_id : this.$store.state.listEditNumber,
      list_text: this.$store.state.listEditText, 
      target_date: this.$store.state.editDate,
      edit_date: this.$store.state.editDate,
      is_complete: '',
      is_active: '1',
      deadline: this.deadline,
      sort_number: this.sortingNumber,
      regist_date: '',
      update_date: '',
      delete_date: ''
      }));

  //axiosでPOST送信
  //.thenはプロミス系で非同期処理
  axios.post("http://localhost/listapi/api.php", params)
  .then(response => {
          console.log(response.data);
          //ログイン時の読み込み処理
          self.loginFunction();
  })
  .catch(error => {
      console.log(error);
  });

    },
  
  //DBの削除処理
  //データ削除に伴う再sorting処理
  dbDelete(){
  let self = this;  
  const sortingParams = new URLSearchParams();
  for(let i=0; i < this.sortingUserId.length; i++ ){
      if( Number(this.$store.state.listSortNumber) < Number(this.sortingUserIdNumber[i])){
          sortingParams.append('postData', JSON.stringify({
          userId:this.$store.state.userId,
          operationType:'DELETE_SORTING', 
          operationTable:'list_data', 
          list_id: this.sortingUserId[i],
          sort_number: this.sortingUserIdNumber[i]
      }));
  //axiosでPOST送信
  //.thenはプロミス系で非同期処理
  axios.post("http://localhost/listapi/api.php", sortingParams)
  .then(response => {
          console.log(response.data);
    })
  .catch(error => {
      console.log(error);
     });
    }
   }

  //DB削除通信
  const params = new URLSearchParams();
  params.append('postData', JSON.stringify({
      userId:this.$store.state.userId,
      operationType:'DELETE', 
      operationTable:'list_data',
      list_id : this.$store.state.listEditNumber,
      edit_date: this.$store.state.editDate      
      }));
  //axiosでPOST送信
  //.thenはプロミス系で非同期処理
  axios.post("http://localhost/listapi/api.php", params)
  .then(response => {
          console.log(response.data);
          //ログイン時の読み込み処理
          self.loginFunction();   
  })
  .catch(error => {
      console.log(error);
  });
  },
  
  //complete登録通信
  //完了してないなら完了，完了してないなら未完了と登録
  dbComplete(){
    let self = this;
    if(this.$store.state.listComplete == 0 || this.$store.state.listComplete == false ) {
      this.$store.state.listComplete = 1;
      } else {
      this.$store.state.listComplete = 0;
      }
  const params = new URLSearchParams();
  params.append('postData', JSON.stringify({
      userId:this.$store.state.userId,
      operationType:'COMPLETE', 
      operationTable:'list_data',
      list_id : this.$store.state.listEditNumber,
      edit_date: this.$store.state.editDate,
      is_complete: this.$store.state.listComplete      
      }));
  //axiosでPOST送信
  //.thenはプロミス系で非同期処理
  axios.post("http://localhost/listapi/api.php", params)
  .then(response => {
          console.log(response.data);
          //ログイン時の読み込み処理
          self.loginFunction();      
  })
  .catch(error => {
      console.log(error);
  });
  }
 },
  beforeUpdate(){              
  //sorting用のidの配列を返す関数
  this.sortingUserId = this.$store.state.listData.map(item => {
    if(item.target_date == this.$store.state.editDate){
    return item.list_id;
    }}).filter(v => v);
  //ListRegistの関数
  //sorting用のidに対応するsorting numberの配列を返す関数     
  this.sortingUserIdNumber = this.$store.state.listData.map(item => {
    if(item.target_date == this.$store.state.editDate){
    return item.sort_number;
    }}).filter(v => v);  
  }
}
</script>
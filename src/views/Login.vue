<template>
    <div>
        <div>userId: {{this.$store.state.userId}}</div>
    <div v-if="userId == null">  
        <div>ID:</div>
        <input style="background-color:black; width:13%; border: 1px dotted green; color:green; font-family: 'OCRB'; font-size: 16px; padding: 2px;" type="text" v-model="loginId">
            <br>
            <br>
        <div>password:</div>
        <input style="background-color:black; width:13%; border: 1px dotted green; color:green; font-family: 'OCRB'; font-size: 16px; padding: 2px;" type="password " @keyup.enter="dbLogin" v-model="loginPassword">
            <br>
            <br>
        <div style="display:inline-block; border: 1px dotted green; margin: 3px 3px 3px 3px; padding: 2px;" @click="dbLogin()">login</div>
    </div>
    <div v-else>
    </div>
    </div>           
</template>

<script>
import axios from "axios";
import { options } from "@/options";
import { functions } from "@/functions";

export default{
mixins: [options, functions],
methods: {
  dbLogin(){      
  const params = new URLSearchParams();
  let self = this;
  params.append('postData', JSON.stringify({
      operationType:'PASSWORD', 
      operationTable:'user_data',
      username: this.loginId,
      password: this.loginPassword
      }));
  //axiosでPOST送信
  //.thenはプロミス系で非同期処理
  axios.post("http://localhost/listapi/api.php", params)
  .then(response => {
          console.log(response.data);
          //ログイン時の読み込み処理
          this.$store.state.userId = response.data[0].user_id;
          self.loginFunction();
          if(this.$store.state.userId != null){
          this.$router.push('/list');
          }
  })
  .catch(error => {
      console.log(error);
  });
  }
 }
}
</script>
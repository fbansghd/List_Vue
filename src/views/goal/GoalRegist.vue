<template>
    <div>
        <br>
        <br>
        <template v-if="goalRegist">
        <div style="display:inline-block; border: 1px dotted green; margin: 3px 3px 3px 3px; padding: 2px;" @click="toEdit()">edit</div>            
            <br>
            <br>
            <input style="background-color:black; width:70%; border: 1px dotted green; color:green; margin: 3px 3px 3px 3px; font-family: 'OCRB'; font-size: 16px; padding: 2px;" type="text" v-model="goalText">
            <br>
            <br>
            <label style="padding: 5px; width:70%; margin: 3px 3px 3px 3px; color: green; border: 1px dotted green; background-color: black; cursor: pointer;">
                <input style="display:none;" type="file" id="file" ref="file" @change="onFileChange"/>upload
            </label>
            <br>
            <br>                        
            <div style="display:inline-block; border: 1px dotted green; margin: 3px 3px 3px 3px; padding: 2px;" @click="uploadFile()">regist</div>
            <br>
            <br>
            <br>
        </template>
        <template v-else>
        <div style="display:inline-block; border: 1px dotted green; margin: 3px 3px 3px 3px; padding: 2px;" @click="toRegist()">regist</div>
        <br>
        <br>            
            <label for="goal">goal: {{ goalName }}</label>
            <br>
            <br>
            <div style="display:inline-block; border: 1px dotted green; margin: 3px 3px 3px 3px; padding: 2px;" @click="goalDbDelete()">delete</div>          
        </template>    
    </div>
</template>
<script>
import axios from "axios";
import { options } from "@/options";
import { functions } from "@/functions";

export default {
    mixins: [options, functions],
    data(){
        return{
            file: '',
            url: ''
        }
    },
    methods: {
    toEdit(){
        this.$store.state.goalRegist = false;
    },
    toRegist(){
        this.$store.state.goalRegist = true;
    },
    uploadFile(){
  //DB登録情報        
  const params = new URLSearchParams();
  let self = this;

  //画像アップ処理      
  let formData = new FormData();
  formData.append('file', this.file );
  axios.post("http://localhost/listapi/img.php", formData,
        { 
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            console.log(response.data);
            //DBに画像情報をregist
              params.append('postData', JSON.stringify({
              userId:this.$store.state.userId,
              operationType:'IMG', 
              operationTable:'goal_data',
              goal_name: self.goalText,
              img_file: response.data,
              sort_number:'3', 
              regist_date: '0'
              }));

            axios.post("http://localhost/listapi/api.php", params)
            .then(response => {
            console.log(response.data);
            //ログイン時の読み込み処理
            self.loginFunction();
            })
            .catch(error => {
            console.log(error);
            });
        })
        .catch(error => {
      console.log(error);
        });
      },
    onFileChange(e){
        this.file = e.target.files[0]
        },
    goalDbDelete(){
    const params = new URLSearchParams();
    let self = this;
    params.append('postData', JSON.stringify({
    userId:this.$store.state.userId,
    operationType:'DELETE', 
    operationTable:'goal_data',
    goal_id: this.$store.state.goalId
    }));

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
    }
}
</script>
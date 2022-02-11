import axios from "axios";

export const functions = {
methods: {
    loginFunction() {
      if(this.$store.state.userId != null){
    //URLSearchParams()のインスタンスを作ってその中のpostDataの中に
    //JSON型に変換したデータを格納している
    const params = new URLSearchParams();
    params.append('postData', JSON.stringify({userId: this.$store.state.userId, operationType:'LOGIN', operationTable:'user_data'}));

    //axiosでPOST送信
    //.thenはプロミス系で非同期処理
    axios.post("http://localhost/listapi/api.php", params)
    .then(response => {
          this.$store.state.userData = JSON.parse(response.data[0]).splice(0);
          this.$store.state.listData = JSON.parse(response.data[1]).splice(0);
          this.$store.state.habitsNameData = JSON.parse(response.data[2]).splice(0);
          this.$store.state.habitsValueData = JSON.parse(response.data[3]).splice(0);
          this.$store.state.goalData = JSON.parse(response.data[4]).splice(0);
          this.$store.state.editDate = this.$store.state.userData[0].edit_date;
          console.log(this.$store.state.userData[0].edit_date);
     })
    .catch(error => {
      console.log(error);
     });
    }
    }
  }   
};
<template>
    <div>
      <!--今日の日付に対応するデータを取得する関数 -->
      <p>{{todaysFunction() }}</p>
      <p>{{arryFunction() }}</p>
      <p>edit date</p>      
      <p> {{ editDate }}</p>
        <div>
        <div @click="yesterday()" style="display:inline-block; border: 1px dotted green; margin: 3px 3px 3px 3px; padding: 2px;">prev</div>
        <div @click="tomorrow()" style="display:inline-block; border: 1px dotted green; margin: 3px 3px 3px 3px; padding: 2px;">next</div>
        </div>
        <p>ListMain</p>
          <div v-for="today in todays" :key="today.sort_number">
              <div @click="clickFunction(today.list_id, today.list_text, today.sort_number, today.is_complete, today.deadline)">
                <s v-if="today.is_complete == 1">{{ today.sort_number }}.  {{ today.list_text }}</s>
                <div v-else>{{ today.sort_number }}.  {{ today.list_text }}</div>    
              </div>
          </div>
    </div>
</template>
<script>
import moment from "moment";
import { options } from "@/options";
import { functions } from "@/functions";

export default{
  mixins: [options, functions],
  methods: {
  tomorrow(){
    this.$store.state.editDate = moment(this.$store.state.editDate).add(1,'days').format('YYYY-MM-DD');
  },
  yesterday(){
    this.$store.state.editDate = moment(this.$store.state.editDate).add(-1,'days').format('YYYY-MM-DD');
  },
  clickFunction(x,y,z,p,q){
    this.$store.state.listEditNumber = x;
    this.$store.state.listEditText = y;
    this.$store.state.listSortNumber = z;
    this.$store.state.listComplete = p;
    this.$store.state.listDeadline = q;
    this.$store.state.listRegist = 0;
  },
  arryFunction(){
    this.$store.state.listRegistSortNumber = (this.$store.state.listData.map(item => item.target_date == this.$store.state.editDate)).reduce(function(a,b){ 
    return a+b; }) + 1 ;
  },
  todaysFunction(){
    //無限ループ防止かつlist表示をリアクティブにする
    //日付が更新されるときの再読み込み
    if( String(this.$store.state.editDateCopy) !=  String(this.$store.state.editDate) ){
        this.$store.state.todays = this.$store.state.listData.filter((v) => v.target_date == this.$store.state.editDate).sort(function(a,b){
        return a.sort_number - b.sort_number;
          });
      this.$store.state.editDateCopy = this.$store.state.editDate;  
    //データが更新されるときの再読み込み
      }else if(String(this.$store.state.listDataCopy) != String(this.$store.state.listData)){
        this.$store.state.todays = this.$store.state.listData.filter((v) => v.target_date == this.$store.state.editDate).sort(function(a,b){
        return a.sort_number - b.sort_number;
          });
        this.$store.state.listDataCopy = this.$store.state.listData;
      }
  },
  arryFunctionBeta(){
    return this.$store.state.listData.map(item => item.target_date == this.$store.state.editDate);
  }
 }
}
</script>
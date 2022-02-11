<template>
  <div>
    <!--カレンダーに対してlistを反応させるための関数 -->
    <p>{{ todaysMethod() }}</p>
    <p>{{ editDate }}</p>
    <div>
    <div style="display:inline-block; border: 1px dotted green; margin: 3px 3px 3px 3px; padding: 2px;" @click="countDown()">prev</div>
    <div style="display:inline-block; border: 1px dotted green; margin: 3px 3px 3px 3px; padding: 2px;" @click="countUp()">next</div>
    </div>
    <p>Calendar</p>
      <tr>
          <th>Sun</th><th>Mon</th><th>The</th>
          <th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th>
      </tr>
      <tr v-for="m of 6" :key="m">
        <td v-for="n of 7" :key="n">
          <div @click="changeEditDay(n,m)">
           {{ calenderDisplay(calenderMethod(n,m)) }}
            <div v-for="list in listData" :key="list.list_id">
                <div v-if="list.target_date == calenderDate(n,m)">
                  <div v-if="list.is_complete == 1">
                    <s>{{ list.list_text }}</s>
                  </div>
                  <div v-else>
                    <div>{{ list.list_text }}</div>
                  </div>                
                </div>
            </div>
          </div>
        </td>
      </tr>      
  </div>
</template>

<script>
import moment from "moment";
import { options } from "@/options";

export default{
  mixins: [options],
  methods: {
      firstDayOfMonth(date) {
      return moment(date).startOf('month').format('d');
    },
      endOfMonth(date){
      return moment(date).endOf('month').format('DD');
    },
      calenderMethod(n,m){
      return  n-this.firstDayOfMonth(this.$store.state.editDate) + (m-1)*7 ;
        
    },
      countDown(){
      this.$store.state.editDate = moment(this.$store.state.editDate).add(-1,'month').format('YYYY-MM-DD');
    },
      countUp(){
      this.$store.state.editDate = moment(this.$store.state.editDate).add(1,'month').format('YYYY-MM-DD');
    },
      calenderDate(n,m){
      return moment(this.$store.state.editDate).format('YYYY-MM-')
      +('0'+ this.calenderMethod(n,m)).slice(-2);
    },
      calenderDisplay(x){
      if(x > 0 && x <= this.endOfMonth(this.$store.state.editDate)){
        return x;
      }else{
        return null;
      }
    },
      changeEditDay(n,m){
      return this.$store.state.editDate = this.calenderDate(n,m);
    },
      todaysMethod(){
      this.$store.state.todays = this.$store.state.listData.filter((v) => v.target_date == this.$store.state.editDate).sort(function(a,b){
      return a.sort_number - b.sort_number;
        });
      }
    }
  }
</script>

<style scoped>
tr {
  width:  70%;
  height: 50px;
}
th {
  width:  10%;
  height: 50px;
}
</style>
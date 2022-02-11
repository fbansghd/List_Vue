<template>
  <div>
    <p>{{  updateArry() }}</p>
    <p>{{  habitsUpdate()  }}</p>
    <p>edit date: {{ editDate }}</p>
    <div style="display:inline-block; border: 1px dotted green; margin: 3px 3px 3px 3px; padding: 1px;" @click="countDown()">prev</div>
    <div style="display:inline-block; border: 1px dotted green; margin: 3px 3px 3px 3px; padding: 1px;" @click="countUp()">next</div>
    <p>Week</p>
      <tr>
         <th>Sun</th><th>Mon</th><th>The</th>
         <th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th>
      </tr>
      <td v-for="n of 7" :key="n">
        <div @click="changeEditDay(n)">
        <div> {{ startingDay(n) }} </div>
        <td>         
          <div v-for="habits in habitsNameData" :key="habits.name_id">
            <div v-if="habits.regist_date == habitsDate(n)">
             {{ habits.habits_name }}
            </div>
          </div>
        </td>
        <td>               
          <div v-for="habitsvalue in habitsValueData" :key="habitsvalue.value_id">
            <div v-if="habitsvalue.target_date == habitsDate(n)">
                          <div v-if="habitsNameRegistArry.length >= 1">{{ habitsvalue.habits_1 }}</div>
                          <div v-if="habitsNameRegistArry.length >= 2">{{ habitsvalue.habits_2 }}</div>
                          <div v-if="habitsNameRegistArry.length >= 3">{{ habitsvalue.habits_3 }}</div>
                          <div v-if="habitsNameRegistArry.length >= 4">{{ habitsvalue.habits_4 }}</div>
                          <div v-if="habitsNameRegistArry.length >= 5">{{ habitsvalue.habits_5 }}</div>
                          <div v-if="habitsNameRegistArry.length >= 6">{{ habitsvalue.habits_6 }}</div>
                          <div v-if="habitsNameRegistArry.length >= 7">{{ habitsvalue.habits_7 }}</div>
            </div>             
          </div>
        </td>
        </div>  
      </td>
  </div>
</template>

<script>
import moment from "moment";
import { options } from "@/options";

export default{
  mixins: [options],

  methods: {
      countDown(){
      this.$store.state.editDate = moment(this.$store.state.editDate).add(-7,'days').format('YYYY-MM-DD');
    },
      countUp(){
      this.$store.state.editDate = moment(this.$store.state.editDate).add(7,'days').format('YYYY-MM-DD');
    },
      startingDay(number){
      return moment(this.$store.state.editDate).startOf('week').add(number-1,'days').format('D');
    },
      changeEditDay(number){
      return this.$store.state.editDate = moment(this.$store.state.editDate).startOf('week').add(number-1,'days').format('YYYY-MM-DD');
    },
      habitsDate(number){
      return moment(this.$store.state.editDate).startOf('week').add(number-1,'days').format('YYYY-MM-DD');
    },
      updateArry(){
      this.habitsUpdateArry = this.$store.state.habitsNameData.map(item => (item.regist_date)).filter((x, i, self) => self.indexOf(x) === i);
    },
      habitsUpdate(){
      this.$store.state.habitsUpdateId = this.$store.state.habitsNameData.map(item => (item.update_id)).filter((x, i, self) => self.indexOf(x) === i).reduce((a,b)=>Number(a)>Number(b)?a:b);
    }
  }
}
</script>

<style scoped>
tr {
  width:  300px;
  height: 50px;
}
th {
  width:  300px;
  height: 50px;
}
</style>
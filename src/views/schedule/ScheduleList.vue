<template>
  <div>
    <p>ScheduleList</p>
      <div v-for="today in todays" :key="today.sort_number">
        <div @click="clickFunction(today.list_id, today.list_text, today.sort_number, today.is_complete)">
          <div v-if="today.is_complete == 1">
            <s>{{ today.sort_number }}.  {{ today.list_text }}</s>
          </div>
          <div v-else>
            <div>{{ today.sort_number }}.  {{ today.list_text }}</div>
          </div>
        </div>
      </div>
    <router-link to="/list">edit list</router-link>       
  </div>
</template>
<script>
import { options } from "@/options";

export default{
  mixins: [options]
}
</script>
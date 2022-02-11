<template>
  <div class="container">
    <div v-if="userId != null">
       <header>
       <router-link to="/list">List</router-link>
       <router-link to="/schedule">Schedule</router-link>
       <router-link to="/habits">Habits</router-link>
       <router-link to="/goal">Goal</router-link>
       <div @click="logout()" style="color:#003f8e;text-decoration: underline;">logout</div>
      </header>  
    </div>
    <div v-else>
    </div>
    <router-view></router-view>    
  </div>  
</template>
<script>

import { functions } from "@/functions";
import { options } from "@/options";

export default{
mixins: [functions, options],
methods: {
  logout(){
      this.$router.push('/');
      this.$store.state.userId = null;
  }
},    
created() {
  this.loginFunction();
  }
}
</script>
<style>
header{
  display: flex;
  justify-content: space-evenly;
}
nav{
  display: flex;
  justify-content: space-evenly;
}
body {
  background-color: black;
  color: green;
  font-family: 'OCRB';
}

::-webkit-scrollbar {
    width: 10px;
}
::-webkit-scrollbar-track {
  border-radius: 10px;
  box-shadow: inset 5px 5px 5px black;
}
::-webkit-scrollbar-thumb {
  background-color: hsl(120, 100%, 4%);
  border-radius: 10px;
}

</style>
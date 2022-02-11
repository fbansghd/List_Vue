<template>
    <div>        
            <div v-for="goal of goalData" :key="goal.goal_id"> 
            <div @click="goalClick(goal.goal_id, goal.goal_name)">       
            <img :src="goal.img_file" >
                <ul>
                    <li>{{ goal.goal_name }}</li>
                </ul>
            </div>
            </div>
    </div>
</template>
<script>
import { options } from "@/options";
export default {
    mixins: [options],
    methods: {
        goalClick(x, y){
            this.$store.state.goalRegist = false;
            this.$store.state.goalId = x;
            this.$store.state.goalName = y;
        }
    }
}
</script>
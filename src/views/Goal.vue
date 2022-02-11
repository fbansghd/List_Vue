<template>
    <div> 
        <nav>
        <aside><goalregist/></aside>
        <main> <goalimage/></main>
        </nav>
    </div>
</template>

<script>
import goalregist from '@/views/goal/GoalRegist'
import goalimage from '@/views/goal/GoalImage'
export default {
    components: {
        goalregist,
        goalimage
    }
}
</script>

<style scoped>
nav {
    padding: 5em;
}
aside{
    width: 15%;
}
main{
    width: 70%;
}
</style>
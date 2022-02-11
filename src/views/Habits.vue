<template>
    <div> 
        <nav>
        <aside>
            <habitsregist/>
        </aside>
        <main> <habitscalender/></main>
        </nav>
    </div>
</template>

<script>
import habitsregist from '@/views/habits/HabitsRegist'
import habitscalender from '@/views/habits/HabitsCalender'
export default {
    components: {
        habitsregist,
        habitscalender
    }
}
</script>

<style scoped>
nav {
    padding: 5em;
}
aside{
    width: 10%;
}
main{
    width: 70%;
}
</style>
<template>
    <div>
        <nav> 
        <aside><schedulelist/></aside>
        <main> <schedulecalender/></main>
        </nav>
    </div>
</template>

<script>
import schedulelist from '@/views/schedule/ScheduleList'
import schedulecalender from '@/views/schedule/ScheduleCalender'
export default {
    components: {
        schedulelist,
        schedulecalender
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
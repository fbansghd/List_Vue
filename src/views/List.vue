<template id="list">
    <div> 
        <nav>
        <aside>
            <listregist/>
        </aside>
        <main>
            <listmain/>
        </main>
        </nav>
    </div>
</template>

<script>
import listmain from '@/views/list/ListMain'
import listregist from '@/views/list/ListRegist'
export default {
    components: {
        listmain,
        listregist,
    }
}
</script>

<style scoped>
nav {
    padding: 5em;
}
aside{
    width: 40%;
}
main{
    width: 40%;
}
</style>
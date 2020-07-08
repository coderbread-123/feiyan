<template>
    <div class="knowage">
        <Top>防疫知识</Top>
        <div class="content">
            <img src="../assets/img/防疫知识.png" alt="">
        </div>
    </div>
</template>

<script>
import Top from '../components/preknowledge/top.vue';
export default {
    name:'knowledge',
    components:{Top}
}
</script>
<style scoped>

    .content img{
        width: 120%;
        margin-top: 7.5rem;
        margin-left: 4.5rem;
    }
</style>
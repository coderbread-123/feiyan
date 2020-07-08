<template>
  <div class="top">
        <!-- <img style='width:1rem;' @click='$router.push("/")' src="../../assets/img/back.png" alt=""> -->
        <!-- <slot></slot> -->
        <font style='width:1rem;'></font>
    </div>
</template>

<script>
export default {
  name: 'Top',
}
</script>
<style scoped>
 .top{
        width: 100%;
        
        color: black;
        text-align: center;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1rem;
        position: fixed;
        top: 5rem;
        padding: 0.5rem;
        z-index: 2;
        }
</style>

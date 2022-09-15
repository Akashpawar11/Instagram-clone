<template>
    <div class="bgError">
        <img class="gif" src="../assets/404-error.gif" alt="">
        <h2 class="center">Error 404 - Page not Found</h2>
    </div>
</template>

<script>
export default {
    name: 'errorPage'
}
</script>

<style scoped>
.bgError{
    background-color: rgb(255, 255, 255);
    height: 100vh;
    width: 100vw;
}

.gif {
    height: auto;
    width: auto;
    border: none;
    height: 80%;
    width: 53%;
}

.gif:hover {
    transform: scale(1.0);
}
</style>
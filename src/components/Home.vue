<template>
    <div>
        <div class="container-fliud home-screen">
            <div class="row">
                    <div class="input-group dark search-bar">
                        <input type="text" v-model="username" class="form-control search-input dark" placeholder="Search">
                            <button class="btn"  type="button">
                                <router-link :to=" `/search-results/` + this.username "><span style="color:white" class="fa fa-search" aria-hidden="true"></span></router-link>
                            </button>

                    </div>
            </div>
            <SearchResults />
        </div>
    </div>
</template>

<script>
import SearchResults from './SearchResults.vue';
export default {
    name: "HomePage",
    components: {
        SearchResults  
    },
    data() {
        return {
            username: ""
        };
    },
    components: { SearchResults }
}
</script>

<style>
body {
    padding: 0;
    margin: 0;
    background-color: black;
}
.home-screen{
    height: 100vh;
}

.search-bar {
    height: 50px;
    border-bottom: 1px solid grey;
    padding: 7px auto
}
.search-input{
    background-color: black;
    margin: 6px 0 6px 6px;
    color: white;
    font-family: Calibri;
}
</style>
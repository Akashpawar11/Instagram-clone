<template>
    <div>
        <div class="container-fliud home-screen">
            <!-- Search Bar -->
            <div class="row">
                <div class="input-group dark search-bar">
                    <router-link v-if="dataFetched" to="/"><i class="arrow-icon fa fa-arrow-left" style="font-size:24px"></i></router-link>
                    <input type="text" v-model="username" class="form-control search-input dark" placeholder="Search">
                    <button class="btn" @click="search" type="button">
                        <span style="color:white" class="fa fa-search" aria-hidden="true"></span>
                    </button>
                </div>
            </div>

            <!-- loader starts -->
            <div>
                <div class="lds-roller" v-if="loading">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>

            <!-- <Searched Results if api fetched successfully/> -->
            <div v-if="!loading" class="container-fluid home-screen p-0 m-0">
                <!-- navbar after searched -->
                <div v-if="dataFetched" class="row p-0 m-0">
                    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                        <ul class="navbar-nav navbarflex">
                            <li class="nav-item">
                                <a class="nav-link" href="#">Top</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link active" href="/search-results">Accounts</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Audio</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Tags</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Places</a>
                            </li>
                        </ul>
                    </nav>
                </div>

                <h4 class="error" v-if="err">
                    {{this.errMsg}}
                </h4>

                <h4 class="error" v-if="Error">
                    {{this.errorMessage}}
                </h4>

                <div v-if="dataFetched" class="searchResults container-fluid p-0 m-0">
                    <div v-for="user in searchData" :key="user.id" class="user-thumbnail row">
                        <div class="user row d-flex">
                            <router-link class="d-flex flex-row" :to=" `/public-posts/`+ user.user.pk ">
                                <div class="imageDiv"><img class="imageSmall" src="../assets/users-avatar.jpg" alt="profile picture">
                                </div>
                                <div class="user-details d-flex flex-column">
                                    <div>
                                        <h5 style="color:antiquewhite">{{user.user.username}}</h5>
                                    </div>
                                    <div>
                                        <h6 style="color:gainsboro">{{user.user.full_name}}</h6>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    </div>
</template>

<script>
import axios from 'axios'
// import SearchResults from './SearchResults.vue';
export default {
    name: "HomePage",
    components: {
        // SearchResults
    },
    data() {
        return {
            searchData: [],
            username: "",
            dataFetched: '',
            Error: '',
            errorMessage: '',
            loading: false,
            err: '',     // used for 203,202 error,
            errMsg: ''
        };
    },
    methods: {
        async search() {
            this.loading = true
            // API fetching in try block
            try {
                let username1 = this.username
                const result = await axios.get(
                    'https://instagram47.p.rapidapi.com/search',
                    {
                        headers: {
                            'X-RapidAPI-Key': 'd4903c298emshd5d047f07ca52bdp13d08ejsn0b2611e63d82',
                            'X-RapidAPI-Host': 'instagram47.p.rapidapi.com'
                        },
                        params: { search: username1 },
                    });
                console.log(result)
                if (result.data.statusCode == 203 || result.data.statusCode == 202) {
                    this.loading = false
                    this.dataFetched = false
                    this.err = true
                    this.errMsg = ("Error Occured - error" + result.data.statusCode)
                } else if (result.message == "Network Error") {
                    this.loading = false
                    this.networkError = true
                } else if (result.data.statusCode == 102) {
                    this.err = true
                    this.errMsg = 'Error 102 - Cannot Process request'
                    this.loading = false
                } else {
                    this.dataFetched = true
                    this.searchData = result.data.body.users
                    this.loading = false
                }

            } catch (error) {
          //Catch block to show error/s
                console.log(error)
                if (error.message == "Network Error") {
                    this.loading = false
                    this.errMsg = "Network Error"
                }
                this.err = true
                this.errMsg = error.message
            }
        }
    }
}
</script>

<style>
body {
    padding: 0;
    margin: 0;  
    background-color: black;
}

h4.error {
    color: antiquewhite;
    font-family: Calibri;
    margin-top: 3rem;
}
.user-details{
    padding: 7px 15px;
}
.home-screen {
    height: 100vh;
}
.imageDiv{
    display: flex;
    align-items: center;
    padding-left: 5px;
}

.search-bar {
    height: 50px;
    padding: 7px auto
}

.search-input {
    background-color: black;
    margin: 6px 0 6px 6px;
    color: white;
    font-family: Calibri;
}
.navbar{
    border-bottom: 1px solid grey;
}

.row {
    padding: 0;
    margin: 0;
}

.navbarflex {
    display: flex;
    flex-direction: row;
}

.imageSmall {
    height: 53px;
    width: 53px;
    border-radius: 50%;
}

.arrow-icon {
    height: 40px;
    margin-top: 10px;
    color: white;
    padding-right: 15px;
}

li {
    padding: 0 10px;
}


/* Loader starts */
.lds-roller {
    display: inline-block;
    position: relative;
    width: 90px;
    height: 90px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 3rem;
    margin-top: 3rem;
    text-align: center;
    margin-top: 12%;
}

.lds-roller div {
    animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    transform-origin: 40px 40px;
}

.lds-roller div:after {
    content: " ";
    display: block;
    position: absolute;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: rgb(255, 255, 255);
    margin: -4px 0 0 -4px;
}

.lds-roller div:nth-child(1) {
    animation-delay: -0.036s;
}

.lds-roller div:nth-child(1):after {
    top: 63px;
    left: 63px;
}

.lds-roller div:nth-child(2) {
    animation-delay: -0.072s;
}

.lds-roller div:nth-child(2):after {
    top: 68px;
    left: 56px;
}

.lds-roller div:nth-child(3) {
    animation-delay: -0.108s;
}

.lds-roller div:nth-child(3):after {
    top: 71px;
    left: 48px;
}

.lds-roller div:nth-child(4) {
    animation-delay: -0.144s;
}

.lds-roller div:nth-child(4):after {
    top: 72px;
    left: 40px;
}

.lds-roller div:nth-child(5) {
    animation-delay: -0.18s;
}

.lds-roller div:nth-child(5):after {
    top: 71px;
    left: 32px;
}

.lds-roller div:nth-child(6) {
    animation-delay: -0.216s;
}

.lds-roller div:nth-child(6):after {
    top: 68px;
    left: 24px;
}

.lds-roller div:nth-child(7) {
    animation-delay: -0.252s;
}

.lds-roller div:nth-child(7):after {
    top: 63px;
    left: 17px;
}

.lds-roller div:nth-child(8) {
    animation-delay: -0.288s;
}

.lds-roller div:nth-child(8):after {
    top: 56px;
    left: 12px;
}

@keyframes lds-roller {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
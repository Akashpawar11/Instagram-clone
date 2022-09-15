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
            <!-- <Searched Results if api fetched successfully/> -->
            <div class="container-fluid home-screen p-0 m-0">
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

                <h4 v-if="err">
                    {{this.errMsg}}
                </h4>

                <h4 v-if="Error">
                    {{this.errorMessage}}
                </h4>

                <div v-if="dataFetched" class="searchResults container-fluid p-0 m-0">
                    <div v-for="user in searchData" :key="user.id" class="user-thumbnail row">
                        <div class="user row d-flex">
                            <router-link :to=" `/public-posts/`+ user.user.pk ">
                                <div><img class="imageSmall" :src="user.user.profile_pic_url" alt="user profile picture">
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
            dataFetched: undefined,
            Error: '',
            errorMessage: '',
            err: '',     // used for 203,202 error,
            errMsg: ''
        };
    },
    methods: {
        async search() {
            // API fetching in try block
            try {
                let username1 = this.username
                const result = await axios.get(
                    'https://instagram47.p.rapidapi.com/search',
                    {
                        headers: {
                            'X-RapidAPI-Key': '4019c68f6fmsh2280c1edd5d1458p1a4489jsnbb84be4d501a',
                            'X-RapidAPI-Host': 'instagram47.p.rapidapi.com'
                        },
                        params: { search: username1 },
                    });
                console.log(result)
                if (result.data.statusCode == 203 || result.data.statusCode == 202) {
                    this.dataFetched = false
                    this.err = true
                    this.errMsg = 'Error Occured'
                } else if (result.message = "Network Error") {
                    this.networkError = true
                } else {
                    this.dataFetched = true
                    this.searchData = result.data.body.users
                }

            } catch (error) {               //Catch block to show error/s
                console.log(error)
                this.Error = true
                this.errorMessage = error.message
            }
        }
    }
    // async mounted() {
    //     // let username1 = (this.$route.params.username).toString()
    //     console.log(username1)
    //     // API fetching in try block
    //     try {
    //         const result = await axios.get(
    //             'https://instagram47.p.rapidapi.com/search',
    //             {
    //                 headers: {
    //                     'X-RapidAPI-Key': '4019c68f6fmsh2280c1edd5d1458p1a4489jsnbb84be4d501a',
    //                     'X-RapidAPI-Host': 'instagram47.p.rapidapi.com'
    //                 },
    //                 params: { search: username1 },
    //             });
    //         console.log(result)
    //         if(result.data.statusCode)
    //         this.searchData = result.data.body.users
    //     } catch (error) {               //Catch block to show error/s
    //         console.log(error)
    //         this.errorMsg = error.message
    //     }
    // }
}
</script>

<style>
body {
    padding: 0;
    margin: 0;
    background-color: black;
}

h4 {
    color: antiquewhite;
    font-family: Calibri;
    margin-top: 3rem;
}

.home-screen {
    height: 100vh;
}

.search-bar {
    height: 50px;
    border-bottom: 1px solid grey;
    padding: 7px auto
}

.search-input {
    background-color: black;
    margin: 6px 0 6px 6px;
    color: white;
    font-family: Calibri;
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
    height: 45px;
    width: 45px;
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
</style>
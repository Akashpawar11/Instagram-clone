<template>
    <!-- main div -->
    <div>
        <!-- main container-fluid -->
        <div class="container-fluid home-screen p-0 m-0">
            <!-- Search Bar -->
            <div class="row">
                <div class="input-group dark search-bar">
                    <router-link v-if="dataFetched" to="/" @click="dataFetched = false"><i class="arrow-icon fa fa-arrow-left" style="font-size:24px"></i></router-link>
                    <input type="text" @keypress="Keysearch" spellcheck="false" style="border-radius: 7px;padding: 3px 14px 5px 15px; margin: 10px 0 0 10px;" class="form-control search-input dark" placeholder="Search">
                    <button class="btn" @click="search" type="button" style="padding: 9px 4px 5px 5px;">
                        <span style="color:white; padding: 10px 10px 10px 10px;" class="fa fa-search" aria-hidden="true"></span>
                    </button>
                </div>
            </div>

            <!-- loader -->
            <div v-if="loading" style="margin: 7rem auto;">
                <div class="lds-roller">
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

            <!-- After loader stops -->
            <div v-if="!loading" class="container-fluid home-screen p-0 m-0">
                <div v-if="dataFetched" class="row p-0 m-0">
                    <nav class="navbar navbar-expand-lg navbar-dark">
                        <ul class="navbar-nav navbarflex">
                            <li class="nav-item">
                                <router-link class="nav-link" to="/search-results/top">Top</router-link>
                            </li>
                            <li style="border-bottom:2px solid white" class="nav-item">
                                <router-link class="nav-link active" to="#">Accounts</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link class="nav-link" to="/search-results/audio">Audio</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link class="nav-link" to="/search-results/tags">Tags</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link class="nav-link" to="/search-results/places">Places</router-link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <!-- error block -->
                <div v-if="realAPI">
                    <h4 class="error" v-if="err">
                        {{this.errMsg}}
                    </h4>
                    <h4 class="error" v-if="Error">
                        {{this.errorMessage}}
                    </h4>
                </div>

                <!-- Execute This block if Data is Fethced succesfully -->

                <div v-if="dataFetched" class="searchResults container-fluid p-0 m-0">
                    <div v-for="user in searchData" :key="user.id" class="user-thumbnail row">
                        <div class="user row d-flex">

                            <!-- If user account is private -->
                            <router-link v-if="user.user.is_private == true" class="d-flex flex-row" :to=" `/public-posts/`+ user.user.pk + '/' + user.user.is_private">
                                <div class="imageDiv"><img class="imageSmall" src="../assets/users-avatar.jpg" alt="profile picture">
                                </div>
                                <div class="user-details d-flex flex-column">
                                    <div class="d-flex">
                                        <h5 style="color:white; text-align: left; font-size: 1rem;">{{user.user.username}}</h5><img id="verified" v-if="user.user.is_verified == true" src="../assets/verified.png" alt="">
                                    </div>
                                    <div>
                                        <h6 style="color:#646464;text-align: left; font-size: 1rem;">{{user.user.full_name}}</h6>
                                    </div>
                                </div>
                            </router-link>

                            <!-- If user account is public -->
                            <router-link v-else class="d-flex flex-row" :to=" `/public-posts/`+ user.user.pk + '/' + user.user.is_private">
                                <div class="imageDiv"><img class="imageSmall" src="../assets/users-avatar.jpg" alt="profile picture">
                                </div>
                                <div class="user-details d-flex flex-column">
                                    <div>
                                        <h5 style="color:white; text-align: left; font-size: 1rem;">{{user.user.username}}</h5>
                                    </div>
                                    <div>
                                        <h6 style="color:#646464;text-align: left; font-size: 1rem;">{{user.user.full_name}}</h6>
                                    </div>
                                </div>
                            </router-link>

                        </div>
                    </div>
                </div>
            <!-- v-datafetced ends here -->
            </div>
            <!-- v-if !loading - end -->
        </div>
        <!-- main container-fluid - end -->
    </div>
    <!-- main div - end -->
</template>

<script>
import axios from 'axios'
export default {
    name: "HomePage",
    components: {
    },
    data() {
        return {
            searchData: [],
            username: "",
            dataFetched: '',
            Error: '',
            errorMessage: '',
            loading: false,
            err: '',
            errMsg: '',
            loading: false,
            realAPI: false
        };
    },
    methods: {
        async Keysearch(e) {
            if (e.key == 'Enter') {
                this.search()
            }
        },

        async search() {
            // for real API
            if (this.realAPI == true) {
                try {
                    this.loading = true
                    let username1 = this.username
                    var result = await axios.get(
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
                        this.loading = false
                        this.dataFetched = false
                        this.err = true
                        this.errMsg = ("Error Occured - error" + result.data.statusCode)
                    } else if (result.message == "Network Error") {
                        this.loading = false
                        this.err = true
                        this.errMsg = "Network Error"
                    } else if (result.data.statusCode == 102) {
                        this.err = true
                        this.errMsg = 'Error 102 - Cannot Process request'
                        this.loading = false
                    } else if (result.data.Warning == "endpoint under maintenance") {
                        this.err = true
                        this.errMsg = 'API endpoint under maintenance'
                        this.loading = false
                    }

                    else {
                        this.searchData = result.data.body.users
                        this.dataFetched = true
                        this.err = false
                        // let pvt = await axios.post('http://localhost:3000/pvt', this.searchData)
                        // console.log(pvt)
                        this.loading = false
                    }
                    this.loading = false

                } catch (error) {
                    //Catch block to show error/s
                    console.log(error)
                    if (error.message == "Network Error") {
                        this.loading = false
                        this.err = true
                        this.errMsg = "Network Error"
                        console.log(this.errMsg)
                    } else if (error.message == "Request failed with status code 429") {
                        this.loading = false
                        this.err = true
                        this.errMsg = "Request failed with status code 429"
                        console.log(this.errMsg)
                    } else {
                        this.loading = false
                        this.rrr = true
                        this.errMsg = error.message
                        console.log(this.errMsg)
                    }
                }
            }
            // For stored json API 
            else {
                this.loading = true
                let dbData = await axios.get('http://localhost:3000/data');
                console.log(dbData.data[0].user.username)
                this.searchData = dbData.data
                this.loading = false
                this.dataFetched = true
                console.log(this.searchData)
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

a:hover {
    text-decoration: none;
    color: none;
}
.navbar{
    background-color: black;
    padding: 5px 0 5px 0;
}

h4.error {
    color: antiquewhite;
    font-family: Calibri;
    margin-top: 3rem;
}

.user-details {
    padding: 8px 0 7px 15px;
}

.home-screen {
    height: 100vh;
}

.imageDiv {
    display: flex;
    align-items: center;
    padding-left: 5px;
}

.search-bar {
    height: 50px;
    padding: 0;
}

.search-input {
    background-color: black;
    margin: 6px 0 6px 6px;
    color: white;
    border: 2px solid white;
    font-family: Calibri;
    /* border-radius: 6px; */
    margin: 11px 0px 0px 0px;
    border-radius: 7px;
}

.search-input:focus {
    background-color: black;
    margin: 6px 0 6px 6px;
    color: white;
    border: 1px solid white;
    font-family: Calibri;
}

.btn:active {
    text-decoration: none;
    border: none;
}

.btn:focus {
    text-decoration: none;
    border: none;
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

.user-details {
    padding: 12px 0 3px 15px;
}
#verified{
    display: inline-block;
    width: 18px;
    height: 18px;
    margin: 1.5px 1px 1px 5px;
}

.arrow-icon {
    height: 40px;
    margin: 15px 0 0 15px;
    color: white;
}

li {
    padding: 0 13px 0 19px;
}


/* Loader starts */
.lds-roller {
    display: inline-block;
    position: relative;
    width: 80px;
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
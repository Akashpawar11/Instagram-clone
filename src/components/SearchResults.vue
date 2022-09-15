<template>
    <div>
        <div class="container-fluid home-screen p-0 m-0">
            <div class="row p-0 m-0">
                <div class="input-group dark search-bar">
                    <router-link to="/"><i class="arrow-icon fa fa-arrow-left" style="font-size:24px"></i></router-link>
                    <input type="text" class="form-control search-input dark" placeholder="Search">
                    <!-- <button class="btn"  type="button">
                                <a href="/search-results"><span style="color:white" class="fa fa-search" aria-hidden="true"></span></a>
                            </button> -->

                </div>
            </div>
            <!-- top account tags places -->
            <div class="row p-0 m-0">
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

            <div class="searchResults container-fluid p-0 m-0">
                <div v-for="user in searchData" :key="user.id" class="user-thumbnail row">
                    <div class="user row d-flex">
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
                    </div>
                </div>

            </div>

        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'SearchResults',
    data() {
        return {
            searchData: []
        }
    },
    async mounted() {
        let username1 = (this.$route.params.username).toString()
        console.log(username1)
        // API fetching in try block
        try {
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
            if(result.data.statusCode)
            this.searchData = result.data.body.users
        } catch (error) {               //Catch block to show error/s
            console.log(error)
            this.errorMsg = error.message
        }
    }
}
</script>

<style>
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
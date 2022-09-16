<template>
    <div>
        <div class="container-fluid">
            <!-- <div>

            </div> -->
            <router-link to="/"><i style="float:left; font-size:24px;" class="arrow-icon fa fa-arrow-left"></i></router-link>
            <h4 id="posts-word" style="margin: 0; text-align: left; margin: 10px;text-align: left;color: beige;font-size: larger;">Posts</h4>

            <div style=" margin: 120px;" class="lds-roller" v-if="loading">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>

            <!-- <div>

                <h4 v-if="err">
                    {{this.errMsg}}
                </h4>

                <h4 v-if="Error">
                    {{this.errorMessage}}
                </h4>
            </div> -->

            <div v-if="!loading">
                <div style="overflow:auto;" class="container-fluid p-0 m-0">
                    <!-- <div style="overflow:auto;" class="container-fluid p-0 m-0" v-if="dataFetched"> -->
                    <div class="row">
                        <div class="user-post-data">
                            <img class="xsImage" src="../assets/users-avatar.jpg" alt="">
                            <h6 style="color: antiquewhite;text-align: left; float: left;display: contents;">{{this.data.owner.username}}</h6>

                        </div>
                        <div>
                            <img class="post-image" crossorigin="anonymous" src="../assets/fallback1.jpg" alt="">
                        </div>
                        <div>
                            <i class="fa fa-heart heart"></i>
                            <!-- <i class='far fa-comment' style='font-size:24px'></i>
                            <i class="fa fa-paper-plane" style="font-size:24px"></i> -->
                            <h6 class="likes">{{this.data.edge_media_preview_like.count}} likes</h6><br>
                            <p class="caption">
                                <b>{{this.data.owner.username}}</b> {{this.data.edge_media_to_caption.edges[0].node.text}}
                            </p>
                        </div>

                        <!-- <p v-for="item in filteredItems">{{ item }}</p> -->


                        <!-- 
                        <div class="pagination">
                            <div class="container">
                                <div id="myCarousel" class="carousel slide" data-ride="carousel">
                                    <ol class="carousel-indicators">
                                        <li data-target="#myCarousel" data-slide-to="1" class="active"></li>
                                        <li data-target="#myCarousel" data-slide-to="2" class="active"></li>
                                    </ol>

                                    <div class="carousel-inner">

                                        <div class="item active" v-for="item in imgs" :key="item.index">
                                            <img src="../assets/fallback.jpg" alt="Los Angeles" style="width:100%;">
                                        </div>

                                    </div>

                
                                </div>
                            </div>
                        </div> -->
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'PublicPosts',
    data() {
        return {
            dataFetched: '',
            err: '',
            errMsg: '',
            data: [],
            networkError: '',
            Error: '',
            lll: '',
            private: '',
            loading: true,
            // after_fetch_error: '',
            // imgs: [],
            // imglen: ''
        }
    },
    async mounted() {
        try {
            this.loading = true
            this.after_fetch_error = true
            let userID = (this.$route.params.id).toString()
            console.log(userID)
            let result = await axios.get(
                'https://instagram47.p.rapidapi.com/public_user_posts',
                {
                    headers: {
                        'X-RapidAPI-Key': '4019c68f6fmsh2280c1edd5d1458p1a4489jsnbb84be4d501a',
                        'X-RapidAPI-Host': 'instagram47.p.rapidapi.com'
                    },
                    params: { userid: userID }
                });
            console.log(result)
            if (result.data.statusCode == 203 || result.data.statusCode == 202) {
                this.dataFetched = false
                this.err = true
                this.loading = false
                this.after_fetch_error = false
                this.errMsg = ("Error Occured - error" + result.data.statusCode)
            } else if (result.message == "Network Error") {
                this.err = true
                this.errMsg = "Network error"
            } else if (result.data.statusCode == 102) {
                this.err = true
                this.errMsg = 'Error 102 - Cannot Process request'
                this.loading = false
                this.after_fetch_error = false
            } else {
                this.dataFetched = true
                this.data = result.data.body.edges[0].node
                let postdata = await axios.post('http://localhost:3000/postMulti', this.data)
                console.log(postdata)
                this.imgs = result.data.body.edges[0].node.edge_sidecar_to_children.edges
                this.imglen = (result.data.body.edges[0].node.edge_sidecar_to_children.edges).length
                this.err = false
                this.Error = false
                this.private = result.data.body.edges[0].node.is_private
                this.loading = false
                console.log(this.private)
            }

        } catch (error) {               //Catch block to show error/s
            console.log(error)
            this.Error = true
            this.loading = false
            this.errorMessage = error.message
        }
        this.loading = true
        let datamulti = await axios.get('http://localhost:3000/postMulti')
        console.log(datamulti)
        this.data = datamulti.data[0]
        this.loading = false
        console.log(this.data)

    }
    //     computed: {
    //    filteredItems: function () {
    //      return this.imgs(0, 10)
    //      }
    //   }
}
</script>

<style>
#posts-word {
    margin: 10px;
    text-align: left;
    color: beige;
    font-size: larger;
    display: inline-block;
    float: left;
}

.xsImage {

    height: 25px;
    width: auto;
    border-radius: 50%;
    margin: 0 11px 0 0;
}

.post-image {
    height: inherit;
    width: inherit;
}

.heart {
    float: left;
    font-size: 24px;
    color: #cf2525;
    padding: 10px;
}

.user-post-data {
    padding: 10px 10px;
    text-align: left;
}

.likes {
    font-size: 1rem;
    color: aliceblue;
    font-family: inherit;
    float: left;
    padding: 14px 0 0 2px;
}

.caption {
    display: inline-block;
    margin-top: 0;
    margin-bottom: 1rem;
    color: aliceblue;
    font-size: 12px;
}
</style>
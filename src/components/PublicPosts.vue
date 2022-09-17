<template>
    <div>
        <div class="container-fluid p-0 m-0">
            <!-- <div>

            </div> -->
            <router-link to="/"><i style="float:left; font-size:24px;" class="arrow-icon fa fa-arrow-left"></i></router-link>
            <h4 id="posts-word">Posts</h4>

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
                <!-- <div style="overflow:auto;" class="container-fluid p-0 m-0"> -->
                <div style="overflow:auto;" class="container-fluid p-0 m-0" v-if="dataFetched">
                    <div class="row">
                        <div class="user-post-data">
                            <img class="xsImage" src="../assets/users-avatar.jpg" alt="">
                            <h6 style="color: antiquewhite;text-align: left; float: left;display: contents;">{{this.data.owner.username}}</h6>

                        </div>
                        <div class="BIG carousel slide">

                            <div class="p-0 imgB carousel-inner" v-for="picture in pictures" :key="picture.index">
                                <img class="post-image w-100" crossorigin="anonymous" src="../assets/fallback1.jpg" alt="">
                                <!-- <img class="post-image" crossorigin="anonymous" src="../assets/fallback1.jpg" alt=""> -->
                                <h1 style="color:white;">{{picture.node.id}}</h1>
                            </div>
                        </div>
                        <div class="d-flex row p-0">
                           <div>
                               <i @click="toggleLike" id="heart" class="fa fa-heart"></i>    
                                <i class="bi bi-chat comment"></i>
                                <i class="fa fa-regular fa-paper-plane"></i>
                           </div> 
                            <!-- <i class='far fa-comment' style='font-size:24px'></i>
                            <i class="fa fa-paper-plane" style="font-size:24px"></i> -->
                            <h6 class="likes">{{this.data.edge_media_preview_like.count}} likes</h6><br>
                            <p class="caption">
                                <b>{{this.data.owner.username}}</b> {{this.data.edge_media_to_caption.edges[0].node.text}}
                            </p>
                        </div>

                        <!-- <p v-for="item in filteredItems">{{ item }}</p> -->

                        <!-- <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                            <ol class="carousel-indicators">
                                <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                            </ol>
                            <div class="arcousel-inner" >
                                <div class="carousel-item active">
                                    <img class="d-block w-100" src="../assets/users-avatar.jpg" alt="First slide">
                                </div>
                                <div class="carousel-item">
                                    <img class="d-block w-100" src="../assets/fallback1.jpg" alt="Second slide">
                                </div>
                                <div class="carousel-item">
                                    <img class="d-block w-100" src="../assets/users-avatar.jpg" alt="Third slide">
                                </div>
                            </div>
                            <a class="carousel-control-prev" role="button" data-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="sr-only">Previous</span>
                            </a>
                            <a class="carousel-control-next" role="button" data-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="sr-only">Next</span>
                            </a>
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
            // err: '',
            // errMsg: '',
            data: [],
            pictures:[],
            // networkError: '',
            // Error: '',
            // lll: '',
            // private: '',
            loading: true,
            // after_fetch_error: '',
            // imgs: [],
            // imglen: ''
            liked: true
        }
    },
    async mounted() {
        // try {
        //     this.loading = true
        //     this.after_fetch_error = true
        //     let userID = (this.$route.params.id).toString()
        //     console.log(userID)
        //     let result = await axios.get(
        //         'https://instagram47.p.rapidapi.com/public_user_posts',
        //         {
        //             headers: {
        //                 'X-RapidAPI-Key': '4019c68f6fmsh2280c1edd5d1458p1a4489jsnbb84be4d501a',
        //                 'X-RapidAPI-Host': 'instagram47.p.rapidapi.com'
        //             },
        //             params: { userid: userID }
        //         });
        //     console.log(result)
        //     if (result.data.statusCode == 203 || result.data.statusCode == 202) {
        //         this.dataFetched = false
        //         this.err = true
        //         this.loading = false
        //         this.after_fetch_error = false
        //         this.errMsg = ("Error Occured - error" + result.data.statusCode)
        //     } else if (result.message == "Network Error") {
        //         this.err = true
        //         this.errMsg = "Network error"
        //     } else if (result.data.statusCode == 102) {
        //         this.err = true
        //         this.errMsg = 'Error 102 - Cannot Process request'
        //         this.loading = false
        //         this.after_fetch_error = false
        //     } else {
        //         this.dataFetched = true
        //         this.data = result.data.body.edges[0].node
        //         let postdata = await axios.post('http://localhost:3000/postMulti', this.data)
        //         console.log(postdata)
        //         this.imgs = result.data.body.edges[0].node.edge_sidecar_to_children.edges
        //         this.imglen = (result.data.body.edges[0].node.edge_sidecar_to_children.edges).length
        //         this.err = false
        //         this.Error = false
        //         this.private = result.data.body.edges[0].node.is_private
        //         this.loading = false
        //         console.log(this.private)
        //     }

        // } catch (error) {               //Catch block to show error/s
        //     console.log(error)
        //     this.Error = true
        //     this.loading = false
        //     this.errorMessage = error.message
        // }

        this.loading = true
        let datamulti = await axios.get('http://localhost:3000/postMulti')
        console.log(datamulti)
        this.data = datamulti.data[0]
        this.pictures = datamulti.data[0].edge_sidecar_to_children.edges
        console.log(this.data)
        console.log(this.pictures)
        // console.log(this.pictures.n)
        this.loading = false
        this.dataFetched = true

    },
    methods: {
        toggleLike() {
            let heart = document.getElementById('heart')
            if (heart.classList.contains("liked")) {
                heart.classList.add('fa-heart-o')
                heart.classList.remove("liked");
            } else {
                heart.className = ('fa fa-heart liked')
            }
        }
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
    margin: 16px 0 0 10px;
    text-align: left;
    color: beige;
    font-size: larger;
    display: inline-block;
    float: left;
}

.xsImage {

    height: 30px;
    width: auto;
    border-radius: 50%;
    margin: 0 13px 2px 0;
}
.BIG{
    padding: 0;
}

.imgB{
    width: inherit;
    height: inherit;
    position: relative;
}
.post-image {
    height: inherit;
    width: inherit;
    position: relative;
}

.fa-heart {
    float: left;
    font-size: 24px;
    color: #cf2525;
    padding: 10px 10px 10px 0;
}
.comment{
    font-size: 24px;
    color: white;
    float: left;
    transform: rotateY(180deg);
    padding: 2px 2px 10px 10px;
}

.fa-heart-o {
    color: rgb(255, 255, 255);
}

.fa-paper-plane{
    float: left;
    font-size: 23px;
    color: white;
    padding: 11px 2px 10px 3px
}
.user-post-data {
    padding: 10px 10px;
    text-align: left;
}

.likes {
    font-size: 1rem;
    color: aliceblue;
    display: block;
    font-family: inherit;
    text-align: left;
    padding: 0px 0 0 13px;
}

.caption {
    display: inline-block;
    margin-top: 0;
    margin-bottom: 1rem;
    color: aliceblue;
    font-size: 13px;
    padding: 0px 10px 1px 13px;
    text-align: initial;
}
</style>
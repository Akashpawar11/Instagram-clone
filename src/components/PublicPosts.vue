<template>
    <!-- main div -->
    <div>
        <!-- main container-fluid -->
        <div class="container-fluid p-0 m-0">
            <!-- Back button -->
            <router-link to="/"><i style="float:left; font-size:24px;" class="arrow-icon fa fa-arrow-left"></i></router-link>
            <h4 id="posts-word">Posts</h4><br>
            <!-- If user is Private -->
            <h2 v-if="pvt" id="ifPvt" >This user is private</h2>
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

            <!-- error block -->
            <div v-if="realAPI">
                <h4 v-if="err">
                    {{this.errMsg}}
                </h4>
                <h4 v-if="Error">
                    {{this.errorMessage}}
                </h4>
            </div>

            <!-- If loader stops - this block will be executed -->
            <div v-if="!loading">
                <!-- container fluid if !loading -->
                <div v-if="dataFetched" class="container-fluid p-0 m-0" style="overflow:auto;">
                    <!-- row inside container-fluid -->
                    <div class="row">
                        <!-- thumbnail image ,username & dots above post -->
                        <div class="user-post-data">
                            <img class="xsImage" src="../assets/users-avatar.jpg" alt="">
                            <h6 style="color: antiquewhite;text-align: left; float: left;display: contents;">{{this.data.owner.username}}</h6>
                            <img id="dots" src="../assets/menu.png" alt="">
                        </div>

                        <!-- Carousel for post with multiple images - start -->
                        <div id="carouselExampleIndicators" class="carousel p-0" data-bs-ride="false">
                            <!-- Carousel indicators - start -->
                            <div class="carousel-indicators">
                                <button v-if="pictures.length > 0" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                                <button v-if="pictures.length > 1" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-current="true" aria-label="Slide 2"></button>
                                <button v-if="pictures.length > 2" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-current="true" aria-label="Slide 3"></button>
                                <button v-if="pictures.length > 3" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-current="true" aria-label="Slide 4"></button>
                                <button v-if="pictures.length > 4" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4" aria-current="true" aria-label="Slide 5"></button>
                                <button v-if="pictures.length > 5" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="5" aria-current="true" aria-label="Slide 6"></button>
                                <button v-if="pictures.length > 6" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="6" aria-current="true" aria-label="Slide 7"></button>
                                <button v-if="pictures.length > 7" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="7" aria-current="true" aria-label="Slide 8"></button>
                                <button v-if="pictures.length > 8" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="8" aria-current="true" aria-label="Slide 9"></button>
                                <button v-if="pictures.length > 9" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="9" aria-current="true" aria-label="Slide 10"></button>
                            </div>
                            <!-- carousel indicators -end -->
                            <!-- Carousel item w/ for loop -start -->
                            <!-- <div class="carousel-item active" v-for="picture in pictures" :key="picture.index">
                                <div class="carousel-inner">
                                    <img class="post-image" src="../assets/fallback1.jpg" alt="">
                                    <h6 style="margin: 5px 0 0 0;">{{picture.node.id}}</h6>
                                </div>
                            </div> -->
                            <!-- Carousel item w/ for loop -start -->
                            <div  id="first" v-if="pictures.length > 0" class="carousel-item active">
                                <div class="carousel-inner">
                                    <img class="post-image" src="../assets/fallback1.jpg" alt="">
                                    <!-- <h6 style="margin: 5px 0 0 0;">{{this.pictures[0].node.id}}</h6> -->
                                </div>
                            </div>
                            <div v-if="pictures.length > 1" class="carousel-item" >
                                <div class="carousel-inner">
                                    <img class="post-image" src="../assets/fallback2.jpg" alt="">
                                    <!-- <h6 style="margin: 5px 0 0 0;">{{this.pictures[1].node.id}}</h6> -->
                                </div>
                            </div>
                            <div v-if="pictures.length > 2" class="carousel-item" >
                                <div class="carousel-inner">
                                    <img class="post-image" src="../assets/fallback3.jpg" alt="">
                                    <!-- <h6 style="margin: 5px 0 0 0;">{{this.pictures[2].node.id}}</h6> -->
                                </div>
                            </div>
                            <div v-if="pictures.length > 3" class="carousel-item" >
                                <div class="carousel-inner">
                                    <img class="post-image" src="../assets/fallback4.jpg" alt="">
                                    <!-- <h6 style="margin: 5px 0 0 0;">{{this.pictures[3].node.id}}</h6> -->
                                </div>
                            </div>
                            <div v-if="pictures.length > 4" class="carousel-item" >
                                <div class="carousel-inner">
                                    <img class="post-image" src="../assets/fallback5.jpg" alt="">
                                    <!-- <h6 style="margin: 5px 0 0 0;">{{this.pictures[4].node.id}}</h6> -->
                                </div>
                            </div>
                            <div v-if="pictures.length > 5" class="carousel-item" >
                                <div class="carousel-inner">
                                    <img class="post-image" src="../assets/fallback1.jpg" alt="">
                                    <h6 style="margin: 5px 0 0 0;">{{this.pictures[5].node.id}}</h6>
                                </div>
                            </div>
                            <div v-if="pictures.length > 6" class="carousel-item" >
                                <div class="carousel-inner">
                                    <img class="post-image" src="../assets/fallback1.jpg" alt="">
                                    <h6 style="margin: 5px 0 0 0;">{{this.pictures[6].node.id}}</h6>
                                </div>
                            </div>
                            <div v-if="pictures.length > 7"  class="carousel-item" >
                                <div class="carousel-inner">
                                    <img class="post-image" src="../assets/fallback1.jpg" alt="">
                                    <h6 style="margin: 5px 0 0 0;">{{this.pictures[7].node.id}}</h6>
                                </div>
                            </div>
                            <div  v-if="pictures.length > 8" class="carousel-item" >
                                <div class="carousel-inner">
                                    <img class="post-image" src="../assets/fallback1.jpg" alt="">
                                    <h6 style="margin: 5px 0 0 0;">{{this.pictures[8].node.id}}</h6>
                                </div>
                            </div>
                            <div v-if="pictures.length > 9" class="carousel-item" >
                                <div class="carousel-inner">
                                    <img class="post-image" src="../assets/fallback1.jpg" alt="">
                                    <h6 style="margin: 5px 0 0 0;">{{this.pictures[9].node.id}}</h6>
                                </div>
                            </div>
                            <!-- Carousel item w/ for loop - end -->
                            <!-- carousel buttons < , > hidden - start -->
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon visually-hidden" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                <span class="carousel-control-next-icon visually-hidden" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                            <!-- carousel buttons < , > hidden - end -->
                        </div>
                        <!-- Carousel for post with multiple images - end -->
                        <!-- block for icons,likes,caption - start -->
                        <div class="d-flex row p-0">
                            <div id="icons" style="padding: 0px 0 0 10px;">
                                <i @click="toggleLike" id="heart" class="fa fa-heart"></i>
                                <i class="bi bi-chat comment"></i>
                                <i class="fa fa-regular fa-paper-plane"></i>
                                <img style="color:aliceblue" id="savepost" src="../assets/save-instagram.png" alt="">
                            </div>
                            <h6 class="likes">{{this.data.edge_media_preview_like.count}} likes</h6><br>
                            <p class="caption">
                                <b style="font-size: 15px;">{{this.data.owner.username}}</b> {{this.data.edge_media_to_caption.edges[0].node.text}}
                            </p>
                        </div>
                        <!-- block for icons,likes,caption - end -->
                    </div>
                    <!-- row inside container-fluid -end -->
                </div>
                <!-- container fluid if !loading - end  -->
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
    name: 'PublicPosts',
    data() {
        return {
            dataFetched: '',
            err: '',
            errMsg: '',
            data: [],
            pictures: [],
            networkError: '',
            Error: '',
            private: '',
            loading: true,
            imgs: [],
            len: '',
            liked: true,
            pvt: false,
            realAPI: false    
        }
    },
    async mounted() {
        if (this.realAPI == true) {

            let status1 = this.$route.params.status
            console.log(status1)


            if (status1 == 'true') {
                this.pvt = true
                this.loading = false
            } else {
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
                        this.errMsg = ("Error Occured - error" + result.data.statusCode)
                    } else if (result.message == "Network Error") {
                        this.err = true
                        this.errMsg = "Network error"
                    } else if (result.data.statusCode == 102) {
                        this.err = true
                        this.errMsg = 'Error 102 - Cannot Process request'
                        this.loading = false
                    } else {
                        this.dataFetched = true
                        this.data = result.data.body.edges[0].node
                        // let postdata = await axios.post('http://localhost:3000/postMulti', this.data)
                        // console.log(postdata)
                        this.pictures = result.data.body.edges[0].node.edge_sidecar_to_children.edges
                        console.log(this.pictures)
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
            }
        } else {
            let status = this.$route.params.status
            console.log(status)

            if (status == 'true') {
                this.pvt = true
                this.loading = false
            } else {
                this.loading = true
                let datamulti = await axios.get('http://localhost:3000/postMulti')
                console.log(datamulti)
                this.data = datamulti.data[0]
                this.pictures = datamulti.data[0].edge_sidecar_to_children.edges
                this.len = datamulti.data[0].edge_sidecar_to_children.edges.length
                console.log(this.len)
                console.log('data', this.data)
                console.log('pictures', this.pictures)
                this.loading = false
                this.dataFetched = true
            }
        }
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
    margin: 15px 0 0 15px;
    text-align: left;
    color: white;
    font-size: x-large;
    display: inline-block;
    float: left;
}

#ifPvt {
    justify-content: center;
    display: flex;
    align-items: center;
    margin: 8rem 0;
}

.xsImage {

    height: 30px;
    width: auto;
    border-radius: 50%;
    margin: 0 13px 2px 0;
}

#savepost {
    width: 20px;
    height: 20px;
    color: white;
}

#dots {
    height: 27px;
    width: 27px;
    float: right;
    margin: 3px 0px 0px 0px;
}

.post-image {
    height: inherit;
    width: inherit;
    transition: 0s;
}


.fa-heart {
    float: left;
    font-size: 25px;
    color: #cf2525;
    padding: 10px 10px 10px 0;
}
.fa-heart:active {
    transform: scale(1.1);
}

.comment {
    font-size: 25px;
    color: white;
    float: left;
    transform: rotateY(180deg);
    padding: 2px 3px 7px 10px;
}

.fa-heart-o {
    color: rgb(255, 255, 255);
}

.fa-paper-plane {
    float: left;
    font-size: 23px;
    color: white;
    padding: 11px 2px 10px 5px;
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
.carousel-indicators{
    margin-bottom: -30px;
}

.carousel-indicators button.active{
   background-color: rgb(255, 255, 255);
   height: 7px;
   width: 7px;
   margin: -1px 3px 0px 3px;
}
.carousel-indicators button{
   background-color: rgb(158, 158, 158);
}
.carousel-indicators [data-bs-target] {
    box-sizing: content-box;
    flex: 0 1 auto;
    width: 5px;
    height: 5px;
    padding: 0px;
    margin: 0 4px 8px 4px;
    text-indent: -999px;
    cursor: pointer;
    background-color: #ffffff;
    background-clip: padding-box;
    border: 0;
    /* border-top: 10px solid transparent; */
    border-radius: 50%;
    /* border-bottom: 10px solid transparent; */
    /* opacity: .5; */
    /* transition: .6s ease; */
}

.carousel-item {
    position: relative;
    display: none;
    float: left;
    width: 100%;
    margin-right: -100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    transition: .6s ease-in-out;
}

</style>
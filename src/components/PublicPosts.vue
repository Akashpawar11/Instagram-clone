<template>
    <div>
        <div class="container-fluid p-0 m-0">
            <router-link to="/"><i style="float:left; font-size:24px;" class="arrow-icon fa fa-arrow-left"></i></router-link>
            <h4 id="posts-word">Posts</h4><br>
            <h2 id="ifPvt" v-if="pvt">This user is private</h2>
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

            <!-- error block -->
            <div>
                <h4 v-if="err">
                    {{this.errMsg}}
                </h4>
                <h4 v-if="Error">
                    {{this.errorMessage}}
                </h4>
            </div>

            <div v-if="!loading">
                <!-- <div style="overflow:auto;" class="container-fluid p-0 m-0"> -->
                <div style="overflow:auto;" class="container-fluid p-0 m-0" v-if="dataFetched">
                    <div class="row">

                        <div class="user-post-data">
                            <img class="xsImage" src="../assets/users-avatar.jpg" alt="">
                            <h6 style="color: antiquewhite;text-align: left; float: left;display: contents;">{{this.data.owner.username}}</h6>

                        </div>

                        <div id="carouselExampleIndicators" class="carousel slide p-0" data-bs-ride="true">
                            <div class="carousel-indicators" v-for="picture in pictures" :key="picture.id">
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4" aria-current="true" aria-label="Slide 1"></button>
                            </div>
                            <div class="carousel-item active" v-for="picture in pictures" :key="picture.index">
                                <div class="carousel-inner ">
                                    <img class="post-image d-block w-100" src="../assets/fallback1.jpg" alt="">
                                    <h6>{{picture.node.id}}</h6>
                                </div>
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon visually-hidden" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                <span class="carousel-control-next-icon visually-hidden" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>


                        <div class="d-flex row p-0">
                            <div>
                                <i @click="toggleLike" id="heart" class="fa fa-heart"></i>
                                <i class="bi bi-chat comment"></i>
                                <i class="fa fa-regular fa-paper-plane"></i>
                            </div>
                            <h6 class="likes">{{this.data.edge_media_preview_like.count}} likes</h6><br>
                            <p class="caption">
                                <b>{{this.data.owner.username}}</b> {{this.data.edge_media_to_caption.edges[0].node.text}}
                            </p>
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
            lll: '',
            private: '',
            loading: true,
            after_fetch_error: '',
            imgs: [],
            imglen: '',
            liked: true,
            pvt: false,
            realAPI: false
        }
    },
    async mounted() {
        if (realAPI == true) {

            let Status = this.$route.params.status
            console.log(Status)


            if (status == 'true') {
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
                        // let postdata = await axios.post('http://localhost:3000/postMulti', this.data)
                        // console.log(postdata)
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
    margin: 16px 0 0 10px;
    text-align: left;
    color: beige;
    font-size: larger;
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

.BIG {
    padding: 0;
}

.imgB {
    width: inherit;
    height: inherit;
    position: relative;
}

.post-image {
    height: inherit;
    width: inherit;
    position: relative;
    transition: 0s;
    display: block;
}


.fa-heart {
    float: left;
    font-size: 24px;
    color: #cf2525;
    padding: 10px 10px 10px 0;
}

.comment {
    font-size: 24px;
    color: white;
    float: left;
    transform: rotateY(180deg);
    padding: 2px 2px 10px 10px;
}

.fa-heart-o {
    color: rgb(255, 255, 255);
}

.fa-paper-plane {
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
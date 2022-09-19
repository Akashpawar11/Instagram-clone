<template>
    <div>
        <div>
            <!-- header -->
            <div class="d-flex bd-highlight">
                <router-link :to="`/`" >
                    <div class="p-2 w-30 bd-highlight">
                        <div  class="bi bi-arrow-left" style="font-size:30px;-webkit-text-stroke-width: 1.5px;" ></div>
                    </div>
                </router-link>
                <div class="p-2 flex px-5 justify-content-start text-white" style="font-size:28px;">Post</div>
            </div>
              <!-- profile posts -->
            <section>
            <div class="d-flex justify-content-left" v-for="profiles in data" :key="profiles.id" >
                        <img class=" profile-pic" src="../assets/avatar.png" alt="user profile piture" />
                        <div class="col">
                            <div class="profile-name px-3 ">{{profiles.owner.username}}  </div>
                            <div class="full-name"></div>
                        </div>
            </div>
                <div>
                    <div v-for="i in [currentIndex]" :key="i">
                        <img class="post-img" :src="currentImg" />
                    </div>
                    <a class="prev" @click="prev" href="#">&#10094; Previous</a>
                    <a class="next" @click="next" href="#">&#10095; Next</a>
                    <div class="d-flex like-buttons">
                        <div class="p-2 w-30 bd-highlight">
                            <i  class="bi bi-heart-fill" style="-webkit-text-stroke-width: 1.5px;" ></i>
                            <i class="bi bi-chat"></i>
                            <i class="fa fa-regular fa-paper-plane"></i>
                        </div>
                    </div>
                </div>
            </section>
            <!-- profile details -->
            <div class="container-fluid pl-0">
                <div class="d-flex justify-content-left" v-for="profiles in data" :key="profiles.id" >
                        <img class=" profile-pic " src="../assets/avatar.png" alt="user profile piture" />
                        <div class="col">
                            <div class="profile-name px-3 ">{{profiles.owner.username}}  </div>
                            <div class="full-name"></div>
                        </div>
                </div>
                <div class="d-flex">
                    <img class="post" src="../assets/avatar.png" />
                </div >
                <div class="d-flex like-buttons">
                    <div class="p-2 w-30 bd-highlight">
                        <i  class="bi bi-heart-fill" style="-webkit-text-stroke-width: 1.5px;" ></i>
                        <i class="bi bi-chat"></i>
                        <i class="fa fa-regular fa-paper-plane"></i>
                    </div>
                </div>
            </div>
            <!-- profile posts -->
            <!-- <section>
            <div class="container-fluid" >
                <div v-for="i in [currentIndex]" :key="i">
                  <img class="post-img" :src="currentImg" />
                </div>
               <a class="prev" @click="prev" href="#">&#10094; Previous</a>
               <a class="next" @click="next" href="#">&#10095; Next</a>
            </div>
            </section> -->
            <!-- <div >
                <h6>{{this.data.owner.username}}</h6>
                <img :src="this.data.display_resources[0].src" />
            </div> -->
        </div>
    </div>
</template>
<script>
    // import Slider from '../views/Slider'
    import axios from 'axios'
    export default {
        name:'Userprofile',
        data(){
            return{
                    data: [],
                    // activeIndex: 0,
                    images: [
                        "https://cdn.pixabay.com/photo/2015/12/12/15/24/amsterdam-1089646_1280.jpg",
                        "https://cdn.pixabay.com/photo/2016/02/17/23/03/usa-1206240_1280.jpg",
                        "https://cdn.pixabay.com/photo/2015/05/15/14/27/eiffel-tower-768501_1280.jpg",
                        "https://cdn.pixabay.com/photo/2016/12/04/19/30/berlin-cathedral-1882397_1280.jpg"
      ],
      timer: null,
      currentIndex: 0
                }
        },
        mounted() {
            this.getData();
        },
        methods:{
            async getData(){
                // let userID = (this.$route.params.id).toString()
                // let result = await axios.get('https://instagram47.p.rapidapi.com/public_user_posts',{
                // headers: {
                //     'X-RapidAPI-Key': '639beaeaa5msh50e4872dc42c76fp1eb24cjsn4292a5a56826',
                //     'X-RapidAPI-Host': 'instagram47.p.rapidapi.com'
                //  },
                //  params: {userid: '1718924098' },
                // }
                // );
                // console.log(result)
                // this.data = result.data.body.edges[0].node
                let sampleData = await axios.get('http://localhost:3000/publicpost')
                this.data =  sampleData.data
                console.log(this.data)
            },
            startSlide: function() {
                        },
            next: function() {
                            this.currentIndex += 1;
                         },
            prev: function() {
                            this.currentIndex -= 1;
                         }
            },
            computed: {
                currentImg: function() {
                        return this.images[Math.abs(this.currentIndex) % this.images.length];
                    }
             }
        }
</script>
<style scoped>
    .bi{
        width: 20px
    }
    .profile-pic{
        height: 53px;
        width: 53px;
        border-radius: 50%;
    }
    .profile-name{
        text-align:left;
        color: white
    }
    .full-name{
        text-align:left;
        padding-left:15px;
        color: grey
    }
    .post{
        height: 352px;
        width: 352px;
        padding-top: 30px;
        margin-top: -24px
    }
    .bi-heart-fill{
        color: red;
        font-size: 23px
    }
    .bi-chat{
        padding-left: 20px;
        font-size:25px
    }
    .post-img {
        height: 352px;
        width: 376px;
        padding : 15px ;
        margin-top: -8px;
    }
     .prev, .next {
        cursor: pointer;
        top: 40%;
        width: auto;
        padding: 16px;
        color: rgba(255, 255, 255, 0);
        font-weight: bold;
        font-size: 18px;
        transition: 0.7s ease;
        border-radius: 0 4px 4px 0;
        text-decoration: none;
        user-select: none;
        position:absolute;
     }
     .fa-paper-plane{
        font-size: 25px;
        padding-left:15px
     }
     .next {
  right: 0;
}
.prev {
  left: 0;
}

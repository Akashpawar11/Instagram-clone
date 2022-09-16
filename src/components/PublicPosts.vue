<template>
    <div>
        <div class="container-fluid">
            <h4 style="margin: 0; text-align: left; border-radius: 1px solid grey;">Posts</h4>
            <h4 v-if="err">
                {{this.errMsg}}
            </h4>

            <h4 v-if="Error">
                {{this.errorMessage}}
            </h4>
            <div class="container-fluid p-0 m-0" v-if="dataFetched">
                <div class="row">
                    <img :src="this.data.thumbnail_src" alt="">
                    <h6>{{this.data.owner.username}}</h6>
                    <div>
                        <img crossorigin="anonymous" src="../assets/fallback.jpg" alt="">
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
            lll:''
        }
    },
    async mounted() {
        try {
            let userID = (this.$route.params.id).toString()
            console.log(userID)
            let result = await axios.get(
                'https://instagram47.p.rapidapi.com/public_user_posts',
                {
                    headers: {
                        'X-RapidAPI-Key': '688eb0beeemsh8c7daafd5c3556ep15a70cjsn064a2a646b55',
                        'X-RapidAPI-Host': 'instagram47.p.rapidapi.com'
                    },
                    params: { userid: userID }
                });
            console.log(result)
            if (result.data.statusCode == 203 || result.data.statusCode == 202) {
                this.dataFetched = false
                this.err = true
                this.errMsg = ("Error Occured - error" + result.data.statusCode)
            } else if (result.message == "Network Error") {
                this.networkError = true
            } else if (result.data.statusCode == 102) {
                this.err = true
                this.errMsg = 'Error 102 - Cannot Process request'
            } else {
                this.dataFetched = true
                this.data = result.data.body.edges[0].node
                this.lll = result.data.body.edges[0].node.display_url
                this.private = result.data.body.edges[0].node.
                console.log(this.lll)
            }

        } catch (error) {               //Catch block to show error/s
            console.log(error)
            this.Error = true
            this.errorMessage = error.message
            console.log(this.data)
        }

    }
}
</script>

<style>

</style>
<template>
    <div>
        <div class="container-fluid">
            {{this.data}}
        </div>
    </div>
</template>

<script>
export default {
    name: 'PublicPosts',
    data() {
        return {
            data:[]
        }
    },
    async mounted() {
        try {
            let userID = (this.$route.params.id).toString()
            console.log(userID)
            const result = await axios.get(
                'https://instagram47.p.rapidapi.com/public_user_posts',
                {
                    headers: {
                        'X-RapidAPI-Key': '4019c68f6fmsh2280c1edd5d1458p1a4489jsnbb84be4d501a',
                        'X-RapidAPI-Host': 'instagram47.p.rapidapi.com'
                    },
                    params: {userid: userID}
                });
            console.log(result)
            this.data = result
            // if (result.data.statusCode == 203 || result.data.statusCode == 202) {
            //     this.dataFetched = false
            //     errorMessage = true
            // } else {
            //     this.dataFetched = true
            //     this.searchData = result.data.body.users
            // }

        } catch (error) {               //Catch block to show error/s
            console.log(error)
            this.errorMsg = error.message
        }
    }
}
</script>

<style>

</style>
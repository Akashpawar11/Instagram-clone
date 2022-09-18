import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../components/Home.vue'
// import SearchResults from '../components/SearchResults.vue'
import PublicPosts from '../components/PublicPosts.vue'
import errorPage from '../components/errorPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  // {
  //   path: '/search-results/:username',
  //   name: 'SearchResults',
  //   component: SearchResults
  // },
  {
    path: '/public-posts/:id/:status',
    // path: '/public-posts/',
    name: 'PublicPosts',
    component: PublicPosts
  },
  // {
  //   path: '/public-posts/:id/pvt-acc',
  //   name: 'PublicPosts',
  //   component: PublicPosts
  // },
  {
    path: '*',
    name: 'errorPage',
    component: errorPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

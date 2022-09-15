import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../components/Home.vue'
import SearchResults from '../components/SearchResults.vue'
import PublicPosts from '../components/PublicPosts.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/search-results/:username',
    name: 'SearchResults',
    component: SearchResults
  },
  {
    path: '/public-posts',
    name: 'PublicPosts',
    component: PublicPosts
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

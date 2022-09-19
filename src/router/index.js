import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../components/Home.vue'
// import SearchResults from '../components/SearchResults.vue'
import PublicPosts from '../components/PublicPosts.vue'
import errorPage from '../components/errorPage.vue'
import TopTab from '../components/Top.vue'
import AudioTab from '../components/Audio.vue'
import PlacesTab from '../components/Places.vue'
import TagsTab from '../components/Tags.vue'

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
  {
    path: '/search-results/top',
    name: 'TopTab',
    component: TopTab
  },
  {
    path: '/search-results/audio',
    name: 'AudioTab',
    component: AudioTab
  },
  {
    path: '/search-results/places',
    name: 'PlacesTab',
    component: PlacesTab
  },
  {
    path: '/search-results/tags',
    name: 'TagsTab',
    component: TagsTab
  },
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

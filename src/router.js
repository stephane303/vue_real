import Vue from 'vue'
import Router from 'vue-router'
import EventList from './views/EventList.vue'
import EventCreate from './views/EventCreate.vue'
import EventShow from './views/EventShow.vue'
import NotFound from './components/NotFound'
import NetworkError from './components/NetworkError'
import NProgress from 'nprogress'
import store from '@/store/store'
import Example from './views/Example'

Vue.use(Router)



const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventList,
      props:true
    },
    {
      path: '/example',
      component:Example
    },
    {
      path: '/event/create',
      name: 'event-create',
      component: EventCreate
    },
    {
      path: '/event/show/:id',
      name: 'event-show',
      component: EventShow,
      props:true,
      beforeEnter(routeTo, routeFrom,next) {
        store.dispatch('event/fetchEvent', routeTo.params.id).then(( event) => {
          routeTo.params.event = event;
          next()
        })
        .catch( (error) => {
          //console.log('catch ?'+ error.response.status)
          console.dir(error)
          if (error.response && error.response.status == 404){
            next({name :'404', params : { resource : 'event'}});
          } else {
            next({name:'NetworkError'})
          }
        })
          //error => this.redirect('404'))
      }
    },
    {
      path:'/404',
      name:'404',
      component: NotFound,
      props: true

    },
    {
      path:'/NetworkError',
      name:'NetworkError',
      component: NetworkError
    },
    {
      path:'*',
      redirect:{name : '404', params: {resource : 'page'}}

    }

  ]
})

router.beforeEach((routeTo, routeFrom,next) =>{
  NProgress.start();
  next();
})

router.afterEach(() => NProgress.done())

export default router

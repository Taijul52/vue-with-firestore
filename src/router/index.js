import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import NewTeacher from '@/components/NewTeacher'
import ViewTeacher from '@/components/ViewTeacher'
import EditTeacher from '@/components/EditTeacher'
import Login from '@/components/Login'
import Register from '@/components/Register'
import firebase from 'firebase'
Vue.use(Router)

let router = new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/new',
      name: 'new-teacher',
      component: NewTeacher,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/:teacher_id',
      name: 'view-teacher',
      component: ViewTeacher,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit/:teacher_id',
      name: 'edit-teacher',
      component: EditTeacher,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!firebase.auth().currentUser) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else
      next()
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (firebase.auth().currentUser) {
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      })
    } else
      next()
  } else {
    next()
  }
})

export default router;

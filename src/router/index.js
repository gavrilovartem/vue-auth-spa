import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthForm from '../components/AuthForm.vue'
import Student from '../views/Student.vue'
import Teacher from '../views/Teacher.vue'
import store from '../store' 
Vue.use(VueRouter)


const ifAuthenticated = (to, from, next) => {
  const authenticatedUsers = store.getters.isAutheticated;
  if (authenticatedUsers.length === 0) {
    next('/auth');
    return;
  }
  next();
};
const ifNotAuthenticated = (to, from, next) => {
  const authenticatedUsers = store.getters.isAutheticated;
  if (authenticatedUsers.length !== 0) {
    const path = authenticatedUsers[0].role;
    next(path);
    return;
  }
  next();
  return;
};

const routes = [
  {
    path: '/',
    redirect: '/auth',
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthForm,
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: '/teacher',
    name: 'teacher',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Teacher,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/student',
    name: 'student',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Student,
    beforeEnter: ifAuthenticated,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

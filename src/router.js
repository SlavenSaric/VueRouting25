import { createRouter, createWebHashHistory } from 'vue-router';

import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './components/nav/NotFound.vue';

import TeamsFooter from './components/teams/TeamsFooter.vue'
import UsersFooter from './components/users/UsersFooter.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/teams' },
    {
      name: 'teams',
      path: '/teams',
      meta: {
        needsAuth: true
      },
      components: {
        default: TeamsList,
        footer: TeamsFooter
      },
      children: [
        { name: 'team-members', path: ':teamId', component: TeamMembers, props: true },
      ],
    },
    { name: 'users',path: '/users', components: {default: UsersList, footer: UsersFooter}, 
    beforeEnter(to, from, next){
      console.log(to, from);
      next()
    } },
    { path: '/:notFound(.*)', component: NotFound },
  ],
  linkActiveClass: 'active',
  scrollBehavior(to, from, savedPosition){
    console.log(to, from, savedPosition);
    if(savedPosition){
      return savedPosition
    }
    return {
      left: 0,
      top: 0,
    }
  }
});

router.beforeEach(function(to, from, next){
  if(to.meta.needsAuth){
    console.log('needs auth')
    next()
  }else{
    next()
  }
})

// router.afterEach((to, from)=> {

// })

export default router
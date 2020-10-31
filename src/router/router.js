import Vue from 'vue'
import Router from 'vue-router'
import middlewareHandler from '@/modules/middleware-handler';

Vue.use(Router)

import DefaultPage from '@/layouts/DefaultPage'
import Account from '@/layouts/Account'
import Login from '@/views/Login'
import Callback from '@/views/Callback'
import Playlists from '@/views/Playlists'
import PlaylistPage from '@/views/PlaylistPage'

import auth from './middlewares/auth'

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'default-page',
      component: DefaultPage,
      children: [
        {
          path: '',
          redirect: { name: 'login' }
        },
        {
          path: 'login',
          name: 'login',
          component: Login,
        },
        {
          path: 'callback/login',
          name: 'callback.login',
          component: Callback,
        },
        {
          path: 'account',
          name: 'account',
          component: Account,
          meta: {
            middleware: auth,
          },
          children: [
            {
              path: 'playlists',
              name: 'playlists',
              component: Playlists,
            },
            {
              path: 'playlists/:playlist_id',
              name: 'playlist.page',
              component: PlaylistPage,
              props: true
            },
          ]
        }
      ]
    },
  ]
})

router.beforeEach(async (to, from, next) => {
  await middlewareHandler.handle(to, from, next, router);

  next();
})

export default router;

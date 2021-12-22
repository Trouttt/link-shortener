
import axios from 'axios';
import { RouteRecordRaw } from 'vue-router';
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/urls/Index.vue') },
     { path:'/successful', component: () => import('src/pages/urls/Successful.vue')}],
  },
  {
    path: '/urls',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/urls/ListMostVisitedUrl_page.vue') }, ],
  },
  {
    path: '/:url',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/urls/Redirect_page.vue') }, ],
  },

  {
    path: '/register',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/users/CreateUser_page.vue') }, ],
  },

  {
    path: '/login',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/users/AuthenticateUser_page.vue') }, ],
  },

  {
    path: '/users/urls',
    beforeEnter(to, from, next) {
      if (localStorage.getItem('token') !== undefined) {
        const token = localStorage.getItem('token');
        let request = {
          headers: {
            Authorization: '',
          },
        };
        if (token !== null && token !== '') {
          request = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
        }
        axios
          .get('http://localhost:3333/sessions', request)
          .then(() => {
            next();
          })
          .catch(() => {
         
            next('/');
          });
      } else {
        next('/'); 
      }
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/urls/ListUserUrl_page.vue') }, ],
  },


  {
    path: '/error',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;

const routes = [
  {
    path: '/',
    component: () => import('layouts/main-layout.vue'),
    redirect: () => ({ name: 'messenger' }),
    children: [
      {
        path: 'projects/:projectId/scripts/:scriptId',
        name: 'messenger',
        component: () => import('pages/index-page.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes

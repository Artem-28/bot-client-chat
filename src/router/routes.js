const routes = [
  {
    path: '/',
    redirect: () => ({ name: 'messenger' }),
    children: [
      {
        path: 'widgets/:widgetId',
        name: 'messenger',
        component: () => import('pages/messenger.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
  },
];

export default routes;

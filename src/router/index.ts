import { createRouter, createWebHistory } from 'vue-router'

import { LAYOUT_ENUM } from '@/layout/useLayout';

export const PAGE_NAME_ENUM = {
  MAIN: 'Main',
  SETTINGS: 'Settings',
  HISTORY: 'History',
  NOT_FOUND: 'NotFound',
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: PAGE_NAME_ENUM.MAIN,
      meta: { layout: LAYOUT_ENUM.DEFAULT },
      component: () => import('../views/CameraView.vue'),
    },

    {
      path: '/settings',
      name: PAGE_NAME_ENUM.SETTINGS,
      meta: { layout: LAYOUT_ENUM.DEFAULT },
      component: () => import('../views/SettingsView.vue'),
    },

    {
      path: '/history',
      name: PAGE_NAME_ENUM.HISTORY,
      meta: { layout: LAYOUT_ENUM.DEFAULT },
      component: () => import('../views/HistoryView.vue'),
    },

    {
      path: '/:catchAll(.*)',
      name: PAGE_NAME_ENUM.NOT_FOUND,
      redirect: { name: PAGE_NAME_ENUM.MAIN },
    },
  ],
})

export default router

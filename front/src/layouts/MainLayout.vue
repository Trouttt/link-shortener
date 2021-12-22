<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Link Shortener </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import EssentialLink from 'components/EssentialLink.vue';

const linksList = localStorage.getItem('token')
  ? [
      {
        title: 'Cadastrar URL',
        caption: '',
        icon: 'add',
        link: 'http://localhost:8080/#/',
      },
      {
        title: 'URLs mais visitadas',
        caption: '',
        icon: 'link',
        link: 'http://localhost:8080/#/urls',
      },

      {
        title: 'Minhas URLs',
        caption: '',
        icon: 'person',
        link: 'http://localhost:8080/#/users/urls',
      },
    ]
  : [
      {
        title: 'Cadastrar URL',
        caption: '',
        icon: 'add',
        link: 'http://localhost:8080/#/',
      },
      {
        title: 'URLs mais visitadas',
        caption: '',
        icon: 'link',
        link: 'http://localhost:8080/#/urls',
      },
      {
        title: 'Login',
        caption: '',
        icon: 'login',
        link: 'http://localhost:8080/#/login',
      },
      {
        title: 'Registro',
        caption: '',
        icon: 'add',
        link: 'http://localhost:8080/#/register',
      },
    ];

import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>

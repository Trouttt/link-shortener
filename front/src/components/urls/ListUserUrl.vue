<template>
  <div class="flex column link-container-box">
    <p>Users Urls!</p>

    <div class="link-container flex justify-center">
      <q-list v-for="url in listUserUrl" :key="url.id">
        <div>
          <q-card class="my-card bg-cyan-7 text-white">
            <q-card-section>
              <div>id: {{ url.id }}</div>
              <div class="text-h6 card-item">shortUrl: {{ url.shortUrl }}</div>
              <div class="text-h6 card-item">Url: {{ url.url }}</div>
              <div class="text-h6 card-item">visitado: {{ url.visited }}</div>
            </q-card-section>

            <q-card-actions>
              <q-btn @click="switchLocal.replace(`${url.shortUrl}`)" flat
                >Visitar</q-btn
              >
              <q-btn @click="deleteUrl(url)" flat>Deletar</q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </q-list>
    </div>
  </div>
</template>

<script lang="ts">
import IGetUserUrl from 'src/interfaces/url/IGetUserUrl';
import IUrl from 'src/interfaces/url/IUrl';
import IDeleteUserUrl from 'src/interfaces/url/IDeleteUserUrl';

import { defineComponent, reactive, ref } from 'vue';
import UrlService from '../../services/UrlService';

export default defineComponent({
  name: 'GetUserUrl',

  setup() {
    let listUserUrl = reactive<IUrl[]>([]);
    let switchLocal = window.location;
    let user = ref<IGetUserUrl>({
      user_id: '',
    });

    async function getUrls(user: IGetUserUrl) {
      user.user_id = localStorage.getItem('id');
      const urlService = new UrlService();

      console.log(urlService.getUserUrls(user));
      let temp = await urlService.getUserUrls(user);

      temp.data.forEach((element) => {
        const tempUrl: IUrl = {
          id: element.id,
          url: element.url,
          user_id: element.user_id,
          shortUrl: element.shortUrl,
          visited: element.visited,
        };
        listUserUrl.push(tempUrl);
      });
    }
    async function deleteUrl(url: IDeleteUserUrl) {
      const urlService = new UrlService();

      await urlService.deleteUrl(url);

      location.reload();
    }
    function redirect(url: string) {
      window.location.replace(url);
    }
    return { user, listUserUrl, getUrls, switchLocal, deleteUrl, redirect };
  },
  async created() {
    await this.getUrls(this.user);
  },
});
</script>

<style scoped>
.link-container-box {
  width: 100%;
}
.link-container {
  width: 100%;
  height: 100%;
}
.my-card {
  margin: 3%;
  border: 1% solid black;
}
.card-item {
  width: 100%;
}
p {
  margin-top: 5%;
  font-size: 1.5rem;
  text-align: center;
}
.button-style {
  margin-top: 2%;
}

@media (max-width: 800px) {
  .link-container {
    margin: 2%;
  }
}
</style>

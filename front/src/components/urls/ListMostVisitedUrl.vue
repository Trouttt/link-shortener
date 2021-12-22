<template>
  <div class="flex column link-container-box">
    <p>TOP 100 URLS MAIS VISITADAS!</p>

    <div class="link-container flex justify-center">
      <q-list v-for="url in listMostVisitedUrl" :key="url.id">
        <div>
          <q-card class="my-card bg-cyan-7 text-white">
            <q-card-section>
              <div class="text-h6 card-item">shortUrl: {{ url.shortUrl }}</div>
              <div class="text-h6 card-item">Url: {{ url.url }}</div>
              <div class="text-h6 card-item">
                Quantidade de visitas: {{ url.visited }}
              </div>
            </q-card-section>

            <q-card-actions>
              <q-btn @click="switchLocal.replace(`${url.shortUrl}`)" flat
                >Visitar</q-btn
              >
            </q-card-actions>
          </q-card>
        </div>
      </q-list>
    </div>
  </div>
</template>

<script lang="ts">
import IUrl from 'src/interfaces/url/IUrl';

import { defineComponent, reactive } from 'vue';
import UrlService from '../../services/UrlService';

export default defineComponent({
  name: 'UrlGetMostVisited',

  setup() {
    let listMostVisitedUrl = reactive<IUrl[]>([]);
    let switchLocal = window.location;
    async function getUrls() {
      const urlService = new UrlService();
      const temp = await urlService.getMostVisitedUrls();
      temp.data.forEach((element) => {
        const tempUrl: IUrl = {
          id: element.id,
          url: element.url,
          user_id: element.user_id,
          shortUrl: element.shortUrl,
          visited: element.visited,
        };
        listMostVisitedUrl.push(tempUrl);
      });
    }
    function redirect(url: string) {
      window.location.replace(url);
    }
    return { listMostVisitedUrl, getUrls, switchLocal, redirect };
  },
  async created() {
    await this.getUrls();
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

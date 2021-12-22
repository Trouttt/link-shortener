<template>
  <q-page class="page-box flex justify-center items-center"> </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import IFindUrl from '../../interfaces/url/IFindUrl';
import UrlService from '../../services/UrlService';

let url = { shortUrl: window.location.href };

export default defineComponent({
  name: 'RedirectUrlPage',
  setup() {
    const router = useRouter();

    async function redirectUrl(url: IFindUrl) {
      const urlService = new UrlService();
      console.log(url);
      const findedUrl = await urlService.getUrl(url);
      console.log(findedUrl);
      if (findedUrl) {
        if (findedUrl.data.url.indexOf('http') === -1) {
          window.location.replace(`http://${findedUrl.data.url}`);
          await urlService.updateVisited(findedUrl.data);
        } else {
          window.location.replace(findedUrl.data.url);
          await urlService.updateVisited(findedUrl.data);
        }
      } else {
        await router.push('/error');
      }
    }
    return { url, redirectUrl };
  },
  async created() {
    console.log('kodpsakop');
    await this.redirectUrl(url);
  },
});
</script>
<style scoped>
.page-box {
  height: 100%;
  width: 100%;
  background-image: radial-gradient(
    circle at 74.88% 93.1%,
    #8badff 0,
    #1083f8 50%,
    #005ee5 100%
  );
}
</style>

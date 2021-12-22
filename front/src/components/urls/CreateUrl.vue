<template>
  <div class="flex justify-center items-center link-container-box">
    <q-form class="link-container">
      <p>Crie uma nova url encurtada!!!</p>

      <q-input
        square
        class="input"
        v-model="url.url"
        outlined
        label="Digite a sua url aqui!!!"
      />
      <q-btn
        color="primary"
        label="Cadastrar"
        class="button-style"
        @click="createUrl(url)"
      />
    </q-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';
import UrlService from '../../services/UrlService';
import ICreateUrl from '../../interfaces/url/ICreateUrl';

export default defineComponent({
  name: 'UrlCreate',

  setup() {
    const router = useRouter();
    let url = reactive<ICreateUrl>({
      user_id: '',
      url: '',
    });
    if (localStorage.getItem('id')) url.user_id = localStorage.getItem('id');
    async function createUrl(url: ICreateUrl) {
      const urlService = new UrlService();
      const createdUrl = await urlService.createUrl(url);
      console.log(url);
      console.log(createdUrl);
      localStorage.setItem('shortUrl', createdUrl.data.shortUrl);
      await router.push('/successful');
    }
    return { url, createUrl };
  },
});
</script>

<style scoped>
.link-container-box {
  width: 40%;
}
.link-container {
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 0.9),
    rgba(255, 255, 255, 0.7)
  );
  padding: 5% 5%;
  border: 1% solid black;
  border-radius: 3%;
  width: 100%;
  height: 100%;
}
.link-container p {
  font-size: 1.5rem;
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

<template>
  <div class="flex justify-center items-center link-container-box">
    <div class="link-container">
      <p>Url Criada com sucesso!!</p>
      <q-input
        square
        class="input"
        v-model="url"
        @click="switchLocal.replace(`${url}`)"
        outlined
        readonly
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UrlCreate',

  setup() {
    let url;
    if (localStorage.getItem('shortUrl')) {
      url = localStorage.getItem('shortUrl');
    }

    const switchLocal = window.location;
    return { url, switchLocal };
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

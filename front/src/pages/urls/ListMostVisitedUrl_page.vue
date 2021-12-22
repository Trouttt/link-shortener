<template>
  <q-page class="page-box">
    <ListMostVisitedUrl></ListMostVisitedUrl>
  </q-page>
</template>

<script lang="ts">
import ListMostVisitedUrl from '../../components/urls/ListMostVisitedUrl.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageIndex',
  components: { ListMostVisitedUrl },
  setup() {
    return {};
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

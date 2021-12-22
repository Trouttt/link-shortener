<template>
  <div class="flex justify-center items-center link-container-box">
    <q-form class="link-container">
      <p>Registro de usuário!!!</p>
      <q-input
        square
        class="input"
        v-model="user.email"
        outlined
        label="Email:"
      />
      <q-input
        square
        class="input"
        v-model="user.password"
        type="password"
        outlined
        label="Password:"
      />

      <q-input
        square
        class="input"
        v-model="user.name"
        outlined
        label="Name:"
      />
      <q-btn
        color="primary"
        label="Cadastrar"
        class="button-style"
        @click="createUser(user)"
      />
    </q-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import UserService from '../../services/UserService';
import ICreateUser from '../../interfaces/user/ICreateUser';

export default defineComponent({
  name: 'UserCreate',

  setup() {
    const router = useRouter();
    let user = ref<ICreateUser>({
      email: '',
      password: '',
      name: '',
    });

    async function createUser(user: ICreateUser) {
      const userService = new UserService();

      const userCreated = await userService.createUser(user);
      if (userCreated) {
        await router.push('/login');
      }
    }
    return { user, createUser };
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
.input {
  margin: 2% 0%;
}

@media (max-width: 800px) {
  .link-container {
    margin: 2%;
  }
}
</style>

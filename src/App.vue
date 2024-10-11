<template>
  <v-app>
    <NavBar />
    <v-main class="grey lighten-4">
      <v-container fluid class="pa-4">
        <transition
          mode="out-in"
          enter-active-class="animate__animated animate__fadeIn"
          leave-active-class="animate__animated animate__fadeOut"
        >
          <router-view></router-view>
        </transition>
      </v-container>
    </v-main>
    <v-footer app color="primary" dark class="px-4 py-3">
      <span
        >&copy; {{ new Date().getFullYear() }} - Sistema Administrador de Cursos
        by <i>Pedro Silva</i></span
      >
    </v-footer>
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  name: "App",
  components: {
    NavBar,
  },
};
</script>

<style>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";

.animate__animated.animate__fadeIn {
  --animate-duration: 0.5s;
}

.animate__animated.animate__fadeOut {
  --animate-duration: 0.5s;
}

body {
  font-family: "Oswald", sans-serif;
}
.custom-heading {
  font-family: "Oswald", sans-serif;
  font-weight: bold;
}

.custom-text {
  font-family: "Oswald", sans-serif;
  font-weight: normal;
}
.text-h1 {
  font-size: 2.5rem;
  font-weight: 300;
  line-height: 1.2;
}
.text-h2 {
  font-size: 2rem;
  font-weight: 300;
  line-height: 1.2;
}
.text-body-1 {
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
}
.text-body-2 {
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.43;
}
.ma-1 {
  margin: 4px;
}
.ma-2 {
  margin: 8px;
}
.ma-3 {
  margin: 12px;
}
.ma-4 {
  margin: 16px;
}
.pa-1 {
  padding: 4px;
}
.pa-2 {
  padding: 8px;
}
.pa-3 {
  padding: 12px;
}
.pa-4 {
  padding: 16px;
}
</style>

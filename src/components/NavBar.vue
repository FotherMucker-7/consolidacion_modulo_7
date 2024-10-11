<template>
  <v-app-bar app color="primary" dark elevation="4">
    <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
    <v-toolbar-title class="text-h5 font-weight-bold">
      Cursos AlfaWeb
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn :to="{ name: 'HomeView' }" text class="text-body-2">
      <v-icon left>mdi-home</v-icon>
      Inicio
    </v-btn>
    <v-btn :to="{ name: 'AdministrationView' }" text class="text-body-2">
      <v-icon left>mdi-cog</v-icon>
      Administración
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "NavBar",
  methods: {
    toggleDrawer() {},
  },
};
</script>

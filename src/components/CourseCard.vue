<template>
  <v-card class="d-flex flex-column" height="100%">
    <v-card-title class="text-h6 font-weight-bold custom-title pa-3">
      {{ course.nombre }}
    </v-card-title>
    <div class="image-container">
      <v-img :src="course.img" height="200" cover>
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
        <v-chip
          :color="course.completado ? 'green' : 'blue'"
          text-color="white"
          small
          class="ma-2 position-chip"
        >
          {{ course.completado ? "Completado" : "Activo" }}
        </v-chip>
      </v-img>
    </div>
    <v-card-text class="flex-grow-1 d-flex flex-column">
      <v-row align="center" class="mx-0 mb-2">
        <v-icon color="primary" small class="mr-1">mdi-calendar</v-icon>
        <span class="custom-subtitle">{{ course.duracion }}</span>
      </v-row>
      <v-row align="center" class="mx-0 mb-2">
        <v-icon color="green" small class="mr-1">mdi-currency-usd</v-icon>
        <span class="custom-subtitle">{{ formatCurrency(course.costo) }}</span>
      </v-row>
      <v-row align="center" class="mx-0 mb-2">
        <v-icon color="blue" small class="mr-1">mdi-account-group</v-icon>
        <span class="custom-subtitle"
          >{{ course.inscritos }}/{{ course.cupos }} inscritos</span
        >
      </v-row>
      <v-row align="center" class="mx-0 mb-2">
        <v-icon color="orange" small class="mr-1">mdi-calendar-clock</v-icon>
        <span class="custom-subtitle"
          >Registro: {{ course.fecha_registro }}</span
        >
      </v-row>
      <p class="mt-2 text-body-2 flex-grow-1">{{ course.descripcion }}</p>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "CourseCard",
  props: {
    course: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatCurrency(value) {
      return new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
      }).format(value);
    },
  },
};
</script>

<style scoped>
.image-container {
  height: 200px;
  position: relative;
  margin-bottom: 10px;
}

.custom-title {
  font-family: "Oswald", sans-serif;
  background-color: rgb(rgb(0, 0, 0.8));
  color: black;
}

.custom-subtitle {
  font-family: "Oswald", sans-serif;
  font-weight: 300;
}

.position-chip {
  position: absolute;
  top: 8px;
  right: 8px;
}
</style>

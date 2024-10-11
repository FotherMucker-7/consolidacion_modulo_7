<template>
  <v-container fluid>
    <v-row class="mb-4">
      <v-col cols="12">
        <v-sheet
          color="primary"
          class="pa-4 rounded-lg d-flex align-center"
          style="height: 150px"
        >
          <div>
            <h1
              class="text-h4 font-weight-bold white--text mb-2"
              style="font-family: 'Oswald', sans-serif"
            >
              Cursos Disponibles
            </h1>
            <p class="text-subtitle-1 white--text">
              Explora nuestra selección de cursos y comienza tu viaje de
              aprendizaje hoy.
            </p>
          </div>
        </v-sheet>
      </v-col>
    </v-row>

    <v-row class="mb-4">
      <v-col cols="12" sm="4">
        <v-select
          v-model="filter"
          :items="filterOptions"
          item-title="text"
          item-value="value"
          label="Filtrar por"
          outlined
          dense
          hide-details
        ></v-select>
      </v-col>
      <v-col cols="12" sm="8">
        <v-text-field
          v-model="search"
          prepend-icon="mdi-magnify"
          label="Buscar cursos"
          single-line
          hide-details
          outlined
          dense
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        v-for="course in filteredCourses"
        :key="course.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        class="d-flex"
      >
        <CourseCard :course="course" class="flex-grow-1" />
      </v-col>
    </v-row>

    <v-row v-if="filteredCourses.length === 0">
      <v-col cols="12" class="text-center">
        <p class="text-h6">
          No se encontraron cursos que coincidan con tu búsqueda.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import CourseCard from "@/components/CourseCard.vue";

export default {
  name: "HomeView",
  components: {
    CourseCard,
  },
  data() {
    return {
      search: "",
      filter: "all",
      filterOptions: [
        { text: "Todos", value: "all" },
        { text: "Activos", value: "active" },
        { text: "Completados", value: "completed" },
      ],
    };
  },
  computed: {
    ...mapState(["courses"]),
    filteredCourses() {
      return this.courses.filter((course) => {
        const matchesSearch = course.nombre
          .toLowerCase()
          .includes(this.search.toLowerCase());
        const matchesFilter =
          this.filter === "all" ||
          (this.filter === "active" && !course.completado) ||
          (this.filter === "completed" && course.completado);
        return matchesSearch && matchesFilter;
      });
    },
  },
};
</script>

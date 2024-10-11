<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-4" style="font-family: 'Oswald', sans-serif">
          Administración de Cursos
        </h1>
      </v-col>
    </v-row>

    <v-row class="mb-4">
      <v-col cols="12" md="4" lg="3">
        <v-btn color="primary" block @click="openAddCourseModal">
          <v-icon left>mdi-plus</v-icon>
          Agregar Curso
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card class="mb-4">
          <v-card-title
            class="text-h6"
            style="font-family: 'Oswald', sans-serif"
          >
            Listado de Cursos
          </v-card-title>
          <v-card-text>
            <CourseTable
              @edit-course="editCourse"
              @delete-course="handleDeleteCourse"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title
            class="text-h6"
            style="font-family: 'Oswald', sans-serif"
          >
            Estadísticas
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
                v-for="(stat, index) in statistics"
                :key="index"
              >
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon :color="stat.color">{{ stat.icon }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title class="font-weight-medium">{{
                      stat.title
                    }}</v-list-item-title>
                    <v-list-item-subtitle class="text-h6">{{
                      stat.value
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <AddCourseModal ref="addCourseModal" @course-added="refreshStats" />
    <EditCourseForm ref="editCourseForm" @course-updated="refreshStats" />
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CourseTable from "@/components/CourseTable.vue";
import AddCourseModal from "@/components/AddCourseModal.vue";
import EditCourseForm from "@/components/EditCourseForm.vue";

export default {
  name: "AdministrationView",
  components: {
    CourseTable,
    AddCourseModal,
    EditCourseForm,
  },
  computed: {
    ...mapGetters([
      "totalStudents",
      "totalCapacity",
      "remainingSpots",
      "completedCourses",
      "activeCourses",
      "totalCourses",
    ]),
    statistics() {
      return [
        {
          title: "Total de alumnos permitidos",
          value: this.totalCapacity,
          icon: "mdi-account-multiple",
          color: "blue",
        },
        {
          title: "Total de alumnos inscritos",
          value: this.totalStudents,
          icon: "mdi-account-check",
          color: "green",
        },
        {
          title: "Total de cupos restantes",
          value: this.remainingSpots,
          icon: "mdi-account-plus",
          color: "orange",
        },
        {
          title: "Total de cursos terminados",
          value: this.completedCourses,
          icon: "mdi-check-circle",
          color: "green",
        },
        {
          title: "Total de cursos activos",
          value: this.activeCourses,
          icon: "mdi-clock",
          color: "blue",
        },
        {
          title: "Total de cursos",
          value: this.totalCourses,
          icon: "mdi-book-open-variant",
          color: "purple",
        },
      ];
    },
  },
  methods: {
    ...mapActions(["deleteCourse"]),
    openAddCourseModal() {
      this.$refs.addCourseModal.open();
    },
    editCourse(course) {
      this.$refs.editCourseForm.open(course);
    },
    async handleDeleteCourse(courseId) {
      if (confirm("¿Estás seguro de que quieres eliminar este curso?")) {
        await this.deleteCourse(courseId);
        this.refreshStats();
      }
    },
    refreshStats() {
      this.$store.commit("DUMMY_MUTATION");
      this.$forceUpdate();
    },
  },
};
</script>

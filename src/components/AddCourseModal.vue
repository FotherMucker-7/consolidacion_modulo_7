<template>
  <v-dialog v-model="dialog" max-width="600px">
    <v-card>
      <v-card-title
        class="headline primary white--text"
        style="font-family: 'Oswald', sans-serif"
      >
        Agregar Curso
      </v-card-title>
      <v-card-text class="pt-4">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="course.nombre"
            :rules="nameRules"
            label="Nombre del curso"
            required
            outlined
            dense
          ></v-text-field>
          <v-text-field
            v-model="course.img"
            label="URL de la imagen"
            outlined
            dense
          ></v-text-field>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model.number="course.cupos"
                :rules="numberRules"
                label="Cupos"
                type="number"
                required
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model.number="course.inscritos"
                :rules="inscritosRules"
                label="Inscritos"
                type="number"
                required
                outlined
                dense
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model.number="course.costo"
                :rules="numberRules"
                label="Costo"
                type="number"
                required
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="course.duracion"
                label="Duración"
                required
                outlined
                dense
              ></v-text-field>
            </v-col>
          </v-row>
          <v-textarea
            v-model="course.descripcion"
            label="Descripción"
            outlined
            auto-grow
            rows="3"
          ></v-textarea>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="orange darken-1" @click="clearForm" dark>
          <v-icon left>mdi-refresh</v-icon>
          Limpiar
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="grey darken-1" @click="close" dark>
          <v-icon left>mdi-close</v-icon>
          Cancelar
        </v-btn>
        <v-btn color="green darken-1" @click="save" :disabled="!valid" dark>
          <v-icon left>mdi-check</v-icon>
          Guardar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AddCourseModal",
  data() {
    return {
      dialog: false,
      valid: true,
      course: this.getEmptyCourse(),
      nameRules: [(v) => !!v || "El nombre es requerido"],
      numberRules: [
        (v) => !!v || "Este campo es requerido",
        (v) => v >= 0 || "El valor debe ser mayor o igual a 0",
      ],
    };
  },
  computed: {
    inscritosRules() {
      return [
        (v) => !!v || "Este campo es requerido",
        (v) => v >= 0 || "El valor debe ser mayor o igual a 0",
        (v) =>
          v <= this.course.cupos || "Los inscritos no pueden exceder los cupos",
      ];
    },
  },
  methods: {
    ...mapActions(["addCourse"]),
    open() {
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      this.clearForm();
    },
    clearForm() {
      this.$refs.form.reset();
      this.course = this.getEmptyCourse();
    },
    getEmptyCourse() {
      return {
        nombre: "",
        img: "",
        cupos: 0,
        inscritos: 0,
        costo: 0,
        duracion: "",
        descripcion: "",
        completado: false,
      };
    },
    async save() {
      if (this.$refs.form.validate()) {
        try {
          await this.addCourse(this.course);
          this.close();
          this.$emit("course-added");
        } catch (error) {
          console.error("Error al agregar el curso:", error);
        }
      }
    },
  },
};
</script>

<style scoped>
.v-card__title {
  font-family: "Oswald", sans-serif;
}
.v-btn {
  text-transform: none !important;
}
.v-btn.orange {
  background-color: #fb8c00 !important;
}
.v-btn.grey {
  background-color: #757575 !important;
}
.v-btn.green {
  background-color: #4caf50 !important;
}
</style>

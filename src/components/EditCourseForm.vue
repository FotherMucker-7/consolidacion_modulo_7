<template>
  <v-dialog v-model="dialog" max-width="600px">
    <v-card>
      <v-card-title
        class="headline primary white--text"
        style="font-family: 'Oswald', sans-serif"
      >
        Editar Curso
      </v-card-title>
      <v-card-text class="pt-4">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="editedCourse.nombre"
            :rules="nameRules"
            label="Nombre del curso"
            required
            outlined
            dense
          ></v-text-field>
          <v-text-field
            v-model="editedCourse.img"
            label="URL de la imagen"
            outlined
            dense
          ></v-text-field>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model.number="editedCourse.cupos"
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
                v-model.number="editedCourse.inscritos"
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
                v-model.number="editedCourse.costo"
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
                v-model="editedCourse.duracion"
                label="Duración"
                required
                outlined
                dense
              ></v-text-field>
            </v-col>
          </v-row>
          <v-textarea
            v-model="editedCourse.descripcion"
            label="Descripción"
            outlined
            auto-grow
            rows="3"
          ></v-textarea>
          <v-switch
            v-model="editedCourse.completado"
            label="Curso completado"
          ></v-switch>
        </v-form>
      </v-card-text>
      <v-card-actions>
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
  name: "EditCourseForm",
  data() {
    return {
      dialog: false,
      valid: true,
      editedCourse: {
        id: null,
        nombre: "",
        img: "",
        cupos: 0,
        inscritos: 0,
        costo: 0,
        duracion: "",
        descripcion: "",
        completado: false,
        fecha_registro: "",
      },
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
          v <= this.editedCourse.cupos ||
          "Los inscritos no pueden exceder los cupos",
      ];
    },
  },
  methods: {
    ...mapActions(["updateCourse"]),
    open(course) {
      this.editedCourse = JSON.parse(JSON.stringify(course));
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      this.$refs.form.reset();
    },
    save() {
      if (this.$refs.form.validate()) {
        if (this.editedCourse.completado) {
          this.editedCourse.inscritos = 0;
        }
        this.updateCourse(this.editedCourse);
        this.close();
        this.$emit("course-updated");
      }
    },
  },
};
</script>

<style scoped>
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

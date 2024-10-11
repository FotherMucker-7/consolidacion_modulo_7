<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="courses"
      :items-per-page="10"
      class="elevation-1"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:[`item.costo`]="{ item }">
        {{ formatCurrency(item.costo) }}
      </template>
      <template v-slot:[`item.completado`]="{ item }">
        <v-chip
          :color="item.completado ? 'green' : 'blue'"
          text-color="white"
          small
        >
          {{ item.completado ? "Completado" : "Activo" }}
        </v-chip>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "CourseTable",
  data() {
    return {
      headers: [
        { title: "Nombre", key: "nombre" },
        { title: "Duración", key: "duracion" },
        { title: "Costo", key: "costo" },
        { title: "Cupos", key: "cupos" },
        { title: "Inscritos", key: "inscritos" },
        { title: "Estado", key: "completado" },
        { title: "Fecha de Registro", key: "fecha_registro" },
        { title: "Acciones", key: "actions", sortable: false },
      ],
    };
  },
  computed: {
    ...mapState(["courses"]),
  },
  methods: {
    editItem(item) {
      this.$emit("edit-course", item);
    },
    deleteItem(item) {
      this.$emit("delete-course", item.id);
    },
    formatCurrency(value) {
      return new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
      }).format(value);
    },
  },
};
</script>

import { createStore } from "vuex";

export default createStore({
  state: {
    courses: [
      {
        id: 1,
        img: "https://i.blogs.es/545cf8/es6-logo/450_1000.png",
        nombre: "JavaScript Avanzado",
        costo: 30000,
        duracion: "2 meses",
        cupos: 20,
        inscritos: 10,
        completado: false,
        fecha_registro: "06/10/2024",
        descripcion: "Curso con las nuevas actualizaciones de JavaScript.",
      },
      {
        id: 2,
        img: "https://lineadecodigo.com/wp-content/uploads/2014/04/css.png",
        nombre: "CSS para principiantes",
        costo: 10000,
        duracion: "1 mes",
        cupos: 35,
        inscritos: 23,
        completado: false,
        fecha_registro: "05/10/2024",
        descripcion: "Aprendiendo estilos con CSS desde el nivel más básico.",
      },
      {
        id: 3,
        img: "https://1000marcas.net/wp-content/uploads/2020/11/JavaScript-logo.jpg",
        nombre: "JavaScript Básico de 0 a 100",
        costo: 20000,
        duracion: "2 meses",
        cupos: 25,
        inscritos: 0,
        completado: true,
        fecha_registro: "05/07/2024",
        descripcion: "Programando para la web con JavaScript.",
      },
      {
        id: 4,
        img: "https://www.w3.org/html/logo/downloads/HTML5_Logo_512.png",
        nombre: "HTML Básico",
        costo: 10000,
        duracion: "1 mes",
        cupos: 35,
        inscritos: 0,
        completado: true,
        fecha_registro: "30/08/2024",
        descripcion:
          "Aprende HTML 5 y crea tus primeras páginas web paso a paso con decenas de ejercicios.",
      },
      {
        id: 5,
        img: "https://logosandtypes.com/wp-content/uploads/2020/08/vue.svg",
        nombre: "Vue JS de 0 a 100",
        costo: 85500,
        duracion: "5 meses",
        cupos: 35,
        inscritos: 35,
        completado: false,
        fecha_registro: "06/10/2024",
        descripcion:
          "Aprende desde cero como usar VueJS, cómo usarlo en aplicaciones pequeñas y ver lo que ofrece el framework.",
      },
      {
        id: 6,
        img: "https://miro.medium.com/max/512/1*9U1toerFxB8aiFRreLxEUQ.png",
        nombre: "Estilos con SASS",
        costo: 45000,
        duracion: "1 mes",
        cupos: 40,
        inscritos: 35,
        completado: false,
        fecha_registro: "06/10/2024",
        descripcion:
          "Con SASS aprenderás a escribir mejor código de CSS con todas las funciones necesarias.",
      },
    ],
  },
  getters: {
    totalStudents: (state) =>
      state.courses.reduce((total, course) => total + course.inscritos, 0),
    totalCapacity: (state) =>
      state.courses.reduce((total, course) => total + course.cupos, 0),
    remainingSpots: (state, getters) =>
      getters.totalCapacity - getters.totalStudents,
    completedCourses: (state) =>
      state.courses.filter((course) => course.completado).length,
    activeCourses: (state) =>
      state.courses.filter((course) => !course.completado).length,
    totalCourses: (state) => state.courses.length,
  },
  mutations: {
    ADD_COURSE(state, newCourse) {
      state.courses.push(newCourse);
    },
    UPDATE_COURSE(state, updatedCourse) {
      const index = state.courses.findIndex(
        (course) => course.id === updatedCourse.id
      );
      if (index !== -1) {
        if (updatedCourse.completado) {
          updatedCourse.inscritos = 0;
        }
        Object.assign(state.courses[index], updatedCourse);
      }
    },
    DELETE_COURSE(state, courseId) {
      state.courses = state.courses.filter((course) => course.id !== courseId);
    },
    SET_COURSES(state, courses) {
      state.courses = courses;
    },
    DUMMY_MUTATION() {},
  },
  actions: {
    addCourse({ commit, state }, course) {
      if (course.inscritos > course.cupos) {
        throw new Error(
          "El número de inscritos no puede exceder el número de cupos"
        );
      }
      const newCourse = {
        ...course,
        id: Date.now(),
        fecha_registro: new Date().toLocaleDateString("es-CL", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
      };
      commit("ADD_COURSE", newCourse);
      localStorage.setItem("courses", JSON.stringify(state.courses));
    },
    updateCourse({ commit, state }, course) {
      if (course.inscritos > course.cupos) {
        throw new Error(
          "El número de inscritos no puede exceder el número de cupos"
        );
      }
      commit("UPDATE_COURSE", course);
      localStorage.setItem("courses", JSON.stringify(state.courses));
    },
    deleteCourse({ commit, state }, courseId) {
      commit("DELETE_COURSE", courseId);
      localStorage.setItem("courses", JSON.stringify(state.courses));
    },
    loadCourses({ commit }) {
      const savedCourses = localStorage.getItem("courses");
      if (savedCourses) {
        commit("SET_COURSES", JSON.parse(savedCourses));
      }
    },
  },
  modules: {},
});

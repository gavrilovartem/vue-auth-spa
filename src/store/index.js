import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index.js';

Vue.use(Vuex)

const checkRequisites = (payload, users) => {
  const requiredUser = users.filter(item => item.name === payload.username);
  if (requiredUser.length === 0) {
    return "Пользователя с указаным именем не существует";
  }
  const { password } = requiredUser[0];
  if (password !== payload.password) {
    return "Введен неправильный пароль";
  }
  else return 0;
};

export default new Vuex.Store({
  state: {
    users: [
      {
        name: "student",
        text: "Студент",
        role: "student",
        isAuth: false,
        password: "sdemo",
      },
      {
        name: "teacher",
        text: "Преподаватель",
        role: "teacher",
        isAuth: false,
        password: "tdemo",
      }
    ],
    errors: "",
  },
  mutations: {
    authLogin (state, payload) {
      const requiredUser = state.users.filter(item => item.name === payload.username);
      const index = state.users.indexOf(requiredUser[0]);
      state.users[index].isAuth = true;
      const path = state.users[index].role;
      router.push(path);
    },
    errorSetter(state, code) {
      state.errors = code;
    },
  },
  actions: {
    authLoginRequest ( { commit, state }, payload) {
      commit('errorSetter', "");
      const result = checkRequisites(payload, state.users);
      result === 0 ? commit('authLogin', payload) : commit('errorSetter', result);
    },
  },
  getters: {
    isAutheticated: state => {
      return state.users.filter(item => item.isAuth === true);
    },
  }
})


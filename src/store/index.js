import { createStore } from 'vuex'

export default createStore({
  state: {
    newRssURL: "",
    modalNewRssURL: '',
    modalNewRssURLGroupName: '',
    savedURLS: []
  },
  mutations: {
    CHANGE_RSS_URL(state, payload){
      state.newRssURL = `https://api.allorigins.win/get?url=${payload}`;
    },
    CHANGE_MODAL_RSS_URL(state, payload){
      state.modalNewRssURL = `https://api.allorigins.win/get?url=${payload.url}`;
      state.modalNewRssURLGroupName = payload.groupname;
    },
    SAVE_URL(state, payload){
      state.savedURLS = payload;
    }
  },
  actions: {
    changeRssURL({commit}, id){
      commit('CHANGE_RSS_URL', id)
    },
    changeModalRssURL({commit}, id){
      commit('CHANGE_MODAL_RSS_URL', id)
    },
    saveURL({commit}, id){
      commit('SAVE_URL', id)
    }
  },
  modules: {
  }
})

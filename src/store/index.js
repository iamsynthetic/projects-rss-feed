import { createStore } from 'vuex'

export default createStore({
  state: {
    newRssURL: "",
    modalNewRssURL: '',
    savedURLS: []
  },
  mutations: {
    CHANGE_RSS_URL(state, payload){
      console.log('CHANGE_RSS_URL payload is: ' + state);
      state.newRssURL = `https://api.allorigins.win/get?url=${payload}`;
    
    },
    CHANGE_MODAL_RSS_URL(state, payload){
      state.modalNewRssURL = `https://api.allorigins.win/get?url=${payload}`;
    },
    SAVE_URL(state, payload){
      state.savedURLS = payload;
      console.log('save_url payload is: ' + payload)
      console.log('state.savedURLS is: ' + state.savedURLS);
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

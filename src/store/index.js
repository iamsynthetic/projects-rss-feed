import { createStore } from 'vuex'

export default createStore({
  state: {
    newRssURL: "",
    modalNewRssURL: '',
    modalNewRssURLGroupName: '',
    savedURLS: [],
    saveditemslist: []
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
    },
    SAVE_ITEMS_LIST(state, payload){
      console.log('save items list store - 555555555 ' + payload)
      state.saveditemslist = payload
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
    },
    saveItemsList({commit}, id){
      console.log('saveitemslist - store ---5-9549430534953')
      commit('SAVE_ITEMS_LIST', id)
    }
  },
  modules: {
  }
})

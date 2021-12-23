import { createStore } from 'vuex'

export default createStore({
  state: {
    newRssURL: "",
    modalNewRssURL: '',
    modalNewRssURLGroupName: '',
    savedURLS: [],
    saveditemslist: [],
    contextnav: 'open'
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
    },
    REMOVE_THE_RIGHT_CLICK_NAV(state, payload){
      // console.log('REMOVE_THE_RIGHT_CLICK_NAV')
      // console.log('payload is: ' + payload)
      console.log('state.removeTheRightClickNav is: ' + state.contextnav)
      state.contextnav = payload
    },
    ADD_THE_RIGHT_CLICK_NAV(state, payload){
      state.contextnav = payload
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
    },
    removeTheRightClickNav({commit}, id){
      //console.log('removeTheRightClickNav')
      commit('REMOVE_THE_RIGHT_CLICK_NAV', id)
    },
    addTheRightClickNav({commit}, id){
      commit('ADD_THE_RIGHT_CLICK_NAV', id)
    }
  },
  getters: {
    rightclick: state => {return state.removeRightClickNav}
  },
  modules: {
  }
})

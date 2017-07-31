import Vue from 'vue'
export default {
    state:{
      ticket:[]
    },
    getters: {
      opticker: state => {
        return state.ticket;
      }
    },
    mutations: {
      ["increment"] (state,nticket) {
        state.ticket=nticket;
      }
    }
}
import { createStore } from 'vuex'
import ssot from "./modules/ssot"
import history from "./modules/history"

export default createStore({
  modules: {
    ssot,
    history
  }
})

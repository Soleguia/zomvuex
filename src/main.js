import { createApp } from 'vue'
import store from './store'
import App from './App.vue'

const app = createApp(App)

app.config.productionTip = false

// Global filters migrated to globalProperties
app.config.globalProperties.$filters = {
  colorDados(value) {
    const color = {
      red: "rojo",
      green: "verde",
      yellow: "amarillo"
    }
    return color[value] || value
  },
  capitalize(value) {
    if (!value) return ""
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
}

// Register global components
import PantallaInicio from "./components/PantallaInicio.vue"
import PantallaInfo from "./components/PantallaInfo.vue"
import PantallaHistorico from "./components/PantallaHistorico.vue"
import PantallaJuego from "./components/PantallaJuego.vue"
import GameMarkerComponent from "./components/GameMarkerComponent.vue"
import DiceComponent from "./components/DiceComponent.vue"
import DiceCounterComponent from "./components/DiceCounterComponent.vue"
import DiceRollComponent from "./components/DiceRollComponent.vue"

app.component("pantalla-inicio", PantallaInicio)
app.component("pantalla-info", PantallaInfo)
app.component("pantalla-historico", PantallaHistorico)
app.component("pantalla-juego", PantallaJuego)
app.component("game-marker", GameMarkerComponent)
app.component("dice-component", DiceComponent)
app.component("dice-counter", DiceCounterComponent)
app.component("dice-roll", DiceRollComponent)

app.use(store)
app.mount('#app')

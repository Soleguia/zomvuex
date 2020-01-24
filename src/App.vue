<template>
	<div id="app" class="container">
		<div class="jumbotron">
			<h1>
				Zombie Dice
				<small>(Vuex)</small>
			</h1>
			<section class="pantalla--inicio" v-if="!partida">
				<ul>
					<li>
						<label>Partida:</label>
						<span class="partida__estado">{{ estado_partida }}</span>
					</li>
					<li>
						<label>Zombie:</label>
						<span class="partida__jugadores">{{ jugadores }}</span>
					</li>
				</ul>
				<p v-if="!jugadores">
					<input type="text" v-model="jugador" @keyup.enter="guardarJugador" />
					<br />
					<button @click="guardarJugador">Guardar</button>
				</p>

				<p>
					<button v-if="jugadores" @click="empezarPartida">Empezar partida</button>
				</p>
			</section>
			<section class="pantalla--juego" v-else>
				<zombie-dice></zombie-dice>
			</section>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
import ZombieDice from "./components/ZombieDiceComponent.vue";
export default {
	components: {
		ZombieDice
	},
	data() {
		return {
			jugador: ""
		};
	},
	methods: {
		guardarJugador() {
			this.$store.commit("guardarJugador", this.jugador);
			this.jugador = "";
		},
		empezarPartida() {
      this.$store.commit("estadoPartida", true);
      this.$store.commit("sumarRonda");
		}
	},
	computed: mapState({
		partida: state => state.partida,
		estado_partida(state) {
			if (state.partida) {
				return "A jugar!";
			}
			return "No hay partida";
		},
		jugadores: state => state.jugadores.join(", ")
	})
};
</script>

<style lang="scss"></style>

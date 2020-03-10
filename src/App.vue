<template>
	<div id="app" class="container">
		<div class="jumbotron">
			<h1>ZomVuex</h1>
			<section class="pantalla--inicio" v-if="!partida">
				<p v-if="!jugadores">
					<input
						type="text"
						v-model="jugador"
						@keyup.enter="guardarJugador"
						class="form-control"
						placeholder="¿Cual es tu nombre?"
					/>
					<br />
					<button @click="guardarJugador" class="btn btn-danger">Guardar</button>
				</p>

				<p v-if="jugadores">
					<label>Zombie:</label>
					<span class="partida__jugadores">{{ jugadores }}</span>
				</p>

				<p>
					<button v-if="jugadores" @click="empezarPartida" class="btn btn-primary">Empezar partida</button>
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
export default {
	data() {
		return {
			jugador: ""
		};
	},
	methods: {
		guardarJugador() {
			this.$store.commit("ssot/guardarJugador", this.jugador);
			this.jugador = "";
		},
		empezarPartida() {
			this.$store.commit("ssot/estadoPartida", true);
			this.$store.commit("ssot/sumarRonda");
		}
	},
	computed: mapState({
		partida: state => state.ssot.partida,
		estado_partida(state) {
			if (state.ssot.partida) {
				return "A jugar!";
			}
			return "No hay partida";
		},
		jugadores: state => state.ssot.jugadores.join(", ")
	})
};
</script>

<style lang="scss">
body {
	background-color: #111;
}
.jumbotron {
	color: white;
	background-color: #111;
}
</style>

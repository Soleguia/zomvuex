<template>
	<div class="zombie-dice">
		<div v-if="!gameover && !win">
			<game-marker></game-marker>
			<hr />
			<dice-roll></dice-roll>
			<hr />
			<dice-counter></dice-counter>
		</div>
		<div v-else-if="gameover" class="d-flex flex-column align-items-center">
			<h2>
				<i class="fa fa-meh-o fa-4x spin-90 mb-4 text-danger" style="transform:rotateZ(750deg);"></i>
			</h2>
			<h3 class="text-center">
				Has recibido {{disparos}} disparos.
				<br />
				<i v-for="(shot, index) in disparos" :key="index" class="fa fa-yelp fa-2x m-4 text-danger"></i>
				<br />Los humanos han acabado contigo.
			</h3>
			<div class="d-flex justify-content-center mt-4 dice-roll__actions">
				<button class="btn btn-warning dice-roll__reroll" @click="reiniciarJuego()">Volver a jugar</button>
			</div>
		</div>
		<div v-else-if="win" class="d-flex flex-column align-items-center">
			<h2>
				<i class="fa fa-meh-o fa-4x spin-90 mb-4 text-danger" style="transform:rotateZ(750deg);"></i>
			</h2>
			<h3 class="text-center">
				Te has comido {{totalCerebros}} cerebros.
				<br />
				<i
					v-for="(brain, index) in totalCerebros"
					:key="index"
					class="fa fa-heart fa-2x m-4 text-success"
				></i>
				<br />Has acabado con los humanos.
			</h3>
			<div class="d-flex justify-content-center mt-4 dice-roll__actions">
				<button class="btn btn-success dice-roll__reroll" @click="reiniciarJuego()">¿Otra partida?</button>
			</div>
		</div>
	</div>
</template>

<script>
import GameMarker from "./GameMarkerComponent.vue";
import DiceCounter from "./DiceCounterComponent.vue";
import DiceRoll from "./DiceRollComponent.vue";

export default {
	components: {
		GameMarker,
		DiceCounter,
		DiceRoll
	},
	data() {
		return {};
	},
	methods: {
		reiniciarJuego() {
			this.$store.commit("nuevaPartida");
			this.$store.commit("reiniciarTurno");
			this.$store.commit("actualizarFinPartida", false);
			this.$store.commit("actualizarTotalDados", 13);
			this.$store.commit("actualizarTotalCerebros", 0);
			this.$store.commit("estadoPartida", false);
			this.$store.commit("actualizarVictoria", false);
		}
	},
	computed: {
		partidaActual() {
			return this.$store.state.partidaActual;
		},
		disparos() {
			return this.$store.state.disparos;
		},
		totalCerebros() {
			return this.$store.state.totalCerebros;
		},
		gameover() {
			return this.$store.state.gameover;
		},
		win() {
			return this.$store.state.win;
		}
	}
};
</script>
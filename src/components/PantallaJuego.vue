<template>
	<section class="pantalla--juego">
		<div class="zombie-dice">
			<div v-if="!gameover && !win">
				<game-marker></game-marker>
				<hr />
				<dice-roll></dice-roll>
				<hr />
				<dice-counter></dice-counter>
			</div>
			<div v-else-if="gameover" class="d-flex flex-column align-items-center">
				<h2 class="text-center">
					Has recibido {{disparos}} disparos.
					<br />
					<div class="d-flex justify-content-around align-items-center">
						<div
							v-for="(shot, index) in disparos"
							:key="index"
							title="shot"
							class="dice dice_face--shot dice_color--red"
						></div>
					</div>

					<br />Han acabado contigo.
				</h2>
				<div class="d-flex justify-content-center mt-4 dice-roll__actions">
					<button class="btn btn-warning dice-roll__reroll" @click="reiniciarJuego()">Volver a jugar</button>
				</div>
			</div>
			<div v-else-if="win" class="d-flex flex-column align-items-center">
				<h2 class="text-center">
					Te has comido {{totalCerebros}} cerebros.
					<br />
					<div class="d-flex flex-wrap justify-content-around align-items-center">
						<div
							v-for="(brain, index) in totalCerebros"
							:key="index"
							title="brain"
							class="dice dice_face--brain dice_color--green"
						></div>
					</div>
					<br />¡Has ganado!
				</h2>
				<div class="d-flex justify-content-center mt-4 dice-roll__actions">
					<button class="btn btn-success dice-roll__reroll" @click="reiniciarJuego()">¿Otra partida?</button>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		reiniciarJuego() {
			this.$store.commit("ssot/reiniciarContadores");
			this.$store.commit("ssot/reiniciarTotalCerebros");
			this.$store.commit("ssot/actualizarFinPartida", false);
			this.$store.commit("ssot/estadoPartida", false);
			this.$store.commit("ssot/actualizarVictoria", false);
			this.$store.commit("ssot/nuevaPartida");
		}
	},
	computed: {
		partidaActual() {
			return this.$store.state.ssot.partidaActual;
		},
		disparos() {
			return this.$store.state.ssot.disparos;
		},
		totalCerebros() {
			return this.$store.state.ssot.totalCerebros;
		},
		gameover() {
			return this.$store.state.ssot.gameover;
		},
		win() {
			return this.$store.state.ssot.win;
		}
	}
};
</script>

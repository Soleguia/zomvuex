<template>
	<section class="pantalla--juego">
		<div class="zombie-dice">
			<div v-if="!gameover && !win">
				<dice-roll></dice-roll>
				<hr />
				<game-marker></game-marker>
				<hr />
				<dice-counter></dice-counter>
			</div>
			<div v-else-if="gameover" class="pantalla--resultado">
				<h2 class="text-center">Has recibido {{disparos}} disparos.</h2>
				<div class="pantalla--resultado__marcador">
					<div
						v-for="(shot, index) in disparos"
						:key="index"
						title="shot"
						class="dice dice_face--shot dice_color--red"
						:class="responsiveDice"
					></div>
				</div>
				<h2 class="text-center">Han acabado contigo.</h2>
				<div class="dice-roll__actions">
					<button class="btn btn-warning dice-roll__reroll" @click="reiniciarJuego()">Volver a jugar</button>
				</div>
			</div>
			<div v-else-if="win" class="pantalla--resultado">
				<h2 class="text-center">Te has comido {{totalCerebros}} cerebros.</h2>
				<div class="d-flex flex-wrap justify-content-around align-items-center">
					<div
						v-for="(brain, index) in totalCerebros"
						:key="index"
						title="brain"
						class="dice dice--small dice_face--brain dice_color--green"
					></div>
				</div>
				<h2 class="text-center">¡Has ganado!</h2>
				<div class="dice-roll__actions">
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
		medidaDado() {
			if (this.disparos >= 4) {
				return "dice--medium";
			}
		},
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
		},
		responsiveDice() {
			if (window.matchMedia("(max-width: 767px)").matches) {
				/* The viewport is less than, or equal to, 700 pixels wide */
				return "dice--small";
			} else {
				return this.medidaDado();
			}
		}
	}
};
</script>

<style lang="scss">
.pantalla--resultado {
	display: flex;
	flex-direction: column;
	align-items: center;
	&__marcador {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		align-items: center;
	}
}
@media (min-width: 768px) {
}
</style>
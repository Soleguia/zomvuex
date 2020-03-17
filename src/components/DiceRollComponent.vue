<template>
	<div class="vue-dice-roll">
		<div class="dice-roll">
			<dice-component
				v-for="(dice, index) in reroll"
				:dice="dice"
				:key="dice.color+'-'+index"
				:class="responsiveDice"
			></dice-component>
		</div>
		<div class="dice-roll__actions">
			<button
				v-if="totalDados > 2"
				class="btn btn-danger btn-block dice-roll__reroll"
				@click="reRoll()"
			>Tirar dados</button>
			<button
				v-if="totalDados < 13 && totalDados > 0"
				class="btn btn-info btn-block dice-roll__plantarse"
				@click="plantarse()"
			>Plantarse</button>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			reroll: this.$store.state.ssot.tiradaVacia,
			footstepsDices: []
		};
	},
	methods: {
		reRoll() {
			this.reroll = this.diceRoll();
			this.actualizarCuentaDados(this.reroll);
		},
		// la tirada
		diceRoll() {
			let diceRoll = [];
			let pool = this.dicePool();
			for (let p = 0; p < pool.length; p++) {
				let dice = pool[p];
				let face = this.diceFace(dice);
				diceRoll.push({
					dice: dice,
					face: face
				});
				if (face == "footsteps") {
					this.footstepsDices.push(dice);
				}
			}
			return diceRoll;
		},
		// los 3 dados que sacas
		dicePool() {
			let dicePool = [];
			let newDices = 3;
			let repeatDices = this.footstepsDices.length;
			let newPool = newDices - repeatDices;
			for (let f = 0; f < repeatDices; f++) {
				dicePool.push(this.footstepsDices[f]);
			}
			this.footstepsDices = [];
			for (let i = 0; i < newPool; i++) {
				let dice = this.takeAvailableDice();
				while (dice.disponibles < 1) {
					dice = this.takeAvailableDice();
					i--;
				}
				dicePool.push(dice);
			}
			return dicePool;
		},
		// sacar 1 dado
		takeAvailableDice() {
			let dice = this.takeDice();
			while (dice.disponibles < 1) {
				dice = this.takeDice();
			}
			return dice;
		},
		takeDice() {
			let pos = this.getRndInteger(0, 3);
			return this.dados[pos];
		},
		// aleatorio
		getRndInteger(min, max) {
			return Math.floor(Math.random() * (max - min)) + min;
		},
		// la cara del dado
		diceFace(dice) {
			let pos = this.getRndInteger(1, 7);
			let face = dice.faces[pos];
			return face;
		},
		actualizarCuentaDados(roll) {
			for (let p = 0; p < roll.length; p++) {
				// comprueba si hay pisadas
				if (
					roll[p].face != "footsteps" &&
					roll[p].dice.disponibles > 0
				) {
					roll[p].dice.disponibles--;
				}
				// apunta cerebros y disparos
				this.resultados(roll[p]);
			}
			this.comprobarPuntuacionCerebros();
			this.cuentaTotalDados();
			this.comprobarPuntuacionDisparos();
		},
		resultados(dice) {
			if (dice.face == "brain") {
				this.$store.commit("ssot/sumarCerebro");
			}
			if (dice.face == "shot") {
				this.$store.commit("ssot/sumarDisparo");
			}
		},
		comprobarPuntuacionCerebros() {
			console.log(
				"Check cerebros 1: total",
				this.totalCerebros,
				" + cerebros ",
				this.cerebros
			);
			if (this.totalCerebros + this.cerebros >= 13) {
				this.$store.commit(
					"ssot/actualizarTotalCerebros",
					this.totalCerebros + this.cerebros
				);
			}
			console.log(
				"Check cerebros 2: total",
				this.totalCerebros,
				" + cerebros ",
				this.cerebros
			);
			if (this.totalCerebros >= 13) {
				this.$store.commit("ssot/actualizarVictoria", true);
			}
		},
		cuentaTotalDados() {
			let dados = this.dados;
			let totalDados = 0;
			for (let d = 0; d < dados.length; d++) {
				totalDados += dados[d].disponibles;
			}
			this.$store.commit("ssot/actualizarTotalDados", totalDados);
		},
		comprobarPuntuacionDisparos() {
			if (this.disparos >= 3) {
				this.$store.commit("ssot/actualizarFinPartida", true);
			}
		},

		// te plantas, los cerebros se acumulan y se resetea
		plantarse() {
			this.$store.commit(
				"ssot/actualizarTotalCerebros",
				this.totalCerebros + this.cerebros
			);
			this.reroll = this.$store.state.ssot.tiradaVacia;
			this.$store.commit("ssot/reiniciarContadores");
			this.$store.commit("ssot/sumarRonda");
		}
	},
	computed: {
		partidaActual() {
			return this.$store.state.ssot.partidaActual;
		},
		dados() {
			return this.$store.state.ssot.dados;
		},
		totalDados() {
			return this.$store.state.ssot.totalDados;
		},
		cerebros() {
			return this.$store.state.ssot.cerebros;
		},
		totalCerebros() {
			return this.$store.state.ssot.totalCerebros;
		},
		disparos() {
			return this.$store.state.ssot.disparos;
		},
		responsiveDice() {
			if (window.matchMedia("(max-width: 767px)").matches) {
				/* The viewport is less than, or equal to, 700 pixels wide */
				return "dice--small";
			} else {
				/* The viewport is greater than 700 pixels wide */
			}
		}
	}
};
</script>

<style lang="scss">
.dice-roll {
	&,
	&__actions {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
	&__title {
		width: 100%;
	}
	&__actions {
		width: 100%;
		margin-top: 1.5rem;
		.btn + .btn {
			margin-top: 1rem;
		}
	}
}
@media (min-width: 768px) {
	.dice-roll {
		&__actions {
			margin-top: 1.5rem;
			.btn {
				max-width: calc(50% - 0.25rem);
			}
			.btn + .btn {
				margin-top: 0;
				margin-left: 0.5rem;
			}
		}
	}
}
</style>

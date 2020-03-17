<template>
	<div class="game-marker">
		<ul class="marcador">
			<li class>
				<span class="mr-4">Cerebros ronda:</span>
				<span>{{cerebros}}</span>
				<div class="marcador__dados">
					<dice-component
						v-for="(brain, index) in cerebros"
						:key="index"
						:dice="dice.brain"
						:class="'mx-1 dice--min'"
					></dice-component>
				</div>
			</li>
			<li class>
				<span class="mr-4">Disparos ronda:</span>
				<span>{{disparos}}</span>
				<div class="marcador__dados">
					<dice-component
						v-for="(shot, index) in disparos"
						:key="index"
						:dice="dice.shot"
						:class="'mx-1 dice--min'"
					></dice-component>
				</div>
			</li>
		</ul>

		<div class="marcador px-2 mb-3">
			<span class="mr-4">Ronda:</span>
			<span>{{ronda}}</span>
		</div>

		<ul class="marcador">
			<li class>
				<span class="mr-4">Partida:</span>
				<span>{{partidaActual}}</span>
			</li>
			<li class>
				<span class="mr-4">Cerebros partida:</span>
				<span>{{totalCerebros}}</span>
				<div class="marcador__dados">
					<dice-component
						v-for="(brain, index) in totalCerebros"
						:key="index"
						:dice="dice.brainGreen"
						:class="'mx-1 dice--min'"
					></dice-component>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	data() {
		return {
			dice: {
				shot: {
					face: "shot",
					dice: { color: "red" }
				},
				brain: {
					face: "brain",
					dice: { color: "yellow" }
				},
				brainGreen: {
					face: "brain",
					dice: { color: "green" }
				}
			}
		};
	},
	methods: {
		getFromSsot(data) {
			return this.$store.getters["ssot/" + data];
		},
		stateFromSsot(data) {
			return this.$store.state.ssot[data];
		}
	},
	computed: {
		partidaActual() {
			return this.getFromSsot("partidasJugadas");
			// return this.$store.getters["ssot/partidasJugadas"];
		},
		ronda() {
			return this.$store.getters["ssot/rondaActual"];
		},
		disparos() {
			return this.stateFromSsot("disparos");
			//return this.$store.state.ssot.disparos;
		},
		cerebros() {
			return this.$store.state.ssot.cerebros;
		},
		totalCerebros() {
			return this.$store.state.ssot.totalCerebros;
		}
	}
};
</script>

<style lang="scss">
.game-marker {
	ul {
		list-style: none;
		padding-left: 0;
	}
}
.marcador {
	display: block;
	border-bottom: 1px solid #6c757d;

	li {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding-right: 0.5rem;
		padding-left: 0.5rem;
	}
	&__dados {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-end;
		width: 100%;
	}
}
@media (max-width: 767px) {
	.marcador {
		li {
			&:not(:last-child) {
				border-bottom: 1px solid #6c757d;
			}
		}
	}
}
@media (min-width: 768px) {
	.marcador {
		display: flex;
		li {
			width: 50%;
			&:nth-child(even) {
				text-align: right;
			}
		}
	}
}
</style>

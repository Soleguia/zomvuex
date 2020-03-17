<template>
	<section class="pantalla--inicio">
		<p v-if="!jugadores">
			<input
				type="text"
				v-model="jugador"
				@keyup.enter="guardarJugador"
				class="form-control"
				placeholder="¿Cual es tu nombre?"
			/>
			<br />
			<button @click="guardarJugador" class="btn btn-danger btn-block">Guardar</button>
		</p>

		<div v-else class="introduccion">
			<p>
				¡ Hola, zombie
				<strong class="partida__jugadores">{{ jugadores }}</strong> !
			</p>
			<div class="introduccion__tip">
				<p class="introduccion__tip__texto">
					Este juego es muy sencillo, tienes que conseguir comerte
					<strong>13 cerebros</strong> o más.
				</p>
				<dice-component :dice="demo.dice.brain" :class="'dice--small introduccion__tip__icono'"></dice-component>
			</div>
			<div class="introduccion__tip">
				<p class="introduccion__tip__texto">
					Pero tus presas pueden intentar
					<strong>huir</strong> o
					<strong>dispararte</strong>.
					<br />Que intenten huir no es tan malo, les sigues el rastro.
				</p>
				<dice-component :dice="demo.dice.footsteps" :class="'dice--small introduccion__tip__icono'"></dice-component>
			</div>
			<div class="introduccion__tip">
				<p class="introduccion__tip__texto">
					Que te disparen complica un poco las cosas, si acumulas
					<strong>3 disparos o más en una misma ronda</strong> estás fuera.
				</p>
				<dice-component :dice="demo.dice.shot" :class="'dice--small introduccion__tip__icono'"></dice-component>
			</div>
			<button v-if="jugadores" @click="empezarPartida" class="btn btn-danger btn-block">Empezar partida</button>
		</div>
	</section>
</template>

<script>
import { mapState } from "vuex";
export default {
	data() {
		return {
			jugador: "",
			demo: {
				dice: {
					shot: {
						face: "shot",
						dice: { color: "red" }
					},
					footsteps: {
						face: "footsteps",
						dice: { color: "yellow" }
					},
					brain: {
						face: "brain",
						dice: { color: "green" }
					}
				}
			}
		};
	},
	methods: {
		guardarJugador() {
			if (this.jugador == "") {
				this.jugador = "Aaargh";
			}
			this.$store.commit("ssot/guardarJugador", this.jugador);
			this.jugador = "";
		},
		empezarPartida() {
			this.$store.commit("ssot/estadoPartida", true);
			this.$store.commit("ssot/sumarRonda");
		}
	},
	computed: mapState({
		jugadores: state => state.ssot.jugadores.join(", ")
	})
};
</script>

<style lang="scss">
.introduccion {
	padding: 20px 20px 30px;
	// background-color: rgba(100, 100, 100, 0.3);
	// border-radius: 10px 20px;
	&__tip {
		display: block;
		margin-bottom: 1rem;
		&:last-child {
			margin-bottom: 2rem;
		}
	}
}
@media (min-width: 768px) {
	.introduccion {
		&__tip {
			display: flex;
			justify-content: space-between;
			&__icono {
				margin-left: 1rem;
			}
		}
	}
}
</style>
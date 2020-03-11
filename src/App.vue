<template>
	<div id="app" class="container">
		<div class="jumbotron">
			<h1 class="titulo">ZomVue</h1>
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

				<div v-else class="introduccion">
					<p>
						¡ Hola, zombie
						<strong class="partida__jugadores">{{ jugadores }}</strong> !
					</p>
					<p>
						Este juego es muy sencillo, tienes que conseguir comerte
						<strong>13 cerebros</strong> o más.
					</p>
					<p>
						Pero tus presas pueden intentar
						<strong>huir</strong> o
						<strong>dispararte</strong>.
					</p>
					<p>Que intenten huir no es tan malo, les sigues el rastro.</p>
					<p>
						Que te disparen complica un poco las cosas, si acumulas
						<strong>3 disparos en una misma ronda</strong> estás fuera.
					</p>
					<button
						v-if="jugadores"
						@click="empezarPartida"
						class="btn btn-danger btn-block"
					>Empezar partida</button>
				</div>
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
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: white;
	background-color: #111;
}
.titulo {
	position: relative;
	z-index: 1;
	display: inline-block;
	margin-bottom: 40px;
	text-align: center;
	text-shadow: 2px 2px 2px rgb(100, 100, 100);
	&:after {
		position: absolute;
		z-index: -1;
		content: "X";
		font-size: 4rem;
		color: red;
		transform: rotateZ(-15deg) translateX(-0.1rem) translateY(-1.5rem)
			skewX(-40deg);
		text-shadow: 6px 6px 4px rgb(136, 4, 4);
	}
}
.pantalla--inicio {
	width: 500px;
	max-width: 100%;
}
.introduccion {
	padding: 10px 20px 30px;
	background-color: rgba(100, 100, 100, 0.3);
	border-radius: 10px 20px;
}
</style>
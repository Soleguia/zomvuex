<template>
	<div class="jumbotron" :class="'modo--'+modo">
		<aside class="juego__modo">
			<span
				v-if="modo == 'infantil'"
				@click="cambiarModo('zombies')"
				class="juego__modo__interruptor juego__modo__interruptor--zombie"
				title="Modo Zombies"
			></span>
			<span
				v-else
				@click="cambiarModo('infantil')"
				class="juego__modo__interruptor juego__modo__interruptor--infantil"
				title="Modo Infantil"
			></span>
		</aside>

		<h1 class="titulo">
			<span v-if="modo == 'infantil'">Nuece</span>
			<span v-else>ZomVue</span>
		</h1>
		<pantalla-info v-if="info"></pantalla-info>

		<pantalla-historico v-else-if="historico"></pantalla-historico>

		<pantalla-inicio v-else-if="!partida"></pantalla-inicio>

		<pantalla-juego v-else></pantalla-juego>
		<hr />
		<div class="juego__acciones">
			<button class="btn btn-light btn-sm" @click="toggleInfo">
				<span v-if="info">Volver</span>
				<span v-else>Info</span>
			</button>
			<button v-if="partida" class="btn btn-light btn-sm" @click="toggleHistorico">
				<span v-if="historico">Volver</span>
				<span v-else>Historico</span>
			</button>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
export default {
	data() {
		return {
			jugador: "",
			info: false,
			historico: false
		};
	},
	methods: {
		toggleInfo() {
			this.info = !this.info;
			if (this.historico) {
				this.historico = !this.historico;
			}
		},
		toggleHistorico() {
			this.historico = !this.historico;
			if (this.info) {
				this.info = !this.info;
			}
		},
		cambiarModo(modo) {
			this.$store.commit("ssot/cambiarModo", modo);
		}
	},
	computed: mapState({
		modo: state => state.ssot.modo,
		partida: state => state.ssot.partida,
		estado_partida(state) {
			if (state.ssot.partida) {
				return "A jugar!";
			}
			return "No hay partida";
		}
	})
};
</script>

<style lang="scss">
* {
	box-sizing: border-box;
}
body {
	background-color: #111;
}
#app {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 40px 20px;
	height: 100%;
}
.jumbotron {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 1rem 0.5rem;
	width: 500px;
	max-width: 100%;
	color: white;
	background-color: #222;
}
.juego__modo {
	position: fixed;
	top: 10px;
	right: 10px;

	&__interruptor {
		display: block;
		width: 64px;
		height: 64px;
		background-repeat: no-repeat;
		background-size: contain;
		background-position: center center;
		cursor: pointer;

		&--zombie {
			background-image: url(@/assets/img/mano-zombie.png);
		}
		&--infantil {
			background-image: url(@/assets/img/ardilla-base.png);
		}
	}
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
.pantalla--inicio,
.pantalla--juego,
.pantalla--resultado,
.pantalla--info {
	width: 500px;
	max-width: 100%;
}
@media (min-width: 768px) {
	#app {
		padding: 50px;
	}
	.jumbotron {
		padding: 2rem 1.5rem;
	}
	.btn-block + .btn-block {
		margin-top: 0;
	}
}

.modo--infantil {
	&.jumbotron {
		color: #222;
		background-color: rgb(180, 127, 76);

		a {
			&,
			&:visited,
			&:focus {
				color: white;
			}
		}
		.juego__modo {
			&__interruptor {
				color: white;
			}
		}
	}
}
</style>

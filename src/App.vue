<template>
	<div class="jumbotron">
		<h1 class="titulo">ZomVue</h1>
		<pantalla-info v-if="info"></pantalla-info>

		<pantalla-inicio v-else-if="!partida"></pantalla-inicio>

		<pantalla-juego v-else></pantalla-juego>
		<hr />
		<button class="btn btn-light btn-sm" @click="toggleInfo">
			<span v-if="info">Volver</span>
			<span v-else>Info</span>
		</button>
	</div>
</template>

<script>
import { mapState } from "vuex";
export default {
	data() {
		return {
			jugador: "",
			info: false
		};
	},
	methods: {
		toggleInfo() {
			this.info = !this.info;
		}
	},
	computed: mapState({
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
	padding: 20px;
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
</style>

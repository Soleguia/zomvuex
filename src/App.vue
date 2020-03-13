<template>
	<div id="app" class="container">
		<div class="jumbotron">
			<h1 class="titulo">ZomVue</h1>

			<pantalla-inicio v-if="!partida"></pantalla-inicio>

			<pantalla-juego v-else></pantalla-juego>
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
</style>

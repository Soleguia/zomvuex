<template>
	<div class="vue-game-marker">
		<div class="game-marker">
			<ul class="list-unstyled py-0">
				<li class="d-flex justify-content-between px-2 border-bottom border-secondary">
					<span class="mr-4">Partida:</span>
					<span>{{partidaActual}}</span>
				</li>
				<li class="d-flex justify-content-between px-2 border-bottom border-secondary">
					<span class="mr-4">Ronda:</span>
					<span>{{ronda}}</span>
				</li>
				<li class="d-flex justify-content-between px-2 border-bottom border-secondary">
					<span class="mr-4">Cerebros en el saco:</span>
					<span>{{cerebros}}</span>
				</li>
				<li class="d-flex justify-content-between border-bottom border-secondary">
					<span class="mr-4">Cerebros devorados:</span>
					<span>{{totalCerebros}}</span>
				</li>
				<li class="d-flex justify-content-between px-2 border-bottom border-secondary">
					<span class="mr-4">Disparos:</span>
					<span>
						{{disparos}}
						<i
							v-for="(shot, index) in disparos"
							:key="index"
							class="fa fa-yelp mx-1 text-danger"
						></i>
					</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
	computed: {
		partidaActual() {
			return this.$store.getters.partidasJugadas;
		},
		ronda() {
			return this.$store.getters.rondaActual;
		},
		disparos() {
			return this.$store.state.disparos;
		},
		cerebros() {
			return this.$store.state.cerebros;
		},
		totalCerebros() {
			return this.$store.state.totalCerebros;
		}
	}
};
</script>

<style lang="scss" scoped>
</style>

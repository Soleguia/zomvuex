<template>
	<section class="pantalla--info">
		<h3>Historico de tiradas</h3>
		<div class="registro-historico-partidas">
			<div
				v-for="(tirada, tirada_id) in historicoPartida"
				:key="'tirada--'+tirada_id"
				class="historico-partida"
			>
				<h4
					v-if="!mismaPartida(tirada.partida)"
					class="historico-partida__titulo-partida"
				>Partida: {{tirada.partida}}</h4>
				<h5
					v-if="!mismaRonda(tirada.ronda)"
					class="historico-partida__titulo-ronda"
				>Ronda: {{tirada.ronda}}</h5>

				<div class="historico-partida__tirada">
					<span class="historico-partida__tirada__titulo">Tirada:</span>
					<ul class="historico-partida__tirada__dados">
						<li
							v-for="(dado, dado_id) in tirada.tirada"
							:key="'historico-partida--'+partida+'__ronda--'+ronda+'__tirada--'+tirada_id+'__dado--'+dado_id"
						>
							<dice-component :dice="dado" :class="'dice--small'"></dice-component>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	data() {
		return {
			partida: false,
			ronda: false
		};
	},
	methods: {
		mismaPartida(partida) {
			if (partida == this.partida) {
				return true;
			} else {
				this.partida = partida;
				this.ronda = false;
				return false;
			}
		},
		mismaRonda(ronda) {
			if (ronda == this.ronda) {
				return true;
			} else {
				this.ronda = ronda;
				return false;
			}
		},
		getFromHistory(data) {
			return this.$store.getters["history/" + data];
		}
	},
	computed: {
		historicoPartida() {
			return this.getFromHistory("historicoPartida");
			// return this.$store.getters["ssot/partidasJugadas"];
		}
	}
};
</script>

<style lang="scss">
.registro-historico-partidas {
	height: 100%;
	max-height: 40vh;
	overflow-y: auto;
}
.historico-partida {
	padding-bottom: 20px;
	border-right: 1px solid white;
	border-left: 1px solid white;
}
.historico-partida__titulo-partida {
	margin: 0;
	padding: 6px 10px;
	color: #333;
	text-align: center;
	background-color: white;
}
.historico-partida__titulo-ronda {
	padding: 6px 10px 6px 20px;
	padding-left: 20px;
	border-top: 1px solid white;
	border-bottom: 1px solid white;
}
.historico-partida__tirada {
	display: flex;
	align-items: center;
	padding-left: 40px;

	&__dados {
		display: flex;
		margin: 0;
		margin-left: 10px;
		padding: 0;
		list-style: none;
	}
}
</style>

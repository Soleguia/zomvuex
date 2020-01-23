<template>
	<div class="vue-dice-counter">
		<div class="dice-counter">
			<ul class="list-unstyled mb-3">
				<li
					v-for="(dice, index) in dados"
					:key="dice.color+'-'+index"
					class="d-flex justify-content-between px-2 border-bottom border-secondary"
				>
					<span class="mr-2">{{ dice.color | colorDados | capitalize }}:</span>
					<span>{{dice.disponibles}}</span>
				</li>
				<li class="d-flex justify-content-between px-2 border-bottom border-secondary">
					<span class="mr-4">Total dados:</span>
					<span>{{totalDados}}</span>
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
		totalDados() {
			return this.$store.state.totalDados;
		},
		dados() {
			return this.$store.state.dados;
		}
	}
};
</script>

<style lang="scss" scoped>
</style>

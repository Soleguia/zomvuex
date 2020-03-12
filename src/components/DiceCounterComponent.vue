<template>
	<div class="dice-counter">
		<ul class="list-unstyled list-group list-group-horizontal mb-3">
			<li
				v-for="(dice, index) in dados"
				:key="dice.color+'-'+index"
				class="dice-flag"
				:class="'dice-flag--'+dice.color"
			>
				<!-- <span class="mr-2">{{ dice.color | colorDados | capitalize }}:</span> -->
				<span>{{dice.disponibles}}</span>
			</li>
			<li class="dice-flag dice-flag--total">
				<span>{{totalDados}}</span>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
	computed: {
		totalDados() {
			return this.$store.state.ssot.totalDados;
		},
		dados() {
			return this.$store.state.ssot.dados;
		}
	}
};
</script>

<style lang="scss" scoped>
.dice-counter {
	display: flex;
	justify-content: flex-end;
	margin-top: 10px;
}
.dice-flag {
	display: flex;
	align-items: center;
	padding: 10px;
	&:before {
		display: block;
		margin-right: 6px;
		width: 16px;
		height: 16px;
		content: "";
		border-radius: 4px;
	}
	&--total:before {
		margin-left: 40px;
		background-color: red;
		box-shadow: -18px 0 0 0 green, -8px -18px 0 0 yellow;
		// background-image: linear-gradient(to bottom, red, yellow, green);
	}
	&--red:before {
		background-color: red;
	}
	&--yellow:before {
		background-color: yellow;
	}
	&--green:before {
		background-color: green;
	}
}
</style>

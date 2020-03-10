<template>
	<div class="vue-dice">
		<div
			class="dice"
			:class="'dice_face--'+dice.face+' dice_color--'+dice.dice.color"
			:title="dice.face"
		></div>
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
	props: ["dice"]
};
</script>

<style lang="scss">
.dice {
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 10px;
	width: 100px;
	height: 100px;
	text-align: center;
}

.dice_face {
	&--zombie,
	&--brain,
	&--footsteps,
	&--shot {
		font-family: "FontAwesome";
		font-size: 50px;
		color: white;
		&:before {
			display: block;
			width: 100%;
			height: 100%;
			content: "";
			background-repeat: no-repeat;
			background-size: contain;
			background-position: center center;
		}
	}
}
.dice_face {
	&--zombie {
		&:before {
			// content: "\f119";
			background-image: url(../assets/img/zombie-rise.png);
		}
	}
	&--brain {
		&:before {
			// content: "\f004";
			background-image: url(../assets/img/brain.png);
		}
	}
	&--footsteps {
		&:before {
			//content: "\f1b0";
			background-image: url(../assets/img/footsteps.png);
		}
	}
	&--shot {
		&:before {
			// content: "\f1e9";
			background-image: url(../assets/img/shot.png);
		}
	}
}
.dice_color {
	&--grey {
		background-color: grey;
	}
	&--red {
		background-color: red;
	}
	&--yellow {
		background-color: gold;
	}
	&--green {
		background-color: green;
	}
}
</style>

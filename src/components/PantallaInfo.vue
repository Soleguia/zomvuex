<template>
	<section class="pantalla--info">
		<p>
			<strong>ZomVuex</strong> es un ejercicio personal para aprender y practicar programación con Vue y Vuex.
		</p>
		<p>
			Esta basado en el juego de mesa
			<a
				href="http://www.sjgames.com/dice/zombiedice/"
				target="_blank"
				rel="noopener"
			>Zombie Dice, de Steve Jackson Games</a>.
		</p>
		<p>
			Aquí,
			<a href="https://twitter.com/andresPSN" target="_blank" rel="noopener">@andresPSN</a> explica cómo se juega y cómo él adapta la temática para jugar con peques:
		</p>
		<figure class="video">
			<iframe
				width="500"
				height="300"
				src="https://www.youtube.com/embed/KekAQ6VHkhk"
				frameborder="0"
				allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
			></iframe>
		</figure>
	</section>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {}
};
</script>

<style lang="scss">
.video {
	iframe {
		max-width: 100%;
	}
}
</style>
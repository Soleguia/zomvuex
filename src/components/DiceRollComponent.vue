<template>
    <div class="vue-dice-roll">
        <div class="dice-roll">
            <dice-component v-for="(dice, index) in diceRoll" :dice="dice" :key="index"></dice-component>
        </div>
    </div>
</template>

<script>
import DiceComponent from "./DiceComponent.vue";

export default {
    components: {
        DiceComponent
    },
    props: ["diceRoll"]
};
</script>

<style lang="scss" scoped>
.dice-roll {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    &__title {
        width: 100%;
    }
}
</style>

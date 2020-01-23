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

<style lang="scss" scoped>
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
    }
}
.dice_face {
    &--shot {
        &:before {
            content: "\f119";
        }
    }
    &--brain {
        &:before {
            content: "\f004";
        }
    }
    &--footsteps {
        &:before {
            content: "\f1b0";
        }
    }
    &--shot {
        &:before {
            content: "\f1e9";
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

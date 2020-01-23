<template>
    <div class="zombie-dice">
        <div v-if="!gameover && !win">
            <hr />
            <div class>
                <ul class="d-flex justify-content-center list-unstyled py-3">
                    <li
                        v-for="(dice, index) in dices"
                        :key="dice.color+'-'+index"
                        class="d-flex justify-content-between px-2 mx-3 border-bottom border-secondary"
                    >
                        <span class="mr-2">{{ dice.color | colorDados | capitalize }}:</span>
                        <span>{{dice.count}}</span>
                    </li>
                    <li class="d-flex justify-content-between border-bottom border-secondary">
                        <span class="mr-4">Total dados:</span>
                        <span>{{totalDices}}</span>
                    </li>
                </ul>
                <ul class="d-flex justify-content-between list-unstyled py-0 px-3">
                    <li class="d-flex justify-content-between border-bottom border-secondary">
                        <span class="mr-4">Cerebros en el saco:</span>
                        <span>{{brains}}</span>
                    </li>
                    <li
                        v-if="scoredBrains > 0"
                        class="d-flex justify-content-between border-bottom border-secondary"
                    >
                        <span class="mr-4">Cerebros devorados:</span>
                        <span>{{scoredBrains}}</span>
                    </li>
                    <li class="d-flex justify-content-between border-bottom border-secondary">
                        <span class="mr-4">Disparos:</span>
                        <span>
                            {{shots}}
                            <i
                                v-for="(shot, index) in shots"
                                :key="index"
                                class="fa fa-yelp mx-1 text-danger"
                            ></i>
                        </span>
                    </li>
                </ul>
            </div>
            <hr />
            <dice-roll :diceRoll="reroll" v-model="reroll"></dice-roll>
            <div class="d-flex justify-content-center mt-4 dice-roll__actions">
                <button
                    v-if="totalDices > 2"
                    class="btn btn-primary dice-roll__reroll"
                    @click="reRoll()"
                >Tirar dados</button>
                <button
                    v-if="totalDices < 13 && totalDices > 0"
                    class="btn btn-success ml-2 dice-roll__stand"
                    @click="stand()"
                >Plantarse</button>
            </div>
        </div>
        <div v-else-if="gameover" class="d-flex flex-column align-items-center">
            <h2>
                <i
                    class="fa fa-meh-o fa-4x spin-90 mb-4 text-danger"
                    style="transform:rotateZ(750deg);"
                ></i>
            </h2>
            <h3 class="text-center">
                Has recibido {{shots}} disparos.
                <br />
                <i
                    v-for="(shot, index) in shots"
                    :key="index"
                    class="fa fa-yelp fa-2x m-4 text-danger"
                ></i>
                <br />Los humanos han acabado contigo.
            </h3>
            <div class="d-flex justify-content-center mt-4 dice-roll__actions">
                <button class="btn btn-warning dice-roll__reroll" @click="reStart()">Siguiente turno</button>
            </div>
        </div>
        <div v-else-if="win" class="d-flex flex-column align-items-center">
            <h2>
                <i
                    class="fa fa-meh-o fa-4x spin-90 mb-4 text-danger"
                    style="transform:rotateZ(750deg);"
                ></i>
            </h2>
            <h3 class="text-center">
                Te has comido {{scoredBrains}} cerebros.
                <br />
                <i
                    v-for="(brain, index) in scoredBrains"
                    :key="index"
                    class="fa fa-heart fa-2x m-4 text-success"
                ></i>
                <br />Has acabado con los humanos.
            </h3>
            <div class="d-flex justify-content-center mt-4 dice-roll__actions">
                <button
                    class="btn btn-success dice-roll__reroll"
                    @click="resetData()"
                >¿Otra partida?</button>
            </div>
        </div>
    </div>
</template>

<script>
import DiceRoll from "./DiceRollComponent.vue";

export default {
    components: {
        DiceRoll
    },
    data() {
        return {
            shots: 0,
            brains: 0,
            totalDices: 13,
            scoredBrains: 0,
            reroll: [
                {
                    dice: { color: "grey" },
                    face: "zombie"
                },
                {
                    dice: { color: "grey" },
                    face: "zombie"
                },
                {
                    dice: { color: "grey" },
                    face: "zombie"
                }
            ],
            dices: [
                {
                    color: "red",
                    count: 3,
                    faces: {
                        1: "brain",
                        2: "footsteps",
                        3: "footsteps",
                        4: "shot",
                        5: "shot",
                        6: "shot"
                    }
                },
                {
                    color: "yellow",
                    count: 4,
                    faces: {
                        1: "brain",
                        2: "brain",
                        3: "footsteps",
                        4: "footsteps",
                        5: "shot",
                        6: "shot"
                    }
                },
                {
                    color: "green",
                    count: 6,
                    faces: {
                        1: "brain",
                        2: "brain",
                        3: "brain",
                        4: "shot",
                        5: "footsteps",
                        6: "shot"
                    }
                }
            ],
            footstepsDices: [],
            gameover: false,
            win: false
        };
    },
    methods: {
        reRoll() {
            this.reroll = this.diceRoll();
            this.updateDicesCount(this.reroll);
        },
        updateDicesCount(roll) {
            for (let p = 0; p < roll.length; p++) {
                if (roll[p].face != "footsteps" && roll[p].dice.count > 0) {
                    roll[p].dice.count--;
                }
                this.scores(roll[p]);
            }
            this.checkBrainsScore();
            this.totalDicesCount();
            this.checkShots();
        },
        checkShots() {
            if (this.shots >= 3) {
                this.gameover = true;
            }
        },
        checkBrainsScore() {
            if (
                this.scoredBrains == 13 ||
                this.scoredBrains + this.brains == 13
            ) {
                this.scoredBrains += this.brains;
                this.win = true;
            }
        },
        // te plantas, los cerebros se acumulan y se resetea
        stand() {
            let score = this.scoredBrains + this.brains;
            this.resetData();
            this.scoredBrains = score;
        },
        reStart() {
            this.gameover = false;
            this.nextTurn();
        },
        nextTurn() {
            let score = this.scoredBrains;
            this.resetData();
            this.scoredBrains = score;
        },
        totalDicesCount() {
            let dices = this.dices;
            let totalDices = 0;
            for (let d = 0; d < dices.length; d++) {
                totalDices += dices[d].count;
            }
            this.totalDices = totalDices;
        },
        scores(dice) {
            if (dice.face == "brain") {
                this.brains++;
            }
            if (dice.face == "shot") {
                this.shots++;
            }
        },
        // la tirada
        diceRoll() {
            let diceRoll = [];
            let pool = this.dicePool();
            for (let p = 0; p < pool.length; p++) {
                let dice = pool[p];
                let face = this.diceFace(dice);
                diceRoll.push({
                    dice: dice,
                    face: face
                });
                if (face == "footsteps") {
                    this.footstepsDices.push(dice);
                }
            }
            return diceRoll;
        },
        // los 3 dados que sacas
        dicePool() {
            let dicePool = [];
            let newDices = 3;
            let repeatDices = this.footstepsDices.length;
            let newPool = newDices - repeatDices;
            for (let f = 0; f < repeatDices; f++) {
                dicePool.push(this.footstepsDices[f]);
            }
            this.footstepsDices = [];
            for (let i = 0; i < newPool; i++) {
                let dice = this.takeAvailableDice();
                while (dice.count < 1) {
                    dice = this.takeAvailableDice();
                    i--;
                }
                dicePool.push(dice);
            }
            return dicePool;
        },
        // la cara del dado
        diceFace(dice) {
            let pos = this.getRndInteger(1, 7);
            let face = dice.faces[pos];
            return face;
        },
        // sacar 1 dado
        takeAvailableDice() {
            let dice = this.takeDice();
            while (dice.count < 1) {
                dice = this.takeDice();
            }
            return dice;
        },
        takeDice() {
            let pos = this.getRndInteger(0, 3);
            return this.dices[pos];
        },
        resetData() {
            Object.assign(this.$data, this.$options.data.call(this));
        },
        // aleatorio
        getRndInteger(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }
    }
};
</script>
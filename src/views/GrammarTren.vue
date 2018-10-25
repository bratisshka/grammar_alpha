<template>
    <div>
        <div class="row">
            <div class="col-lg-8">
                <grammar-component :examples="cards_data[current_card]" :card="current_card"
                                   :control_type="control_type" @changed_type="changeType"></grammar-component>
            </div>
        </div>
        <div class="row mt-5">
            <div class="col-lg-8">
                <div class="card mb-2" :class="{active: current_card==='card4'}">
                    <div class="gt-card-body" @click="current_card='card4'">
                        <div class="row">
                            <div class="col-9">
                                <div class="card-text">
                                    <span class="gt-card-title"> Карточка 4. Местоимения</span>
                                </div>
                            </div>
                            <div class="col-3">
                                16
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card" :class="{active: current_card==='card8'}">
                    <div class="gt-card-body" @click="current_card='card8'">
                        <div class="row">
                            <div class="col-9">
                                <div class="card-text">
                                    <span class="gt-card-title"> Карточка 8. Комбинирование</span>
                                </div>
                            </div>
                            <div class="col-3">
                                26
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import GrammarComponent from '../components/GrammarComponent.vue';
    import card4 from '../assets/card4/info.json';
    import card8 from '../assets/card8/info.json';

    export default {
        name: 'home',
        props: ['cards'],
        data() {
            return {
                cards_data: {},
                current_card: 'card4',
                control_type: 'simulator'
            }
        },
        methods: {
            changeType(type) {
                this.control_type = type;
            }

        },
        components: {
            GrammarComponent
        },
        created() {
            this.cards_data = {
                "card4": card4,
                "card8": card8
            };
        }
    }
</script>
<style scoped>
    .active {
        background-color: #d1dde9;;
    }

    .gt-card-body {
        margin: 15px;
        cursor: pointer;
    }

    .gt-card-title {
        font-size: 16px;
    }

    .gt-img {
        max-height: 100px;
        cursor: pointer;
    }

    p {
        margin-bottom: 0;
    }
</style>

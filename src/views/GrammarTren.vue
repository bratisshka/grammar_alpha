<template>
    <div>
        <div class="row">
            <div class="col-lg-8">
                <grammar-component :examples="cards_data[current_card]" :card="current_card"
                                   :meta="meta_data[current_card]"></grammar-component>
            </div>
        </div>
        <div class="row mt-5">
            <div class="col-lg-8">
                <div class="card mb-2" :class="{active: current_card==='card4'}">
                    <div class="gt-card-body" @click="current_card='card4'">
                        <div class="row">
                            <div class="col-sm-6 mb-2 mb-sm-0 col-xl-8">
                                <div class="card-text">
                                    <span class="gt-card-title">Урок 1. Карточка 4. Местоимения</span>
                                </div>
                            </div>
                            <div class="col-6 col-sm-3 col-xl-2">
                                <div class="d-flex align-items-center">
                                    <img src="https://cdn0.iconfinder.com/data/icons/everyday-objects-line-art-1/128/stopwatch-512.png"
                                         class="stats-img mr-2">
                                    <div>10 MIN</div>
                                </div>
                            </div>
                            <div class="col-6 col-sm-3 col-xl-2">
                                <div class="d-flex align-items-center mr-2">
                                    <img src="https://cdn2.iconfinder.com/data/icons/simple-medical/256/Dr._Slip-512.png"
                                         class="stats-img mr-2">
                                    <div>16</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card" :class="{active: current_card==='card8'}">
                    <div class="gt-card-body" @click="current_card='card8'">
                        <div class="row">
                            <div class="col-sm-6 mb-2 mb-sm-0 col-xl-8">
                                <div class="card-text">
                                    <span class="gt-card-title">Урок 1. Карточка 8. Комбинирование</span>
                                </div>
                            </div>
                             <div class="col-6 col-sm-3 col-xl-2">
                                <div class="d-flex align-items-center">
                                    <img src="https://cdn0.iconfinder.com/data/icons/everyday-objects-line-art-1/128/stopwatch-512.png"
                                         class="stats-img mr-2">
                                    <div>24 MIN</div>
                                </div>
                            </div>
                            <div class="col-6 col-sm-3 col-xl-2">
                                <div class="d-flex align-items-center mr-2">
                                    <img src="https://cdn2.iconfinder.com/data/icons/simple-medical/256/Dr._Slip-512.png"
                                         class="stats-img mr-2">
                                    <div>42</div>
                                </div>
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
                control_type: 'simulator',
                meta_data: {
                    card4: {
                        lesson_number: 1,
                        card_number: 4,
                        card_name: "Местоимения"
                    },
                    card8: {
                        lesson_number: 1,
                        card_number: 8,
                        card_name: "Комбинирование"
                    }
                }
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

    .stats-img {
        height: 30px;
    }
</style>

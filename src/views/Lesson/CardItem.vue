<template>
    <div class="row mt1">
        <div class="col-md-12">
            <div class="card">
                <div class="card-body">
                    <content-viewer :blocks="cards_data[$route.params.number-1]"></content-viewer>
                    <div v-if="lesson.cards[$route.params.number-1].has_practice">
                        <examples-trainer
                                :examples="examples[lesson.cards[$route.params.number-1].number]"
                                :number="lesson.cards[$route.params.number-1].number"></examples-trainer>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Carousel, Slide} from 'vue-carousel';
    import ContentViewer from '../components/ContentViewer.vue';
    import ExamplesTrainer from '../components/ExamplesTrainer.vue';
    import cards_data from '../assets/cards_content';
    import card4_examples from '../assets/card4/info.json';
    import card8_examples from '../assets/card8/info.json';

    export default {
        name: "card-item",
        components: {
            Carousel,
            Slide,
            ContentViewer,
            ExamplesTrainer
        },
        data() {
            return {
                lesson: {
                    "number": 1,
                    "name": "Английский за 1 урок",
                    "description": '<div><p><strong style=\"background-color: transparent;\">ЦЕЛИ: </strong></p><ol><li><span style=\"background-color: transparent;\">Что такое соединительные элементы.</span></li><li><span style=\"background-color: transparent;\">Основной смысл предлогов of, to, with.</span></li></ol></div>',
                    "image": "https://alred-static.s3.amazonaws.com/media/public/media/Screen_Shot_2018-09-28_at_00.31.32.png",
                    "time": "26",
                    "card_count": 8,
                    "tren_count": 115,
                    "cards": [
                        {
                            "number": 1,
                            "has_practice": false,
                            "type": "common",
                        },
                        {
                            "number": 2,
                            "has_practice": false,
                            "type": "common",
                        },
                        {
                            "number": 3,
                            "has_practice": false,
                            "type": "common",
                        },
                        {
                            "number": 4,
                            "has_practice": true,
                            "type": "common",
                        },
                        {
                            "number": 5,
                            "has_practice": false,
                            "type": "common",
                        },
                        {
                            "number": 6,
                            "has_practice": false,
                            "type": "common",
                        },
                        {
                            "number": 7,
                            "has_practice": false,
                            "type": "common",
                        },
                        {
                            "number": 8,
                            "has_practice": true,
                            "type": "common",
                        }
                    ],
                    "cards_data": [],
                },
                examples: {},
                active_card_number: 0
            }
        },
        methods: {
            cardObject(card) {
                if (card.number === parseInt(this.$route.params.number)) {
                    return card.type + "_active";
                }
                else {
                    return card.type
                }
            }
        },
        created() {
            this.cards_data = cards_data;
            this.examples['4'] = card4_examples;
            this.examples['8'] = card8_examples;
            this.active_card_number = this.$route.params.number
        }
    }
</script>

<style scoped>
    .gr-card {
        border: 1px solid gray;
        padding: 10px 5px;
        text-align: center;
        border-radius: .25rem;

        text-transform: uppercase;
        font-size: 0.85rem;
    }

    .common {
        background-color: lightgreen;
    }

    .common_active {
        background-color: mediumseagreen;
    }

    .visual {
        background-color: yellow;
    }

    .visual_active {
        background-color: gold;
    }

    .audio {
        background-color: deepskyblue;
    }

    .audio_active {
        background-color: cornflowerblue;
    }

    a {
        color: black;
    }
</style>
<template>
    <div>
        <div class="row my-2">
            <div class="col-md-6 mb-2">
                <div class="lesson-header bg-black"><b>Урок 1.</b> Основы</div>
            </div>
            <div class="col-md-6 d-flex align-items-center justify-content-around">
                <div class="mr-3 d-flex align-items-center">
                    <img class="stats-icon mr-2"
                         src="https://cdn0.iconfinder.com/data/icons/everyday-objects-line-art-1/128/stopwatch-512.png">
                    <span class="stats-text">26 min</span>
                </div>
                <div class="d-flex align-items-center">
                    <img class="stats-icon mr-2"
                         src="https://cdn2.iconfinder.com/data/icons/simple-medical/256/Dr._Slip-512.png">
                    <span class="stats-text">8 cards</span>
                </div>
            </div>
        </div>
        <div class="app">
            <div class="row">
                <step-progress :steps="steps" :current-step="currentStep" icon-class="fa fa-check"></step-progress>
            </div>
            <div class="buttons">
                <button @click="currentStep--"><</button>
                <button @click="currentStep++">></button>
            </div>
        </div>
        <router-view></router-view>
        <!--<div class="row mb-5">-->
            <!--<div class="col-md-12">-->
                <!--<div class="card">-->
                    <!--<div class="card-body">-->
                        <!--<content-viewer :blocks="lesson_content"></content-viewer>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->

        <router-link :to="{name: 'card', params: {id: 1, number: 1}}">
            <div class="card">
                <div class="card-body">
                    <div class="text-right">Приступить</div>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
    import lesson_content from "../../assets/lesson_content"
    import ContentViewer from "../../components/ContentViewer";
    import StepProgress from "../../components/StepProgress"

    export default {
        name: "lesson-item",
        components: {
            ContentViewer,
            Carousel,
            Slide,
            StepProgress
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
                lesson_content: [],
                steps: [
                    'Введение',
                    '1',
                    '2',
                    '3',
                    '4',
                    '5',
                    '6',
                    '7',
                    '8',
                    'Visual',
                    'Audio'
                ],
                currentStep: 0
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
            this.lesson_content = lesson_content;
        }
    }
</script>

<style scoped>
    .stats-icon {
        width: 3.5vw;
        max-width: 40px;
    }

    .stats-text {
        text-transform: uppercase;
        /*padding-left: 1vw;*/
        font-size: 1rem;
    }

    .lesson-info {
        color: #0D2D44
    }

    .btn-go {
        background-color: #0D2D44;
        color: white;
    }

    .btn-go:hover {
        background-color: #1f6da5;
    }

    .gr-lesson-content > > > p {
        color: #D10000;
        margin-bottom: 0;
    }

    .gr-lesson-content > > > ol {
        padding-left: 1rem;
        margin-bottom: 0;
    }

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
</style>
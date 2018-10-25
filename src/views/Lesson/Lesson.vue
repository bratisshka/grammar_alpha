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
        </div>
        <div class="row mb-5 mt-1">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-body">
                        <router-view></router-view>
                        <div class="d-flex justify-content-end" v-if="steps[currentStep].router.name!=='simulator' && currentStep < steps.length - 1 ">
                            <router-link :to="steps[currentStep+1].router">
                                <div class="btn btn-success mr-2">Далее</div>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import ContentViewer from "../../components/ContentViewer";
    import StepProgress from "../../components/StepProgress"

    export default {
        name: "lesson-item",
        components: {
            ContentViewer,
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
                    {
                        name: 'Введение',
                        router: {name: 'lesson_intro', params: {id: 1}}
                    },
                    {
                        name: '1',
                        router: {name: 'card', params: {id: 1, number: 1}}
                    },
                    {
                        name: '2',
                        router: {name: 'card', params: {id: 1, number: 2}}
                    },
                    {
                        name: '3',
                        router: {name: 'card', params: {id: 1, number: 3}}
                    },
                    {
                        name: '4',
                        router: {name: 'card', params: {id: 1, number: 4}}
                    },
                    {
                        name: '5',
                        router: {name: 'card', params: {id: 1, number: 5}}
                    },
                    {
                        name: '6',
                        router: {name: 'card', params: {id: 1, number: 6}}
                    },
                    {
                        name: '7',
                        router: {name: 'card', params: {id: 1, number: 7}}
                    },
                    {
                        name: '8',
                        router: {name: 'card', params: {id: 1, number: 8}}
                    },
                    {
                        name: 'Visual',
                        router: {name: 'simulator', params: {id: 1, type: 'visual'}}
                    },
                    {
                        name: 'Audio',
                        router: {name: 'simulator', params: {id: 1, type: 'audio'}}
                    },
                ],
                currentStep: 0
            }
        },
        methods: {
            installStep() {
                let $app = this;
                this.currentStep = this.steps.findIndex(obj => {
                    // всю эту хуйню я делал для приведения всего к строке, чтобы и параметры и роутер были одного типа
                    let new_obj = {};
                    for (let k in obj.router.params) {
                        if (obj.router.params.hasOwnProperty(k)) {
                            new_obj[k] = String(obj.router.params[k]);
                        }
                    }
                    let route_params_str = {};
                    for (let k in $app.$route.params) {
                        if ($app.$route.params.hasOwnProperty(k)) {
                            route_params_str[k] = String($app.$route.params[k]);
                        }
                    }
                    return JSON.stringify({
                        name: obj.router.name,
                        params: new_obj
                    }) === JSON.stringify({
                        name: $app.$route.name,
                        params: route_params_str
                    })
                })
            }
        },
        watch: {
            '$route'(to, from) {
                this.installStep();
            }
        },
        mounted() {
            this.installStep();
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

    @media (max-width: 576px) {
        .card, .card-body {
            padding-left: 0;
            padding-right: 0;
            font-size: 16px;
            line-height: 22px;
        }
    }
</style>
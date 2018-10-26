<template>
    <div>
        <div class="row mb-3">
            <div class="col-sm-6 mb-2 mb-sm-0">
                <div class="d-flex justify-content-center">
                    <div class="gr-btn mr-2 img-btn" :class="{'gr-active': control_type==='simulator'}"
                         @click="control_type='simulator'">
                        <div class="img-wrapper img-fluid">
                            <img src="@/assets/icons/document.png" class="img-fluid">
                        </div>
                    </div>
                    <div class="gr-btn img-btn" :class="{'gr-active': control_type==='player'}"
                         @click="control_type='player'">
                        <div class="img-wrapper img-fluid">
                            <img src="@/assets/icons/speaker.png" class="img-fluid">
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="d-flex justify-content-center">
                    <div v-if="order==='enru'">
                        <div class="gr-btn gr-active mr-2 no-select">EN-RU</div>
                        <div class="gr-btn no-select" @click="order='ruen'; step=['ru', 'en']">RU-EN</div>
                    </div>
                    <div v-if="order==='ruen'">
                        <div class="gr-btn mr-2 no-select" @click="order='enru'; step=['en', 'ru']">EN-RU</div>
                        <div class="gr-btn gr-active no-select">RU-EN</div>
                    </div>
                </div>
            </div>
        </div>


        <!--статистка-->
        <div class="row">
            <div class="col-md-9">
                <span class="grammar-header">Урок {{meta.lesson_number}}. Карточка {{meta.card_number}}. {{meta.card_name}}</span>
            </div>
            <div class="col-md-3">
                <h3 class="text-right">{{current_index+1}}/{{example_list.length}}</h3>
            </div>
        </div>


        <!--картинка-->
        <div class="mb-1 sentence-img">
            <div class="img-wrapper">
                <img :src="image_url(example_list[current_index].image)" class="img-fluid gt-img d-block mx-auto">
            </div>
        </div>


        <!--предложения-->
        <div class="card mb-1" style="height: 75px">
            <div class="d-flex h100 gr-card-body">
                <div class="d-flex align-items-center h100 mr-2">
                    <i class="material-icons" @click="playAudio(example_list[current_index].id, step[0])">
                        volume_up
                    </i>
                </div>
                <div class="d-flex align-items-center justify-content-center h100 flex-grow-1">
                    {{example_list[current_index][step[0]]}}
                </div>
            </div>
        </div>
        <div class="card mb-1" style="height: 75px">
            <div class="d-flex h100 gr-card-body" v-if="step_index === 1">
                <div class="d-flex align-items-center h100 mr-2">
                    <i class="material-icons" @click="playAudio(example_list[current_index].id, step[1])">
                        volume_up
                    </i>
                </div>
                <div class="d-flex align-items-center justify-content-center h100 flex-grow-1">
                    {{example_list[current_index][step[1]]}}
                </div>
            </div>
        </div>


        <!--стрелки-->
        <div class="row">
            <div class="col-3">
                <div class="img-row d-flex justify-content-center" @click="prevSentence()">
                    <div class="img-wrapper">
                        <img src="@/assets/icons/left.png" class="img-fluid">
                    </div>
                </div>
            </div>
            <div class="col-6">
                <div class="btn btn-success btn-block" @click="nextStep()" v-if="control_type==='simulator'">
                    Далее
                </div>
                <div class="btn btn-outline-success btn-block" v-else @click="autoSentencePlay">
                    <span v-if="is_playing">Pause</span>
                    <span v-else>Play</span>
                </div>
            </div>
            <div class="col-3">
                <div class="img-row d-flex justify-content-center" @click="nextSentence()">
                   <div class="img-wrapper">
                        <img src="@/assets/icons/right.png" class="img-fluid">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "grammar-component",
        props: ['examples', 'card', 'meta'],
        data() {
            return {
                base_url: process.env.BASE_URL,
                example_list: [{
                    ru: "Предложение на русском",
                    en: "Предложение на английском",
                    image: "image1.jpg"
                }],
                order: "enru",
                current_index: 0,
                step: ['en', 'ru'],
                step_index: -1,
                is_playing: false,
                snd: "",
                control_type: 'simulator'
            }
        },
        methods: {
            autoSentencePlay() {
                if (!this.is_playing) {
                    this.is_playing = true;
                    if (this.snd) {
                        let $app = this;
                        $app.snd.onended = function () {
                            if ($app.control_type === 'player' && $app.is_playing) {
                                $app.nextStep();
                            }
                        };
                        this.snd.play();
                    }
                    else {
                        this.nextStep();
                    }

                } else {
                    if (this.snd)
                        this.snd.pause();
                    this.is_playing = false;
                }
            },
            nextStep() {
                if (this.step_index < 1) {
                    this.step_index++;
                    this.playAudio(this.example_list[this.current_index].id, this.step[this.step_index]);
                } else {
                    if (this.current_index < this.example_list.length - 1) {
                        this.nextSentence();
                    }
                }
            },
            nextSentence() {
                if (this.current_index < this.example_list.length - 1) {
                    this.step_index = 0;
                    this.current_index++;
                    this.playAudio(this.example_list[this.current_index].id, this.step[this.step_index]);
                }
            },
            prevSentence() {
                if (this.current_index > 0) {
                    this.step_index = 0;
                    this.current_index--;
                    this.playAudio(this.example_list[this.current_index].id, this.step[this.step_index]);
                }
            },
            shuffle(a) {
                for (let i = a.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [a[i], a[j]] = [a[j], a[i]];
                }
                return a;
            },
            generateExampleList() {
                while (this.example_list.length > 0)
                    this.example_list.pop();
                for (let image in this.examples) {
                    if (this.examples.hasOwnProperty(image))
                        for (let id in this.examples[image]) {
                            if (this.examples[image].hasOwnProperty(id))
                                this.example_list.push({
                                    "image": image,
                                    "id": id,
                                    "ru": this.examples[image][id].ru,
                                    "en": this.examples[image][id].en,
                                })
                        }
                }
                this.example_list = this.shuffle(this.example_list);
            },
            playAudio(id, lang) {
                let source = this.base_url + this.card + '/' + lang + '/' + id + '.mp3';
                if (this.snd)
                    this.snd.pause();
                this.snd = new Audio(source);
                let $app = this;
                $app.snd.onended = function () {
                    if ($app.control_type === 'player' && $app.is_playing) {
                        $app.nextStep();
                    }
                };
                this.snd.play();

            },
            image_url(image_name) {
                return this.base_url + 'AAM_PIC/' + image_name;
            },
        },
        watch: {
            examples() {
                this.current_index = 0;
                this.step_index = -1;
                this.is_playing = false;
                this.generateExampleList();
            }
        },
        created() {
            this.generateExampleList()
        }
    }
</script>

<style scoped>
    .material-icons {
        cursor: pointer;
    }

    .grammar-header {
        font-size: 25px;
    }

    .gr-btn {
        cursor: pointer;
        border: 1px solid #0D2D44;
        text-align: center;
        color: #0D2D44;
        padding: 5px 15px;
        border-radius: 5px;
        display: inline-block;
        height: 36px;
    }

    .img-btn {
        padding: 5px 30px !important;
    }

    .img-btn .img-fluid {
        height: 100%;
    }

    .gr-btn:hover {
        background-color: #D1DDE9;
    }

    .gr-active {
        background-color: #D1DDE9;
    }

    .img-wrapper {
        height: 100%;
    }

    .img-row {
        height: 38px;
        cursor: pointer;
    }

    .img-row .img-fluid {
        height: 100%;
    }

    .sentence-img {
        height: 75px;
        border: none;
    }

    .h100 {
        height: 100%;
    }

    .gr-card-body {
        padding: 10px;
    }
</style>
<template>
    <div>
        <div class="row">
            <div class="col-sm-6">
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" v-model="control_type"
                           value="simulator">
                    <label class="form-check-label" for="inlineRadio1">Тренажер</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" v-model="control_type"
                           value="player">
                    <label class="form-check-label" for="inlineRadio2">Плеер</label>
                </div>
            </div>
            <div class="col-sm-6">
                <div v-if="order==='enru'">
                    <div class="btn btn-success mr-2">EN-RU</div>
                    <div class="btn btn-outline-success" @click="order='ruen'; step=['ru', 'en']">RU-EN</div>
                </div>
                <div v-if="order==='ruen'">
                    <div class="btn btn-outline-success mr-2" @click="order='enru'; step=['en', 'ru']">EN-RU</div>
                    <div class="btn btn-success">RU-EN</div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-5">
                <h3 class="right-text">Пример {{current_index+1}} из {{example_list.length}}</h3>
            </div>
        </div>
        <div class="card mb-1">
            <img :src="image_url(example_list[current_index].image)" class="img-fluid gt-img d-block mx-auto">
        </div>
        <div class="card mb-1" style="min-height: 75px">
            <div class="card-body">
                <div class="float-left">
                    <i class="material-icons" @click="playAudio(example_list[current_index].id, step[0])">
                        volume_up
                    </i>
                </div>
                <div class="text-center">
                    {{example_list[current_index][step[0]]}}
                </div>
            </div>
        </div>
        <div class="card mb-1" style="min-height: 75px">
            <div class="card-body">
                <div v-show="step_index === 1">
                    <div class="float-left">
                        <i class="material-icons" @click="playAudio(example_list[current_index].id, step[1])">
                            volume_up
                        </i>
                    </div>
                    <div class="text-center">
                        {{example_list[current_index][step[1]]}}
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-3">
                <div class="btn btn-outline-primary btn-block" @click="prevSentence()">
                    Prev
                </div>
            </div>
            <div class="col-6">
                <div class="btn btn-outline-success btn-block" @click="nextStep()" v-if="control_type==='simulator'">
                    Далее
                </div>
                <div class="btn btn-outline-success btn-block" v-else @click="autoSentencePlay">
                    <span v-if="is_playing">Pause</span>
                    <span v-else>Play</span>
                </div>
            </div>
            <div class="col-3">
                <div class="btn btn-outline-primary btn-block" @click="nextSentence()">
                    Next
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "grammar-component",
        props: ['examples', 'card', 'control_type'],
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

</style>
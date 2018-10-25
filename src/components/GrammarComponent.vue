<template>
    <div>
        <div class="row">
            <div class="col-md-5">
                <h3 class="right-text">Пример {{current_index+1}} из {{example_list.length}}</h3>
            </div>
            <div class="col-md-7">
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
                is_playing: false
            }
        },
        methods: {
            autoSentencePlay() {
                if (!this.is_playing) {
                    this.is_playing = true;
                    this.nextStep()
                } else {
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
            generateExampleList() {
                while (this.example_list.length > 0)
                    this.example_list.pop();
                for (let image in this.examples) {
                    for (let id in this.examples[image]) {
                        this.example_list.push({
                            "image": image,
                            "id": id,
                            "ru": this.examples[image][id].ru,
                            "en": this.examples[image][id].en,
                        })
                    }
                }
            },
            playAudio(id, lang) {
                let source = this.base_url + this.card + '/' + lang + '/' + id + '.mp3';
                let snd = new Audio(source);
                let $app = this;
                snd.onended = function () {
                    if ($app.control_type === 'player' && $app.is_playing) {
                        $app.nextStep();
                    }
                };
                snd.play();

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
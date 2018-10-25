<template>
    <div>
        <div class="row">
            <div class="col-6">
                <div class="d-flex align-items-center justify-content-center circle-wrapper">
                    <div class="circle-header">Всего:</div>
                    <vue-circle
                            :progress="0"
                            :size="75"
                            :fill="{ color: '#4a41c6'}"
                            :line-cap="round"
                            :start-angle="-Math.PI/2"
                            :show-percent="false"
                            ref="total_count"
                    >
                        <div class="circle-text">{{answered_count}}/{{example_list.length}}</div>
                    </vue-circle>
                </div>
            </div>
            <div class="col-6">
                <div class="d-flex align-items-center justify-content-center circle-wrapper">
                    <div class="circle-header">Верно:</div>
                    <vue-circle
                            :progress="0"
                            :size="75"
                            :fill="{ color: '#4ca64c'}"
                            :line-cap="round"
                            :start-angle="-Math.PI/2"
                            :show-percent="false"
                            ref="correct_count"
                    >
                        <div class="circle-text">{{correct_rating}}/{{NECESSARY_CORRECT_RATING}}%</div>
                    </vue-circle>
                </div>
            </div>
        </div>

        <div v-if="exam_type==='visual'">
            <example-train-visual :current_example="current_example" :show_translate="show_translate"
                                  @change_translate="show_translate=true"></example-train-visual>
        </div>
        <div v-else>
            <example-train-audio :current_example="current_example" :show_translate="show_translate"
                                 @change_translate="show_translate=true"></example-train-audio>
        </div>
        <div v-if="is_answered" class="mb-3">
            <div class="text-center">
                <div v-if="right_answer" class="right-answer">Правильно!</div>
                <div v-else class="wrong-answer">Неправильно</div>
            </div>
        </div>
        <div class="card mb-3 gr-card" v-for="variant in variants">
            <div class="card-body gr-card-body" @click="answer(variant)">
                <img :src="image_url(variant)" class="answer-img img-fluid">
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="float-right">
                    <button v-if="!is_answered || answer_index === example_list.length-1"
                            class="btn btn-outline-success disabled">Next
                    </button>
                    <button v-else class="btn btn-success" @click="nextQuestion">Next</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ExampleTrainVisual from "./ExampleTrainVisual";
    import ExampleTrainAudio from "./ExampleTrainAudio";
    import VueCircle from 'vue2-circle-progress/src/index.vue'

    export default {
        components: {
            ExampleTrainAudio,
            ExampleTrainVisual,
            VueCircle,
        },
        name: "visual-exam",
        props: ['examples'],
        data() {
            return {
                current_example: {
                    ru: "",
                    en: "",
                    correct_image: "",
                    card: 'card4'
                },
                example_list: [],
                image_list: [],
                show_translate: false,
                is_answered: false,
                right_answer: false,
                variants: ["image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg"],
                base_url: process.env.BASE_URL,
                answer_index: 0,
                answered_count: 0,
                exam_type: "visual",
                correct_answers_count: 0,
                incorrect_answers_count: 0,
                NECESSARY_CORRECT_RATING: 80
            }
        },
        methods: {

            generateExampleList(examples) { //Nothing bad, its javascript
                for (let card in this.examples) {
                    if (this.examples.hasOwnProperty(card)) {
                        for (let image in this.examples[card]) {
                            if (this.examples[card].hasOwnProperty(image)) {
                                for (let id in this.examples[card][image]) {
                                    if (this.examples[card][image].hasOwnProperty(id)) {
                                        this.example_list.push({
                                            "correct_image": image,
                                            "id": id,
                                            "ru": this.examples[card][image][id].ru,
                                            "en": this.examples[card][image][id].en,
                                            "card": card
                                        })
                                    }
                                }
                                this.image_list.push(image);
                            }
                        }
                    }
                }
            },
            image_url(image_name) {
                return this.base_url + 'AAM_PIC/' + image_name;
            },
            answer(variant) {
                if (variant === this.current_example.correct_image) {
                    this.right_answer = true;
                    this.correct_answers_count++;
                }
                else {
                    this.right_answer = false;
                    this.incorrect_answers_count++;
                }
                this.is_answered = true;
                this.answered_count++;
                this.updateExamProgress();
            },
            nextQuestion() {
                this.is_answered = false;
                this.show_translate = false;
                this.answer_index++;
                this.current_example = this.example_list[this.answer_index];
                this.generate_answers();
            },
            shuffle(a) {
                for (let i = a.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [a[i], a[j]] = [a[j], a[i]];
                }
                return a;
            },
            generate_answers() {
                while (this.variants.length > 0) {
                    this.variants.pop();
                }
                while (this.variants.length < 3) {
                    let randrom_index = Math.floor(Math.random() * this.image_list.length);
                    if (this.image_list[randrom_index] !== this.current_example.correct_image &&
                        !this.variants.includes(this.image_list[randrom_index])) {
                        this.variants.push(this.image_list[randrom_index]);
                    }
                }
                let randrom_index = Math.floor(Math.random() * this.image_list.length);
                this.variants.splice(randrom_index, 0, this.current_example.correct_image)

            },
            updateExamProgress() {
                // обновление значений счетчиков
                // проверка условий окончания и успешности экзамена
                this.$refs.total_count.updateProgress(this.total_rating);
                this.$refs.correct_count.updateProgress(this.correct_rating);
                if (this.correct_rating >= this.NECESSARY_CORRECT_RATING) {
                    this.$refs.correct_count.updateFill('#4ca64c');
                } else {
                    this.$refs.correct_count.updateFill('#c42432')
                }
            }
        },
        watch: {
            $route(to, from) {
                this.exam_type = this.$route.params.type;
                this.example_list = this.shuffle(this.example_list);
                this.answer_index = 0;
                this.correct_answers_count = 0;
                this.incorrect_answers_count = 0;
                this.answered_count = 0;
                this.current_example = this.example_list[this.answer_index];
                this.generate_answers();
            }
        },
        computed: {
            correct_rating() {
                if (this.incorrect_answers_count === 0 && this.correct_answers_count === 0) {
                    return 0;
                }
                return Math.floor(this.correct_answers_count / (this.correct_answers_count + this.incorrect_answers_count) * 100);
            },
            total_rating() {
                if (this.example_list.length === 0) {
                    return 0;
                }
                return Math.floor((this.answered_count / this.example_list.length) * 100);
            }
        },
        created() {
            this.exam_type = this.$route.params.type;
            this.generateExampleList(this.examples);
            this.example_list = this.shuffle(this.example_list);
            this.current_example = this.example_list[this.answer_index];
            this.generate_answers();
        }
    }
</script>

<style scoped>
    .circle-header {
        padding-right: 10px;
        font-size: 25px;
        font-weight: bold;
    }

    .circle-text {
        font-weight: bold;
        font-size: 16px;
        margin-bottom: 5px;
    }

    .gr-card {
        box-shadow: 1px 1px 4px #0d2d3fa8;
        border: none;
        cursor: pointer;
    }

    .gr-card:hover {
        box-shadow: 1px 1px 1px #0d2d3fa8;
    }


    .gr-card-body {
        height: 75px;
        padding: 10px;
    }

    .answer-img {
        max-height: 65px;
        cursor: pointer;
    }

    .right-answer {
        background-color: rgba(36, 148, 32, 0.8);
    }

    .wrong-answer {
        background-color: rgba(148, 2, 17, 0.8);
        color: white;
    }

    @media (max-width: 576px) {
        .circle-header {
            padding-right: 0;
            font-size: 20px;
        }

        .circle-text {
            font-size: 15px;
        }

        .circle-wrapper {
            flex-flow: column;
        }

        .answer-img {
            max-height: 50px;
        }

        .gr-card-body {
            height: 60px;
            padding: 5px;
        }
    }
</style>
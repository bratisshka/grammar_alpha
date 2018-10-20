<template>
    <div>
        <div v-if="exam_type=='visual'">
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
        <div class="card mb-1" v-for="variant in variants">
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

    export default {
        components: {
            ExampleTrainAudio,
            ExampleTrainVisual},
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
                exam_type: "visual",
            }
        },
        methods: {

            generateExampleList(examples) {
                for (let card in this.examples)
                    for (let image in this.examples[card]) {
                        for (let id in this.examples[card][image]) {
                            this.example_list.push({
                                "correct_image": image,
                                "id": id,
                                "ru": this.examples[card][image][id].ru,
                                "en": this.examples[card][image][id].en,
                                "card": card
                            })
                        }
                        this.image_list.push(image);
                    }
            },
            image_url(image_name) {
                return this.base_url + 'AAM_PIC/' + image_name;
            },
            answer(variant) {
                if (variant === this.current_example.correct_image) {
                    this.right_answer = true;
                }
                else {
                    this.right_answer = false
                }
                this.is_answered = true;
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

            }
        },
        watch: {
            $route (to, from) {
                this.exam_type = this.$route.params.type;
                this.example_list = this.shuffle(this.example_list);
                this.answer_index = 0;
                this.current_example = this.example_list[this.answer_index];
                this.generate_answers();
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


    .answer-img {
        max-height: 75px;
        cursor: pointer;
    }

    .right-answer {
        background-color: rgba(36, 148, 32, 0.8);
    }

    .wrong-answer {
        background-color: rgba(148, 2, 17, 0.8);
        color: white;
    }
</style>
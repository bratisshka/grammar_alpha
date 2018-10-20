<template>
    <div>
        <div class="card">
            <div class="card-body">
                <div>Пример {{example_index + 1}} из {{example_list.length}}</div>
                <img :src="image_source" alt="" class="img-fluid my-2">
                <div class="card bg-light mb-1">
                    <div class="card-body" @click="playAudio(en_url)">
                        <div class="float-left">
                            <i class="material-icons">
                                volume_up
                            </i>
                        </div>

                        <div class="text-center">
                            {{example_list[example_index].en}}
                        </div>

                    </div>
                </div>
                <div class="card bg-light mb-1">
                    <div class="card-body" @click="playAudio(ru_url)">
                         <div class="float-left">
                            <i class="material-icons">
                                volume_up
                            </i>
                        </div>

                        <div class="text-center">
                            {{example_list[example_index].ru}}
                        </div>
                    </div>
                </div>
                <div class="float-right">
                    <div class="btn btn-sm btn-outline-danger mr-2" @click="prevSentence">Back</div>
                    <div class="btn btn-sm btn-success" @click="nextSentence">Next</div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "examples-trainer",
        props: ['examples', 'number'],
        data() {
            return {
                example_index: 0,
                example_list: [],
                base_url: process.env.BASE_URL,

            }
        },
        methods: {
            nextSentence() {
                if (this.example_index + 1 !== this.example_list.length) {
                    this.example_index++;
                }
            },
            prevSentence() {
                if (this.example_index !== 0) {
                    this.example_index--;
                }
            },
            playAudio(source) {
                let snd = new Audio(source);
                snd.play();
            }
        },
        computed: {
            image_source() {
                return this.base_url + 'AAM_PIC/' + this.example_list[this.example_index].image
            },
            en_url() {
                return this.base_url + 'card' + this.number + '/en/' + this.example_list[this.example_index].id + '.mp3'
            },
            ru_url() {
                return this.base_url + 'card' + this.number + '/ru/' + this.example_list[this.example_index].id + '.mp3'
            }
        },
        created() {
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
        }
    }
</script>

<style scoped>
    i {
        font-size: 30px;
    }
    .card-body {
        cursor: pointer;
    }

</style>
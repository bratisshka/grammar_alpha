<template>
    <div>
        <h5 class="my-2">Визуальный тренажер-экзамен</h5>
        <div class="card mb-1">
            <div class="card-body" @click="playAudio(current_example.id, 'en', current_example.card)">
                <div class="float-left">
                    <i class="material-icons">
                        volume_up
                    </i>
                </div>
                <div class="text-center">
                    {{current_example.en}}
                </div>
            </div>
        </div>
        <div class="card mb-3">
            <div v-if="show_translate===false" class="card-body">
                <div class="text-center">
                    <div class="text-underline" @click="change_show_trans_val">
                        Показать перевод
                    </div>
                </div>
            </div>
            <div v-else class="card-body" @click="playAudio(current_example.id, 'ru', current_example.card)">
                <div class="float-left">
                    <i class="material-icons">
                        volume_up
                    </i>
                </div>
                <div class="text-center">
                    {{current_example.ru}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "example-train-visual",
        props: ['current_example', 'show_translate'],
        data() {
            return {
                base_url: process.env.BASE_URL,
            }
        },
        methods: {
            playAudio(id, lang, card) {
                let source = this.base_url + card + '/' + lang + '/' + id + '.mp3';
                let snd = new Audio(source);
                snd.play();
            },
            change_show_trans_val() {
                this.$emit('change_translate');
            }
        }
    }
</script>

<style scoped>
    .text-underline {
        text-decoration: underline;
        cursor: pointer;
    }

    .card-body {
        cursor: pointer;
    }

    .gr-card-body {
        padding: 0;
    }
</style>
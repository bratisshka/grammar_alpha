<template>
    <div>
        <content-viewer :blocks="cards_data[$route.params.number-1]"></content-viewer>
        <div v-if="lesson.cards[$route.params.number-1].has_practice">
            <examples-trainer
                    :examples="examples[lesson.cards[$route.params.number-1].number]"
                    :number="lesson.cards[$route.params.number-1].number"></examples-trainer>
        </div>
    </div>
</template>
<script>
    import ContentViewer from '../../components/Lesson/ContentViewer.vue';
    import ExamplesTrainer from '../../components/Lesson/ExamplesTrainer.vue';
    import cards_data from '../../assets/cards_content';
    import card4_examples from '../../assets/card4/info.json';
    import card8_examples from '../../assets/card8/info.json';

    export default {
        name: "card-item",
        components: {
            ContentViewer,
            ExamplesTrainer
        },
        data() {
            return {
                lesson: {
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
            }
        },
        methods: {},
        created() {
            this.cards_data = cards_data;
            this.examples['4'] = card4_examples;
            this.examples['8'] = card8_examples;
        }
    }
</script>

<style scoped>

</style>
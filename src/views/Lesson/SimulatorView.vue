<template>
    <div>
        <div class="row">
            <div class="col-lg-8">
                <div class="goals">
                    <h5>Цели:</h5>
                    <p>Описание целей тренажера, что должно происходить и как работает</p>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-8">
                <visual-exam :examples="cards_data"></visual-exam>
            </div>
        </div>
    </div>
</template>

<script>
    import VisualExam from '../../components/Exam/VisualExam.vue'
    import card4 from '../../assets/card4/info.json'
    import card8 from '../../assets/card8/info.json'
    export default {
        name: "simulator-view",
        components: {
            VisualExam
        },
        data() {
            return {
                cards_data: []
            }
        },
        methods: {},
        created() {
            this.cards_data = {
                "card4": card4,
                "card8": card8
            };
        }
    }
</script>

<style scoped>
    .goals {
        border-radius: .25rem;
        background-color: #D1DDE9;
        border: 1px solid rgba(0, 0, 0, .125);
        margin: 10px 0px;
        padding: 10px;
    }
</style>
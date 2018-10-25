<template>
    <div>
        <div class="row mb-3" v-for="lesson in lesson_list">
            <div class="col-md-12">
                <div class="card">
                    <div class="lesson-header bg-black"><b>Урок 1.</b> Основы</div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-sm-4">
                                <img :src="lesson.image" class="img-fluid">
                            </div>
                            <div class="col-sm-8 mb-2">
                                <div class="card-content d-flex align-items-center">
                                    <div v-html="lesson.description"></div>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex align-items-center">
                            <div class="mr-3 d-flex align-items-center">
                                <img class="stats-icon mr-2"
                                     src="https://cdn0.iconfinder.com/data/icons/everyday-objects-line-art-1/128/stopwatch-512.png">
                                <span class="stats-text">26 min</span>
                            </div>
                            <div class="mr-auto d-flex align-items-center">
                                <img class="stats-icon mr-2"
                                     src="https://cdn2.iconfinder.com/data/icons/simple-medical/256/Dr._Slip-512.png">
                                <span class="stats-text">8 cards</span>
                            </div>
                            <router-link :to="{ name: 'lesson_intro', params: { id: lesson.number}}">
                                <div class="btn btn-success float-right">Начать</div>
                            </router-link>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </div>
</template>

<script>

    export default {
        name: 'home',
        components: {},
        data() {
            return {
                "lesson_list": [
                    {
                        "number": 1,
                        "name": "Английский за 1 урок",
                        "description": '<div><p><strong style=\"background-color: transparent;\">ЦЕЛИ: </strong></p><ol><li><span style=\"background-color: transparent;\">Сруктура языка.</span></li><li><span style=\"background-color: transparent;\">Основные элементы.</span></li><li><span style="background-color: transparent;">Главный принцип строения предложений.</span></li></ol></div>',
                        "image": "https://alred-static.s3.amazonaws.com/media/public/media/Screen_Shot_2018-09-28_at_00.31.32.png",
                        "time": "26",
                        "card_count": 8,
                        "tren_count": 115
                    }
                ]
            }
        }
    }
</script>
<style scoped>
    .lesson-header {
        text-transform: uppercase;
        padding: 15px
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

    .stats-icon {
        width: 3.5vw;
        max-width: 40px;
    }

    .stats-text {
        text-transform: uppercase;
        /*padding-left: 1vw;*/
        font-size: 1rem;
    }

    .card-content {
        font-family: Roboto, sans-serif;
        background-color: #D1DDE9;
        padding: 10px;
        height: 100%;
    }

    .card-content >>> p {
        margin-bottom: 0;
        font-size: 1rem;
    }

    .card-content >>> ol {
        padding-left: 1rem;
        line-height: 1.3rem;
        margin-bottom: 0;
    }

    @media (max-width: 576px) {
        .stats-icon {
            width: 7vw;
        }
    }
</style>

<template>
    <div>
        <div class="row mb-3" v-for="lesson in lesson_list">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        <div class="row">
                            <div class="col-md-4">
                                <span class="lesson-header">Урок 1. Основы</span>
                            </div>
                            <div class="col-md-8 lesson-info">
                                <span class="mr-2"><b>26</b> мин</span>
                                <span class="mr-2"><b>8</b> карточек</span>
                                <span><b>115</b> тренажеров</span>
                            </div>

                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-sm-4">
                                <img :src="lesson.image" class="img-fluid">
                            </div>
                            <div class="col-md-8">
                                <div v-html="lesson.description" class="card-content"></div>
                            </div>
                        </div>
                        <router-link :to="{ name: 'lesson', params: { id: lesson.number}}">
                            <div class="btn btn-sm btn-go float-right">Приступить</div>
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
        color: #D10000;
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
    .card-content {
        font-family: Roboto, sans-serif;
    }
    .card-content >>> p {
        margin-bottom: 0;
        color: #D10000;
    }
    .card-content >>> ol {
        padding-left: 1rem;
        line-height: 1.3rem;
    }

    @media (min-width: 576px) {
        .lesson-info {
            text-align: right;
        }
    }
</style>

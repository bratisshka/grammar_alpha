<template>
    <div>
        <div class="row mb-3" v-for="lesson in lesson_list">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <div class="row">
                            <div class="col-md-3">
                                <div class="lesson-number text-center">Урок #{{lesson.number}}</div>
                            </div>
                            <div class="col-md-9">
                                <div class="lesson-name text-center">{{lesson.name}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="gr-card-body">
                        <div class="row">
                            <div class="col-md-3 gr-col">
                                <div class="gr-col-content">
                                    <img :src="lesson.image" class="img-fluid">
                                </div>
                            </div>
                            <div class="col-md-7 gr-col ">
                                <div class="gr-col-content">
                                    <div v-html="lesson.description" class="card-content"></div>
                                </div>
                            </div>
                            <div class="col-md-2 gr-col gr-col-last">
                                <div class="gr-col-content">
                                    <p>{{lesson.time}} минут</p>
                                    <p>{{lesson.card_count}} карточек</p>
                                    <p>{{lesson.tren_count}} практических тренажеров</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="gr-card-footer">
                        <router-link :to="{ name: 'lesson', params: { id: lesson.number}}">
                            <div class="btn btn-outline-success float-right">Начать</div>
                        </router-link>
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
                        "description": '<div><p><strong style=\"background-color: transparent;\">ЦЕЛИ: </strong></p><ol><li><span style=\"background-color: transparent;\">Что такое соединительные элементы.</span></li><li><span style=\"background-color: transparent;\">Основной смысл предлогов of, to, with.</span></li></ol></div>',
                        "image": "https://alred-static.s3.amazonaws.com/media/public/media/Screen_Shot_2018-09-28_at_00.31.32.png",
                        "time": "26",
                        "card_count": 8,
                        "tren_count": 115
                    },
                    {
                        "number": 2,
                        "name": "Английский за 1 урок",
                        "description": '<div><p><strong style=\"background-color: transparent;\">ЦЕЛИ: </strong></p><ol><li><span style=\"background-color: transparent;\">Что такое соединительные элементы.</span></li><li><span style=\"background-color: transparent;\">Основной смысл предлогов of, to, with.</span></li></ol></div>',
                        "image": "https://s3.us-east-2.amazonaws.com/alred-static/media/public/media/c710366be05c09da455187caa7fca7a9_dIxw4eK.png",
                        "time": "26",
                        "card_count": 8,
                        "tren_count": 115
                    },
                    {
                        "number": 3,
                        "name": "Английский за 1 урок",
                        "description": '<div><p><strong style=\"background-color: transparent;\">ЦЕЛИ: </strong></p><ol><li><span style=\"background-color: transparent;\">Что такое соединительные элементы.</span></li><li><span style=\"background-color: transparent;\">Основной смысл предлогов of, to, with.</span></li></ol></div>',
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
    .card-header {
        border-bottom: 1px solid rgba(0, 0, 0, 0.35);
    }

    .gr-card-body >>> p {
        margin-bottom: 0;
    }

    .gr-card-body {
        border-bottom: 1px solid rgba(0, 0, 0, 0.35);
    }

    .gr-col-content {
        height: 100%;
        display: flex;
        flex-flow: column;
        justify-content: center;
        border-right: 1px solid rgba(0, 0, 0, 0.35);
    }

    .gr-col-last .gr-col-content {
        border-right: none;
    }

    .gr-card-footer {
        padding: 5px;
        align-items: right;
    }
</style>

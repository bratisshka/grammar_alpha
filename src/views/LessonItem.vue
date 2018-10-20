<template>
    <div>
        <!--<div class="row">-->
            <!--<div class="col-md-6">-->
                <!--<h2>Урок #{{lesson.number}}</h2>-->
                <!--<h2>{{lesson.name}}</h2>-->
            <!--</div>-->
            <!--<div class="col-md-6">-->
                <!--<div v-html="lesson.description" class="gr-lesson-content"></div>-->
            <!--</div>-->
        <!--</div>-->
        <div class="row mb-5">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-body">
                        <content-viewer :blocks="lesson_content"></content-viewer>
                    </div>
                </div>
            </div>
        </div>
        <carousel :per-page="3" :space-padding="0">
            <slide>
                <div class="card mx-2">
                    <div class="card-body">
                        Slide 1 content
                    </div>
                </div>
            </slide>
            <slide>
                <div class="card mx-2">
                    <div class="card-body">
                        <div class="card-title">
                            <div class="row">
                                <div class="col-lg-9">
                                    <h5>Карточка 1.</h5>
                                    <h5>Структура грамматики</h5>
                                </div>
                                <div class="col-lg-3">
                                    <p>5 мин.</p>
                                </div>
                            </div>
                            <img class="img-fluid"
                                 src="https://s3.us-east-2.amazonaws.com/alred-static/media/public/media/c710366be05c09da455187caa7fca7a9_dIxw4eK.png">
                        </div>
                        <div class="gr-lesson-content">
                            <div v-html="lesson.description"></div>
                        </div>
                    </div>
                </div>
            </slide>
            <slide>
                <div class="card mx-2">
                    <div class="card-body">
                        Slide 3 content
                    </div>
                </div>
            </slide>
            <slide>
                <div class="card mx-2">
                    <div class="card-body">
                        Slide 4 content
                    </div>
                </div>
            </slide>
        </carousel>
        <router-link :to="{name: 'card', params: {id: lesson.number, number: 1}}">
            <div class="card">
                <div class="card-body">
                    <div class="text-right">Приступить</div>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
    import {Carousel, Slide} from 'vue-carousel';
    import lesson_content from "../assets/lesson_content"
    import ContentViewer from "../components/ContentViewer";
    export default {
        name: "lesson-item",
        components: {
            ContentViewer,
            Carousel,
            Slide
        },
        data() {
            return {
                lesson: {
                    "number": 1,
                    "name": "Английский за 1 урок",
                    "description": '<div><p><strong style=\"background-color: transparent;\">ЦЕЛИ: </strong></p><ol><li><span style=\"background-color: transparent;\">Что такое соединительные элементы.</span></li><li><span style=\"background-color: transparent;\">Основной смысл предлогов of, to, with.</span></li></ol></div>',
                    "image": "https://alred-static.s3.amazonaws.com/media/public/media/Screen_Shot_2018-09-28_at_00.31.32.png",
                    "time": "26",
                    "card_count": 8,
                    "tren_count": 115
                },
                lesson_content: []
            }
        },
        created() {
            this.lesson_content = lesson_content;
        }
    }
</script>

<style scoped>
    .gr-lesson-content >>> p, .gr-lesson-content >>> ol {
        margin-bottom: 0;
    }

    /*.card {*/
        /*background-color: #f5f5f5;*/
    /*}*/
</style>
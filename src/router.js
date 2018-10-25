import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router);

export default new Router({
        mode: 'history',
        base: process.env.BASE_URL,
        routes: [
            {
                path: '/',
                name: 'home',
                component: Home
            },
            {
                path: '/lessons/',
                name: 'lessons',
                component: () => import('./views/LessonList.vue')
            },
            {
                path: '/lessons/:id/',
                component: () => import('./views/Lesson/Lesson.vue'),
                children: [
                    {
                        path: '',
                        name: 'lesson_intro',
                        component: () => import('./views/Lesson/Home.vue')
                    },
                    {
                        path: 'cards/:number/',
                        name: 'card',
                        component: () => import('./views/Lesson/CardItem.vue')
                    },
                    {
                        path: 'simulator/:type/',
                        name: 'simulator',
                        component: () => import('./views/Lesson/SimulatorView.vue')
                    },
                ]
            },
            {
                path: '/grammar-tren/',
                name: 'grammar-tren',
                component: () => import('./views/GrammarTren.vue')
            }
        ],
        scrollBehavior(to, from, savedPosition) {
            return {x: 0, y: 0}
        }
    }
)

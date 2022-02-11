import Vue from "vue";
import Router from "vue-router";
import App from "./App.vue";
import List from "./views/List.vue";
import Schedule from "./views/Schedule.vue";
import Habits from "./views/Habits.vue";
import Goal from "./views/Goal.vue";
import Login from "./views/Login.vue";
import ListRegist from "./views/list/ListRegist.vue";


Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [{path: "/app", component: App}, 
             {path: "/list", component: List},
             {path: "/schedule", component: Schedule},
             {path: "/habits", component: Habits},
             {path: "/goal", component: Goal},
             {path: "/", component: Login},
             {path: "/list/listregist", component: ListRegist}
            ]
});
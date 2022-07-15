import {
    createRouter,
    createWebHistory,
    RouteLocationNormalized,
} from "vue-router";
import Home from "../views/HomePage.vue";
import Settings from "../views/SettingsPage.vue";
import UserManagement from "../views/UserManagementPage.vue";
import Register from "../views/RegisterPage.vue";
import Login from "../views/LoginPage.vue";
import ForgotPassword from "../views/ForgotPasswordPage.vue";
import ResetPassword from "../views/ResetPasswordPage.vue";
import NotFound from "../views/NotFoundPage.vue";
import ROUTES from "../shared/RoutesNames";

import useLoggedUser from "../store/loggedUser";

const { isLoggedIn, isAdmin } = useLoggedUser();

const { BASE_URL } = import.meta.env;

const routes = [
    {
        path: ROUTES.HOME,
        name: "home",
        component: Home,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: ROUTES.SETTINGS,
        name: "settings",
        component: Settings,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: ROUTES.USER_MANAGEMENT,
        name: "manage-users",
        component: UserManagement,
        meta: {
            requiresAuth: true,
            requiresAdmin: true,
        },
    },
    {
        path: ROUTES.LOGIN,
        name: "login",
        component: Login,
    },
    {
        path: ROUTES.REGISTER,
        name: "register",
        component: Register,
    },
    {
        path: ROUTES.FORGOT_PASSWORD,
        name: "forgotPassword",
        component: ForgotPassword,
    },
    {
        path: `${ROUTES.RESET_PASSWORD}/:token`,
        name: "resetPassword",
        component: ResetPassword,
    },
    { path: "/:pathMatch(.*)*", name: "notFound", component: NotFound }, // 404
];

const router = createRouter({
    history: createWebHistory(BASE_URL),
    routes,
});

function authIsValid(to: RouteLocationNormalized) {
    const isAuthenticated = isLoggedIn.value; // It's reactive
    if (
        to.matched.some((record) => record.meta.requiresAuth) &&
        !isAuthenticated
    ) {
        return false;
    }

    return true;
}

function adminIsValid(to: RouteLocationNormalized) {
    if (
        to.matched.some((record) => record.meta.requiresAdmin) &&
        !isAdmin.value
    ) {
        return false;
    }

    return true;
}

router.beforeEach((to, from, next) => {
    if (!authIsValid(to)) next({ path: ROUTES.LOGIN, query: to.query });
    else if (!adminIsValid(to)) next({ path: ROUTES.LOGIN });
    else next();
});

export default router;

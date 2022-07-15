<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import ROUTES from "../shared/RoutesNames";
import LoginForm from "../components/LoginForm.vue";
import useLoggedUser from "../store/loggedUser";
import useAccessToken from "../store/accessToken";

const { t } = useI18n();
const { isLoggedIn } = useLoggedUser();
const { refreshToken } = useAccessToken();
const { VITE_TITLE } = import.meta.env;
const router = useRouter();

if (isLoggedIn.value === true) {
    refreshToken();
    router.push(ROUTES.HOME);
}

function handleLogin() {
    router.push(ROUTES.HOME);
}
</script>

<template>
    <main>
        <h1>{{ VITE_TITLE }}</h1>
        <h2>{{ t("welcome") }}</h2>
        <LoginForm @login="handleLogin" />
        <p class="lead">
            {{ t("newUserQuestion") }}
            <router-link :to="ROUTES.REGISTER">{{
                t("registerCTA")
            }}</router-link>
        </p>
        <p class="lead">
            <router-link :to="ROUTES.FORGOT_PASSWORD">{{
                t("forgotPassword.question")
            }}</router-link>
        </p>
    </main>
</template>

<style scoped>
main {
    width: 30%;
    margin: auto;
    text-align: center;
    margin-top: 5%;
    margin-bottom: 5%;
}
</style>

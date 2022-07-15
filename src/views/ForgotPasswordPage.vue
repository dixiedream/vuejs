<script setup lang="ts">
import { useI18n } from "vue-i18n";
import ROUTES from "../shared/RoutesNames";
import ForgotPasswordForm from "../components/ForgotPasswordForm.vue";

const { t } = useI18n();
const { VITE_TITLE } = import.meta.env;
</script>

<template>
    <main>
        <h1>{{ VITE_TITLE }}</h1>
        <h2>{{ t("forgotPassword.h2") }}</h2>
        <ForgotPasswordForm />
        <p class="lead">
            {{ t("newUserQuestion") }}
            <router-link :to="ROUTES.REGISTER">{{
                t("registerCTA")
            }}</router-link>
        </p>
        <p class="lead">
            {{ t("loginQuestion") }}
            <router-link :to="ROUTES.LOGIN">{{ t("loginCTA") }}</router-link>
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

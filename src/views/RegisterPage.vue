<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import ROUTES from "../shared/RoutesNames";
import RegisterForm from "../components/RegisterForm.vue";

const { t } = useI18n();
const router = useRouter();

const { VITE_TITLE } = import.meta.env;
</script>

<template>
    <main>
        <h1>{{ VITE_TITLE }}</h1>
        <h2>{{ t("register.h2") }}</h2>
        <RegisterForm @register="router.push(ROUTES.HOME)" />
        <p>
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

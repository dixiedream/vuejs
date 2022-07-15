<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import ROUTES from "../shared/RoutesNames";
import ResetPasswordForm from "../components/ResetPasswordForm.vue";

const { t } = useI18n();
const hasError = ref(false);

const router = useRouter();
const route = useRoute();

const token = route.params.token as string;
if (!token) {
    router.push(ROUTES.LOGIN);
}

function showLink() {
    hasError.value = true;
}

const { VITE_TITLE } = import.meta.env;
</script>

<template>
    <main>
        <h1>{{ VITE_TITLE }}</h1>
        <h2>{{ t("resetPassword.h2") }}</h2>
        <ResetPasswordForm
            :token="token"
            @update="router.push(ROUTES.HOME)"
            @error="showLink"
        />
        <p v-show="hasError">
            <router-link :to="ROUTES.FORGOT_PASSWORD">{{
                t("resetPassword.error")
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
}
</style>

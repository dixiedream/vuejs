<script setup lang="ts">
import { useI18n } from "vue-i18n";
import SubmitBtn from "./SubmitBtn.vue";
import Api from "../../services/AuthService";

import useAccessToken from "../../store/accessToken";
import useLoggedUser from "../../store/loggedUser";

const { t } = useI18n();
const emit = defineEmits(["logout"]);
const { setToken } = useAccessToken();
const { setLoggedIn } = useLoggedUser();

async function logout() {
    try {
        await Api.logout();
        setToken();
        setLoggedIn(false);
        emit("logout");
    } catch (error) {
        console.warn(error);
    }
}
</script>

<template>
    <SubmitBtn :aria-label="t('logout')" @click="logout">{{
        t("logout")
    }}</SubmitBtn>
</template>

<style scoped>
button {
    height: 40px;
    background: var(--danger);
    margin-right: 50px;
}
</style>

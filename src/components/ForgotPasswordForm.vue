<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { reactive } from "vue";
import UsernameInput from "./base/UsernameInput.vue";
import SubmitBtn from "./base/SubmitBtn.vue";
import Api from "../services/AuthService";
import LoaderIcon from "./base/LoaderIcon.vue";

const { t } = useI18n();
const state = reactive({
    email: "",
    error: "",
    success: false,
    isLoading: false,
});

async function submit(e: Event) {
    e.preventDefault();
    state.error = "";
    state.success = false;
    try {
        state.isLoading = true;
        await Api.forgotPassword(state.email);
        state.isLoading = false;
        state.success = true;
    } catch (error: any) {
        console.log(error);
        state.isLoading = false;
        state.error = error.message || t("forgotPassword.error");
    }
}

function emailChanged(data: any) {
    const email = data.email || data.username;
    state.email = email;
}
</script>

<template>
    <form method="POST" @submit="submit">
        <div v-show="!state.success && !state.isLoading">
            <UsernameInput :email="state.email" @change="emailChanged" />
            <SubmitBtn>{{ t("forgotPassword.CTA") }}</SubmitBtn>
        </div>
    </form>
    <LoaderIcon v-show="state.isLoading" />
    <p v-show="state.error" class="lead error">
        <b>OOPS!</b>
        {{ state.error }}
    </p>
    <p v-show="state.success" class="lead success">
        {{ t("forgotPassword.success") }}
    </p>
</template>

<style scoped>
div {
    width: 100%;
}

.error {
    color: var(--danger);
}

.success {
    color: var(--success);
}

button {
    width: 100%;
}
</style>

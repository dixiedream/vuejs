<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { reactive } from "vue";
import UsernameInput from "./base/UsernameInput.vue";
import PasswordInput from "./base/PasswordInput.vue";
import SubmitBtn from "./base/SubmitBtn.vue";
import Api from "../services/AuthService";
import useAccessToken from "../store/accessToken";
import useLoggedUser from "../store/loggedUser";

const { t } = useI18n();
const { setToken } = useAccessToken();
const { setLoggedIn } = useLoggedUser();

const emit = defineEmits(["login"]);

const state = reactive({
    email: "",
    password: "",
    error: "",
});

async function submit(e: Event) {
    e.preventDefault();
    state.error = "";
    try {
        const { token } = await Api.login({
            email: state.email,
            password: state.password,
        });
        setToken(token);
        setLoggedIn(true);
        emit("login");
    } catch (error) {
        state.error = t("login.invalidData");
        setToken();
        setLoggedIn(false);
    }
}

function emailChanged(data: any) {
    const email = data.email || data.username;
    state.email = email;
}

function passwordChanged({ password }: any) {
    state.password = password;
}
</script>

<template>
    <form method="POST" @submit="submit">
        <UsernameInput :email="state.email" @change="emailChanged" />
        <PasswordInput :password="state.password" @change="passwordChanged" />
        <SubmitBtn>{{ t("loginCTA") }}</SubmitBtn>
        <p v-show="state.error" class="lead" style="color: var(--danger)">
            <b>OOPS!</b>
            {{ state.error }}
        </p>
    </form>
</template>

<style scoped>
button {
    width: 100%;
}
</style>

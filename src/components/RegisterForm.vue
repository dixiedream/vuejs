<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { reactive } from "vue";
import UsernameInput from "./base/UsernameInput.vue";
import PasswordInput from "./base/PasswordInput.vue";
import SubmitBtn from "./base/SubmitBtn.vue";
import Api from "../services/UserService";
import useAccessToken from "../store/accessToken";
import useLoggedUser from "../store/loggedUser";

const { t } = useI18n();
const { setToken } = useAccessToken();
const { setLoggedIn } = useLoggedUser();

const state = reactive({
    email: "",
    password: "",
    passwordConfirm: "",
    passwordConfirmError: "",
    error: "",
});

const emit = defineEmits(["register"]);

function formIsValid() {
    return state.password === state.passwordConfirm;
}

async function submit(e: Event) {
    e.preventDefault();
    if (!formIsValid) return;
    state.error = "";
    try {
        const { token } = await Api.createUser({
            email: state.email,
            password: state.password,
        });
        setToken(token);
        setLoggedIn(true);
        emit("register");
    } catch (error: any) {
        state.error = error.message || t("register.error");
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

function confirmPasswordChanged({ password }: any) {
    state.passwordConfirm = password;
    if (state.password !== state.passwordConfirm) {
        state.error = t("passwordConfirmWrongFormat");
    }
}
</script>

<template>
    <form method="POST" @submit="submit">
        <UsernameInput :email="state.email" @change="emailChanged" />
        <PasswordInput
            :password="state.password"
            autocomplete="new-password"
            @change="passwordChanged"
        />
        <PasswordInput
            name="passwordConfirm"
            :label="t('newPasswordConfirm.label')"
            :placeholder="t('newPasswordConfirm.placeholder')"
            :password="state.passwordConfirm"
            autocomplete="new-password"
            @change="confirmPasswordChanged"
        />
        <SubmitBtn>{{ t("registerCTA") }}</SubmitBtn>
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

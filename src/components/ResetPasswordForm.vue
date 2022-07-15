<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { reactive } from "vue";
import PasswordInput from "./base/PasswordInput.vue";
import SubmitBtn from "./base/SubmitBtn.vue";
import Api from "../services/AuthService";
import useAccessToken from "../store/accessToken";
import useLoggedUser from "../store/loggedUser";

const { t } = useI18n();
const { setToken } = useAccessToken();
const { setLoggedIn } = useLoggedUser();

const props = defineProps({
    token: {
        type: String,
        required: true,
    },
});

const state = reactive({
    password: "",
    passwordConfirm: "",
    passwordConfirmError: "",
    error: "",
});

const emit = defineEmits(["update", "error"]);

function formIsValid() {
    return state.password === state.passwordConfirm;
}

async function submit(e: Event) {
    e.preventDefault();
    if (!formIsValid) return;
    state.error = "";
    try {
        const { token } = await Api.resetPassword(state.password, props.token);
        setToken(token);
        setLoggedIn(true);
        emit("update");
    } catch (error: any) {
        state.error = error.message || t("resetPassword.error");
        emit("error");
    }
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
        <PasswordInput
            :password="state.password"
            autocomplete="new-password"
            :label="t('newPassword.label')"
            :placeholder="t('newPassword.placeholder')"
            @change="passwordChanged"
        />
        <PasswordInput
            :password="state.passwordConfirm"
            autocomplete="new-password"
            :label="t('newPasswordConfirm.label')"
            :placeholder="t('newPasswordConfirm.placeholder')"
            @change="confirmPasswordChanged"
        />
        <SubmitBtn>{{ t("resetPassword.CTA") }}</SubmitBtn>
        <p v-show="state.error !== ''" class="lead error">
            <b>OOPS!</b>
            {{ state.error }}
        </p>
    </form>
</template>

<style scoped>
form {
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.error {
    color: var(--danger);
}

button {
    width: 100%;
}
</style>

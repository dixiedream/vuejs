<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { reactive } from "vue";
import PasswordInput from "./base/PasswordInput.vue";
import SubmitBtn from "./base/SubmitBtn.vue";
import Api from "../services/UserService";

const { t } = useI18n();

const state = reactive({
    oldPassword: "",
    newPassword: "",
    newPasswordConfirm: "",
    passwordConfirmError: "",
    error: "",
    success: false,
});

const emit = defineEmits(["update", "error"]);

function formIsValid() {
    return state.newPassword === state.newPasswordConfirm;
}

async function submit(e: Event) {
    e.preventDefault();
    if (!formIsValid) return;
    state.error = "";
    try {
        await Api.updateMe({
            oldPassword: state.oldPassword,
            newPassword: state.newPassword,
        });
        state.success = true;
        emit("update");
    } catch (error: any) {
        state.error = error.message || t("changePassword.error");
        emit("error");
    }
}

function oldPasswordChanged({ oldPassword }: any) {
    state.oldPassword = oldPassword;
}

function newPasswordChanged({ newPassword }: any) {
    state.newPassword = newPassword;
}

function newConfirmPasswordChanged({ newPasswordConfirm }: any) {
    state.newPasswordConfirm = newPasswordConfirm;
    if (state.newPassword !== state.newPasswordConfirm) {
        state.error = t("passwordConfirmWrongFormat");
    }
}
</script>

<template>
    <form method="POST" @submit="submit">
        <div v-show="!state.success" class="inputs">
            <PasswordInput
                name="oldPassword"
                :label="t('currentPassword.label')"
                :placeholder="t('currentPassword.placeholder')"
                :password="state.oldPassword"
                autocomplete="current-password"
                @change="oldPasswordChanged"
            />
            <PasswordInput
                name="newPassword"
                :label="t('newPassword.label')"
                :placeholder="t('newPassword.placeholder')"
                :password="state.newPassword"
                autocomplete="new-password"
                @change="newPasswordChanged"
            />
            <PasswordInput
                name="newPasswordConfirm"
                :label="t('newPasswordConfirm.label')"
                :placeholder="t('newPasswordConfirm.placeholder')"
                :password="state.newPasswordConfirm"
                autocomplete="new-password"
                @change="newConfirmPasswordChanged"
            />
        </div>
        <SubmitBtn v-show="!state.success">Salva</SubmitBtn>
        <p v-show="state.success" class="lead success">
            {{ t("changePassword.success") }}
        </p>
        <p v-show="state.error !== ''" class="lead error">
            <b>OOPS!</b>
            {{ state.error }}
        </p>
    </form>
</template>

<style scoped>
.inputs {
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

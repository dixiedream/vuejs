<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { reactive } from "vue";
import closedEye from "../../assets/closedEye.svg";
import openedEye from "../../assets/openedEye.svg";
import TextInput from "./TextInput.vue";

const { t } = useI18n();

defineProps({
    name: {
        type: String,
        default: "password",
    },
    label: {
        type: String,
        default: "Password",
    },
    password: {
        type: String,
        default: "",
    },
    autocomplete: {
        type: String,
        default: "current-password",
    },
    error: {
        type: String,
        default() {
            const { t: localT } = useI18n();
            return localT("passwordWrongFormat");
        },
    },
});

const state = reactive({
    inputType: "password",
    passwordHidden: true,
});

function toggleVisibility() {
    state.passwordHidden = !state.passwordHidden;
    state.inputType = state.passwordHidden === true ? "password" : "text";
}
</script>

<template>
    <TextInput
        :value="password"
        :placeholder="t('currentPassword.placeholder')"
        :type="state.inputType"
        :name="name"
        :label="label"
        :autocomplete="autocomplete"
        required
        :error="error"
        pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
    >
        <img
            :src="state.passwordHidden ? closedEye : openedEye"
            :alt="state.passwordHidden ? 'show password' : 'hide password'"
            role="button"
            @click="toggleVisibility"
        />
    </TextInput>
</template>

<style scoped>
img {
    width: 50px;
    height: 50px;
    cursor: pointer;
}
</style>

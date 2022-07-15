<script setup lang="ts">
import { useI18n } from "vue-i18n";
import TextInput from "./TextInput.vue";

const { t } = useI18n();

defineProps({
    email: {
        type: String,
        default: "",
    },
    error: {
        type: String,
        default() {
            const { t: localT } = useI18n();
            return localT("usernameWrongFormat");
        },
    },
});
</script>

<template>
    <TextInput
        :value="email"
        label="Email"
        :placeholder="t('username.placeholder')"
        type="email"
        name="username"
        required
        autocomplete="username"
        :error="error"
    />
</template>

<style scoped></style>

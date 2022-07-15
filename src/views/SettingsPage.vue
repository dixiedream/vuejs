<script setup lang="ts">
import { useI18n } from "vue-i18n";
import NavBar from "../components/base/NavBar.vue";
import ChangePasswordForm from "../components/ChangePasswordForm.vue";

const { t } = useI18n();
</script>

<template>
    <header>
        <NavBar />
    </header>
    <main>
        <h1>{{ t("settings.pageName") }}</h1>
        <div class="section">
            <h2>{{ t("settings.changePasswordSectionName") }}</h2>
            <ChangePasswordForm />
        </div>
    </main>
</template>

<style scoped>
main {
    text-align: center;
}

.section {
    flex-direction: column;
    margin-top: 5%;
    text-align: center;
}
</style>

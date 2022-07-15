<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
    <main>
        <h1>404</h1>
        <h2>{{ t("404.message") }}</h2>
    </main>
</template>

<style scoped>
main {
    text-align: center;
}

h1 {
    font-size: 10rem;
}

h2 {
    text-align: center;
}

img {
    margin-top: 5%;
    max-width: 200px;
}
</style>

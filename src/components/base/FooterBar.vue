<script setup lang="ts">
import { Locale, useI18n } from "vue-i18n";
import Storage from "../../shared/StorageManager";

const { locale, availableLocales } = useI18n();

function setLocale(l: Locale) {
    Storage.saveLang(l);
}
</script>

<template>
    <footer>
        <div class="locale-changer">
            <select v-model="locale" @change="setLocale(locale)">
                <option
                    v-for="l in availableLocales"
                    :key="`locale-${l}`"
                    :value="l"
                >
                    {{ l.toUpperCase() }}
                </option>
            </select>
        </div>
    </footer>
</template>

<style scoped>
footer {
    margin-bottom: 0;
    width: 100%;
    height: 80px;
    background-color: var(--background);
    text-align: center;
}

.locale-changer {
    height: 80px;
}

select {
    margin-top: 10px;
}
</style>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import NavBar from "../components/base/NavBar.vue";
import UsersTable from "../components/UsersTable.vue";
import Api from "../services/UserService.js";
import { ref } from "vue";
import User from "../@types/User";

const { t } = useI18n();

const users = ref<User[]>([]);
async function getUsers() {
    try {
        const response = await Api.getAll();
        users.value = response;
    } catch (error) {
        console.warn(error);
    }
}

getUsers();
</script>

<template>
    <header>
        <NavBar />
    </header>
    <main>
        <h1>{{ t("userManagement.pageName") }}</h1>
        <h2>{{ t("userManagement.h2") }}</h2>
        <UsersTable :users="users" />
    </main>
</template>

<style scoped>
main {
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 100%;
}
</style>

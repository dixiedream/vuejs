<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { PropType } from "vue";
import UserRow from "./UserRow.vue";
import User from "../@types/User";

const { t } = useI18n();
defineProps({
    users: {
        required: true,
        type: Array as PropType<User[]>,
    },
});
</script>

<template>
    <table>
        <thead>
            <th>Email</th>
            <th>{{ t("userManagement.adminColumn") }}</th>
        </thead>
        <tbody>
            <UserRow v-for="user in users" :key="user._id" :user="user" />
        </tbody>
    </table>
</template>

<style scoped>
table {
    margin-top: 3%;
    width: 95%;
    background-color: var(--background);
}
</style>

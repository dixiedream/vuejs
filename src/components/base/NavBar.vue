<script setup lang="ts">
import { useRouter } from "vue-router";
import LogoutBtn from "./LogoutBtn.vue";
import ROUTES from "../../shared/RoutesNames";
import HomeBtn from "./HomeBtn.vue";

const router = useRouter();
</script>

<template>
    <nav>
        <div class="actions">
            <HomeBtn @click="router.push(ROUTES.HOME)" />
            <LogoutBtn @logout="router.push(ROUTES.LOGIN)" />
        </div>
    </nav>
</template>

<style scoped>
nav {
    display: flex;
    width: 100%;
    background-color: var(--foreground);
    height: 80px;
    flex-direction: row;
    text-align: right;
    align-items: center;
}

.actions {
    margin-top: 10px;
    height: 80px;
    margin-left: 80%;
    text-align: right;
}
</style>

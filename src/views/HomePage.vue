<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import Api from "../services/UserService";
import NavBar from "../components/base/NavBar.vue";
import useLoggedUser from "../store/loggedUser";
import SubmitBtn from "../components/base/SubmitBtn.vue";
import ROUTES from "../shared/RoutesNames";

const { user, setUser, setLoggedIn, isAdmin } = useLoggedUser();
const router = useRouter();
const { t } = useI18n();

async function getMe() {
    try {
        const u = await Api.getMe();
        setUser(u);
    } catch (e) {
        setLoggedIn(false);
    }
}

getMe();
</script>

<template>
    <header>
        <NavBar />
    </header>
    <main>
        <h1>Home</h1>
        <h2>{{ t("home.hello", { msg: user.email }) }}</h2>
        <div class="item">
            <SubmitBtn @click="router.push(ROUTES.SETTINGS)">{{
                t("settings.pageName")
            }}</SubmitBtn>
        </div>
        <div v-if="isAdmin" class="item">
            <SubmitBtn @click="router.push(ROUTES.USER_MANAGEMENT)">{{
                t("userManagement.pageName")
            }}</SubmitBtn>
        </div>
    </main>
</template>

<style scoped>
main {
    text-align: center;
}
</style>

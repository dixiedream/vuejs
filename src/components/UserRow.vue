<script setup lang="ts">
import { computed, PropType } from "vue";
import ROLES from "../shared/UserRoles";
import CheckBox from "./base/CheckBox.vue";
import Api from "../services/UserService";
import User from "../@types/User";

const props = defineProps({
    user: {
        type: Object as PropType<User>,
        required: true,
    },
});

const isAdmin = computed(() => {
    return props.user.role === ROLES.ADMIN;
});

async function switchRole() {
    try {
        const newRole =
            props.user.role === ROLES.ADMIN ? ROLES.USER : ROLES.ADMIN;
        await Api.update(props.user._id, { role: newRole });
    } catch (error) {
        console.warn(error);
    }
}
</script>

<template>
    <tr>
        <td>{{ user.email }}</td>
        <td>
            <CheckBox
                name="adminSwitch"
                :checked="isAdmin"
                @changed="switchRole"
            />
        </td>
    </tr>
</template>

<style scoped>
tr {
    height: 40px;
    background-color: var(--white);
}
</style>

<script setup lang="ts">
import { ref } from "vue";
import checkedIcon from "../../assets/check-square.svg";
import uncheckedIcon from "../../assets/square.svg";

const props = defineProps({
    name: {
        type: String,
        default: "",
    },
    // eslint-disable-next-line vue/require-default-prop
    value: null,
    checked: {
        type: Boolean,
        default: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
});

const checkbox = ref(props.checked);
const emit = defineEmits(["changed"]);

function click() {
    if (!props.disabled) {
        const { name, value } = props;
        checkbox.value = !checkbox.value;
        emit("changed", { [name]: value });
    }
}
</script>

<template>
    <label :for="name" @click="click">
        <input
            v-model="checkbox"
            :name="name"
            type="checkbox"
            :value="value"
            @changed="click"
        />
        <img
            :src="checkbox ? checkedIcon : uncheckedIcon"
            alt="checkboxIcon"
            role="checkbox"
            :aria-checked="checked"
        />
        &nbsp;
        <slot></slot>
    </label>
</template>

<style scoped>
label {
    display: flex;
    align-items: center;
    justify-content: center;
}

input {
    display: none;
}
</style>

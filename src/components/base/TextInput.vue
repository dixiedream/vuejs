<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ref } from "vue";

const props = defineProps({
    name: {
        type: String,
        default: "Name",
    },
    label: {
        type: String,
        default: "Name",
    },
    value: {
        type: String,
        default: "",
    },
    placeholder: {
        type: String,
        default() {
            const { t } = useI18n();
            return t("inputTextPlaceholder");
        },
    },
    required: {
        type: Boolean,
        default: false,
    },
    pattern: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        default: "text",
    },
    error: {
        type: String,
        default: null,
    },
    autocomplete: {
        type: String,
        required: false,
    },
});

const value = ref(props.value);
const isInvalid = ref(false);

const emit = defineEmits(["change"]);
function emitChange() {
    emit("change", { [props.name]: value.value });
}

function invalidate() {
    isInvalid.value = !isInvalid.value;
}
</script>

<template>
    <div class="input">
        <div class="text">
            <label :for="name" style="text-align: left">{{ label }}</label>
            <span v-show="isInvalid">{{ error }}</span>
        </div>
        <div :class="`inputContainer ${isInvalid ? 'error' : ''}`">
            <input
                v-model="value"
                :type="type"
                :placeholder="placeholder"
                :class="`${isInvalid ? 'error' : ''}`"
                :name="name"
                :required="required"
                :pattern="pattern"
                :autocomplete="autocomplete"
                @change="emitChange"
                @invalid="invalidate"
            />
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.input {
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    margin: 2% auto;
}

.text {
    display: flex;
    width: 100%;
}

.inputContainer {
    margin-top: 2%;
    height: 60px;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    border-radius: 10px;
    border: 1px solid var(--foreground);
}

.inputContainer.error {
    border: 3px solid var(--danger);
}

.inputContainer:focus-within {
    border: 3px solid var(--foreground);
}

label {
    flex-grow: 1;
    text-align: left;
}

span {
    flex-grow: 1;
    text-align: right;
    color: var(--danger);
}

span + label {
    margin-left: 2%;
}

input {
    width: 100%;
    box-sizing: border-box;
    flex-grow: 1;
    font-family: var(--font);
    font-size: 1rem;
    color: var(--foreground);
    padding: 4%;
    border: none;
    outline: none;
    background-color: transparent;
}

input.input:focus {
    border: none;
}
</style>

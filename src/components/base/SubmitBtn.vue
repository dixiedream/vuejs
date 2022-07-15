<script setup lang="ts"></script>

<template>
    <button type="submit">
        <slot></slot>
    </button>
</template>

<style scoped>
button {
    height: 60px;
    border: 2px solid transparent;
    border-radius: 10px;
    background: var(--foreground);
    flex-grow: 1;
    cursor: pointer;
    font-family: var(--font);
    font-weight: 600;
    font-size: 1rem;
    align-items: center;
    text-align: center;
    color: var(--white);
    margin-top: 8%;
}
</style>

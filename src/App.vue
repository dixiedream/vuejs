<script setup lang="ts">
import FooterVue from "./components/base/FooterBar.vue";
</script>
<template>
    <div id="app" class="app">
        <router-view />
        <FooterVue />
    </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400;1,700&display=swap");

:root {
    --danger: #ff4b23;
    --white: white;
    --primary: #0584fa;
    --foreground: #3f4c6f;
    --success: #27d66d;
    --background: #ecedf1;
    --warning: #f2ae00;
    --font: "Roboto", sans-serif;
    font-size: medium;
}

* {
    margin: 0 auto;
}

.app {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
}

main {
    flex: 1;
}

header {
    width: 100%;
}

body {
    font-family: var(--font);
    color: var(--foreground);
}

h1 {
    margin: 5% auto;
    font-size: 3rem;
    text-align: center;
}

h2 {
    margin: 4% auto;
}

a {
    color: var(--success);
    font-weight: 600;
    text-decoration: none;
}

a:hover,
a:active {
    color: var(--success);
}

p.lead {
    margin-top: 5%;
}

form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10%;
}

table {
    width: 100%;
}

th {
    height: 3em;
}

select {
    font-size: 1rem;
    font-family: var(--font);
    border-radius: 10px;
    height: 60px;
    background-color: var(--background);
}

.container {
    display: flex;
}
</style>

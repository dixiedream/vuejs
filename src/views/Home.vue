<template>
  <div class="home">
    <img
      alt="Vue logo"
      src="../assets/logo.png"
    />
    <HelloWorld :msg="msg" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue"

const { VITE_TITLE } = import.meta.env

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  data() {
    return {
      msg: `Welcome to ${VITE_TITLE} App`,
    }
  },
}
</script>

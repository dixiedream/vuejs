<template>
  <footer class="container footer p-3 pt-5">
    <b-row class="mx-0" align-h="between">
      <b-col cols="12" class="ftz-12" sm="3">
        <b-row>
          <span class="asfalto">
            <strong class="bold">Filaliscio.it</strong> © 2020 Smanapp
          </span>
        </b-row>

        <b-row class="links" align-h="between">
          <a
            href="https://docs.google.com/document/d/e/2PACX-1vQHlZPzd9d5Wx82jZ3y7KmmYSSAFSsMzy5Zkjjftpz2sOZp3RlsqfMqFBUg4ip5oifRCZb-JnpSjSh8/pub"
            target="_blank"
          >
            <b>Cookie</b>
          </a>

          <a
            href="https://docs.google.com/document/d/e/2PACX-1vQUdijHPLs4Z8QC9BYhIasSHKXkHvYG6iWIGo2wEVGdCTBCEtYMWwqO5tZv0VK3hcxDZ8SlcbLPWg26/pub"
            target="_blank"
          >
            <b>Privacy</b>
          </a>

          <a
            href="https://docs.google.com/document/d/e/2PACX-1vRpmw4XoVU5KxAVRJYEL-LSl3U2hs8veV991IeLxr8a-IAldX2F3iqMIMz-q0Liiq4UOKok9VMdaNqR/pub"
            target="_blank"
          >
            <b>Privacy Partner</b>
          </a>
        </b-row>
      </b-col>
    </b-row>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn-assistance-footer {
  background-color: #40b57b;
  border-radius: 30px;
  border: none;
  padding: 8px 12px;
  color: white;
  font-weight: bold;
  font-size: 14px;
}
.footer {
  margin-top: auto;
  /*position:absolute;*/
  /* text-align:center; */
}
.links {
  font-size: 11px;
}
</style>
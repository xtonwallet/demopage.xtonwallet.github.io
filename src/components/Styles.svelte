<script>
  // we must to prepare code and remove html, body, head directives
  import "./../../node_modules/chota/dist/chota.css";
</script>

<style global>
  :global(input:invalid) {
    border: 2px red solid;
  }
  :global(.text-bold) {
    font-weight: bold;
  }
  :global(.click-pointer) {
    cursor: pointer;
  }
</style>

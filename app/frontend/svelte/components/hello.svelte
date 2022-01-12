<script lang="ts">
  export let name: String;
</script>

<div class="mt-2 max-w-xl text-sm text-gray-500">
  {#if name.length > 0}
    Hello, {name}!
  {/if}
</div>

<script lang="ts">
  import Hello from "../components/hello.svelte";

  export let title: String;
  $: name = "";
</script>

<div>
  <h2 class="text-lg leading-6 font-medium text-gray-900 pt-10 mb-5">
    {title}
  </h2>
  <form data-action="submit:hello-world#greet" class="sm:flex sm:items-center">
    <div class="w-full sm:max-w-xs">
      <input
        id="greeting-text"
        bind:value={name}
        type="text"
        data-target="hello-world.name"
        class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder="Add your name"
      />
    </div>
  </form>
  <Hello {name} />
</div>

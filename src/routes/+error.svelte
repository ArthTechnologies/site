<script lang="ts">
  import Footer from "$lib/components/layout/Footer.svelte";
  import Navbar from "$lib/components/layout/Navbar.svelte";
</script>

<div>
  <slot />
  <div class="hero min-h-screen">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">404 Not Found</h1>
        <p class="py-6">
          This page doesn't exist! If you think this is an error, open an issue
          on our <a
            href="https://codeberg.org/arth/site/issues"
            class="link link-primary">codeberg.</a
          >
        </p>
        <button class="btn btn-primary"><a href="/">Go back</a></button>
      </div>
    </div>
  </div>

</div>

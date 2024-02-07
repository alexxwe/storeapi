<script lang="ts">
    import Footer from '$lib/components/Footer.svelte'
import Header from '$lib/components/Header.svelte'
import '../app.css'
</script>

<Header/>

<main class="bg-neutral-100 text-white">
<!-- <main class="bg-gradient-to-b from-gray-900 to-gray-600 text-white"> -->
    <slot />
</main>

<Footer />
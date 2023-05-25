<script lang="ts">
    import Footer from '$lib/components/Footer.svelte'
import Header from '$lib/components/Header.svelte'
import '../app.css'
</script>

<Header/>

<main class="bg-zinc-700 text-white">
    <slot />
</main>

<Footer />
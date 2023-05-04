<script lang="ts">
    import "../app.css"
    import type { ProductListDto } from "$lib/types/productList.dto"

    /** @type {import('./$types').PageData} */
    export let data: {
        products: Array<ProductListDto>
    }

</script>

<!-- max-w-7xl = 80rem (1280px)  -::::-  max-w-screen-2xl = (1536px)-->
<div class="mx-auto max-w-screen-2xl">  
    <h1 class="text-center font-bold text-3xl">Storwwe page.svelte</h1>
    <ul class="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-auto">
        {#each data.products as product}
        <li class="rounded-lg bg-zinc-400 p-4 text-center" >{product.id}{'--->'}{product.title}</li>
        {/each}
    </ul>
</div>
    



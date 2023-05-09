<script lang="ts">
    import "../app.css"
    import type { ProductListDto } from "$lib/types/productList.dto"
    import { bgColor, shadowColor } from "$lib/utils/colors"
    import Product from "$lib/components/Product.svelte"

    /** @type {import('./$types').PageData} */
    export let data: {
        products: Array<ProductListDto>
    }

</script>

<!-- max-w-7xl = 80rem (1280px)  -::::-  max-w-screen-2xl = (1536px)-->
<div class="mx-auto max-w-screen-2xl">  
    <h1 class="text-center font-bold text-4xl p-8">Storwwe page.svelte</h1>
    <ul class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
        {#each data.products as product}
        <Product {product} />
        {/each}
    </ul>
</div>
    



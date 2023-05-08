<script lang="ts">
    import "../app.css"
    import type { ProductListDto } from "$lib/types/productList.dto"
    import { bgColor } from "$lib/utils/bgColor"

    /** @type {import('./$types').PageData} */
    export let data: {
        products: Array<ProductListDto>
    }

</script>

<!-- max-w-7xl = 80rem (1280px)  -::::-  max-w-screen-2xl = (1536px)-->
<div class="mx-auto max-w-screen-2xl">  
    <h1 class="text-center font-bold text-3xl">Storwwe page.svelte</h1>
    <ul class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
        {#each data.products as product}
        <li class="rounded-lg p-4 text-center {bgColor[product.category]} " >id{product.id}<br>
            title{product.title}<br>
            category{product.category}<br>
            description{product.description}<br>
            price{product.price}<br>
            rating{product.rating}</li>
        {/each}
    </ul>
</div>
    



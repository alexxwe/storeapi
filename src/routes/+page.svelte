<script lang="ts">
    import "../app.css"
    import type { ProductListDto } from "$lib/types/productList.dto"
    import { bgColor, shadowColor } from "$lib/utils/colors"

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
        <li class="rounded-lg p-4 text-center {bgColor[product.category]} {shadowColor[product.category]}">
                <p class="text-xl my-2"># {product.id} {product.title}<br></p>
                <p class="font-bold text-black my-2">{product.category.toUpperCase()}<br></p>
                <img src={product.image} alt={product.title} class=" h-40 my-4 mx-auto">
                <p class="my-2">description{product.description}<br></p>
                <p class="">price{product.price}<br></p>
        </li>
        {/each}
    </ul>
</div>
    



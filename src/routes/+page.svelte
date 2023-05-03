<script lang="ts">
    import type { ProductListDto } from "$lib/types/productList.dto"
    import { onMount } from "svelte"


    

    let productList: ProductListDto[] = []

    async function fetchProduct(){
        const response = await fetch("https://fakestoreapi.com/products")
        const data = await response.json()
        productList = data
    }

    onMount(() => {
        fetchProduct();
    })


</script>



<h1>Storwwe page.svelte</h1>
<ul>
    {#each productList as product}
    <li>{product.id}{'--->'}{product.title}</li>
    {/each}
</ul>
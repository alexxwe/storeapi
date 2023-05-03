<script lang="ts">
    import { onMount } from "svelte"


    interface Product{
        id: number;
        title: string;

    }

    let productList: Product[] = []

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
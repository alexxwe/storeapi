<script lang="ts">
    import type { ProductListDto } from "$lib/types/productList.dto"
    import { bgColor, shadowColor } from "$lib/utils/colors"

    export let product: ProductListDto


</script>

<!-- max-w-7xl = 80rem (1280px)  -::::-  max-w-screen-2xl = (1536px)-->
<div class="flex">  
        <li class="rounded-lg p-4 text-center {bgColor[product.category]} {shadowColor[product.category]}
            animate__animated animate__fadeInDown p-4 text-center">
                <p class="text-xl my-2"># {product.id} {product.title}<br></p>
                <p class="font-bold text-black my-2">{product.category.toUpperCase()}<br></p>
                <img src={product.image} alt={product.title} class=" h-40 my-4 mx-auto ">
                <p class="my-2">description{product.description}<br></p>
                <p class="">price{product.price}<br></p>
        </li>
</div>
<script lang="ts">
    import type { ProductDto } from "$lib/types/product.dto"
    import { bgColor, shadowColor } from "$lib/utils/colors"

    export let product: ProductDto


</script>

<!-- max-w-7xl = 80rem (1280px)  -::::-  max-w-screen-2xl = (1536px)-->
<div class="flex">  
    <a href="/product/{product.id}" class="flex">
        <li class="rounded-lg p-4 pb-12 text-center {bgColor[product.category]} {shadowColor[product.category]}
            animate__animated animate__fadeInDown">
                <p class="text-xl my-2"># {product.id} {product.title}<br></p>
                <p class="font-bold text-black my-2">{product.category.toUpperCase()}<br></p>
                <img src={product.image} alt={product.title} class="rounded-xl h-40 my-4 mx-auto">
                <p class="my-2 ">{product.description}<br></p>
                <div class="absolute bottom-2 left-0 right-0">
                    <span class="text-4xl rounded-lg px-2 py-2 text-black">{product.price}€</span>
                </div>
        </li>
    </a>
</div>

<!-- <style>
    .description {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 3;
      /* Ajusta la altura máxima y el espaciado entre líneas según sea necesario */
      max-height: 3em;
      line-height: 1em;
    }
  </style> -->
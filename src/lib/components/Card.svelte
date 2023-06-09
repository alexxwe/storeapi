<script lang="ts">
    import type { ProductDto } from "$lib/types/product.dto"
    import { bgColor, shadowColor } from "$lib/utils/colors"


    export let product: ProductDto
    
</script>






<div class="container mx-auto">
    
        <li class="bg-white rounded shadow p-4">
          <img src={product.image} alt={product.title} class="w-full mb-2">
          <h2 class="text-lg font-bold mb-1">{product.title}</h2>
          <p class="text-gray-600">{product.price}€</p>
          <p class="text-gray-800 mt-2">{product.description}</p>
          <p class="text-gray-600 mt-2">Category: {product.category}</p>
        </li>
  </div>


<a href="/products/{product.id}"
    class="flex flex-col items-center rounded-lg {bgColor[product.category]} {shadowColor[product.category]}
    animate__animated animate__fadeInDown p-4 text-center">
    <h2 class="mb-2 text-lg font-bold">{product.title} #{product.id}</h2>
    <img src={product.image} alt={product.title} />
    
</a>
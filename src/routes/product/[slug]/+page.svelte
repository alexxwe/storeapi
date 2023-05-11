<script lang="ts">
import type { ProductListDto } from '$lib/types/productList.dto'
import { bgColor, shadowColor } from '$lib/utils/colors'

  /** @type {import('./$types').PageData} */
  export let data: {
  product: ProductListDto
  }

</script>

<div>Prueba de texto</div>


<div class="mx-auto h-full max-w-full" />    
  <div class="flex flex-col items-center rounded-lg {bgColor[data.product.category]} {shadowColor[data.product.category]}} animate__animated animate__fadeInDown p-4 text-center">
    <h2 class="mb-2 text-lg font-bold">{data.product.title}</h2>
    <img src={data.product.image} alt={data.product.title} />
  </div>


<script lang="ts">
import type { ProductListDto } from '$lib/types/productList.dto'
import { bgColor, shadowColor } from '$lib/utils/colors'

  /** @type {import('./$types').PageData} */
  export let data: {
  product: ProductListDto,
  products: Array<ProductListDto>,
  }

  function rating(rate: number) {
  const star = Math.floor(rate);
  const half = rate - star;
  const additionalStar = half > 0.5 ? '⭐' : '';
  const stars = '⭐'.repeat(star) + additionalStar;
  return stars;
}


let index = 0

const next = () => {
    const maxIndex = data.products.length - 5
    index = index === maxIndex ? 0 : index + 5
}

const back = () => {
    const maxIndex = data.products.length - 5
    index = index === 0 ? maxIndex : index - 5
  }

</script>


<main class="bg-gray-200 py-12">
  <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
    <div class="rounded-lg {bgColor[data.product.category]} {shadowColor[data.product.category]}} p-8">
      <div class="flex">
        <div class="flex flex-shrink-0 items-center">
          <img class="w-80 my-2 object-cover rounded-3xl" src={data.product.image} alt={data.product.title} />
        </div>
        <div class="ml-16 my-6">
          <h1 class="text-3xl font-bold mb-6">{data.product.title}</h1>
          <h2 class="text-xl text-black font-bold mb-8">{data.product.category.toUpperCase()}</h2>
          <p class="text-xl mb-8">{data.product.description}</p>

          <div class="flex items-center text-xl font-medium mb-4">
            <span class="mr-4">{rating(data.product.rating.rate)}</span>
            <span class="text-blue-800">({data.product.rating.count}) ratings</span>
          </div>

          <div class="flex items-center mr-4 mb-12">
            <span class="text-black font-bold text-4xl">{data.product.price}€</span>
          </div>
          
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold  text-xl py-2 px-4 rounded">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
    
<div class="mt-8 bg-white rounded">
  <h2 class="text-4xl text-black font-bold mb-4">Related Products</h2>          
  <div class="m-4 flex mx-auto bg-white rounded">
      <ul class="grid grid-cols-5 gap-4 mx-4 my-4">
          {#each data.products.slice(index, index + 5) as product }
          <a href="/product/{product.id}">
              <li class="rounded-lg p-4 pb-12 text-center {bgColor[product.category]} {shadowColor[product.category]}">
                  <p class="text-xl my-2 truncate"># {product.id} {product.title}<br></p>
                  <p class="font-bold text-black my-2">{product.category.toUpperCase()}<br></p>
                  <img src={product.image} alt={product.title} class=" h-40 my-4 mx-auto">
                  <p class="text-3xl rounded-lg text-black">{product.price}€</p>
              </li>
          </a>
          {/each}
      </ul>
  </div>
  <div>
      <button class="px-8 py-2 text-white bg-blue-500 rounded" on:click={back}>
          Back
      </button>
      <button class="px-8 py-2 text-white bg-blue-500 rounded" on:click={next}>
          Next
  </button>
</div>
</div>
</main>

<script lang="ts">
    import type { ProductDto } from '$lib/types/product.dto'
    import { bgColor, shadowColor } from '$lib/utils/colors'

    export let product: ProductDto
</script>

<!-- max-w-7xl = 80rem (1280px)  -::::-  max-w-screen-2xl = (1536px)-->
<div class="flex text-black">
    <a href="/product/{product.id}" class="flex">
        <ul class="flex">
            <li
                class="rounded-lg p-4 pb-12 text-center bg-neutral-100 {shadowColor[product.category]}
            animate__animated animate__fadeInDown"
            >
            <p class="text-xl my-2 truncate-1-line"># {product.id} {product.title}<br /></p>
            <p class="font-bold text-lg my-2">{product.category.toUpperCase()}<br /></p>
            <div class="rounded-lg py-1 bg-white">
                <img src={product.image} alt={product.title} class="rounded-xl h-40 my-4 mx-auto bg-white p-6" />
            </div>
                <p class="my-4 truncate-3-lines">{product.description.charAt(0).toUpperCase() + product.description.slice(1)}<br /></p>
                <div class="absolute bottom-2 left-0 right-0">
                    <span class="text-4xl font-bold rounded-lg px-2 py-2">{product.price}€</span>
                </div>
            </li>
        </ul>
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
<style>
    .truncate-1-line {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        /* Adjust the height according to the font size and line height */
        max-height: calc(1.5em);
        /* Ensure compatibility with older browsers */
        -webkit-line-clamp: 1;
    }
    .truncate-3-lines {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        /* Adjust the height according to the font size and line height */
        max-height: calc(1.5em * 3);
        /* Ensure compatibility with older browsers */
        -webkit-line-clamp: 3;
    }
</style>

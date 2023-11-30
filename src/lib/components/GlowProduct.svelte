<script lang="ts">
    import type { ProductDto } from '$lib/types/product.dto'
    import { bgColor, shadowColor } from '$lib/utils/colors'
    import { onMount } from 'svelte'

    export let product: ProductDto

    let cardBorder: HTMLDivElement

    onMount(() => {
        if (cardBorder) {
            cardBorder.addEventListener('mousemove', handleMouseMove)

            return () => {
                cardBorder.removeEventListener('mousemove', handleMouseMove)
            }
        }
    })

    function handleMouseMove(event: MouseEvent) {
        const cards = cardBorder.querySelectorAll('.card') as NodeListOf<HTMLLIElement>

        cards.forEach(card => {
            const rect = card.getBoundingClientRect()
            const x = event.clientX - rect.left
            const y = event.clientY - rect.top

            ;(card as HTMLLIElement).style.setProperty('--xPos', `${x}px`)
            ;(card as HTMLLIElement).style.setProperty('--yPos', `${y}px`)
        })
    }
</script>

<div class="flex">
    <a href="/product/{product.id}" class="flex">
        <div bind:this={cardBorder} class="cardBorder">
            <li
                class="rounded-lg p-4 pb-12 text-center {bgColor[product.category]} {shadowColor[product.category]}
            animate__animated animate__fadeInDown card"
            >
                <p class="text-xl my-2"># {product.id} {product.title}<br /></p>
                <p class="font-bold text-black my-2">{product.category.toUpperCase()}<br /></p>
                <img src={product.image} alt={product.title} class="rounded-xl h-40 my-4 mx-auto" />
                <p class="my-2">{product.description}<br /></p>
                <div class="absolute bottom-2 left-0 right-0">
                    <span class="text-4xl rounded-lg px-2 py-2 text-black">{product.price}€</span>
                </div>
            </li>
        </div>
    </a>
</div>


<style lang="scss">
  .cardBorder {
    background-color: rgb(46, 46, 46);
    display: flex;
    border-radius: 10px;
    
      &:hover {
          .card {
              background: radial-gradient(35rem circle at var(--xPos) var(--yPos), rgba(240, 0, 241, 0.4), transparent 25%);
          }
      }
      .card {
          // background: radial-gradient(150rem circle at 0 0, rgb(46, 46, 46), transparent 80%);
          border-radius: 0.5rem;
          transition: all 0.15s;
          
      }
  }
</style>


<!-- -------------------------------------------------- -->
<!-- <script lang="ts">
    import type { ProductDto } from '$lib/types/product.dto'
    import { bgColor, shadowColor } from '$lib/utils/colors'
    import { onMount } from 'svelte'

    export let product: ProductDto

    let mouseX = 0
    let mouseY = 0
    let scrollY = 0

    onMount(() => {
        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('scroll', handleScroll)

        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('scroll', handleScroll)
        }
    })

    function handleMouseMove(event: MouseEvent) {
        mouseX = event.clientX
        mouseY = event.clientY + scrollY
    }

    function handleScroll() {
        scrollY = window.scrollY
    }
</script>

<div class="glow-circle" style="left: {mouseX}px; top: {mouseY}px;"></div>
<div class="flex relative">
    <a href="/product/{product.id}" class="flex product relative">
        <li
            class="rounded-lg p-4 pb-12 text-center {bgColor[product.category]} {shadowColor[product.category]}
      animate__animated animate__fadeInDown"
        >
            <p class="text-xl my-2"># {product.id} {product.title}<br /></p>
            <p class="font-bold text-black my-2">{product.category.toUpperCase()}<br /></p>
            <img src={product.image} alt={product.title} class="rounded-xl h-40 my-4 mx-auto" />
            <p class="my-2">{product.description}<br /></p>
            <div class="absolute bottom-2 left-0 right-0">
                <span class="text-4xl rounded-lg px-2 py-2 text-black">{product.price}€</span>
            </div>
        </li>
    </a>
</div>

<style>
    .glow-circle {
        position: absolute;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: rgb(0, 10, 255);
        transform: translate(-50%, -50%);
        pointer-events: none;
        mix-blend-mode: overlay;
        transition:
            transform 0.2s,
            background-color 0.2s;
        opacity: 90;
    }

    .product:hover .glow-circle {
        transform: scale(1.5);
        background-color: rgba(255, 255, 255, 0);
    }
</style> -->



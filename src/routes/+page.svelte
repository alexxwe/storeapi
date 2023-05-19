<script lang="ts">
    import "../app.css"
    import type { ProductListDto } from "$lib/types/productList.dto"
    import { userColor } from "$lib/utils/colors"
    import Product from "$lib/components/Product.svelte"
    import type { UserDto } from "$lib/types/users.dto"

    /** @type {import('./$types').PageData} */
    export let data: {
        products: Array<ProductListDto>,
        users: Array<UserDto>,
    }



    let search = ''
    let categories: string[] = []

    async function handleSearch() {
        if (!search) {
        window.location.reload();
        return;
    }        
        const response = await fetch(`https://fakestoreapi.com/products/category/${encodeURIComponent(search).toLowerCase()}`)
        const searchData = await response.json()
        data.products = searchData
    }

    async function fetchCategories() {
        const categoryResponse = await fetch('https://fakestoreapi.com/products/categories')
        categories = await categoryResponse.json()
    }
    fetchCategories()
    
    //users
    let activeUser: UserDto = data.users[0]

    export function handleUser(e: any ){
        const selectedIndex = e.target.selectedIndex
        activeUser = data.users[selectedIndex]
        document.body.classList.remove(...Object.values(userColor));
        document.body.classList.add(userColor[activeUser.id]);    
    } 
    
</script>

<header class="flex justify-between items-center p-8">
    <!-- max-w-7xl = 80rem (1280px)  -::::-  max-w-screen-2xl = (1536px)-->
<div>
    <input
            type="text"
            placeholder=" Category Search"
            class="rounded border px-1 text-black "
            bind:value={search}
            on:keydown={event => {
                if (event.key === 'Enter') {
                    handleSearch()
                }
            }}
            list="categories-list"
        />
        <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
        on:click={handleSearch}
    >
        Search
    </button>

        <datalist id="categories-list">
            {#each categories as category}
            <option value={category} />
            {/each}
        </datalist>
</div>

    <h1 class="font-bold text-4xl">Storwe</h1>

    <div class="flex items-center">
        <p class="mr-8">{activeUser?.username || "No user Selected"}</p>
        <select class="rounded bg-zinc-400 border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 shadow leading-tight focus:outline-none focus:shadow-outline" 
        on:change="{handleUser}">
        {#each data.users as user}
            <option value="{user.id}">{user.username}</option>
        {/each}
        </select>
    </div>
</header>




<div class="mx-auto max-w-screen-2xl">  
    <!-- <h1 class="text-center font-bold text-4xl p-8">Storwe page.svelte</h1> -->
    {#if data.products.length === 0}
    <p class="text-center font-bold text-4xl p-4">
        ERROR: Categoria no disponible
    </p>
    {:else}
    <ul class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
        {#each data.products as product}
        <Product {product} />
        {/each}
    </ul>
    {/if}
</div>
    



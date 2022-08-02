<script setup>
    import { ref } from 'vue'
  
    let isSearchOpen = ref(false)
    const searchList = ref([
        {
            img: '/images/products/headphone-1.jpg',
            name: 'Headphone 1',
            tech: 'Gadget',
            price: 300,
            badge: 'Sale'
        },
        {
            img: '/images/products/headphone-2.jpg',
            name: 'Headphone 2',
            tech: 'Gadget',
            price: 200,
            badge: 'New'
        },
        {
            img: '/images/products/headphone-4.jpg',
            name: 'Headphone 3',
            tech: 'Gadget',
            price: 100,
            badge: 'Sale'
        },
        {
            img: '/images/products/headphone-3.jpg',
            name: 'Headphone 4',
            tech: 'Gadget',
            price: 150,
            badge: 'New'
        },
    ])
    
</script>

<template>
    
    <div class=" ">
      
       <div class=" flex justify-center items-center px-4 sm:px-6 lg:px-8">


        <div class="relative">

          <input   type="text" class="h-14 w-96 pr-8 bg-gray-100 pl-5 rounded z-0 focus:shadow focus:outline-none" placeholder="Search anything...">

          <div class="absolute top-4 right-3">
         <i class="fas fa-search text-gray-500"></i>
         
          </div>
          
        </div>


       
       </div>
    </div>
    <div 
        class="search-ui" 
        :class="{ 'open': isSearchOpen }"
    >
        <div class="container mx-auto">
            <div class="flex justify-between items-center mb-8">
               Logo

                <button class="btn bg-purple-500" @click="isSearchOpen = false">
                    <i class="i-Close-Window text-xl text-white"></i>
                </button>


                
            </div>
            <input class="focus:outline-none text-6xl mb-7" type="text" placeholder="Type Here" />

            <div>
                <p class="text-gray-500 mb-4">Search Result</p>


                <!-- search list  -->
                <div v-for="(item, index) in searchList" :key="index" class="flex overflow-hidden flex-row mb-6 shadow-md rounded-xl">
                    <div class="flex">
                        <img class="w-24 object-cover" :src="item.img" alt="" />
                    </div>
                    <div class="flex pl-2 flex-1">
                        <div class="flex flex-grow flex-col self-center justify-between lg:items-center lg:flex-row">
                            <a class="hover:text-purple-500" href="">
                                {{item.name}}</a>
                            <p>{{item.tech}}</p>
                            <p class="mr-2 text-gray-500">${{item.price}}
                                <span class="line-through">$400</span>
                            </p>
                            <div v-if="item.badge == 'Sale'">
                                <span class="rounded text-white bg-red-500 font-bold text-xs leading-4 py-1 px-2 mr-5">{{item.badge}}</span>
                            </div>
                            <div v-else>
                                <span class="rounded text-white bg-purple-500 font-bold text-xs leading-4 py-1 px-2 mr-5">{{item.badge}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          

        </div>
    </div>
    
    
</template>

<style lang="scss" scoped>
    .search-ui {
            position: fixed;
            top: -200%;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            padding: 0.75rem 1.5rem 1.5rem 4.5rem;
            z-index: 9999;
            background-color: #fff;
            max-width: 100%;
            height: 100vh;
            opacity: 0;
            transition: all 0.3s ease-in;
            visibility: hidden;
            overflow: auto;
            &.open {
                opacity: 1;
                visibility: visible;
                top: 0;
                transition: all 0.3s ease-in;
            }
    }
</style>
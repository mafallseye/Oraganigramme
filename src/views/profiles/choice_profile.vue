<!-- <template>
   <Breadcrumbs parentTitle="Profiles" subParentTitle="" />
<div class="py-1">  
    <div class="container m-auto px-6 text-gray-500 md:px-12 xl:px-0">
        <div class="mx-auto grid gap-6 md:w-3/5  lg:w-3/5 lg:w-full lg:grid-cols-2">
            <div class="bg-white rounded-2xl shadow-xl px-8 py-12 sm:px-12 lg:px-8 transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-105  duration-150">
                <div class="mb-12 space-y-4">
                    <h3 class="text-2xl font-semibold text-blue-indigo-500">Profil Métier</h3>
                    <p class="mb-6">Obcaecati, quam? Eligendi, nulla numquam natus laborum porro at cum, consectetur ullam tempora ipsa iste officia sed officiis! Incidunt ea animi officiis.</p>
                    <a href="#" class="block font-medium text-blue-indigo-500"> <router-link to="profile-metier">Voir plus</router-link></a>
                </div>
                <img src="/images/pm1.jpg" class="w-2/3 ml-auto -mb-12" alt="illustration" loading="lazy" width="900" height="600">
            </div>
            <div class="bg-white rounded-2xl shadow-xl px-8 py-12 sm:px-12 lg:px-8 transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-105  duration-150">
                <div class="mb-12 space-y-4">
                    <h3 class="text-2xl font-semibold text-blue-indigo-500">Profil Technique</h3>
                    <p class="mb-6">Obcaecati, quam? Eligendi, nulla numquam natus laborum porro at cum, consectetur ullam tempora ipsa iste officia sed officiis! Incidunt ea animi officiis.</p>
                    <a href="#" class="block font-medium text-blue-indigo-500"> <router-link to="technical-profile">Voir plus</router-link></a>
                </div>
                <img src="/images/pt.jpg" class="w-2/3 ml-auto" alt="illustration" loading="lazy" width="900" height="600">
            </div>
           
        </div>
    </div>
</div>
                                

   
</template>

<script>
import Breadcrumbs from '@/components/Breadcrumbs.vue'

export default {
    components: {
        Breadcrumbs,
    },
}
</script>

<style lang="scss" scoped>
.bg-cyan-900 {
    background-color: rgb(22 78 99);
}

/* for CodePen viewing */
</style>
 -->


<template>
    <Breadcrumbs parentTitle="Profils" subParentTitle="" />

    <div
        class="w-full py-5 rounded-lg  sm:px-0"
    >
        <div class="m-5">
            <TabGroup>
                <TabList class="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                    <Tab
                        v-for="profile in pm"
                        as="template"
                        :key="profile"
                        v-slot="{ selected }"
                    >
                        <button
                            :class="[
                                'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                selected
                                    ? 'bg-blue-indigo-700 shadow text-white'
                                    : 'text-white hover:bg-blue-400/[0.12] hover:text-midnight',
                            ]"
                        >
                            {{ profile.name }}
                        </button>
                    </Tab>
                    <Tab
                        v-for="profile in pt"
                        as="template"
                        :key="profile"
                        v-slot="{ selected }"
                    >
                        <button
                            :class="[
                                'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-white',
                                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                selected
                                    ? 'bg-blue-indigo-700 shadow'
                                    : 'text-white hover:bg-blue-400/[0.12] hover:text-midnight',
                            ]"
                        >
                            {{ profile.name }}
                        </button>
                    </Tab>
                </TabList>

                <TabPanels class="mt-2">
                    <TabPanel
                        v-for="(template, idx) in Object.values(pm)"
                        :key="idx"
                        :class="[
                            'rounded-xl bg-white p-3',
                            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                        ]"
                    >
                     <ProfilMetier class="mb-2" />
                    </TabPanel>
                     <TabPanel
                        v-for="(template, idx) in Object.values(pt)"
                        :key="idx"
                        :class="[
                            'rounded-xl bg-white p-3',
                            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                        ]"
                    >
                     <TechnicalProfil />
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </div>
    </div>
</template>

<script>
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import ProfilMetier from './profile_metier.vue'
import TechnicalProfil from './technical_profile.vue'
import { ref } from 'vue'

export default {
    components: {
        Breadcrumbs,
        ProfilMetier,
        TechnicalProfil,
    },
   data() {
        return {
            pm: [
                {
                  
                    name: 'Profile Métiers',
                  
                },
            ],
            pt: [
                {
                   
                    name: 'Profile Techniques',
                   
                },
            ],
        }
    },
}
</script>

<script setup>
import { ref } from 'vue'

import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import BaseCard from '@/components/Base/BaseCard.vue'
</script>

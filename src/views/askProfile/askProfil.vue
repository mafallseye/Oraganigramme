<script>
import {
    dashboardOne,
    dashboardTwo,
    splineAreaWidgetTwo,
    splineAreaWidgetThree,
} from '@/data/dashboard.v1.js'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import HeaderSearch from '@/components/HeaderSearch.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
    components: {
        HeaderSearch,
        Breadcrumbs,
    },
    data() {
        return {
            hasTrue: false,
            hasFalse: false,
            hasFalseBis: false,
            hasTrueBis: false,
            pending: [],
            nom: '',
            id: '',
            etat: 'approved',
            etat1: 'rejected',
            ask: [],
            roleId: '',
            demande: '',
            request: ['ask', 'remove'],
            selectedAsk: [],
            selectedRole:[],
            isLoading: false,
              pageSize: 10,
            currentPage: 1,
            currentSort: 'name',
            currentSortDir: 'asc',
            partLenth: 10,
            showing: 1,
            filter: '',
            selectectedProfile:[]
        }
    },
 computed: {
      
        ...mapGetters('askProfile', ['getPending']),

        filteredRows() {
            return this.pending.filter((row, index) => {
               
                    const profile =row.toString().toLowerCase()

                const searchTerm = this.filter.toLowerCase()

                return profile.includes(searchTerm)
            }) .filter((row, index) => {
                    let start = (this.currentPage - 1) * this.pageSize
                    let end = this.currentPage * this.pageSize
                    if (index >= start && index < end) return true
                })
              
                .sort((a, b) => {
                    let modifier = 1
                    if (this.currentSortDir === 'desc') modifier = -1
                    if (a[this.currentSort] < b[this.currentSort])
                        return -1 * modifier
                    if (a[this.currentSort] > b[this.currentSort])
                        return 1 * modifier
                    return 0
                })
        },
    },
    methods: {
        ...mapActions('askProfile', [
            'approversAction',
            'askAction',
            'profileAction',
        ]),
             nextPage() {
            console.log('next')
            if (this.currentPage * this.pageSize < this.pending.length) {
                this.currentPage++
            }
        },
        prevPage() {
            console.log('prev')
            if (this.currentPage > 1) {
                this.currentPage--
            }
        },

        sort(s) {
            //if s == current sort, reverse
            if (s === this.currentSort) {
                this.currentSortDir =
                    this.currentSortDir === 'asc' ? 'desc' : 'asc'
            }
            this.currentSort = s
        },

        showPending(data) {
          this.selectectedProfile=data
            if (this.selectedAsk.length > 0) {
                this.selectedAsk.splice(0, this.selectedAsk.length)
            }
           
            for (
                let index = 0;
                index < data.technical_profiles_state.length;
                index++
            ) {
                this.selectedAsk.push(data.technical_profiles_state[index])
            }
            console.log(data)
            console.log(this.selectedAsk)
        },
        getAskRole() {
            this.isLoading = true
            let businessRoleId = {
                type_of_request: this.demande,
                business_role_ids: [this.roleId],
            }

            this.profileAction(businessRoleId)
                .then((response) => {
                    console.log(response)
                    this.isLoading = false

                    this.$moshaToast('Demande en cours de traitement', {
                        showIcon: true,
                        position: 'top-center',
                        type: 'success',
                    })
                    setTimeout(() => this.$router.go(), 5000)
                })
                .catch((error) => {
                    console.log(error)
                    this.isLoading = false
                    this.$moshaToast(
                        'Une erreur est survenue! Veillez réessayer',
                        {
                            showIcon: true,
                            position: 'top-center',
                            type: 'danger',
                        }
                    )
                })
        },
        getProfileRole() {
            this.askAction()
                .then((response) => {
                    // console.log(response.data)
                    this.ask = response.data
                })
                .catch((error) => {
                    console.log(error)
                })
        },

        askPending() {
            this.isLoading = true
            this.approversAction()
                .then((response) => {
                    console.log('response.data')
                    this.pending = this.getPending
                    console.log( this.pending );
                    this.isLoading = false
                })
                .catch((error)=>{
                    console.log(error);
                })
               
        },
    },
    created() {
        this.askPending()
        this.getProfileRole()
    },
}
</script>
<script setup>
import {
    Listbox,
    ListboxLabel,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
} from '@headlessui/vue'

import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid'
</script>

<template>
    <div class="container mx-auto">
        <Breadcrumbs parentTitle="Demande service" subParentTitle="Demande" />

        <div class="grid grid-cols-12 gap-5">
            <div class="col-span-12">
                <BaseCard>
                    <template v-slot:cardHeader>
                        <div class="card-header">
                            <label
                                for="my-modal-5"
                                class="btn glass modal-button bg-midnight hover:bg-blue-indigo-700 gap-2"
                            >
                                <i class="fa-solid fa-plus"></i>
                                Demande service
                            </label>
                             <div class="inline-flex mt-2">
                                <div class="">
                                    <div
                                        class="flex justify-center items-center px-4 sm:px-6 lg:px-8"
                                    >
                                        <div class="relative">
                                            <label
                                                for="default-search"
                                                class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
                                                >Search</label
                                            >
                                            <div class="relative">
                                                <div
                                                    class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
                                                >
                                                    <svg
                                                        aria-hidden="true"
                                                        class="w-5 h-5 text-gray-500 dark:text-gray-400"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                                        ></path>
                                                    </svg>
                                                </div>
                                                <input
                                                    v-model="filter"
                                                    type="search"
                                                    id="default-search"
                                                    class="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="rechercher Nom..."
                                                    required=""
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- modal add -->

                        <input
                            type="checkbox"
                            id="my-modal-5"
                            class="modal-toggle"
                        />
                        <div class="modal">
                            <div class="modal-box relative">
                                <label
                                    for="my-modal-5"
                                    class="btn btn-sm btn-circle absolute right-2 top-2"
                                    >✕</label
                                >

                                <h3 class="text-lg font-bold">
                                    Ajouter ou supprimer une demande
                                </h3>
                                <div class="block p-6 max-w-md">
                                    <form>
                                        <div class="grid grid-cols-2 gap-4">
                                            <div class="form-group mb-6">
                                                <label for=""
                                                    >Demande ou
                                                    suppression</label
                                                >
                                                <div class="">
                                                    <Listbox v-model="demande">
                                                        <div
                                                            class="relative mt-1"
                                                        >
                                                            <ListboxButton
                                                                class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-midnight sm:text-sm"
                                                            >
                                                                <span
                                                                    class="block truncate"
                                                                    >{{
                                                                        demande
                                                                    }}</span
                                                                >
                                                                <span
                                                                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                                                                >
                                                                    <SelectorIcon
                                                                        class="h-5 w-5 text-gray-400"
                                                                        aria-hidden="true"
                                                                    />
                                                                </span>
                                                            </ListboxButton>

                                                            <transition
                                                                leave-active-class="transition duration-100 ease-in"
                                                                leave-from-class="opacity-100"
                                                                leave-to-class="opacity-0"
                                                            >
                                                                <ListboxOptions
                                                                    class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                                                                >
                                                                    <ListboxOption
                                                                        v-slot="{
                                                                            active,
                                                                            selected,
                                                                        }"
                                                                        v-for="(
                                                                            ask,
                                                                            index
                                                                        ) in request"
                                                                        :key="
                                                                            index
                                                                        "
                                                                        :value="
                                                                            ask
                                                                        "
                                                                        as="template"
                                                                    >
                                                                        <li
                                                                            :class="[
                                                                                active
                                                                                    ? 'bg-blue-200 text-midnight'
                                                                                    : 'text-gray-900',
                                                                                'relative cursor-default select-none py-2 pl-10 pr-4',
                                                                            ]"
                                                                        >
                                                                            <span
                                                                                :class="[
                                                                                    selected
                                                                                        ? 'font-medium'
                                                                                        : 'font-normal',
                                                                                    'block truncate',
                                                                                ]"
                                                                                >{{
                                                                                    ask
                                                                                }}</span
                                                                            >
                                                                            <span
                                                                                v-if="
                                                                                    selected
                                                                                "
                                                                                class="absolute inset-y-0 left-0 flex items-center pl-3 text-midnight"
                                                                            >
                                                                                <CheckIcon
                                                                                    class="h-5 w-5"
                                                                                    aria-hidden="true"
                                                                                />
                                                                            </span>
                                                                        </li>
                                                                    </ListboxOption>
                                                                </ListboxOptions>
                                                            </transition>
                                                        </div>
                                                    </Listbox>
                                                </div>
                                            </div>
                                            <div class="form-group mb-6">
                                                <label for=""
                                                    >Profile metier</label
                                                >
                                                <div class="">
                                                    <Listbox v-model="roleId">
                                                        <div
                                                            class="relative mt-1"
                                                        >
                                                            <ListboxButton
                                                                class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-midnight sm:text-sm"
                                                            >
                                                                <span
                                                                    class="block truncate"
                                                                    >{{
                                                                        roleId
                                                                    }}</span
                                                                >
                                                                <span
                                                                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                                                                >
                                                                    <SelectorIcon
                                                                        class="h-5 w-5 text-gray-400"
                                                                        aria-hidden="true"
                                                                    />
                                                                </span>
                                                            </ListboxButton>

                                                            <transition
                                                                leave-active-class="transition duration-100 ease-in"
                                                                leave-from-class="opacity-100"
                                                                leave-to-class="opacity-0"
                                                            >
                                                                <ListboxOptions
                                                                    class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                                                                >
                                                                    <ListboxOption
                                                                        v-slot="{
                                                                            active,
                                                                            selected,
                                                                        }"
                                                                        v-for="(
                                                                            profile,
                                                                            index
                                                                        ) in ask"
                                                                        :key="
                                                                            index
                                                                        "
                                                                        :value="
                                                                            profile.profil_role_id
                                                                        "
                                                                        as="template"
                                                                    >
                                                                        <li
                                                                            :class="[
                                                                                active
                                                                                    ? 'bg-blue-200 text-midnight'
                                                                                    : 'text-gray-900',
                                                                                'relative cursor-default select-none py-2 pl-10 pr-4',
                                                                            ]"
                                                                        >
                                                                            <span
                                                                                :class="[
                                                                                    selected
                                                                                        ? 'font-medium'
                                                                                        : 'font-normal',
                                                                                    'block truncate',
                                                                                ]"
                                                                                >{{
                                                                                    profile.name
                                                                                }}</span
                                                                            >
                                                                            <span
                                                                                v-if="
                                                                                    selected
                                                                                "
                                                                                class="absolute inset-y-0 left-0 flex items-center pl-3 text-midnight"
                                                                            >
                                                                                <CheckIcon
                                                                                    class="h-5 w-5"
                                                                                    aria-hidden="true"
                                                                                />
                                                                            </span>
                                                                        </li>
                                                                    </ListboxOption>
                                                                </ListboxOptions>
                                                            </transition>
                                                        </div>
                                                    </Listbox>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            @click="getAskRole()"
                                            type="button"
                                            class="mt-4 btn btn-block bg-midnight hover:bg-blue-indigo-700"
                                        >
                                            Demande service
                                        </button>
                                        <div
                                            v-if="isLoading"
                                            class="flex justify-center items-center pt-2"
                                        >
                                            <div role="status">
                                                <svg
                                                    aria-hidden="true"
                                                    class="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-midnight"
                                                    viewBox="0 0 100 101"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                        fill="currentColor"
                                                    ></path>
                                                    <path
                                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                        fill="currentFill"
                                                    ></path>
                                                </svg>
                                            </div>
                                            <span class="">Traitement...</span>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <!-- modal add -->
                    </template>
                    <div v-if="this.filteredRows.length === 0" class="mx-auto">
                        <figure class="px-10 pt-10">
                            <i class="fa-solid fa-users-slash text-2xl"></i>
                        </figure>
                        <div class="card-body items-center text-center">
                            <h2 class="card-title">
                                Aucune demande pour l'instant
                            </h2>
                        </div>
                    </div>
                    <div
                        v-else
                        class="block w-full overflow-x-auto whitespace-nowrap borderless hover"
                    >
                        <div
                            class="dataTable-wrapper dataTable-loading no-footer fixed-columns"
                        >
                            <div
                                class="dataTable-container block w-full overflow-x-auto whitespace-nowrap borderless hover"
                            >
                                <div
                                    v-if="isLoading"
                                    class="flex justify-center items-center pt-2"
                                >
                                    <div role="status">
                                        <svg
                                            aria-hidden="true"
                                            class="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-midnight"
                                            viewBox="0 0 100 101"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                fill="currentColor"
                                            ></path>
                                            <path
                                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                fill="currentFill"
                                            ></path>
                                        </svg>
                                    </div>
                                    <span class="">Chargement...</span>
                                </div>

                                <table
                                    class="table-3 dataTable-table max-w-full w-full"
                                >
                                    <thead>
                                        <tr class="">
                                           
                                            <th
                                                class="text-left border-b pb-3 mb-3 text-gray-500 font-semibold"
                                            >
                                                profile metier
                                            </th>
                                             <th
                                                class="text-left border-b pb-3 mb-3 text-gray-500 font-semibold"
                                            >
                                                Date de creation
                                            </th>
                                            <th
                                                class="text-left border-b pb-3 mb-3 text-gray-500 font-semibold"
                                            >
                                                date d'expiration
                                            </th>

                                            <th
                                                class="text-left border-b pb-3 mb-3 text-gray-500 font-semibold"
                                            >
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody
                                        v-for="(ask, index) in filteredRows"
                                        :key="index"
                                    >
                                        <tr
                                            v-for="(
                                                role, index
                                            ) in ask.role_requested"
                                            :key="index"
                                            class="hover:bg-gray-100 cursor-pointer"
                                        >
                                           
                                            <td class="py-5">
                                                <span class=" badge bg-midnight">
                                                    {{ role.name }}</span
                                                >
                                            </td>
                                             <td class="text-lg">
                                                <span >
                                                    {{ ask.creation_date }}
                                                </span>
                                            </td>
                                            <td class="text-lg">
                                                <div class="flex">
                                                    <span
                                                       
                                                    >
                                                        {{
                                                            ask.expiration_date
                                                        }}
                                                    </span>
                                                </div>
                                            </td>

                                            <td class="py-5">
                                                <!-- {{ temm.state }} -->

                                                <label
                                                    @click="showPending(role)"
                                                    for="my-modal-3"
                                                    class="modal-a p-2"
                                                >
                                                    <i
                                                        class="fa-regular fa-eye text-xl hover:text-blue-400 text-midnight"
                                                    ></i>
                                                </label>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="">
                                 <div
                                    class="flex justify-center items-center pt-4"
                                >
                                    <div class="flex flex-col items-center">
                                        <!-- Help text -->
                                        <span
                                            class="text-sm text-gray-700 dark:text-gray-400"
                                        >
                                            Page
                                            <span
                                                class="font-semibold text-white dark:text-white"
                                                ><span class="badge">{{
                                                    currentPage
                                                }}</span></span
                                            >
                                        </span>
                                        <!-- Buttons -->
                                        <div class="inline-flex mt-2 xs:mt-0">
                                            <button
                                                @click="prevPage"
                                                class="py-2 px-4 text-sm font-medium text-white bg-midnight rounded-l hover:bg-blue-700"
                                            >
                                                Précedent
                                            </button>
                                            <button
                                                @click="nextPage"
                                                class="py-2 px-4 text-sm font-medium text-white bg-midnight rounded-r border-0 border-l border-gray-700 hover:bg-blue-700"
                                            >
                                                Suivant
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <nav class="dataTable-pagination">
                                    <ul class="dataTable-pagination-list"></ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </BaseCard>
            </div>
        </div>
        <input type="checkbox" id="my-modal-3" class="modal-toggle" />
        <div class="modal">
            <div class="modal-box relative">
                <label
                    for="my-modal-3"
                    class="btn btn-sm btn-circle absolute right-2 top-2"
                    >✕</label
                >
  <div v-if="this.selectedAsk.length === 0" class="mx-auto">
                        <figure class="px-10 pt-10">
                            <!-- <i class="fa-solid fa-users-slash text-2xl"></i> -->
                        </figure>
                        <div class="card-body items-center text-center">
                            <h2 class="card-title">
                                Aucune demande pour ce profile
                            </h2>
                        </div>
                    </div>
                <div class="block p-6 max-w-md" v-else>
                    <table class="table-3 dataTable-table max-w-full w-full">
                        <thead>
                            <tr class="">
                                <th
                                    class="text-left border-b pb-3 mb-3 text-gray-500 font-semibold"
                                >
                                    Profile technique
                                </th>
                                <th
                                    class="text-left border-b pb-3 mb-3 text-gray-500 font-semibold"
                                >
                                    Etat
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(profile, index) in this.selectedAsk"
                                :key="index"
                                class="hover:bg-gray-100 cursor-pointer"
                            >
                                <td class="text-xs">
                                    <span class="badge bg-midnight">
                                        {{ profile.name }}
                                    </span>
                                </td>
                                <td class="py-5">
                                    <div class="flex">
                                        <span >
                                            {{ profile.state }}
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

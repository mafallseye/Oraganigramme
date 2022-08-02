<template>
    <div>
        <Breadcrumbs parentTitle="Rôles" subParentTitle="View-Rôles" />
        <div class="grid grid-cols-12 gap-5">
            <div class="col-span-12">
                <BaseCard>
                    <template v-slot:cardHeader>
                        <div class="card-header">
                            <label
                                for="my-modal-3"
                                class="btn glass modal-button ml-4 bg-midnight hover:bg-blue-indigo-700 gap-2"
                            >
                                <i class="fa-solid fa-plus"></i>
                                Ajouter
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
                        </div>

                        <!-- modal add -->

                        <input
                            type="checkbox"
                            id="my-modal-3"
                            class="modal-toggle"
                        />
                        <div class="modal">
                            <div class="modal-box relative">
                                <label
                                    for="my-modal-3"
                                    class="btn btn-sm btn-circle absolute right-2 top-2"
                                    >✕</label
                                >
                                <h3 class="text-lg font-bold">
                                    Ajouter un Rôle
                                </h3>
                                <div class="block p-6 max-w-md">
                                    <form>
                                        <div class="">
                                            <div class="form-group mb-6">
                                                <input
                                                    v-model="name"
                                                    type="text"
                                                    class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                    id=""
                                                    placeholder="Nom du rôle"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <label
                                            for="my-modal-3"
                                            @click="createRole()"
                                            class="btn btn-block bg-midnight hover:bg-blue-indigo-700"
                                            >Soumettre</label
                                        >
                                    </form>
                                </div>
                            </div>
                        </div>
                        <!-- modal add -->
                    </template>
                    <div
                        class="block w-full overflow-x-auto whitespace-nowrap borderless hover"
                    >
                        <div
                            class="dataTable-wrapper dataTable-loading no-footer fixed-columns"
                        >
                            <div
                                class="dataTable-container block w-full overflow-x-auto whitespace-nowrap borderless hover"
                            >
                                <div
                                    v-if="this.filteredRows.lenght === 0"
                                    class="mx-auto"
                                >
                                    <figure class="px-10 pt-10">
                                        <i
                                            class="fa-solid fa-users-slash text-2xl"
                                        ></i>
                                    </figure>
                                    <div
                                        class="card-body items-center text-center"
                                    >
                                        <h2 class="card-title">
                                            Aucun rôle disponible
                                        </h2>
                                    </div>
                                </div>
                                <table
                                    v-else
                                    class="table-3 dataTable-table max-w-full w-full"
                                >
                                    <thead>
                                        <tr class="">
                                            <th
                                                class="text-left border-b pb-3 mb-3 text-gray-500 font-bold"
                                            >
                                                NOM
                                            </th>

                                            <th
                                                class="text-left border-b pb-3 mb-3 text-gray-500 font-bold"
                                            >
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody v-if="!isLoadind">
                                        <tr
                                            class="hover:bg-gray-100 cursor-pointer"
                                            v-for="(
                                                role, index
                                            ) in filteredRows"
                                            :key="`role-${index}`"
                                            v-bind:value="role"
                                        >
                                            <td class="py-5 text-left text-xl">
                                                <span class="badge bg-midnight">
                                                    {{ role }}</span
                                                >
                                            </td>

                                            <td class="py-5">
                                                <label
                                                    for="delete-modal"
                                                    class="modal-button mr-3"
                                                    @click="getRole(role)"
                                                >
                                                    <i
                                                        class="fa-solid fa-trash text-xl text-red-500 hover:text-red-400"
                                                    ></i
                                                ></label>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
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
                                                    class="font-semibold text-gray-900 dark:text-white"
                                                    >{{ currentPage }}</span
                                                >
                                            </span>
                                            <!-- Buttons -->
                                            <div
                                                class="inline-flex mt-2 xs:mt-0"
                                            >
                                                <button
                                                    @click="prevPage"
                                                    class="py-2 px-4 text-sm font-medium text-white bg-midnight rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                                >
                                                    Précedent
                                                </button>
                                                <button
                                                    @click="nextPage"
                                                    class="py-2 px-4 text-sm font-medium text-white bg-midnight rounded-r border-0 border-l border-gray-700 hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                                >
                                                    Suivant
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <nav class="dataTable-pagination">
                                        <ul
                                            class="dataTable-pagination-list"
                                        ></ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </BaseCard>
            </div>
        </div>
        <!-- delete modal -->

        <input type="checkbox" id="delete-modal" class="modal-toggle" />
        <div class="modal modal-bottom sm:modal-middle">
            <div class="modal-box">
                <label
                    for="delete-modal"
                    class="btn btn-sm btn-circle absolute right-2 top-2"
                    >✕</label
                >
                <h3 class="font-bold text-red-400 text-lg">Attention!</h3>
                <p class="py-4">
                    Vous êtes sur le point de suprimmer cet élément!!!
                </p>
                <div class="modal-action">
                    <label
                        for="delete-modal"
                        @click="deleteRole(name)"
                        class="btn btn-error text-white"
                    >
                        Supprimer
                    </label>
                </div>
            </div>
        </div>
        <!-- end delete modal -->
    </div>
</template>

<script>
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import HeaderSearch from '@/components/HeaderSearch.vue'
import { mapActions, mapGetters } from 'vuex'
import axios from 'axios'

export default {
    components: {
        Breadcrumbs,
        HeaderSearch,
    },
    data() {
        return {
            roles: [],
            roleName: '',
            visible: '',
            isLoading: false,
            pageSize: 10,
            currentPage: 1,
            currentSort: 'name',
            currentSortDir: 'asc',
            partLenth: 10,
            showing: 1,
            filter: '',
            name: '',
        }
    },

    computed: {
        ...mapGetters('role', ['getAllRole']),

        filteredRows() {
            return this.roles.filter((row, index) => {
                const role = row.toString().toLowerCase()

                const searchTerm = this.filter.toLowerCase()

                return role.includes(searchTerm)
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
        ...mapActions('role', [
            'getAllRoleAction',
            'deleteRoleAction',
            'createRoleAction',
        ]),

        roleUsers() {
            this.isLoading = true
            const headers = {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }

            this.getAllRoleAction({ headers: headers }).then((response) => {
                this.roles = this.getAllRole['data']
                this.isLoading = false
            })
        },

        getRole(data) {
            this.name = data
        },

        deleteRole(data) {
            const headers = {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }
            this.deleteRoleAction({
                data: {
                    name: data,
                },
                headers: headers,
            })
                .then((res) => {
                    this.$moshaToast('Rôle supprimé avec succès', {
                        showIcon: true,
                        type: 'success',
                    })
                    setTimeout(() => this.$router.go(), 5000)
                })
                .catch((error) => {
                    this.$moshaToast(
                        'Une erreur est survenue! Veillez réessayer',
                        { showIcon: true, type: 'danger' }
                    )
                })
        },

        createRole() {
            const headers = {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }
            this.createRoleAction({
                name: this.name,
                headers: headers,
            })
                .then((response) => {
                    console.log(response.data)
                    this.$moshaToast('Rôle créer avec succès', {
                        showIcon: true,
                        type: 'success',
                    })
                    setTimeout(() => this.$router.go(), 5000)
                })
                .catch((error) => {
                    this.$moshaToast(
                        'Une erreur est survenue! Veillez réessayer',
                        { showIcon: true, type: 'danger' }
                    )
                })
        },
    },

    created() {
        this.roleUsers()
        console.log(this.getAllRole)
    },
}
</script>

<style lang="scss" scoped>
.circle {
    width: 100px;
    height: 100px;
    border-radius: 50%;
}
</style>

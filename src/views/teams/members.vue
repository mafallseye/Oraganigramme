<script>
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
            firstName: '',
            lastName: '',
            email: '',
            pwd: '',
            managerid: '',
            tel: '',
            category: '',
            userRole: '',
            hasError: false,
            users: [],
            role: [],
            isLoading: false,
            pageSize: 10,
            currentPage: 1,
            currentSort: 'name',
            currentSortDir: 'asc',
            partLenth: 10,
            showing: 1,
            filter: '',
            selectedUser: [],
            userChild: [],
        }
    },

    computed: {
        ...mapGetters('role', ['getAllRole']),
        ...mapGetters('member', ['getAllUsers']),
        filteredRows() {
            return this.users
                .filter((row, index) => {
                    const user = row.info.displayName.toString().toLowerCase()
                    const uid = row.info.uid.toString().toLowerCase()
                    const category = row.info.businessCategory.toLowerCase()
                    const searchTerm = this.filter.toLowerCase()

                    return (
                        user.includes(searchTerm) ||
                        category.includes(searchTerm) ||
                        uid.includes(searchTerm)
                    )
                })
                .filter((row, index) => {
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
        ...mapActions('member', ['addMemberAction', 'getAllMemberAction']),
        ...mapActions('role', ['getAllRoleAction']),

        showDetails(data) {
            this.selectedUser = data.info
            this.userChild = data.fils

            /*  console.log(this.selectedUser)
            console.log(this.userChild.length) */
        },

        nextPage() {
            console.log('next')
            if (this.currentPage * this.pageSize < this.users.length) {
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

        roleUsers() {
            const headers = {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }

            this.getAllRoleAction({ headers: headers }).then((response) => {
                this.role = this.getAllRole['data']
                this.userRole = this.role[0]

                //console.log(this.role)
            })
        },
        async search() {
            this.isLoading = true
            const headers = {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }

            /*  axios
                .get('/api/v1/organigram/user/all', { headers: headers }) */
            await this.getAllMemberAction({ headers: headers })
                .then((response) => {
                    this.users = this.getAllUsers['data']
                    this.managerid = this.users[0].info.displayName
                    console.log(this.users)
                    this.isLoading = false
                })
                .catch((error) => {
                    this.hasError = true
                    console.log(error)
                })
        },
        addNewUser() {
            let payload = {
                firstname: this.firstName,
                lastname: this.lastName,
                email: this.email,
                password: this.pwd,
                managerID: this.managerid,
                tel: this.tel,
                businessCategory: this.category,
                role: this.userRole,
            }
            /*   axios
                .post('/api/v1/organigram/user/register', data_register) */
            this.addMemberAction(payload)
                .then((response) => {
                    this.$moshaToast('Utilisateur ajouté avec succès', {
                        showIcon: true,
                        type: 'success',
                    })
                    setTimeout(() => this.$router.go(), 5000)
                })
                .catch((error) => {
                    this.hasError = true
                    this.$moshaToast(
                        'Une erreur est survenue! Veillez réessayer',
                        { showIcon: true, type: 'danger' }
                    )
                })
        },
    },

    mounted() {
        /*  console.log(this.getAllRole);
        console.log(this.getAllUsers); */
    },

    created() {
        this.search()
        this.roleUsers()
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

<style>
.circle {
    width: 100px;
    height: 100px;
    border-radius: 50%;
}
</style>

<template>
    <div class="container mx-auto">
        <Breadcrumbs parentTitle="Teams" subParentTitle="Members" />

        <router-link to="/test">test </router-link>

        <div class="grid grid-cols-12 gap-5">
            <div class="col-span-12">
                <BaseCard>
                    <template v-slot:cardHeader>
                        <div class="card-header">
                            <label
                                for="my-modal-3"
                                class="btn glass modal-button bg-midnight ml-4 hover:bg-blue-indigo-700 gap-2"
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
                                                    placeholder="rechercher catégorie business, Nom..."
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
                                    Ajouter un nouveau membre
                                </h3>
                                <div class="block p-6 max-w-md">
                                    <form>
                                        <div class="grid grid-cols-2 gap-4">
                                            <div class="form-group mb-6">
                                                <label for="">Nom</label>
                                                <input
                                                    type="text"
                                                    class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                    v-model="firstName"
                                                    placeholder="First name"
                                                    required
                                                />
                                            </div>
                                            <div class="form-group mb-6">
                                                <label for="">Prénom</label>
                                                <input
                                                    type="text"
                                                    class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                    v-model="lastName"
                                                    placeholder="Last name"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div class="form-group mb-6">
                                            <label for="">E-mail</label>
                                            <input
                                                type="email"
                                                class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                v-model="email"
                                                placeholder="Email address"
                                                required
                                            />
                                        </div>
                                        <div class="form-group mb-6">
                                            <label for="">Contact</label>
                                            <input
                                                type="text"
                                                class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                v-model="tel"
                                                placeholder="Contact"
                                                required
                                            />
                                        </div>
                                        <div class="form-group mb-6">
                                            <label for="">Mot de passe</label>
                                            <input
                                                type="password"
                                                class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                v-model="pwd"
                                                placeholder="Password"
                                                required
                                            />
                                        </div>
                                        <div class="grid grid-cols-2 gap-4">
                                            <div class="form-group mb-6">
                                                <label for="">Manager</label>
                                                <div class="">
                                                    <Listbox
                                                        v-model="managerid"
                                                    >
                                                        <div
                                                            class="relative mt-1"
                                                        >
                                                            <ListboxButton
                                                                class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-midnight sm:text-sm"
                                                            >
                                                                <span
                                                                    class="block truncate"
                                                                    >{{
                                                                        managerid
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
                                                                            user,
                                                                            index
                                                                        ) in this
                                                                            .users"
                                                                        :key="`user-${index}`"
                                                                        v-bind:value="
                                                                            user
                                                                                .info
                                                                                .displayName
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
                                                                                    user
                                                                                        .info
                                                                                        .displayName
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
                                                <label for="">Rôles</label>
                                                <div class="">
                                                    <Listbox v-model="userRole">
                                                        <div
                                                            class="relative mt-1"
                                                        >
                                                            <ListboxButton
                                                                class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-midnight sm:text-sm"
                                                            >
                                                                <span
                                                                    class="block truncate"
                                                                    >{{
                                                                        userRole
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
                                                                            role,
                                                                            index
                                                                        ) in this
                                                                            .role"
                                                                        :key="`role-${index}`"
                                                                        v-bind:value="
                                                                            role
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
                                                                                    role
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
                                        <div class="form-group mb-6">
                                            <label for=""
                                                >Catégorie Business</label
                                            >
                                            <input
                                                type="text"
                                                class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                v-model="category"
                                                placeholder="Catégorie Business"
                                                required
                                            />
                                        </div>
                                        <label
                                            for="my-modal-3"
                                            @click="addNewUser()"
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
                                            Aucun utilisateurs
                                        </h2>
                                    </div>
                                </div>
                                <table
                                    v-else
                                    class="table-3 dataTable-table max-w-full w-full"
                                >
                                    <thead>
                                        <tr class="">
                                            <!--  <th
                                                @click="sort('users.info.uid')"
                                                class="text-left border-b pb-3 mb-3 text-gray-500 font-semibold"
                                            >
                                                UID
                                            </th> -->
                                            <th
                                                @click="sort('displayName')"
                                                class="text-left border-b pb-3 mb-3 text-gray-500 font-semibold"
                                            >
                                                Name
                                            </th>
                                            <th
                                                @click="sort('mail')"
                                                class="text-left border-b pb-3 mb-3 text-gray-500 font-semibold"
                                            >
                                                Email
                                            </th>
                                            <th
                                                @click="
                                                    sort('businessCategory')
                                                "
                                                class="text-left border-b pb-3 mb-3 text-gray-500 font-semibold"
                                            >
                                                Catégorie Bussiness
                                            </th>

                                            <th
                                                class="text-left border-b pb-3 mb-3 text-gray-500 font-semibold"
                                            >
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody v-if="!isLoadind">
                                        <tr
                                            class="hover:bg-gray-100 cursor-pointer"
                                            v-for="(
                                                user, index
                                            ) in filteredRows"
                                            :key="`user-${index}`"
                                            v-bind:value="user.info.uid"
                                        >
                                            <!--  <td class="py-5 px-4">
                                                {{ user.info.uid }}
                                            </td> -->

                                            <td class="">
                                                <div
                                                    class="avatar online placeholder"
                                                >
                                                    <div
                                                        class="bg-neutral-focus text-neutral-content rounded-full w-16"
                                                    >
                                                        <span class="text-xl">
                                                            {{
                                                                user.info.displayName.charAt(
                                                                    0
                                                                )
                                                            }}{{
                                                                user.info.displayName.charAt(
                                                                    user.info.displayName.indexOf(
                                                                        ' '
                                                                    ) + 1
                                                                )
                                                            }}</span
                                                        >
                                                    </div>
                                                </div>
                                                {{ user.info.displayName }}
                                            </td>
                                            <td class="py-5">
                                               {{ user.info.mail }}
                                            </td>
                                            <td class="py-5 p-2">
                                                <span
                                                    v-if="
                                                        user.info
                                                            .businessCategory !=
                                                        ''
                                                    "
                                                    class="badge bg-midnight text-white"
                                                >
                                                    {{
                                                        user.info
                                                            .businessCategory
                                                    }}</span
                                                >
                                            </td>

                                            <td class="py-5">
                                                <label
                                                    @click="showDetails(user)"
                                                    for="info-user-modal"
                                                    class="modal-button"
                                                >
                                                    <i
                                                        class="fa-regular fa-eye text-xl hover:text-blue-400 text-midnight"
                                                    ></i
                                                ></label>
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
    </div>
    <!-- modal -->

    
    <input type="checkbox" id="info-user-modal" class="modal-toggle" />
    <div class="modal">
        <div class="modal-box w-11/12 max-w-7xl">
            <label
                for="info-user-modal"
                class="btn btn-sm btn-circle absolute right-2 top-2"
                >✕</label
            >
            <h3 class="text-lg font-bold">Informations de l'utilisateur</h3>
            <div class="py-4">
                <div class="">
                    <div class="container mx-auto p-5">
                        <div class="md:flex no-wrap md:-mx-2">
                            <!-- Left Side -->
                            <div class="w-full md:w-3/12 md:mx-2">
                                <!-- Profile Card -->
                                <BaseCard>
                                    <div class="p-3 border-t-4 border-midnight">
                                        <div
                                            class="image overflow-hidden rounded-lg"
                                        >
                                            <img
                                                class="h-auto w-full mx-auto"
                                                src="/images/anonyme_1.png"
                                                alt=""
                                            />
                                        </div>
                                        <h1
                                            class="text-gray-900 font-bold text-xl leading-8 my-1"
                                        >
                                            {{
                                                selectedUser.displayName === ''
                                                    ? 'Non-assigné'
                                                    : selectedUser.displayName
                                            }}
                                        </h1>
                                        <h3
                                            class="text-gray-600 font-lg text-semibold leading-6"
                                        >
                                            {{
                                                selectedUser.businessCategory ===
                                                ''
                                                    ? 'Non-assigné'
                                                    : selectedUser.businessCategory
                                            }}
                                            <span class="text-xs text-midnight"
                                                >chez Axe-Tag SAS.</span
                                            >
                                        </h3>

                                        <ul
                                            class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm"
                                        >
                                            <li class="flex items-center py-3">
                                                <span>Status</span>
                                                <span class="ml-auto"
                                                    ><span
                                                        class="bg-green-500 py-1 px-2 rounded text-white text-sm"
                                                        >Actif</span
                                                    ></span
                                                >
                                            </li>
                                            <li class="flex items-center py-3">
                                                <span>Membre depuis</span>
                                                <span class="ml-auto"
                                                    >date</span
                                                >
                                            </li>
                                        </ul>
                                    </div>
                                </BaseCard>
                                <!-- End of profile card -->
                                <div class="my-4"></div>
                            </div>
                            <!-- Right Side -->
                            <div class="w-full md:w-9/12 mx-2 h-64">
                                <!-- Profile tab -->
                                <!-- About Section -->
                                <BaseCard>
                                    <template v-slot:cardHeader>
                                        <div class="card-header">
                                            <i class="fa-solid fa-user"></i>
                                            A propos de
                                        </div>
                                    </template>
                                    <div class="p-3">
                                        <div class="text-gray-700">
                                            <div
                                                class="grid md:grid-cols-2 text-sm"
                                            >
                                                <div class="grid grid-cols-2">
                                                    <div
                                                        class="px-4 py-2 font-semibold"
                                                    >
                                                        UID :
                                                    </div>
                                                    <div class="px-4 py-2">
                                                        {{
                                                            selectedUser.uid ===
                                                            ''
                                                                ? 'Non-assigné'
                                                                : selectedUser.uid
                                                        }}
                                                    </div>
                                                </div>
                                                <div class="grid grid-cols-2">
                                                    <div
                                                        class="px-4 py-2 font-semibold"
                                                    >
                                                        Nom et prénom :
                                                    </div>
                                                    <div class="px-4 py-2">
                                                        {{
                                                            selectedUser.displayName ===
                                                            ''
                                                                ? 'Non-assigné'
                                                                : selectedUser.displayName
                                                        }}
                                                    </div>
                                                </div>

                                                <div class="grid grid-cols-2">
                                                    <div
                                                        class="px-4 py-2 font-semibold"
                                                    >
                                                        Manager ID :
                                                    </div>
                                                    <div class="px-4 py-2">
                                                        {{
                                                            selectedUser.managerID ===
                                                            ''
                                                                ? 'Non-assigné'
                                                                : selectedUser.managerID
                                                        }}
                                                    </div>
                                                </div>
                                                <div class="grid grid-cols-2">
                                                    <div
                                                        class="px-4 py-2 font-semibold"
                                                    >
                                                        Contact :
                                                    </div>
                                                    <div class="px-4 py-2">
                                                        {{
                                                            selectedUser.telephoneNumber ===
                                                            ''
                                                                ? 'Non-assigné'
                                                                : selectedUser.telephoneNumber
                                                        }}
                                                    </div>
                                                </div>
                                                <div class="grid grid-cols-2">
                                                    <div
                                                        class="px-4 py-2 font-semibold"
                                                    >
                                                        Catégorie Business :
                                                    </div>
                                                    <div class="px-4 py-2">
                                                        {{
                                                            selectedUser.businessCategory ===
                                                            ''
                                                                ? 'Non-assigné'
                                                                : selectedUser.businessCategory
                                                        }}
                                                    </div>
                                                </div>
                                                <div class="grid grid-cols-2">
                                                    <div
                                                        class="px-4 py-2 font-semibold"
                                                    >
                                                        Manager Name :
                                                    </div>
                                                    <div class="px-4 py-2">
                                                        {{
                                                            selectedUser.manager_display_name ===
                                                            ''
                                                                ? 'Non-assigné'
                                                                : selectedUser.manager_display_name
                                                        }}
                                                    </div>
                                                </div>
                                                <div class="grid grid-cols-2">
                                                    <div
                                                        class="px-4 py-2 font-semibold"
                                                    >
                                                        Email :
                                                    </div>
                                                    <div class="px-4 py-2">
                                                        <p
                                                            class="text-blue-800"
                                                        >
                                                            {{
                                                                selectedUser.mail ===
                                                                ''
                                                                    ? 'Non-assigné'
                                                                    : selectedUser.mail
                                                            }}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </BaseCard>
                                <!-- End of about section -->

                                <div class="my-4"></div>

                                <div class="pb-5">
                                    <BaseCard>
                                        <template v-slot:cardHeader>
                                            <div class="card-header">
                                                <i
                                                    class="fa-solid fa-users"
                                                ></i>
                                                Employées
                                            </div>
                                        </template>

                                        <div
                                            v-if="this.userChild.length === 0"
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
                                                    Aucun enployées pour cet
                                                    utilisateur
                                                </h2>
                                            </div>
                                        </div>

                                        <div v-else>
                                            <div
                                                class="grid grid-cols-3 lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-3 gap-4 lg:gap-3"
                                            >
                                                <div
                                                    v-for="(
                                                        child, index
                                                    ) in userChild"
                                                    :key="index"
                                                >
                                                    <div
                                                        class="flex flex-wrap justify-center"
                                                    >
                                                       
                                                        <div
                                                class="flex flex-col items-center pb-10"
                                            >
                                                <div class="circle bg-midnight">
                                                    <p
                                                        class="text-white text-center mt-8 text-4xl"
                                                    >
                                                        
                                                         {{
                                                                child.displayName.charAt(
                                                                    0
                                                                )
                                                            }}{{
                                                                child.displayName.charAt(
                                                                    child.displayName.indexOf(
                                                                        ' '
                                                                    ) + 1
                                                                )
                                                            }}
                                                    </p>
                                                </div>
                                                <h5
                                                    class="mb-1 text-2xl font-medium text-gray-900 dark:text-white"
                                                >
                                                    <span class="badge">
                                                        {{ child.displayName }}</span
                                                    >
                                                </h5>
                                            </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </BaseCard>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

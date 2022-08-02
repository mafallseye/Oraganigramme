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
            etat: 'approved',
            etat1: 'rejected',
            ask: [],
            roleId: '',
            damande: '',
            request1: ['ask', 'remove'],
            request: [],
            pageSize: 10,
            currentPage: 1,
            currentSort: 'name',
            currentSortDir: 'asc',
            partLenth: 10,
            showing: 1,
            filter: '',
            selectedToken: [],
            Token: '',
        }
    },
    computed: {
        ...mapGetters('approvers', [' getRequest']),
        filteredRows() {
            return this.request
                .filter((row, index) => {
                    const ask = row.name.toString().toLowerCase()
                    const pending = row.state.toString().toLowerCase()
                    // const category = row.info.businessCategory.toLowerCase()
                    const searchTerm = this.filter.toLowerCase()

                    return (
                        ask.includes(searchTerm) ||
                        // category.includes(searchTerm) ||
                        pending.includes(searchTerm)
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
        ...mapActions('approvers', [
            'approveAskAction',
            'askAction',

            'requestAction',
        ]),
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

        getProfileRole() {
            this.askAction()
                .then((response) => {
                    console.log(response.data)
                    this.ask = response.data
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        approvedAsk() {
            let approve = {
                approved_info: [this.selectedApprobation],
            }

            this.approveAskAction(approve)
                .then((response) => {
                    console.log(response)
                    this.$moshaToast('Demande en cours de traitement', {
                        showIcon: true,
                        position: 'top-center',
                        type: 'success',
                    })
                    setTimeout(() => this.$router.go(), 5000)
                })
                .catch((error) => {
                    console.log(error)
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
        showToken(data) {
            // console.log(data);

            if (this.selectedToken.length > 0) {
                this.selectedToken.splice(0, this.selectedToken.length)
            }
            for (
                let index = 0;
                index < data.technical_profiles.length;
                index++
            ) {
                this.selectedToken.push(data.technical_profiles[index])
            }
            this.selectedApprobation = data.approbation_info
            // console.log(this.selectedApprobation);

            console.log(this.selectedToken)
        },
        requestPending() {
            this.requestAction()
                .then((response) => {
                    console.log(response.data)
                    console.log('requestX')
                    this.request = response['data']
                    console.log(this.request)
                })
                .catch((error) => {
                    console.log(error)
                })
        },
    },
    created() {
        this.requestPending()
        this.getProfileRole()
    },
}
</script>

<template>
    <div class="container mx-auto">
        <Breadcrumbs
            parentTitle="approbation"
            subParentTitle="view-approvers"
        />

        <div class="grid grid-cols-12 gap-5">
            <div class="col-span-12">
                <BaseCard>
                    <div v-if="this.request.length === 0" class="mx-auto">
                        <figure class="px-10 pt-10">
                            <i class="fa-solid fa-users-slash text-2xl"></i>
                        </figure>
                        <div class="card-body items-center text-center">
                            <h2 class="card-title">
                                Aucune demande de profil technique
                            </h2>
                        </div>
                    </div>

                    <div
                        v-else
                        class="
                            block
                            w-full
                            overflow-x-auto
                            whitespace-nowrap
                            borderless
                            hover
                        "
                    >
                        <div
                            class="
                                dataTable-wrapper dataTable-loading
                                no-footer
                                fixed-columns
                            "
                        >
                            <div
                                class="
                                    dataTable-container
                                    block
                                    w-full
                                    overflow-x-auto
                                    whitespace-nowrap
                                    borderless
                                    hover
                                "
                            >
                                <div
                                    v-if="isLoading"
                                    class="
                                        flex
                                        justify-center
                                        items-center
                                        pt-2
                                    "
                                >
                                    <div role="status">
                                        <svg
                                            aria-hidden="true"
                                            class="
                                                mr-2
                                                w-8
                                                h-8
                                                text-gray-200
                                                animate-spin
                                                dark:text-gray-600
                                                fill-midnight
                                            "
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
                                    class="
                                        table-3
                                        dataTable-table
                                        max-w-full
                                        w-full
                                    "
                                >
                                    <thead>
                                        <tr class="">
                                            <th
                                                class="
                                                    text-left
                                                    border-b
                                                    pb-3
                                                    mb-3
                                                    text-gray-500
                                                    font-semibold
                                                "
                                            >
                                                Profile metier
                                            </th>
                                            <th
                                                class="
                                                    text-left
                                                    border-b
                                                    pb-3
                                                    mb-3
                                                    text-gray-500
                                                    font-semibold
                                                "
                                            >
                                                profile technique
                                            </th>
                                            <th
                                                class="
                                                    text-left
                                                    border-b
                                                    pb-3
                                                    mb-3
                                                    text-gray-500
                                                    font-semibold
                                                "
                                            >
                                                Date de creation
                                            </th>
                                            <th
                                                class="
                                                    text-left
                                                    border-b
                                                    pb-3
                                                    mb-3
                                                    text-gray-500
                                                    font-semibold
                                                "
                                            >
                                                date d'expiration
                                            </th>

                                            <th
                                                class="
                                                    text-left
                                                    border-b
                                                    pb-3
                                                    mb-3
                                                    text-gray-500
                                                    font-semibold
                                                "
                                            >
                                                Etat
                                            </th>
                                            <th
                                                class="
                                                    text-left
                                                    border-b
                                                    pb-3
                                                    mb-3
                                                    text-gray-500
                                                    font-semibold
                                                "
                                            >
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody
                                        v-for="(ask, index) in request"
                                        :key="index"
                                    >
                                        <tr
                                            v-for="(
                                                item, index
                                            ) in ask.technical_profiles"
                                            :key="index"
                                            class="
                                                hover:bg-gray-100
                                                cursor-pointer
                                            "
                                        >
                                            <td class="text-xs py-5 px-4">
                                                {{ ask.approbation_info.name }}
                                            </td>
                                            <td class="py-5">
                                                <span class="badge bg-midnight">
                                                    {{ item.name }}</span
                                                >
                                            </td>

                                            <td class="text-lg">
                                                <span>
                                                    {{ ask.creation_date }}
                                                </span>
                                            </td>
                                            <td class="">
                                                <div class="text-lg">
                                                    <span>
                                                        {{
                                                            ask.expiration_date
                                                        }}
                                                    </span>
                                                </div>
                                            </td>

                                            <td class="py-5 p-2">
                                                <div
                                                    v-if="
                                                        ask.approbation_info
                                                            .state == ''
                                                    "
                                                ></div>
                                                <div v-else>
                                                    <span
                                                        class="
                                                            badge
                                                            bg-midnight
                                                            text-white
                                                        "
                                                    >
                                                        {{
                                                            ask.approbation_info
                                                                .state
                                                        }}
                                                    </span>
                                                </div>
                                            </td>
                                            <td
                                                class="py-5"
                                                @click="showToken(ask)"
                                                :key="index"
                                            >
                                                <label
                                                    @click="
                                                        nom =
                                                            ask.approbation_info
                                                                .name;
                                                        id =
                                                            ask.approbation_info
                                                                .id;
                                                        ask.approbation_info.state =
                                                            etat
                                                    "
                                                    for="approuve-modal"
                                                    class="modal-a p-2"
                                                >
                                                    <i
                                                        class="
                                                            fa-solid fa-check
                                                            text-blue-indigo-700
                                                            text-2xl
                                                        "
                                                    ></i>
                                                </label>

                                                <label
                                                    @click="
                                                        nom =
                                                            ask.approbation_info
                                                                .name;
                                                        id =
                                                            ask.approbation_info
                                                                .id;
                                                        ask.approbation_info.state =
                                                            etat1;
                                                    "
                                                    for="delete-modal"
                                                    class="modal-a p-2"
                                                >
                                                    <i
                                                        class="
                                                            fa-solid fa-xmark
                                                            active:
                                                            text-red-600
                                                            text-2xl
                                                            hover:text-red-600
                                                        "
                                                    ></i>
                                                </label>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="">
                                <div
                                    class="
                                        flex
                                        justify-center
                                        items-center
                                        pt-4
                                    "
                                >
                                    <div class="flex flex-col items-center">
                                        <!-- Help text -->
                                        <span
                                            class="
                                                text-sm text-gray-700
                                                dark:text-gray-400
                                            "
                                        >
                                            Page
                                            <span
                                                class="
                                                    font-semibold
                                                    text-white
                                                    dark:text-white
                                                "
                                                ><span class="badge">{{
                                                    currentPage
                                                }}</span></span
                                            >
                                        </span>
                                        <!-- Buttons -->
                                        <div class="inline-flex mt-2 xs:mt-0">
                                            <button
                                                @click="prevPage"
                                                class="
                                                    py-2
                                                    px-4
                                                    text-sm
                                                    font-medium
                                                    text-white
                                                    bg-midnight
                                                    rounded-l
                                                    hover:bg-blue-700
                                                "
                                            >
                                                Précedent
                                            </button>
                                            <button
                                                @click="nextPage"
                                                class="
                                                    py-2
                                                    px-4
                                                    text-sm
                                                    font-medium
                                                    text-white
                                                    bg-midnight
                                                    rounded-r
                                                    border-0
                                                    border-l
                                                    border-gray-700
                                                    hover:bg-blue-700
                                                "
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
    

      
        <!--approuve or  rejete modal -->

        <input type="checkbox" id="approuve-modal" class="modal-toggle" />
        <div class="modal modal-bottom sm:modal-middle">
            <div class="modal-box">
                <label
                    for="approuve-modal"
                    class="btn btn-sm btn-circle absolute right-2 top-2"
                    >✕</label
                >
                <h3 class="font-bold text-blue-indigo-700 text-lg">Attention!</h3>
                <p class="py-4">
                    Vous êtes sur le point d'approuver cette demande!!!
                </p>
                <div class="modal-action">
                    <label
                        for="approuve-modal"
                        @click="approvedAsk()"
                        class="btn btn-success text-white"
                    >
                      Approuver
                    </label>
                </div>
            </div>
        </div>
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
                    Vous êtes sur le point de suprimmer cette demande!!!
                </p>
                <div class="modal-action">
                    <label
                        for="delete-modal"
                        @click="approvedAsk()"
                        class="btn btn-error text-white"
                    >
                       Rejeter
                    </label>
                </div>
            </div>
        </div>
        <!-- end delete modal -->
    </div>
</template>

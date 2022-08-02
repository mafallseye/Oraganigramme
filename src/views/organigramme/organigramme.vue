<script>
import { ref } from 'vue'
import HeaderSearch from '@/components/HeaderSearch.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
    components: {
        HeaderSearch,
        Breadcrumbs,
    },
    data() {
        return {
            users: [],
            searchQuery: '',
            selectedItem: null,
            isVisible: false,
            selectedUser: [],
            userChild: [],
            isLoading: false,
        }
    },
    computed: {
        ...mapGetters('member', ['getAllUsers']),
        filteredUser() {
            const query = this.searchQuery.toLowerCase()
            if (this.searchQuery === '') {
                return this.users
            }
            return this.users.filter((user) => {
                return Object.values(user.info).some((word) =>
                    String(word).toLowerCase().includes(query)
                )
            })
        },
    },
    methods: {
        ...mapActions('member', ['getAllMemberAction']),

        showDetails(data) {
            for (let i = 0; i < this.getAllUsers.data.length; i++) {
                if (this.getAllUsers.data[i].info.displayName === data) {
                    this.selectedUser = this.getAllUsers.data[i].info
                    this.userChild = this.getAllUsers.data[i].fils
                }
            }
            setTimeout(() => (this.searchQuery = ''), 3000)
        },
        setSearchQuery(data) {
            this.searchQuery = data
        },

        applyGetAllUsers() {
            this.isLoading = true
            this.getAllMemberAction().then((response) => {
                this.users = this.getAllUsers['data']
                console.log('usersss')
                console.log(this.users)
                this.isLoading = false
            })
        },
    },
    created() {
        this.applyGetAllUsers()
    },
}
</script>

<template>
    <div class="container mx-auto">
        <Breadcrumbs parentTitle="Organigramme" subParentTitle="Organigramme-view" />
        <BaseCard noPadding class="user-profile overflow-hidden relative">
            <div class="pb-10">
                <div class="header-cover"></div>
                <div class="flex justify-center z-10 -m-10">
                    <div class="text-center">
                        <img class="relative z-1 w-20 h-20 m-auto rounded-full border-2 border-white"
                            src="/images/logo-axe-tag.png" />
                        <p class="text-2xl">AXETAG SAS</p>
                        
                    </div>
                </div>

                <div class="mb-40 mt-20 mx-40">
                    <!--  <p class="text-4xl text-gray-400 mt-4 mb-10 text-center">Rechercher les membre de l'équipe Axe-Tag</p> -->
                    <form class="flex items-center">
                        <div class="relative w-full">
                            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400"
                                    fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                        clip-rule="evenodd"></path>
                                </svg>
                            </div>
                            <div class="dropdown-wrapper">
                                <div @click="isVisible = !isVisible" class="selected-item">
                                    <!-- vvv -->

                                    <form class="flex items-center">
                                        <label for="voice-search" class="sr-only">Search</label>
                                        <div class="relative w-full">
                                            <div
                                                class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400"
                                                    fill="currentColor" viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd"
                                                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                        clip-rule="evenodd"></path>
                                                </svg>
                                            </div>
                                            <input v-model="searchQuery" type="text"
                                                class="bg-gray-50 border py-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                                                placeholder="Rechercher un membre..." required />
                                        </div>
                                        <label v-if="this.searchQuery === ''"
                                            class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-indigo-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                            </svg>
                                        </label>
                                        <label v-else for="info-user-modal" @click="showDetails(searchQuery)"
                                            class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-indigo-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                            </svg></label>
                                    </form>
                                </div>
                                <div class="dropdown-popover" :class="isVisible ? 'visible' : 'invisible'">
                                    <div v-if="isLoading" class="flex justify-center items-center py-4">
                                        <div role="status">
                                            <svg aria-hidden="true"
                                                class="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-midnight"
                                                viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                    fill="currentColor"></path>
                                                <path
                                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                    fill="currentFill"></path>
                                            </svg>
                                        </div>
                                        <span class="">Chargement...</span>
                                    </div>
                                    <div class="options">
                                        <ul class="myul">
                                            <label class="modal-button">
                                                <li v-for="(
                                                        user, index
                                                    ) in filteredUser" :key="`user-${index}`" @click="
                                                        setSearchQuery(
                                                            user.info
                                                                .displayName
                                                        )
                                                    "
                                                    class="myli z-index-10 flex modal-button block py-2 px-4 text-sm text-gray-700 hover:bg-blue-300 rounded-lg md:hover:textwhite">
                                                    <svg class="w-5 h-5 text-gray-700 mr-2" fill="none"
                                                        stroke="currentColor" viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                                    </svg>
                                                    {{ user.info.displayName }}
                                                </li>
                                            </label>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </BaseCard>
        <input type="checkbox" id="info-user-modal" class="modal-toggle" />
        <div class="modal">
            <div class="modal-box w-11/12 max-w-7xl">
                <label for="info-user-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
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
                                            <div class="image overflow-hidden rounded-lg">
                                                <img class="h-auto w-full mx-auto" src="/images/anonyme_1.png" alt="" />
                                            </div>
                                            <h1 class="text-gray-900 font-bold text-xl leading-8 my-1">
                                                {{
                                                        selectedUser.displayName ===
                                                            ''
                                                            ? 'Non-assigné'
                                                            : selectedUser.displayName
                                                }}
                                            </h1>
                                            <h3 class="text-gray-600 font-lg text-semibold leading-6">
                                                {{
                                                        selectedUser.businessCategory ===
                                                            ''
                                                            ? 'Non-assigné'
                                                            : selectedUser.businessCategory
                                                }}
                                                <span class="text-xs text-midnight">chez Axe-Tag SAS.</span>
                                            </h3>

                                            <ul
                                                class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                                <li class="flex items-center py-3">
                                                    <span>Status</span>
                                                    <span class="ml-auto"><span
                                                            class="bg-green-500 py-1 px-2 rounded text-white text-sm">Actif</span></span>
                                                </li>
                                                <li class="flex items-center py-3">
                                                    <span>Membre depuis</span>
                                                    <span class="ml-auto">date</span>
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
                                                <div class="grid md:grid-cols-2 text-sm">
                                                    <div class="grid grid-cols-2">
                                                        <div class="px-4 py-2 font-semibold">
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
                                                        <div class="px-4 py-2 font-semibold">
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
                                                        <div class="px-4 py-2 font-semibold">
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
                                                        <div class="px-4 py-2 font-semibold">
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
                                                        <div class="px-4 py-2 font-semibold">
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
                                                        <div class="px-4 py-2 font-semibold">
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
                                                        <div class="px-4 py-2 font-semibold">
                                                            Email :
                                                        </div>
                                                        <div class="px-4 py-2">
                                                            <p class="text-blue-800">
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
                                                    <i class="fa-solid fa-users"></i>
                                                    Employées
                                                </div>
                                            </template>

                                            <div v-if="
                                                this.userChild.length === 0
                                            " class="mx-auto">
                                                <figure class="px-10 pt-10">
                                                    <i class="fa-solid fa-users-slash text-2xl"></i>
                                                </figure>
                                                <div class="card-body items-center text-center">
                                                    <h2 class="card-title">
                                                        Aucun enployées pour cet
                                                        utilisateur
                                                    </h2>
                                                </div>
                                            </div>

                                            <div v-else>
                                                <div
                                                    class="grid grid-cols-3 lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-3 gap-4 lg:gap-3">
                                                    <div v-for="(
                                                            child, index
                                                        ) in userChild" :key="index">
                                                        <div class="flex flex-wrap justify-center">
                                                            <div class="flex flex-col items-center pb-10">
                                                                <div class="circle bg-midnight">
                                                                    <p class="text-white text-center mt-8 text-4xl">
                                                                        {{
                                                                                child.displayName.charAt(
                                                                                    0
                                                                                )
                                                                        }}{{
        child.displayName.charAt(
            child.displayName.indexOf(
                ' '
            ) +
            1
        )
}}
                                                                    </p>
                                                                </div>
                                                                <h5
                                                                    class="mb-1 text-2xl font-medium text-gray-900 dark:text-white">
                                                                    <span class="badge">
                                                                        {{
                                                                                child.displayName
                                                                        }}</span>
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
    </div>
</template>

<style lang="scss" scoped>
.user-profile {
    .header-cover {
        background-image: url('../../assets/images/org_bg.jpg');
        position: relative;
        background-size: cover;
        background-repeat: no-repeat;
        height: 300px;
    }

    &::after {
        content: '';
        width: 100%;
        height: 300px;
        position: absolute;
        background: rgba(0, 0, 0, 0.1);
    }
}

.circle {
    width: 100px;
    height: 100px;
    border-radius: 50%;
}

.timeline {
    position: relative;
    list-style: none;
    padding: 0;
    margin: 0;

    li.timeline-item {
        position: relative;
        width: 50%;
        display: inline-block;

        &:nth-child(even) {
            padding: 0 3rem 3rem 0;

            .timeline-badge {
                left: calc(100% - 24px);
            }
        }

        &:nth-child(odd) {
            float: right;
            padding: 0 0 3rem 3rem;
            margin-top: 6rem;

            .timeline-badge {
                right: calc(100% - 24px);
            }
        }

        .timeline-badge {
            position: absolute;
            width: 48px;
            height: 48px;
        }

        .badge-icon {
            display: inline-block;
            text-align: center;
            font-size: 22px;
            border-radius: 50%;
            height: 100%;
            width: 100%;
            line-height: 48px;
        }

        .badge-img {
            display: inline-block;
            border-radius: 50%;
            height: 100%;
            width: 100%;
        }
    }

    li.timeline-group {
        position: relative;
        z-index: 99;
        padding: 0 0 2rem 0;
    }

    .timeline-line {
        position: absolute;
        content: '';
        width: 1px;
        height: 100%;
        background: #d1d5db;
        left: 0;
        right: 0;
        margin: auto;
    }
}

@media (max-width: 767px) {
    .user-profile {
        .header-cover {
            height: 100px;
        }
    }

    .timeline {
        .timeline-line {
            display: none !important;
        }

        li.timeline-item {
            width: 100%;
            padding: 4rem 0 3rem !important;

            &:nth-child(odd) {
                margin-top: 1rem;
            }

            .timeline-badge {
                left: 0 !important;
                right: 0 !important;
                top: -16px;
                margin: auto;
            }
        }

        li.timeline-group {
            padding: 0 0 3rem;
        }
    }
}

.dropdown-popover {
    position: absolute;

    background-color: #fff;
    top: 46px;
    left: 0;
    right: 0;
    visibility: hidden;
    transition: all 0.4s ease-in-out;
    max-height: 0px;
}

.dropdown-popover.visible {
    visibility: visible;
    max-height: 450px;
}

.dropdown-wrapper {
    width: 100%;
    position: relative;
}

.selected-item {
    height: 20px;

    width: 100%;
}

.options {
    width: 100%;
}

.myul {
    list-style: none;
    text-align: right;
    padding-left: 8px;
    max-height: 180px;
    overflow-y: scroll;
    /* overflow-x: hidden; */
    border: 1px solid lightgray;
    color: black;
}

.myli {
    width: 100%;
    // border-bottom: 1px solid lightgray;
    padding: 10px;
    text-align: left;
}
</style>

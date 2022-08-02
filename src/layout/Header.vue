<script setup>
import { onMounted, ref, watch, watchEffect } from 'vue'
import { Switch } from '@headlessui/vue'
import HeaderSearch from '../components/HeaderSearch.vue'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { useStore } from 'vuex'

let store = useStore()

const sideBarToggle = () => {
    let sidenav = store.state.largeSidebar.sidebarToggleProperties.isSideNavOpen

    if (sidenav == false) {
        store.commit('largeSidebar/toggleSidebarProperties')
    } else {
        store.commit('largeSidebar/toggleSidebarProperties')
    }
}
</script>

<template>
    <div class="header-wrapper flex bg-white justify-between px-4">
        <div class="flex items-center">
            <div class="mx-0 sm:mx-3 grid grid-cols-2">
                <div class="self-center">
                    <button
                        @click="sideBarToggle"
                        class="menu-toggle cursor-pointer text-gray-500 align-middle focus:outline-none hover:text-blue-indigo-500"
                        type="button"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-8 w-8"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
                <div class="items-stretch">
                    <div class="logo">
                        <img
                            class="relative z-1 w-10 h-10 m-auto rounded-full"
                            src="/images/logo-axe-tag.png"
                        />
                    </div>
                    <div>AXE-TAG SAS</div>
                </div>
            </div>
            <!-- mega-menu  -->
        </div>
        <div class="flex w-auto items-center">
            <!-- profile-dropdown  -->
            <Menu as="div" class="relative inline-block text-left">
                <div>
                    <MenuButton
                        class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium"
                    >
                        <div class="avatar">
                            <div
                                class="w-64 rounded-full border-2 border-blue-indigo"
                            >
                                <div class="avatar">
                                    <div class="w-24 mask mask-squircle">
                                        <img
                                            src="https://placeimg.com/192/192/people"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </MenuButton>
                </div>

                <MenuItems
                    class="absolute right-0 w-44 mt-2 overflow-hidden origin-top-right bg-white rounded-md custom-box-shadow focus:outline-none"
                >
                    <div class="">
                        <!-- <MenuItem v-slot="{ active }">
                            <button
                                :class="[
                                    active
                                        ? 'bg-midnight text-white'
                                        : 'text-gray-900',
                                    'group flex  items-center w-full px-4 py-2 text-sm',
                                ]"
                            >
                               {{getUser.displayName}}
                            </button>
                        </MenuItem> -->
                        <MenuItem v-slot="{ active }">
                            <button
                                @click="Logout()"
                                :class="[
                                    active
                                        ? 'bg-midnight text-white'
                                        : 'text-gray-900',
                                    'group flex  items-center w-full px-4 py-2 text-sm',
                                ]"
                            >
                                Deconnexion
                            </button>
                        </MenuItem>
                    </div>
                </MenuItems>
            </Menu>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import axios from 'axios'

export default {
    components: {},

    computed: {
        ...mapGetters('auth', ['getUser']),
    },

    methods: {
        ...mapActions('auth', ['logoutAction']),

        Logout() {
            const headers = {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }
            /*  axios
                .post('/api/v1/auth/logout', '', {
                    headers: headers,
                }) */
            this.logoutAction({
                headers: headers,
            })
                .then((response) => {
                    this.$router.push('/')
                })
                .catch((error) => {})
        },
    },

    mounted() {
        //console.log( this.getUser.cn)
    },
}
</script>

<style lang="scss" scoped>
.header-wrapper {
    position: fixed;
    top: 0;
    width: 100%;
    height: 80px;
    z-index: 100;
    box-shadow: 0 1px 15px rgb(0 0 0 / 4%), 0 1px 6px rgb(0 0 0 / 4%);
}
.mega-menu {
    width: 1200px;
}
ul.links {
    column-count: 2;
    li {
        margin-bottom: 8px;
    }
}
</style>

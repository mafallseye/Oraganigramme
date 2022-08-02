import { createRouter, createWebHistory } from 'vue-router'

import store from '../store'
import SignIn from '../views/auth/SignIn.vue'

import root from '../layout/index.vue'


const routes = [
    { path: '/', 
    component: SignIn ,
    children: [
        {
            path: '/auth',
            name: 'Auth',
            component: () =>
                import('../views/auth/SignIn.vue'),
        },
    ],
},
    {
        path: '/home',
        name: 'Home',
        component: () => import('../layout/index.vue'),
        redirect: '/dashboards/dashboard',
        meta: {
            title: 'Home',
        },

        children: [
            {
                path: '/dashboards',
                name: 'Dashboards',
                component: () => import('../views/dashboards/index.vue'),
                meta: {
                    title: 'Dashboard',
                },
                children: [
                    {
                        path: 'dashboard',
                        name: 'dashboard',
                        component: () =>
                            import('../views/dashboards/Dashboards.v1.vue'),
                    },
                ],
            },
            {
                path: '/organigramme',
                name: 'Organigramme',
                component: () => import('../views/organigramme/index.vue'),
                meta: {
                    title: 'Organigramme',
                },
                children: [
                    {
                        path: 'view-organigramme',
                        name: 'View-organigramme',
                        component: () =>
                            import('../views/organigramme/organigramme.vue'),
                    },
                ],
            },
            {
                path: '/team',
                name: 'Team',
                component: () => import('../views/teams/index.vue'),
                meta: {
                    title: 'Team',
                },
                children: [
                    {
                        path: 'members',
                        name: 'Members',
                        component: () =>
                            import('../views/teams/members.vue'),
                    },
                    /* {
                        path: '/test',
                        name: 'Test',
                        component: () =>
                            import('../views/teams/test.vue'),
                    }, */
                ],
            },
            {
                path: '/askProfil',
                name: 'askProfil',
                component: () => import('../views/askProfile/index.vue'),
                meta: {
                    title: 'askProfile',
                },
                children: [
                    {
                        path: 'view-askProfil',
                        name: 'View-askProfil',
                        component: () =>
                            import('../views/askProfile/askProfil.vue'),
                    },
                ],
            },
            {
                path: '/approvers',
                name: 'approvers',
                component: () => import('../views/approvers/index.vue'),
                meta: {
                    title: 'approvers',
                },
                children: [
                    {
                        path: 'view-approvers',
                        name: 'View-approvers',
                        component: () =>
                            import('../views/approvers/approvers.vue'),
                    },
                ],
            },
            {
                path: '/roles',
                name: 'Roles',
                component: () => import('../views/roles/index.vue'),
                meta: {
                    title: 'Roles',
                },
                children: [
                    {
                        path: 'view-roles',
                        name: 'View-roles',
                        component: () =>
                            import('../views/roles/roles.vue'),
                    },
                ],
            },
            {
                path: '/profiles',
                name: 'Profiles',
                component: () => import('../views/profiles/index.vue'),
                meta: {
                    title: 'Profiles',
                },
                children: [
                    {
                        path: 'choice-profiles',
                        name: 'Choice-profiles',
                        component: () =>
                            import('../views/profiles/choice_profile.vue'),
                    },
                    {
                        path: 'profile-metier',
                        name: 'Profile-metier',
                        component: () =>
                            import('../views/profiles/profile_metier.vue'),
                    },
                    {
                        path: 'technical-profile',
                        name: 'Technical-profile',
                        component: () =>
                            import('../views/profiles/technical_profile.vue'),
                    },
                ],
            },
            {
                path: '/detail',
                name: 'detail',
                component: () => import('../views/personDetail/index.vue'),
                meta: {
                    title: 'Personne Detail',
                },
                children: [
                    {
                        path: 'view-personne',
                        name: 'viewe-personne',
                        component: () =>
                            import('../views/personDetail/personDetail.vue'),
                    },
                    {
                        path: 'technical-profile',
                        name: 'Technical-profile',
                        component: () =>
                            import('../views/profiles/technical_profile.vue'),
                    },
                ],
            },
        ],
    },
   

 
]

const router = createRouter({
    history: createWebHistory(),
    scrollBehavior(to, from, savedPosition) {
        return { left: 0, top: 0 }
    },
    routes,
})

router.afterEach(() => {
    if (window.innerWidth <= 1200) {
        const sidenav =
            store.state.largeSidebar.sidebarToggleProperties.isSideNavOpen

        store.commit('largeSidebar/toggleSidebarProperties')
    }
})

export default router

<template>
  
                            <div class="modal">
                                <div class="modal-box w-11/12 max-w-7xl">
                                    <label
                                        for="info-user-modal"
                                        class="
                                            btn btn-sm btn-circle
                                            absolute
                                            right-2
                                            top-2
                                        "
                                        >✕</label
                                    >
                                    <h3 class="text-lg font-bold">
                                        Informations de l'utilisateur
                                    </h3>
                                    <div class="py-4">
                                        <div class="">
                                            <div class="container mx-auto p-5">
                                                <div
                                                    class="
                                                        md:flex
                                                        no-wrap
                                                        md:-mx-2
                                                    "
                                                >
                                                    <!-- Left Side -->
                                                    <div
                                                        class="
                                                            w-full
                                                            md:w-3/12 md:mx-2
                                                        "
                                                    >
                                                        <!-- Profile Card -->
                                                        <BaseCard>
                                                            <div
                                                                class="
                                                                    p-3
                                                                    border-t-4
                                                                    border-midnight
                                                                "
                                                            >
                                                                <div
                                                                    class="
                                                                        image
                                                                        overflow-hidden
                                                                        rounded-lg
                                                                    "
                                                                >
                                                                    <img
                                                                        class="
                                                                            h-auto
                                                                            w-full
                                                                            mx-auto
                                                                        "
                                                                        src="/images/anonyme_1.png"
                                                                        alt=""
                                                                    />
                                                                </div>
                                                                <h1
                                                                    class="
                                                                        text-gray-900
                                                                        font-bold
                                                                        text-xl
                                                                        leading-8
                                                                        my-1
                                                                    "
                                                                >
                                                                    {{
                                                                        selectedUser.displayName ===
                                                                        ''
                                                                            ? 'Non-assigné'
                                                                            : selectedUser.displayName
                                                                    }}
                                                                </h1>
                                                                <h3
                                                                    class="
                                                                        text-gray-600
                                                                        font-lg
                                                                        text-semibold
                                                                        leading-6
                                                                    "
                                                                >
                                                                    {{
                                                                        selectedUser.businessCategory ===
                                                                        ''
                                                                            ? 'Non-assigné'
                                                                            : selectedUser.businessCategory
                                                                    }}
                                                                    <span
                                                                        class="
                                                                            text-xs
                                                                            text-midnight
                                                                        "
                                                                        >chez
                                                                        Axe-Tag
                                                                        SAS.</span
                                                                    >
                                                                </h3>

                                                                <ul
                                                                    class="
                                                                        bg-gray-100
                                                                        text-gray-600
                                                                        hover:text-gray-700
                                                                        hover:shadow
                                                                        py-2
                                                                        px-3
                                                                        mt-3
                                                                        divide-y
                                                                        rounded
                                                                        shadow-sm
                                                                    "
                                                                >
                                                                    <li
                                                                        class="
                                                                            flex
                                                                            items-center
                                                                            py-3
                                                                        "
                                                                    >
                                                                        <span
                                                                            >Status</span
                                                                        >
                                                                        <span
                                                                            class="
                                                                                ml-auto
                                                                            "
                                                                            ><span
                                                                                class="
                                                                                    bg-green-500
                                                                                    py-1
                                                                                    px-2
                                                                                    rounded
                                                                                    text-white
                                                                                    text-sm
                                                                                "
                                                                                >Actif</span
                                                                            ></span
                                                                        >
                                                                    </li>
                                                                    <li
                                                                        class="
                                                                            flex
                                                                            items-center
                                                                            py-3
                                                                        "
                                                                    >
                                                                        <span
                                                                            >Membre
                                                                            depuis</span
                                                                        >
                                                                        <span
                                                                            class="
                                                                                ml-auto
                                                                            "
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
                                                    <div
                                                        class="
                                                            w-full
                                                            md:w-9/12
                                                            mx-2
                                                            h-64
                                                        "
                                                    >
                                                        <!-- Profile tab -->
                                                        <!-- About Section -->
                                                        <BaseCard>
                                                            <template
                                                                v-slot:cardHeader
                                                            >
                                                                <div
                                                                    class="
                                                                        card-header
                                                                    "
                                                                >
                                                                    <i
                                                                        class="
                                                                            fa-solid
                                                                            fa-user
                                                                        "
                                                                    ></i>
                                                                    A propos de
                                                                </div>
                                                            </template>
                                                            <div class="p-3">
                                                                <div
                                                                    class="
                                                                        text-gray-700
                                                                    "
                                                                >
                                                                    <div
                                                                        class="
                                                                            grid
                                                                            md:grid-cols-2
                                                                            text-sm
                                                                        "
                                                                    >
                                                                        <div
                                                                            class="
                                                                                grid
                                                                                grid-cols-2
                                                                            "
                                                                        >
                                                                            <div
                                                                                class="
                                                                                    px-4
                                                                                    py-2
                                                                                    font-semibold
                                                                                "
                                                                            >
                                                                                UID
                                                                                :
                                                                            </div>
                                                                            <div
                                                                                class="
                                                                                    px-4
                                                                                    py-2
                                                                                "
                                                                            >
                                                                                {{
                                                                                    selectedUser.uid ===
                                                                                    ''
                                                                                        ? 'Non-assigné'
                                                                                        : selectedUser.uid
                                                                                }}
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="
                                                                                grid
                                                                                grid-cols-2
                                                                            "
                                                                        >
                                                                            <div
                                                                                class="
                                                                                    px-4
                                                                                    py-2
                                                                                    font-semibold
                                                                                "
                                                                            >
                                                                                Nom
                                                                                et
                                                                                prénom
                                                                                :
                                                                            </div>
                                                                            <div
                                                                                class="
                                                                                    px-4
                                                                                    py-2
                                                                                "
                                                                            >
                                                                                {{
                                                                                    selectedUser.displayName ===
                                                                                    ''
                                                                                        ? 'Non-assigné'
                                                                                        : selectedUser.displayName
                                                                                }}
                                                                            </div>
                                                                        </div>

                                                                        <div
                                                                            class="
                                                                                grid
                                                                                grid-cols-2
                                                                            "
                                                                        >
                                                                            <div
                                                                                class="
                                                                                    px-4
                                                                                    py-2
                                                                                    font-semibold
                                                                                "
                                                                            >
                                                                                Manager
                                                                                ID
                                                                                :
                                                                            </div>
                                                                            <div
                                                                                class="
                                                                                    px-4
                                                                                    py-2
                                                                                "
                                                                            >
                                                                                {{
                                                                                    selectedUser.managerID ===
                                                                                    ''
                                                                                        ? 'Non-assigné'
                                                                                        : selectedUser.managerID
                                                                                }}
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="
                                                                                grid
                                                                                grid-cols-2
                                                                            "
                                                                        >
                                                                            <div
                                                                                class="
                                                                                    px-4
                                                                                    py-2
                                                                                    font-semibold
                                                                                "
                                                                            >
                                                                                Contact
                                                                                :
                                                                            </div>
                                                                            <div
                                                                                class="
                                                                                    px-4
                                                                                    py-2
                                                                                "
                                                                            >
                                                                                {{
                                                                                    selectedUser.telephoneNumber ===
                                                                                    ''
                                                                                        ? 'Non-assigné'
                                                                                        : selectedUser.telephoneNumber
                                                                                }}
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="
                                                                                grid
                                                                                grid-cols-2
                                                                            "
                                                                        >
                                                                            <div
                                                                                class="
                                                                                    px-4
                                                                                    py-2
                                                                                    font-semibold
                                                                                "
                                                                            >
                                                                                Catégorie
                                                                                Business
                                                                                :
                                                                            </div>
                                                                            <div
                                                                                class="
                                                                                    px-4
                                                                                    py-2
                                                                                "
                                                                            >
                                                                                {{
                                                                                    selectedUser.businessCategory ===
                                                                                    ''
                                                                                        ? 'Non-assigné'
                                                                                        : selectedUser.businessCategory
                                                                                }}
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="
                                                                                grid
                                                                                grid-cols-2
                                                                            "
                                                                        >
                                                                            <div
                                                                                class="
                                                                                    px-4
                                                                                    py-2
                                                                                    font-semibold
                                                                                "
                                                                            >
                                                                                Manager
                                                                                Name
                                                                                :
                                                                            </div>
                                                                            <div
                                                                                class="
                                                                                    px-4
                                                                                    py-2
                                                                                "
                                                                            >
                                                                                {{
                                                                                    selectedUser.manager_display_name ===
                                                                                    ''
                                                                                        ? 'Non-assigné'
                                                                                        : selectedUser.manager_display_name
                                                                                }}
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="
                                                                                grid
                                                                                grid-cols-2
                                                                            "
                                                                        >
                                                                            <div
                                                                                class="
                                                                                    px-4
                                                                                    py-2
                                                                                    font-semibold
                                                                                "
                                                                            >
                                                                                Email
                                                                                :
                                                                            </div>
                                                                            <div
                                                                                class="
                                                                                    px-4
                                                                                    py-2
                                                                                "
                                                                            >
                                                                                <p
                                                                                    class="
                                                                                        text-blue-800
                                                                                    "
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
                                                                <template
                                                                    v-slot:cardHeader
                                                                >
                                                                    <div
                                                                        class="
                                                                            card-header
                                                                        "
                                                                    >
                                                                        <i
                                                                            class="
                                                                                fa-solid
                                                                                fa-users
                                                                            "
                                                                        ></i>
                                                                        Employées
                                                                    </div>
                                                                </template>

                                                                <div
                                                                    v-if="
                                                                        this
                                                                            .userChild
                                                                            .length ===
                                                                        0
                                                                    "
                                                                    class="
                                                                        mx-auto
                                                                    "
                                                                >
                                                                    <figure
                                                                        class="
                                                                            px-10
                                                                            pt-10
                                                                        "
                                                                    >
                                                                        <i
                                                                            class="
                                                                                fa-solid
                                                                                fa-users-slash
                                                                                text-2xl
                                                                            "
                                                                        ></i>
                                                                    </figure>
                                                                    <div
                                                                        class="
                                                                            card-body
                                                                            items-center
                                                                            text-center
                                                                        "
                                                                    >
                                                                        <h2
                                                                            class="
                                                                                card-title
                                                                            "
                                                                        >
                                                                            Aucun
                                                                            enployées
                                                                            pour
                                                                            cet
                                                                            utilisateur
                                                                        </h2>
                                                                    </div>
                                                                </div>

                                                                <div v-else>
                                                                    <div
                                                                        class="
                                                                            grid
                                                                            grid-cols-3
                                                                            lg:grid-cols-4
                                                                            sm:grid-cols-3
                                                                            xs:grid-cols-3
                                                                            gap-4
                                                                            lg:gap-3
                                                                        "
                                                                    >
                                                                        <div
                                                                            v-for="(
                                                                                child,
                                                                                index
                                                                            ) in userChild"
                                                                            :key="
                                                                                index
                                                                            "
                                                                        >
                                                                            <div
                                                                                class="
                                                                                    flex
                                                                                    flex-wrap
                                                                                    justify-center
                                                                                "
                                                                            >
                                                                                <div
                                                                                    class="
                                                                                        flex
                                                                                        flex-col
                                                                                        items-center
                                                                                        pb-10
                                                                                    "
                                                                                >
                                                                                    <div
                                                                                        class="
                                                                                            circle
                                                                                            bg-midnight
                                                                                        "
                                                                                    >
                                                                                        <p
                                                                                            class="
                                                                                                text-white
                                                                                                text-center
                                                                                                mt-8
                                                                                                text-4xl
                                                                                            "
                                                                                        >
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
                                                                                        class="
                                                                                            mb-1
                                                                                            text-2xl
                                                                                            font-medium
                                                                                            text-gray-900
                                                                                            dark:text-white
                                                                                        "
                                                                                    >
                                                                                        <span
                                                                                            class="
                                                                                                badge
                                                                                            "
                                                                                        >
                                                                                            {{
                                                                                                child.displayName
                                                                                            }}</span
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

<script>
export default {
     data(){
return{
     selectedUser:[]
}
    },
  created() {
   
    let info = this.$route.query.info;
    this. selectedUser = JSON.parse(info);
  },
  met
}
</script>

<style>

</style>
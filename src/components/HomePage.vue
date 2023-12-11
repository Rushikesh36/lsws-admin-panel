<template>
    <v-card color="primary" title="HOME PAGE" class="text-center header-card"></v-card>
    <div class="d-flex row home-card mt-8">
        <div class="col-md-6">
            <router-link to="/addProfile">
                <v-hover v-slot="{ isHovering, props }" open-delay="100">
                    <v-card :elevation="isHovering ? 16 : 2" :class="{ 'on-hover': isHovering }" class="mx-auto"
                         v-bind="props">Add Account for Family Head
                        <br>
                        <v-icon icon="mdi-account-plus"></v-icon>
                    </v-card>
                </v-hover>
            </router-link>
        </div>
        <div class="col-md-6">
            <router-link to="/delete">
                <v-hover v-slot="{ isHovering, props }" open-delay="100">
                    <v-card :elevation="isHovering ? 16 : 2" :class="{ 'on-hover': isHovering }" class="mx-auto"
                         v-bind="props">Delete Account for Family
                        <br>
                        <v-icon icon="mdi-account-minus"></v-icon>
                    </v-card>
                </v-hover>
            </router-link>
        </div>
    </div>
    <div class="d-flex row home-card mt-8">
        <div class="col-md-4">
            <router-link to="/receiptApproval">
                <v-hover v-slot="{ isHovering, props }" open-delay="100">
                    <v-card :elevation="isHovering ? 16 : 2" :class="{ 'on-hover': isHovering }" class="mx-auto"
                         v-bind="props">Approve Receipts
                        <br>
                        <v-icon icon="mdi-check-decagram"></v-icon>
                    </v-card>
                </v-hover>
            </router-link>
        </div>
        <div class="col-md-4">
            <router-link to="/notifications">
                <v-hover v-slot="{ isHovering, props }" open-delay="100">
                    <v-card :elevation="isHovering ? 16 : 2" :class="{ 'on-hover': isHovering }" class="mx-auto"
                         v-bind="props">Send Notifications
                        <br>
                        <v-icon icon="mdi-send"></v-icon>
                    </v-card>
                </v-hover>
            </router-link>
        </div>
        <div class="col-md-4">
            <router-link to="/result">
                <v-hover v-slot="{ isHovering, props }" open-delay="100">
                    <v-card :elevation="isHovering ? 16 : 2" :class="{ 'on-hover': isHovering }" class="mx-auto"
                         v-bind="props">Show All Results
                        <br>
                        <v-icon icon="mdi-school"></v-icon>
                    </v-card>
                </v-hover>
            </router-link>
        </div>
    </div>
</template>

<script>

</script>

<style scoped>
.home-card {
    margin-left: 20vw;
    margin-right: 20vw;
}

.home-card .v-card {
    height: 30vh;
    font-size: 1.5rem;
    font-weight: 600;
    text-align: center;
    padding-top: 30px;
}

.home-card .v-icon {
    font-size: 6rem;
    padding-top: 80px;
}

@media(max-width: 786px){
    .home-card {
    margin-left: 5vw;
    margin-right: 5vw;
}
.home-card .v-card{
        margin-top: 20px;
    }

}
</style>
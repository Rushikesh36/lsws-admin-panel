<template>
    <div class="box2">
        <section v-if="checkLogin == 'defaultValue'" style="background-color: white;">
            <v-dialog persistent width="auto" v-model="dialog" scrim="white">
                <v-col class="text-subtitle-1 text-center" cols="12">
                    Loading... Please Wait!!!
                </v-col>
                <v-progress-linear color="deep-purple-accent-4" indeterminate rounded height="12"></v-progress-linear>
            </v-dialog>
        </section>
        <section v-if="checkLogin == 'notLoggedIn'">
            <v-card color="primary" title="LOGIN" class="text-center header-card"></v-card>

            <div class="mt-8"></div>
            <v-form @submit.prevent="submit" ref="form">
                <v-text-field v-model="obj.email" :rules="errorMessage.email" label="Enter Email" readonly>
                </v-text-field>
                <v-text-field v-model="obj.password" type="password" :rules="errorMessage.password" label="Enter Password">
                </v-text-field>
                <v-btn class="me-4" type="submit" color="success">
                    Submit
                </v-btn>
                <v-btn @click="handleReset" color="red">
                    Clear
                </v-btn>
                <v-alert v-if="$store.state.signInError !== ''" color="warning" icon="$warning" title="Warning"
                    :text="`${$store.state.signInError} Please try again!`">
                </v-alert>
            </v-form>
            <v-btn @click="passwordReset()" class="mt-5" color="yellow">
                Reset Password
            </v-btn>
            <v-alert icon="$success" color="success" class="mt-2" title="Success" :text="error" v-if="error">

            </v-alert>
        </section>
    </div>
</template>

<script>


export default {
    data() {
        return {
            dialog: true,
            obj: {
                email: 'ambernath.wani.samaj@gmail.com',
                password: '',
            },
            email: '',
            errorMessage: {
                email: [
                    value => {
                        if (value) return true

                        return 'E-mail is requred.'
                    },
                    value => {
                        if (/.+@.+\..+/.test(value)) return true

                        return 'E-mail must be valid.'
                    },
                ],
                password: [v => !!v || 'Enter Password']
            },
        }
    },
    created() {
        this.$store.dispatch('checkLoggedIn');
    },
    mounted() {

    },
    methods: {
        async passwordReset() {
            this.$store.dispatch('passwordReset', this.obj.email);
        },
        handleReset() {
            this.$store.state.signInError = '';
            this.obj.password = '';
            this.$refs.form.resetValidation();
        },
        async submit() {
            const validate = await this.$refs.form.validate();
            console.log(validate.valid);
            if (validate.valid) {
                this.$store.dispatch('signUserIn', this.obj);
            }
        },
    },
    computed: {
        error() {
            return this.$store.state.forgetPasswordError;
        },
        checkLogin() {
            console.log(this.$store.state.uid);
            return this.$store.state.uid;
        }
    },
}
</script>

<style scoped>
.box2 {
    margin: 5% 30%;
    padding: 1%;
    border: 2px double black;
}
</style>
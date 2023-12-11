<template>
    <h1 class="text-center">REGISTER NEW MEMBER</h1>
    <section>
        
        <v-form @submit.prevent="submit" ref="form">
            <p>Please Enter family head member E-mail</p>
            <v-text-field v-model="obj.email" :rules="errorMessage.email" label="Enter Email">
            </v-text-field>
            <v-btn class="me-4" type="submit">
                Submit
            </v-btn>
            <v-btn @click="handleReset">
                Clear
            </v-btn>
        </v-form>
        <v-alert v-if="$store.state.signUpError=='noError'" color="success" icon="$success" title="Success"
                :text="`${obj.email} successfully registered`">
        </v-alert>
        <v-alert v-if="$store.state.signUpError!= 'noError' && $store.state.signUpError!==''"  color="warning" icon="$warning" title="Warning"
                :text="`${$store.state.signUpError} Please try with another Email`">
        </v-alert>
    </section>
</template>

<script>


export default {
    data() {
        return {
            obj: {
                email: '',
                password: 123456,
            },
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
            },
        }
    },
    mounted() {

    },
    methods: {
        handleReset() {
            this.$store.state.signUpError = '';
            this.$refs.form.reset()
            this.$refs.form.resetValidation();
        },
        async submit() {
            const validate = await this.$refs.form.validate();
            if(validate.valid) {
                this.$store.dispatch('signUserUp', this.obj);
            }
        },
    },
    computed: {

    }
}
</script>
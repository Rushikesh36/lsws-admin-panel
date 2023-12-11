<template>
    <section>
        <v-card color="primary" title="ADD NEW PROFILE HEAD DETAILS" class="text-center header-card"></v-card>
        <div class="mt-8"></div>

        <v-form @submit.prevent="submit" ref="form">
            <div class="center-form add-form">
                <v-text-field v-model="obj.name" :rules="errorMessage.name" label="Name">
                </v-text-field>
                <v-text-field type="date" v-model="obj.dob" :rules="errorMessage.dob" label="Date of Birth">
                </v-text-field>
                <v-select v-model="obj.gender" :rules="errorMessage.gender" label="Gender" :items="genderArray">
                </v-select>
                <v-select v-model="obj.maritalStatus" :rules="errorMessage.maritalStatus" label="Marital Status"
                    :items="['Married', 'UnMarried']">
                </v-select>
                <v-textarea v-model="obj.address" :rules="errorMessage.address" type="text" label="Address">
                </v-textarea>
                <v-select v-model="obj.area" :rules="errorMessage.area" label="Area" :items="areaArray">
                </v-select>
                <v-select v-model="obj.kuldevi" :rules="errorMessage.kuldevi" label="Kuldevi" :items="kuldeviArray">
                </v-select>
                <v-text-field v-model="obj.phoneNumber"  type="number" label="Phone Number">
                </v-text-field>
                <v-text-field v-model="obj.whatsappNumber"  type="number"
                    label="Whatsapp Number">
                </v-text-field>
                <v-text-field v-model="obj.email" :rules="errorMessage.email" label="Email">
                </v-text-field>
                <v-text-field v-model="obj.education" :rules="errorMessage.education" label="Education">
                </v-text-field>
                <v-select v-model="obj.bloodGroup" :rules="errorMessage.bloodGroup" :items="bloodGroupArray"
                    label="Blood Group">
                </v-select>
                <v-select v-model="obj.occupation" :rules="errorMessage.occupation" :items="occupationArray"
                    label="Occupation">
                </v-select>
                <v-text-field v-model="obj.company" :rules="errorMessage.company" label="Company/Business Name & Location">
                </v-text-field>
            </div>
            <div class="text-center mt-5 mb-8">
                <v-btn class="me-4" type="submit" color="success">
                    Submit
                </v-btn>

                <v-btn @click="handleReset" color="yellow">
                    Reset
                </v-btn>
            </div>
        </v-form>

    </section>
    <v-alert v-if="$store.state.signUpError == 'noError'" color="success" icon="$success" title="Success"
        :text="`${obj.email} successfully registered`">
    </v-alert>
    <v-alert v-if="$store.state.signUpError != 'noError' && $store.state.signUpError !== ''" color="warning" icon="$warning"
        title="Warning" :text="`${$store.state.signUpError} Please try with another Email`">
    </v-alert>


    <v-dialog v-model="snackbar" persistent>
        <v-card loading :text="`${obj.name}'s profile details are successfully added. Redirecting to Profile Page.`"
            subtitle="Confirmation"></v-card>
    </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            snackbar: false,
            genderArray: ['Male', 'Female'],
            bloodGroupArray: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-',],
            areaArray: ['Shivganga Nagar', 'Kansai Section', 'Sai Section', 'Kher Section', 'Vadavli', 'Palegaon', 'Green City Area', 'B-Cabin', 'Ambernath West', 'Navare Nagar', 'Vardhman Nagar'],
            kuldeviArray: ['Shree. Jogeshwari Mata', 'Shree. Ashapura Mata', 'Shree. Sulai Mata', 'Shree. Ekvira Mata', 'Shree. Dhanai-Punai Mata', 'Shree. Bhavani Mata', 'Shree. Mhalsa Mata', 'Shree. Mathamba Mata', 'Shree. Annapurna Mata', 'Shree. Manu devi', 'Shree. Sarja-Barja Mata', 'Shree. Pedkai Mata'],
            occupationArray: [
                'Business / Self-Employed', 'Job', 'Home maker', 'Student', 'Retired'
            ],
            errorMessage: {
                name: [v => !!v || 'Please Enter a name'],
                education: [v => !!v || 'Please Enter your Education/Qualification'],
                occupation: [v => !!v || 'Please Enter your Occupation/Business'],
                dob: [v => !!v || 'Please Enter your Birth/Date of Birth'],
                gender: [v => !!v || 'Please Select a Gender'],
                area: [v => !!v || 'Please Select a Area'],
                company: [v => !!v || 'Please Enter your Company/Business Name and Location'],
                address: [v => !!v || 'Please Enter Address'],
                kuldevi: [v => !!v || 'Please Select Kuldevi'],
                bloodGroup: [v => !!v || 'Please Select a Blood Group'],
                maritalStatus: [v => !!v || 'Please Select a Marital Status'],
                phone: [
                    value => {
                        if (value) return true
                        return 'Phone Number is requred.'
                    },
                    value => {
                        console.log('calyx len', value.toString().length)
                        if (value.toString().length == 10) return true

                        return 'Enter 10 digits'
                    },
                ],

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
            obj: {
                name: '',
                education: '',
                gender: '',
                dob: '',
                phoneNumber: '',
                whatsappNumber: '',
                bloodGroup: '',
                occupation: '',
                company: '',
                maritalStatus: '',
                area: '',
                kuldevi: '',
            }
        }
    },
    mounted() {

    },
    methods: {
        reverseDateFormat(inputDate) {
            var dateComponents = inputDate.split('-');
            var reversedDate = dateComponents[2] + '-' + dateComponents[1] + '-' + dateComponents[0];
            return reversedDate;
        },
        handleReset() {
            this.$store.state.signUpError = '';
            this.$refs.form.reset()
            this.$refs.form.resetValidation();
        },
        async submit() {
            const validate = await this.$refs.form.validate();
            if (validate.valid) {
                this.obj.url =  'https://res.cloudinary.com/day9yxxz0/image/upload/v1698490338/profile_picture/rvsqs7wumhjefgbqamhv.jpg';
                this.obj.dob = this.reverseDateFormat(this.obj.dob);
                const payload = {};
                payload.email = this.obj.email;
                payload.password = 123456;
                this.obj.head = true;
                this.$store.dispatch('signUserUp', {payload, obj : this.obj});
            }
        }
    },
    computed: {
        ...mapGetters(['getSignUpError']),
    },
    watch: {
        getSignUpError(value) {
            if (value == 'noError') {
                this.$store.dispatch('createProfile', this.obj);
                this.snackbar = true;
                this.$store.state.signUpError = '';
                setTimeout(() => {
                    this.snackbar = false;
                    this.$router.push('/');
                }, 3000);
            }
        }
    }
}
</script>

<style>
.center-form {
    margin-left: 30vw;
    margin-right: 30vw;

}

.add-form {
    border: 1px solid black;
    padding: 1%;
}

.v-dialog {
    width: 50vw;
}

@media (max-width:1024px) {
    .center-form {
        margin-left: 10vw;
        margin-right: 10vw;

    }

    .add-form {
        border: 1px solid black;
    }
}
</style>
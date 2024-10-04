<template>
    <section class="section">
        <v-card color="primary" title="UPLOAD TRANSACTION RECEIPT" class="text-center header-card"></v-card>
        <div class="mt-8"></div>
        <h3 class="mb-5 text-center">Please Enter All details of the amount you paid for</h3>
        <v-autocomplete label="Search Members" :items="info" v-model="search" return-object>

        </v-autocomplete>
        <section v-if="this.search != ''">
            <v-form @submit.prevent="submit" ref="form">
                <v-table>
                    <thead>
                        <tr>
                            <th>
                                अ.क.
                            </th>
                            <th>
                                तपशील
                            </th>
                            <th>
                                रक्कम
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>वार्षिक वर्गणी</td>
                            <td>
                                <v-text-field readonly v-model="obj.vargani">

                                </v-text-field>
                            </td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>सभासद नोंदणी शुल्क</td>
                            <td>
                                <v-text-field v-model="obj.shulk">

                                </v-text-field>
                            </td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>पुरस्कृत रक्कम</td>
                            <td>
                                <v-text-field v-model="obj.purskrut_rakkam">

                                </v-text-field>
                            </td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>विशेष बक्षीस</td>
                            <td>
                                <v-text-field v-model="obj.vishesh_bakshish">

                                </v-text-field>
                            </td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>विशेष देणगी</td>
                            <td>
                                <v-text-field v-model="obj.dengi">

                                </v-text-field>
                            </td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td>भोजन खर्च पुरस्कृत</td>
                            <td>
                                <v-text-field v-model="obj.bhojan">

                                </v-text-field>
                            </td>
                        </tr>
                        <tr>
                            <td>7</td>
                            <td>नवविवाहित देणगी</td>
                            <td>
                                <v-text-field v-model="obj.navvivahit">

                                </v-text-field>
                            </td>
                        </tr>
                        <tr>
                            <td>8</td>
                            <td>स्मरणार्थ देणगी</td>
                            <td>
                                <v-text-field v-model="obj.smarnarth_dengi">

                                </v-text-field>
                            </td>
                        </tr>
                        <tr>
                            <td>9</td>
                            <td>इतर</td>
                            <td>
                                <v-text-field v-model="obj.others">

                                </v-text-field>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>एकूण</td>
                            <td>
                                <v-text-field readonly v-model="total">

                                </v-text-field>
                            </td>
                        </tr>
                    </tbody>
                </v-table>
                <v-select :items="['Cash', 'Online']" label="Mode of Payment" v-model="obj.paymentMode"
                    :rules="errorMessage.select">

                </v-select>
                <v-textarea v-model="obj.paymentInfo" v-if="obj.paymentMode == 'Cash'" label="Description"
                    placeholder="Please Mention the name of the person to whom cash was handed"
                    :rules="errorMessage.textArea">
                </v-textarea>

                <v-btn v-if="filename === '' && obj.paymentMode == 'Online'" @click="openUploadWidget()"
                    prepend-icon="mdi-upload" class="me-4" color="info">
                    Upload Document
                </v-btn>

                <v-card v-if="filename != '' && obj.paymentMode == 'Online'" class="ma-2 pl-2 pr-2 mt-3" color="success"
                    label text-color="white" variant="tonal"><v-icon icon="mdi-upload"></v-icon>{{ filename }} is
                    successfully
                    uploaded, Please click on submit button</v-card>

                <v-btn class="me-4" type="submit" color="success">
                    Submit
                </v-btn>

                <v-btn @click="handleReset" color="red">
                    Clear
                </v-btn>
            </v-form>
        </section>
        <v-alert v-if="error !== ''" color="error mt-3" icon="$error" title="Error" :text="error">
        </v-alert>

        <v-dialog v-model="snackbar" persistent="true">
            <v-card v-if="snackbar" loading :text="success" subtitle="Confirmation"></v-card>
        </v-dialog>
    </section>
</template>

<script>
import router from '../router';

export default {
    data() {
        return {
            search: '',
            errorMessage: {
                select: [v => !!v || 'Please Select Payment Mode'],
                textArea: [v => !!v || 'Please Enter the name of Person to whom cash was handed.'],
            },
            obj: {
                vargani: 700,
                others: 0,
                total: 0,
                shulk: 0,
                purskrut_rakkam: 0,
                navvivahit: 0,
                smarnarth_dengi: 0,
                bhojan: 0,
                dengi: 0,
                vishesh_bakshish: 0,
                url: '',
                type: 'receipt',
                date: '',
                approved: 'none',
                rejectionMessage: '',
                paymentMode: '',
                paymentInfo: '',
            },
            filename: '',
            snackbar: false,
            flag: false,
        }
    },
    mounted() {
        this.$store.dispatch('getAccountProfileDetails');
    },
    methods: {
        handleReset() {
            this.$refs.form.reset()
            this.$refs.form.resetValidation();
            this.obj.vargani = 700;
            this.obj.others = 0;
            this.obj.total = 0;
            this.obj.shulk = 0;
            this.obj.purskrut_rakkam = 0;
            this.obj.navvivahit = 0;
            this.obj.smarnarth_dengi = 0;
            this.obj.bhojan = 0;
            this.obj.dengi = 0;
            this.obj.vishesh_bakshish = 0;
            this.obj.url = '';
            this.obj.type = 'receipt';
            this.obj.date = '';
            this.obj.rejectionMessage = '',
            this.obj.approved = 'none';
            this.flag = false;
            this.filename = '';
            this.obj.paymentMode = '';
            this.obj.paymentInfo = '';
        },
        async submit() {
            const validate = await this.$refs.form.validate();

            this.obj.date = this.getDate();
            console.log('zippy', this.total);
            this.obj.total = this.total;
            this.flag = true;
            this.obj.approved = 'none';
            this.obj.profile = this.search;
            this.obj.rejectionMessage = '',
            this.obj.uid = this.search.uid;
            this.obj.requestedBy = 'Admin';
            console.log(this.obj);
            if (validate.valid) {
                if (this.obj.paymentMode == 'Online' && this.obj.url != '') {
                    this.$store.dispatch('uploadDocument', this.obj);
                    this.success = 'Document Details Successfully Uploaded, Redirecting to Home Page';
                    this.snackbar = true;
        
                    setTimeout(() => {
                        //this.handleReset();
                        router.push('/')
                    }, 3000);
                }
                if (this.obj.paymentMode == 'Cash' && this.obj.paymentInfo != '') {
                    console.log('calyx', this.obj);
                    this.$store.dispatch('uploadDocument', this.obj);
                    this.success = 'Document Details Successfully Uploaded, Redirecting to Home Page';
                    this.snackbar = true;
                    
                    setTimeout(() => {
                       // this.handleReset();
                        router.push('/')
                    }, 3000);
                }
            }
        },
        openUploadWidget() {
            const widget = window.cloudinary.createUploadWidget(
                {
                    cloud_name: "day9yxxz0",
                    upload_preset: "receipt",
                },
                (error, result) => {
                    if (!error && result && result.event === "success") {
                        console.log(result.info.secure_url);
                        this.obj.url = result.info.secure_url;
                        console.log(this.obj.url);

                        this.obj.thumbnailUrl = result.info.thumbnail_url;

                        this.filename = result.info.original_filename;
                    }
                }
            )
            widget.open();
        },
        getDate() {
            const currentDate = new Date();

            // Get day, month, and year components
            const day = currentDate.getDate();
            const month = currentDate.getMonth() + 1; // Months are 0-based, so add 1
            const year = currentDate.getFullYear();
            this.obj.year = year;
            // Ensure day and month are formatted with leading zeros if needed
            const formattedDay = day < 10 ? `0${day}` : day;
            const formattedMonth = month < 10 ? `0${month}` : month;

            // Create the "dd-mm-yyyy" formatted date string
            const formattedDate = `${formattedDay}-${formattedMonth}-${year}`;
            return formattedDate;
        },

    },
    computed: {
        info() {
            console.log(this.$store.state.info);
            return this.$store.state.info;
        },
        total() {
            const total = Number(this.obj.vargani) + Number(this.obj.others) + Number(this.obj.shulk) + Number(this.obj.purskrut_rakkam) + Number(this.obj.navvivahit) + Number(this.obj.smarnarth_dengi) + Number(this.obj.bhojan) + Number(this.obj.dengi) + Number(this.obj.vishesh_bakshish)
            return total;
        },
        error() {
            if (this.obj.url == '' && this.flag && this.obj.paymentMode == 'Online') {
                return 'Please Upload a Document';
            }
            if (this.obj.paymentMode == '' && this.flag) {
                return 'Please Select Payment Mode'
            }
            return '';
        }
    }
}
</script>

<style scoped>
@media only screen and (max-width: 600px) {
    
    .section {
    margin: 5% 5%;
    border: 2px solid black;
    padding: 1%;
}
    }

.section {
    margin: 2% 25%;
    border: 2px solid black;
    padding: 1%;
}
</style>
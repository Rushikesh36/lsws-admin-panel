<template>
    <section>

        <v-card color="primary" title="ADD NOTIFICATION" class="text-center header-card"></v-card>
        <div class="mt-8"></div>
        <div class="center-form">
            <v-form @submit.prevent="submit" ref="form">
                <v-text-field v-model="obj.title" :rules="errorMessage.title" label="Email Subject">
                </v-text-field>

                <v-textarea v-model="obj.description" :rules="errorMessage.description"
                    label="Email Description"></v-textarea>

                <v-btn v-if="filename === ''" @click="openUploadWidget()" prepend-icon="mdi-upload" class="me-4"
                    color="info">
                    Upload Document
                </v-btn>

                <v-card v-else class="ma-2 pl-2 pr-2 mt-3" color="success" label text-color="white" variant="tonal"><v-icon
                        icon="mdi-upload"></v-icon>{{ filename }} is successfully uploaded, Please click on submit
                    button</v-card>

                <v-btn class="me-4" type="submit" color="success">
                    Submit
                </v-btn>

                <v-btn @click="handleReset" color="red">
                    clear
                </v-btn>
            </v-form>
        </div>
        <v-alert v-if="error !== ''" color="error mt-3" icon="$error" title="Error" :text="error">
        </v-alert>

        <v-dialog v-model="snackbar" :persistent="true" width="auto">
            <v-card v-if="snackbar" loading :text="success" subtitle="Confirmation"></v-card>
        </v-dialog>
        <v-dialog v-model="dialog" :persistent="true" width="auto">
            <v-card v-if="dialog" subtitle="Confirmation">       
                <v-card-text>
                    Sending mails to all members, Please Do not close this window
                    <v-progress-linear mt-10 :model-value="loadingPercent" color="deep-orange" height="10" striped></v-progress-linear>
                </v-card-text>         
            </v-card>
                        
        </v-dialog>
    </section>
    <hr class="mt-12">
    <section class="mt-8 all-notifications">
        <h2 class="text-center mb-5">All Notifications</h2>
        <v-table>
            <thead>
                <tr class="">
                    <th class="text-left font-weight-bold" width="20%">
                        Subject
                    </th>
                    <th class="text-left font-weight-bold">
                        Date
                    </th>
                    <th class="text-left font-weight-bold" width="50%">
                        Description
                    </th>
                    <th class="text-left font-weight-bold">
                        Send Mail
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in notifs" :key="item">
                    <td>{{ item.title }}</td>
                    <td>{{ item.date }}</td>
                    <td>{{ item.description }}</td>
                    <td><v-btn color="green" @click="sendTestMail(item)">Send Test Mail</v-btn></td>
                    <td><v-btn color="green" @click="sendMail(item)">Send Mail</v-btn></td>
                </tr>
            </tbody>
        </v-table>
    </section>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            loadingPercent: 0,
            dialog: false,
            obj: {
                title: '',
                description: '',
                url: '',
                thumbnailUrl: '',
            },
            filename: '',
            errorMessage: {
                title: [v => !!v || 'Please enter a Notification Title'],
                description: [v => !!v || 'Please enter a description'],
                url: [v => !!v || 'Please upload Notice Pdf']
            },
            snackbar: false,
            flag: false,
        }
    },
    mounted() {
        this.$store.dispatch('getAccountProfileDetailsForNotice');
        this.$store.dispatch('getNotifications');
    },
    methods: {
        sendTestMail() {
            let obj = {
                name: 'Test user',
                email: 'ambernath.wani.samaj@gmail.com'
            }
            let testArr = [];
            testArr.push(obj);
            this.sendMail(testArr);
        },
        async sendMail(item) {
            this.dialog = true;
            console.log(this.dialog);
            let info = this.info;    
            for (let i = 0; i < info.length; i++) {
                this.loadingPercent = Math.ceil((i/info.length)*100);
                console.log(this.loadingPercent);
                let name = info[i].name;
                let email = info[i].email;
                let description = item.description;
                let url = item.url;
                console.log(i);
                console.log(email);

                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImM2MjYzZDA5NzQ1YjUwMzJlNTdmYTZlMWQwNDFiNzdhNTQwNjZkYmQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA3NTkwOTk0NjUyNjc5MzI5NTg0IiwiZW1haWwiOiJhbWJlcm5hdGgud2FuaS5zYW1hakBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IndyZFZmNXVDcWtpQnRXRGg4cW5IS2ciLCJuYmYiOjE2OTcyMTIzMzcsImlhdCI6MTY5NzIxMjYzNywiZXhwIjoxNjk3MjE2MjM3LCJqdGkiOiJmMWIyMTVlZTUyNjIxZjExYWVhOTg3YWE5YmU4M2QyZmM2Njg3MzM1In0.i4dMfuV6mTXFOqfp7J5VuwI7eQZ8glAUzBpn9zzsCDVk097mkltWPSxx1oojdAD4235W_RTwAyAeT3GWMG1W408KdZ_HWRCy755nTpmO_qzn7ynN2If0YWAuOZRX2pSKZmUc1I1OZtYrz9LdhmpcZNchieKe6MspoyVL30_HFryyuMy2PMGMYIEg-HU4xOAObOvTqxS5W1WjB-UjH4evNBpnv4hUsFyBoKKDaZ5cShaid_dhDbOKmnx7wjr6V3LEn8G8dARvnDaftZcvYZ6d9nl7I8WBHltuVVQ046Pl64g7qV8hS2OMxhRIMbZfJWbF17TL0cQbONrRIimAFHtd6A'
                }
                let body = JSON.stringify({
                    name, email, description, url
                });
                const apiurl = `https://us-central1-wani-samaj.cloudfunctions.net/sendEmail`;
                await axios.post(
                    apiurl,
                    body,
                    {
                        headers: headers
                    }
                )
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
            this.dialog = false;
            console.log(this.dialog);
        },
        handleReset() {
            this.$refs.form.reset()
            this.$refs.form.resetValidation();
            this.flag = false;
            this.filename = '';
        },
        async submit() {
            const validate = await this.$refs.form.validate();
            this.obj.date = this.getDate();
            this.flag = true;
            if (validate.valid && this.obj.url !== '') {
                this.$store.dispatch('addNotification', this.obj);
                this.success = 'Please wait while we add the notification...';
                this.snackbar = true;
                this.handleReset();
                const store = this.$store;
                setTimeout(() => {
                    this.snackbar = false;
                    store.dispatch('getNotifications');
                }, 3000);
            }
        },
        openUploadWidget() {
            const widget = window.cloudinary.createUploadWidget(
                {
                    cloud_name: "day9yxxz0",
                    upload_preset: "tka4aiu5",
                },
                (error, result) => {
                    if (!error && result && result.event === "success") {
                        this.obj.url = result.info.secure_url;

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

            // Ensure day and month are formatted with leading zeros if needed
            const formattedDay = day < 10 ? `0${day}` : day;
            const formattedMonth = month < 10 ? `0${month}` : month;

            // Create the "dd-mm-yyyy" formatted date string
            const formattedDate = `${formattedDay}-${formattedMonth}-${year}`;
            return formattedDate;
        }
    },
    computed: {
        notifs() {
            return this.$store.state.notifications;
        },
        error() {
            if (this.obj.url == '' && this.flag) {
                return 'Please Upload a Document';
            }
            return '';
        },
        info() {
            console.log(this.$store.state.noticeInfo);
            return this.$store.state.noticeInfo;
        }
    }
}
</script>
<style>
.all-notifications {
    margin-left: 10vw;
    margin-right: 10vw;
}
</style>
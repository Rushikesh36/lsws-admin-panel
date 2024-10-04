<template>
    <v-card color="primary" title="APPROVE RECEIPTS" class="text-center header-card"></v-card>
    <div class="mt-8"></div>
    <div class="center-form">
        <h3>Select Year</h3>
        <v-select v-model="selectedYear" :items="yearArray"></v-select>
        <h3 v-if="allReceipts.length == 0" class="text-center">No Receipts Uploaded Yet</h3>
        <div v-else>
            <div class="text-center">
                <v-btn v-if="this.selectedYear" color="orange" :href="href" download="Receipt Data" class="mt-4 mb-4">Generate Report</v-btn>
            </div>
            <v-expansion-panels variant="popout">
                <v-expansion-panel v-for="i in allReceipts" :key="i">
                    <v-expansion-panel-title v-if="i.approved === true">{{ i.profile.name }} - {{
                        i.profile.area }} <span class="ml-8"><v-chip class="ma-2" color="green" label text-color="white">
                                Approved
                            </v-chip></span></v-expansion-panel-title>
                    <v-expansion-panel-title v-else-if="i.approved === false">{{ i.profile.name }} - {{
                        i.profile.area }} <span class="ml-8"><v-chip class="ma-2" color="red" label text-color="white">
                                Rejected
                            </v-chip></span></v-expansion-panel-title>
                    <v-expansion-panel-title v-else>{{ i.profile.name }} - {{ i.profile.area }} <span class="ml-8"><v-chip
                                class="ma-2" color="orange" label text-color="white">
                                Waiting for approval
                            </v-chip></span></v-expansion-panel-title>
                    <v-expansion-panel-text>
                        <v-list lines="one">
                            <v-list-item v-if="i.paymentMode == 'Online'">
                                <v-list-item-title>Uploaded Receipt</v-list-item-title>
                                <v-list-item-subtitle><a target='_blank' :href="i.url">View
                                        Document</a></v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-title>Phone Number</v-list-item-title>
                                <v-list-item-subtitle>{{ i.profile.phoneNumber }}</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-title>Address</v-list-item-title>
                                <v-list-item-subtitle>{{ i.profile.address }}</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-title>Date of Payment</v-list-item-title>
                                <v-list-item-subtitle>{{ i.date }}</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-title>Uploaded By</v-list-item-title>
                                <v-list-item-subtitle>{{ i.requestedBy }}</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-title>Amount Paid</v-list-item-title>
                                <v-list-item-subtitle>Rs. {{ i.total }} </v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-title>Mode of Payment</v-list-item-title>
                                <v-list-item-subtitle>{{ i.paymentMode }} </v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item v-if="i.paymentMode == 'Cash'">
                                <v-list-item-title>Payment Information</v-list-item-title>
                                <v-list-item-subtitle>{{ i.paymentInfo }} </v-list-item-subtitle>
                            </v-list-item>
                            <v-btn v-if="i.approved == true" color="success">Approved</v-btn>
                            <v-btn v-if="i.approved == 'none'" @click="approve(i.id)" color="success"
                                class="mt-4">Approve</v-btn>
                            <v-text-field v-if="i.approved != false" label="Description" v-model="rejectMessage"
                                class="pt-4">

                            </v-text-field>
                            <v-btn type="submit" v-if="i.approved != false" @click="reject(i.id)" color="red">Reject</v-btn>
                            <v-text-field v-if="i.approved == false" label="Description" readonly
                                :model-value="i.rejectionMessage">

                            </v-text-field>
                            <v-btn v-if="i.approved == false" color="red">Rejected</v-btn>
                        </v-list>
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            rejectMessage: '',
            selectedYear: '',
            yearArray: [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030],
        }
    },
    mounted() {
        const currentDate = new Date();
        this.selectedYear = currentDate.getFullYear();
        this.$store.dispatch('getAllReceipts', this.selectedYear);
    },
    computed: {
        allReceipts() {
            return this.$store.state.receipts;
        },
    },
    methods: {
        approve(id) {
            const receiptNumber = `${this.selectedYear}/${Math.floor(100000 + Math.random() * 900000)}`
            const approvedDate = this.getDate();
            this.$store.dispatch('approved', { id, msg: this.rejectMessage, year: this.selectedYear, receiptNumber, approvedDate });
        },
        reject(id) {
            console.log(this.rejectMessage);
            this.$store.dispatch('rejected', { id, msg: this.rejectMessage, year: this.selectedYear });
            this.rejectMessage = '';
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
    watch: {
        selectedYear(value) {
            this.$store.dispatch('getAllReceipts', value);
        },
        allReceipts(value) {
            let data = [
                ['Receipt Date', 'Name', 'Area', 'Phone Number', 'Varshik Vargani', 'Sabhasad Nondni Shulk', 'Purskrut Rakkam', 'Vishesh Bakshish', 'Vishesh Dengi', 'Bhojan Karch Purskrut', 'Navvivahit Dengi', 'Smarnarth Dengi', 'Others', 'Total', 'Mode of Payment','Payment Date'],
            ]
            console.log('calyx',value.length);
            for (let i = 0; i < value.length; i++) {
                let temp = [];
                console.log(value[i].approved);
                if (value[i].approved) {
                    console.log(value[i].approvedDate);
                    temp.push(value[i].approvedDate);
                    temp.push(value[i].profile.name);
                    temp.push(value[i].profile.area);
                    temp.push(value[i].profile.phoneNumber);
                    temp.push(value[i].vargani);
                    temp.push(value[i].shulk);
                    temp.push(value[i].purskrut_rakkam);
                    temp.push(value[i].vishesh_bakshish);
                    temp.push(value[i].dengi);
                    temp.push(value[i].bhojan);
                    temp.push(value[i].navvivahit);
                    temp.push(value[i].smarnarth_dengi);
                    temp.push(value[i].others);
                    temp.push(value[i].total);
                    temp.push(value[i].paymentMode);
                    temp.push(value[i].date);
                    data.push(temp);
                }
            }
            console.log(data);
            let excelData = '';


            data.forEach((rowItem, rowIndex) => {

                if (0 === rowIndex) {

                    rowItem.forEach((colItem) => {
                        excelData += colItem + ',';
                    });
                    excelData += "\r\n";

                } else {

                    rowItem.forEach((colItem) => {
                        excelData += colItem + ',';
                    })
                    excelData += "\r\n";
                }
            });

            const csv = data.map(row => row.map(field => {
                return field;
            }).join(',')).join('\n');

            excelData = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
            console.log(excelData);
            this.href = excelData;
        }
    }
}
</script>

<style scoped>
@media only screen and (max-width: 600px) {
    
.center-form {
    margin-left: 5vw;
    margin-right: 5vw;
}
}

.center-form {
    margin-left: 25vw;
    margin-right: 25vw;
}</style>
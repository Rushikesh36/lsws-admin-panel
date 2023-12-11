<template>
    <v-card color="primary" title="RESULTS" class="text-center header-card"></v-card>
    <div class="center-form mt-8">
        <h2 class="mb-5">Select Year</h2>
        <v-select v-model="selectedYear" :items="yearArray"></v-select>
        <div class="text-center">
                <v-btn v-if="this.selectedYear" color="orange" :href="href" download="result" class="mt-4 mb-4">Generate Report</v-btn>
        </div>
        <h3 v-if="allResults.length === 0" class="text-center">No Results Uploaded Yet</h3>
        <div v-else>
            <v-table>
                <thead>
                    <tr>
                        <th class="text-left">
                            Name
                        </th>
                        <th class="text-left">
                            Standard/Degree
                        </th>
                        <th class="text-left">
                            Precentage/Marks
                        </th>
                        <th class="text-center">
                            View Document
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in allResults" :key="item.name">
                        <td>{{ item.name }}</td>
                        <td>{{ item.grade }}</td>
                        <td>{{ item.marks }}</td>
                        <td class="text-center"><a :href="item.url" target="_blank"><v-icon
                                    icon="mdi-eye-outline"></v-icon></a>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            href: '',
            rejectMessage: '',
            selectedYear: '',
            yearArray: [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030],
        }
    },
    mounted() {
        const currentDate = new Date();
        this.selectedYear = currentDate.getFullYear();
        this.$store.dispatch('getAllResult', this.selectedYear);
    },
    computed: {
        allResults() {
            return this.$store.state.result;
        },
    },
    methods: {

    },
    watch: {
        selectedYear(value) {
            this.$store.dispatch('getAllResult', value);
        },
        allResults(value) {
            let data = [
                ['Uploader Profile Name', 'Date Uploaded', 'Name', 'Standard/Degree', 'Percentage/Marks/Grade'],
            ]
            for (let i = 0; i < value.length; i++) {
                let temp = [];
                temp.push(value[i].profile.name);
                temp.push(value[i].date);
                temp.push(value[i].name);
                temp.push(value[i].grade);
                temp.push(value[i].marks);
                data.push(temp);
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
        },
    }
}
</script>
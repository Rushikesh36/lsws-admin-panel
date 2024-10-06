<template>
    <v-card color="primary" title="DOCUMENTS" class="text-center header-card"></v-card>
    <div class="center-form mt-8">
        <h2 class="mb-5">Select Year</h2>
        <v-select v-model="selectedYear" :items="yearArray"></v-select>
        <h3 v-if="allDocs.length === 0" class="text-center">No Documents Uploaded Yet</h3>
        <div v-else>
            <v-table>
                <thead>
                    <tr>
                        <th class="text-left">
                            Family Head Name
                        </th>
                        <th class="text-left">
                            Document Title
                        </th>
                        <th class="text-left">
                            Document Description
                        </th>
                        <th class="text-center">
                            View Document
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in allDocs" :key="item.name">
                        <td>{{ item.profile.name }}</td>
                        <td>{{ item.title }}</td>
                        <td>{{ item.description }}</td>
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
        this.$store.dispatch('getDocument', this.selectedYear);
    },
    computed: {
        allDocs() {
            return this.$store.state.documents;
        },
    },
    methods: {

    },
    watch: {
        selectedYear(value) {
            this.$store.dispatch('getDocument', value);
        },
        
    }
}
</script>
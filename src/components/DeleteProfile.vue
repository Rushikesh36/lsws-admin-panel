<template>
  <v-card color="primary" title="DELETE MEMBERS" class="text-center header-card"></v-card>
  <div class="mt-8"></div>
  <h3 class="mb-3 text-center mb-5">Search Members that needs to be deleted</h3>
  <div class="center-form">
    <v-autocomplete label="Search Members" :items="info" v-model="search" return-object clearable>

    </v-autocomplete>

    <v-expansion-panels v-if="search !== '' && search" variant="popout" v-model="panel" class="mb-10">
      <v-expansion-panel color="green" value="open">
        <v-expansion-panel-title>
          {{ search.name }}
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-list lines="one">
            <v-list-item class="text-center">
              <div class="prof_pic text-center">
                <v-img :width="100" class="prof-img text-center" aspect-ratio="1/1" cover :src="search.url">
                </v-img>
              </div>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Date of Birth</v-list-item-title>
              <v-list-item-subtitle>{{ search.dob }}</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Gender</v-list-item-title>
              <v-list-item-subtitle>{{ search.gender }}</v-list-item-subtitle>
            </v-list-item>
            <v-list-item lines="two">
              <v-list-item-title>Address</v-list-item-title>
              <v-list-item-subtitle>{{ search.address }}</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Area</v-list-item-title>
              <v-list-item-subtitle>{{ search.area }}</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Marital Status</v-list-item-title>
              <v-list-item-subtitle>{{ search.maritalStatus }}</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Kuldevi</v-list-item-title>
              <v-list-item-subtitle>{{ search.kuldevi }}</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Phone Number</v-list-item-title>
              <v-list-item-subtitle>{{ search.phoneNumber }}</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Whatsapp Number</v-list-item-title>
              <v-list-item-subtitle>{{ search.whatsappNumber }}</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Email</v-list-item-title>
              <v-list-item-subtitle>{{ search.email }}</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Education</v-list-item-title>
              <v-list-item-subtitle>{{ search.education }}</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Blood Group</v-list-item-title>
              <v-list-item-subtitle>{{ search.bloodGroup }}</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Occupation</v-list-item-title>
              <v-list-item-subtitle>{{ search.occupation }}</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Company/Business</v-list-item-title>
              <v-list-item-subtitle>{{ search.company }}</v-list-item-subtitle>
            </v-list-item>
            <v-list-item class="text-center mt-5">
              <v-list-item-title><v-btn color="red" @click="deleteProfile(search)">Delete
                  Profile</v-btn></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
  <v-dialog v-model="snackbar" persistent>
    <v-card loading :text="success" subtitle="Confirmation"></v-card>
  </v-dialog>
</template>
  
<script>
export default {
  data() {
    return {
      search: '',
      panel: ['open'],
      snackbar: false,
    }
  },
  mounted() {
    this.$store.dispatch('getAccountProfileDetails');
  },
  computed: {
    info() {
      console.log(this.$store.state.info);
      return this.$store.state.info;
    }
  },
  methods: {
    deleteProfile(item) {
      this.$store.dispatch('deleteProfile', item);
      this.success = `${this.search.name}'s account profile successfully deleting...`;
      this.snackbar = true;
      this.search = '';
      setTimeout(() => {
        this.snackbar = false;
        this.$router.push('/delete')
        console.log(this.snackbar);
      }, 3000);
      //this.snackbar = false;
      this.$store.dispatch('getAccountProfileDetails');
    }
  }
}

</script>

<style>
  .v-list-item-subtitle {
    opacity: unset !important;
    font-weight: 500;
    font-size: 1.1 !important;
}

.v-list-item-title {
    font-weight: 400;
    font-size: 1.15rem !important;
}

.v-expansion-panel-title {
    font-size: 1.15rem !important;
    font-weight: 700;
}
</style>
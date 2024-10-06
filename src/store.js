import { createStore } from 'vuex';
import { getAllReceipt, setApproved, addProfile, getAllInfo, deleteMember, rejected, getResult, addMailer, getNotifs, addDocument, getAllInfoForEmail,deleteNotifs, getDocument, getNums } from './index';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, onAuthStateChanged } from "firebase/auth";
import router from './router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
  apiKey: "AIzaSyAqGzRGsNMI_LQPZKsJEz8SrH8gVMjj7Rg",
  authDomain: "wani-samaj.firebaseapp.com",
  projectId: "wani-samaj",
  storageBucket: "wani-samaj.appspot.com",
  messagingSenderId: "236432959431",
  appId: "1:236432959431:web:dbbe6674c7f310acabdbe2"
};

firebase.initializeApp(config);
const auth = getAuth();

const store = createStore({
  state: {
    signUpError: '',
    receipts: [],
    info: [],
    noticeInfo: [],
    result: [],
    notifications: [],
    signInError: '',
    isAuthenticated: false,
    uid: 'defaultValue',
    user: '',
    documents: [],
    dashboard: {
      head: 0,
      members: 0
    },
  },
  actions: {
    async getNums({state}) {
      
      state.dashboard = await getNums();
    },
    async getDocument({state}, year) {
      console.log(state);
      state.documents = await getDocument(year);
    },
    async deleteNotifs({state}, id) {
      console.log(state);
      await deleteNotifs(id);
    },
    passwordReset: async ({ state }, email) => {
      console.log(state);
      sendPasswordResetEmail(auth, email).then(() => {
        state.forgetPasswordError = `Sucessfully sent a password reset link to ${email}`;
      }).catch((error) => {
        console.log(error);
        state.forgetPasswordError = error;
      });
    },
    checkLoggedIn({ state }) {
      console.log('Checking',auth.user);
      const user = auth.currentUser;
      console.log('Checking',user);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log(user.uid);
          state.user = user.email;
          state.uid = user.uid;
          if (state.user) {
            state.isAuthenticated = true;
          }
          router.push('/');
        }else{
          state.uid = 'notLoggedIn';
        }
      });
    },
    signUserIn({ state, dispatch }, payload) {
      state.password = payload.password;
      signInWithEmailAndPassword(auth, payload.email, payload.password)
        .then(
          user => {
            state.signInError = '';
            state.user = user.user.email;
            state.uid = user.user.uid;
            if (state.user) {
              state.isAuthenticated = true;
            }
            console.log(state.isAuthenticated);
            dispatch('getAccountProfileDetails');
            router.push('/');
          }
        )
        .catch(
          error => {
            state.signInError = error.message;
            console.log(error)
          }
        )
    },
    logout({ state }) {
      signOut(auth)
        .then(() => {
          router.push('/login');
          state.isAuthenticated = false;
          state.user = null;
        })
    },
    async signUserUp({ state, dispatch }, payload, obj) {
      state.signUpError = '';
      await createUserWithEmailAndPassword(auth, payload.email, payload.password)
        .then(
          () => {
            state.signUpError = 'noError';
            dispatch('createProfile',obj);
            signOut(auth)
          }
        )
        .catch(
          error => {
            state.signUpError = error.message;
          }
        )
    },
    async getAllReceipts({state},year){
      state.receipts = await getAllReceipt(year);
      console.log('apicall', state.receipts);
    },
    async approved({state, dispatch},{id,msg,year,receiptNumber,approvedDate}){
      console.log(state);
      await setApproved(id,msg,receiptNumber,approvedDate)
      .then(() => {
        dispatch('getAllReceipts',year);
      });
    },
    uploadDocument: async ({ state }, obj) => {
      console.log(state);
      await addDocument(obj);
    },
    async rejected({state, dispatch},{id,msg,year}){
      let obj = {};
      obj.rejectionMessage = msg;
      obj.approved = false;
      console.log(state);
      console.log(id);
      await rejected(id, obj)
      .then(() => {
        dispatch('getAllReceipts',year);
      });
    },
    async createProfile({state},obj){
      console.log(state);
      console.log(obj);
      addProfile(obj);
    },
    getAccountProfileDetails: async ({ state }) => {
      const data = await getAllInfo();
      console.log(data);
      const newArray = data.map(obj => {
        return {
          ...obj, 
          title: `${obj.name} - ${obj.area}`,
          value: obj.id,
        };
      });
      state.info = newArray;
      console.log('calyx store', state.info);
    },
    getAccountProfileDetailsForNotice: async ({ state }) => {
      const data = await getAllInfoForEmail();
      console.log(data);
      const newArray = data.map(obj => {
        return {
          ...obj, 
          title: `${obj.name} - ${obj.area}`,
          value: obj.id,
        };
      });
      state.noticeInfo = newArray;
      console.log('calyx store', state.noticeInfo);
    },
    deleteProfile({state},item) {
      console.log(state);
      deleteMember(item);
    },
    async getAllResult({state},year){
      state.result = await getResult(year);
    },
    async addNotification({state},obj){
      console.log(state);
      addMailer(obj)
    },
    async getNotifications({state}){
      state.notifications = await getNotifs();
    }
  },
  getters: {
    getSignUpError: (state) => state.signUpError,
  }
});

export default store;
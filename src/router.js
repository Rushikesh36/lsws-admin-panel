import { createRouter , createWebHistory } from 'vue-router';
import store from './store';
import RegisterPage from './components/RegisterPage';
import ReceiptApproval from './components/ReceiptApproval';
import AddUser from './components/AddUser';
import DeleteProfile from './components/DeleteProfile';
import ResultShow from './components/ResultShow';
import ShowDocument from './components/DocumentShow';
import Notifications from './components/NotificationMailer';
import HomePage from './components/HomePage';
import ReceiptUploadPage from '../src/components/ReceiptUpload';
import LoginPage from '../src/components/LoginForm';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/register', component: RegisterPage},
        { path: '/login', name:'login', component : LoginPage},
        { path: '/upload/receipt', name: 'document-receipt-page', component : ReceiptUploadPage},
        { path: '/receiptApproval', component: ReceiptApproval},
        { path: '/addProfile', component: AddUser},
        { path: '/delete', component: DeleteProfile},
        { path: '/result', component: ResultShow},
        { path: '/notifications', component: Notifications},
        { path: '/', component: HomePage},
        { path: '/showDocument', component: ShowDocument},
        { path: '/:notfound', redirect: '/'},
    ],
    scrollBehavior(to) {
        document.getElementById('app').scrollIntoView({ behavior: 'smooth' });
        if (to.hash) {
            return {
                selector: to.hash
            }
        }
    }
});

router.beforeEach((to, from, next) => {
    if(to.name==='login' && store.state.isAuthenticated){
        next('/');
    }
    else if(to.name!=='login' && !store.state.isAuthenticated){
        next('/login')
    }else{
        console.log('her')
        next()
    }
});

export default router;

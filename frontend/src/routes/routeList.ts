import EstimatePage from '../components/EstimateDelivery';
import LoginPage from '../components/LoginPage';
import ManageEstimate from '../components/ManageEstimate';

const routeList =  [
    {
      path: '/',
      component: LoginPage,
    },
    {
      path: '/manage-estimate',
      component: ManageEstimate,
    },
    {
      path: '/estimate/:token?',
      component: EstimatePage,
    },
];

export default routeList;

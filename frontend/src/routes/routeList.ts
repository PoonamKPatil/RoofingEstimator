import EstimatePage from '../components/EstimateDelivery';
import ManageEstimate from '../components/ManageEstimate';

const routeList =  [
    {
      path: '/',
      component: ManageEstimate,
    },
    {
      path: '/estimate/:token?',
      component: EstimatePage,
    },
];

export default routeList;

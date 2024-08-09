import EstimateDelivery from '../components/estimate/EstimateDelivery';
import LoginPage from '../components/LoginPage';
import ListEstimates from '../components/estimate/ListEstimates';
import EditEstimate from '../components/estimate/EditEstimate';
import CreateEstimate from '../components/estimate/CreateEstimate';

const routeList =  [
  {
    path: '/',
    component: LoginPage,
  },
  {
    path: '/view-estimate',
    component: EstimateDelivery,
  },
];

const protectedRouteList =  [
  {
    path: '/estimate',
    component: CreateEstimate,
  },
  {
    path: '/estimates',
    component: ListEstimates,
  },
  {
    path: '/estimate/:estimateId?',
    component: EditEstimate,
  },
];

export {routeList, protectedRouteList};

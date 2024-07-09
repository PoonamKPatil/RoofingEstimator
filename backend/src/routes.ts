import { Router } from 'express';
import { login, register } from './controllers/authController';
import {createEstimate, deleteEstimate, getEstimate, getTotalEstimatedCostByToken, updateEstimate } from './controllers/estimateController';
import { createMaterial, deleteMaterial, getMaterial, getMaterials, updateMaterial } from './controllers/materialsController';

const router = Router();

router.post('/register', register);
router.post('/login', login);

router.post('/estimate', createEstimate);
router.get('/estimate/:id', getEstimate);
router.get('/estimate', getTotalEstimatedCostByToken);
router.put('/estimate/:id', updateEstimate);
router.delete('/estimate/:id', deleteEstimate);

router.post('/materials', createMaterial);
router.get('/materials', getMaterials);
router.get('/materials/:id', getMaterial);
router.put('/materials/:id', updateMaterial);
router.delete('/materials/:id', deleteMaterial);

export default router;

import { Router } from 'express';
import { login, register } from './controllers/authController';
import {createEstimate, deleteEstimate, getEstimate, getTotalEstimatedCostByToken, updateEstimate } from './controllers/estimateController';
import { createMaterial, deleteMaterial, getMaterial, getMaterials, updateMaterial } from './controllers/materialsController';

const router = Router();

router.post('/register', register);
router.post('/login', login);

/**
 * @swagger
 * /estimate:
 *   post:
 *      summary: create estimate
 *      tags: [Estimate]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                        roofSquareFootage:
 *                          type: integer
 *                        pitch:
 *                          type: integer
 *                        bundleCoverage:
 *                          type: integer
 *                        wastePercentage:
 *                          type: integer
 *                        laborRate:
 *                          type: integer
 *                        estimatedHour:
 *                          type: integer
 *                        tax:
 *                          type: integer
 *                        materialId:
 *                          type: integer
 *      responses:
 *       201:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               data: [{}]
 *       500:
 *         description: Internal server error
 * 
 * */
router.post('/estimate', createEstimate);

/**
 * @swagger
 * /estimate/{id}:
 *   get:
 *      summary: get estimate by id
 *      tags: [Estimate]
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal server error
 * 
 * */
router.get('/estimate/:id', getEstimate);

/**
 * @swagger
 * /estimate:
 *   get:
 *      summary: get estimate by token
 *      tags: [Estimate]
 *      security:
 *          - bearerAuth: [] 
 *      responses:
 *       200:
 *         description: Successful response
 *       401:
 *         description: Access Denied
 *       500:
 *         description: Internal server error
 *
 * */
router.get('/estimate', getTotalEstimatedCostByToken);

/**
 * @swagger
 * /estimate/{id}:
 *   put:
 *      summary: update estimate
 *      tags: [Estimate]
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                        roofSquareFootage:
 *                          type: integer
 *                        pitch:
 *                          type: integer
 *                        bundleCoverage:
 *                          type: integer
 *                        wastePercentage:
 *                          type: integer
 *                        laborRate:
 *                          type: integer
 *                        estimatedHour:
 *                          type: integer
 *                        tax:
 *                          type: integer
 *                        materialId:
 *                          type: integer
 *      responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal server error
 * 
 * */
router.put('/estimate/:id', updateEstimate);

/**
 * @swagger
 * /estimate/{id}:
 *   delete:
 *      summary: delete estimate
 *      tags: [Estimate]
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal server error
 * 
 * */
router.delete('/estimate/:id', deleteEstimate);


/**
 * @swagger
 * /materials:
 *   post:
 *      summary: create material
 *      tags: [Material]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                        type:
 *                          type: string
 *                        coveragePerUnit:
 *                          type: integer
 *      responses:
 *       201:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               data: [{}]
 *       500:
 *         description: Internal server error
 * 
 * */
router.post('/materials', createMaterial);

/**
 * @swagger
 * /materials:
 *   get:
 *      summary: get all materials
 *      tags: [Material]
 *      responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               data: [{"id": 1,
 *                          "type": "Shingles 40 sqft per bundle",
 *                           "coveragePerUnit": 123
 *                      }]
 *       500:
 *         description: Internal server error
 *
 * 
 * */
router.get('/materials', getMaterials);


/**
 * @swagger
 * /material/{id}:
 *   get:
 *      summary: get material by id
 *      tags: [Material]
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal server error
 * 
 * */
router.get('/materials/:id', getMaterial);

/**
 * @swagger
 * /materials/{id}:
 *   put:
 *      summary: update material
 *      tags: [Material]
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                        type:
 *                          type: string
 *                        coveragePerUnit:
 *                          type: integer
 *      responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal server error
 * 
 * */
router.put('/materials/:id', updateMaterial);

/**
 * @swagger
 * /materials/{id}:
 *   delete:
 *      summary: delete material
 *      tags: [Material]
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal server error
 * 
 * */
router.delete('/materials/:id', deleteMaterial);

export default router;

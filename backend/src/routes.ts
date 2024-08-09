import { Router } from 'express';
import { login, register } from './controllers/authController';
import {createEstimate, deleteEstimate, getEstimate, getEstimates, getTotalEstimatedCostByToken, refreshToken, updateEstimate } from './controllers/estimateController';
import { createMaterial, deleteMaterial, getMaterial, getMaterials, updateMaterial } from './controllers/materialsController';
import authMiddleware from './middleware/auth';

const router = Router();

router.post('/register', register);

/**
 * @swagger
 * /login:
 *   post:
 *      summary: login
 *      tags: [Login]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                        username:
 *                          type: string
 *                        password:
 *                          type: string
 *      responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               data: [{}]
 *       500:
 *         description: Internal server error
 *       401:
 *         description: Access Denied
 * 
 * */
router.post('/login', login);

/**
 * @swagger
 * /refresh-token/{estimateId}:
 *   put:
 *      summary: update token
 *      tags: [Estimate]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - name: estimateId
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *       200:
 *         description: Successful response
 *       401:
 *         description: Access Denied
 *       500:
 *         description: Internal server error
 * 
 * */
router.put('/refresh-token/:estimateId', authMiddleware, refreshToken);

/**
 * @swagger
 * /estimate:
 *   post:
 *      summary: create estimate
 *      tags: [Estimate]
 *      security:
 *          - bearerAuth: []
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
 *       401:
 *         description: Access Denied
 * 
 * */
router.post('/estimate', authMiddleware, createEstimate);

/**
 * @swagger
 * /estimate/{estimateId}:
 *   get:
 *      summary: get estimate by estimateId
 *      tags: [Estimate]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - name: estimateId
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal server error
 *       401:
 *         description: Access Denied
 * 
 * */
router.get('/estimate/:estimateId',authMiddleware, getEstimate);

/**
 * @swagger
 * /estimates:
 *   get:
 *      summary: get all estimates
 *      tags: [Estimate]
 *      security:
 *          - bearerAuth: []
 *      responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               data: [{   "roofSquareFootage": 2000,
                            "pitch": 6,
                            "bundleCoverage": 30,
                            "wastePercentage": 10,
                            "laborRate": 1000,
                            "tax": 8,
                            "materialId" : 3,
                            "estimatedHour": 2
 *                      }]
 *       500:
 *         description: Internal server error
 *       401:
 *         description: Access Denied
 *
 * */
router.get('/estimates', authMiddleware, getEstimates);

/**
 * @swagger
 * /estimate/{estimateId}:
 *   put:
 *      summary: update estimate
 *      tags: [Estimate]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - name: estimateId
 *            in: path
 *            required: true
 *            schema:
 *              type: string
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
 *       401:
 *         description: Access Denied
 *       500:
 *         description: Internal server error
 * 
 * */
router.put('/estimate/:estimateId', authMiddleware, updateEstimate);

/**
 * @swagger
 * /estimate/{estimateId}:
 *   delete:
 *      summary: delete estimate
 *      tags: [Estimate]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - name: estimateId
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *       200:
 *         description: Successful response
 *       401:
 *         description: Access Denied
 *       500:
 *         description: Internal server error
 * 
 * */
router.delete('/estimate/:estimateId', authMiddleware, deleteEstimate);

/**
 * @swagger
 * /material:
 *   post:
 *      summary: create material
 *      tags: [Material]
 *      security:
 *          - bearerAuth: []
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
 *       401:
 *         description: Access Denied
 *       500:
 *         description: Internal server error
 * 
 * */
router.post('/material', authMiddleware, createMaterial);

/**
 * @swagger
 * /materials:
 *   get:
 *      summary: get all materials
 *      tags: [Material]
 *      security:
 *          - bearerAuth: []
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
 *       401:
 *         description: Access Denied
 *
 * 
 * */
router.get('/materials', authMiddleware, getMaterials);

/**
 * @swagger
 * /material/{materialId}:
 *   get:
 *      summary: get material by materialId
 *      tags: [Material]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - name: materialId
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *       200:
 *         description: Successful response
 *       401:
 *         description: Access Denied
 *       500:
 *         description: Internal server error
 * 
 * */
router.get('/material/:materialId', authMiddleware, getMaterial);

/**
 * @swagger
 * /material/{materialId}:
 *   put:
 *      summary: update material
 *      tags: [Material]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - name: materialId
 *            in: path
 *            required: true
 *            schema:
 *              type: string
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
 *       401:
 *         description: Access Denied
 *       500:
 *         description: Internal server error
 * 
 * */
router.put('/material/:materialId', authMiddleware, updateMaterial);

/**
 * @swagger
 * /material/{materialId}:
 *   delete:
 *      summary: delete material
 *      tags: [Material]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - name: materialId
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *       200:
 *         description: Successful response
 *       401:
 *         description: Access Denied
 *       500:
 *         description: Internal server error
 * 
 * */
router.delete('/material/:materialId', authMiddleware, deleteMaterial);

/**
 * @swagger
 * /estimate-token:
 *   get:
 *      summary: get estimate by token
 *      tags: [Estimate]
 *      parameters:
 *          - name: token
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Access Denied
 *       500:
 *         description: Internal server error
 *
 * */
router.get('/estimate-token', getTotalEstimatedCostByToken);


export default router;

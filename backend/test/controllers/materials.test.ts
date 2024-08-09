process.env.PORT = '4000';
import request from 'supertest';
import appDataSource from '../../config/database';
import {app, server} from '../../src/index';
import { Material } from '../../src/models/Material';
import { Request, Response, NextFunction } from 'express';

// Mock the appDataSource.getRepository function
jest.mock('../../config/database', () => {
  const originalModule = jest.requireActual('../../config/database');
  
  //Mock the default export
  return {
    __esModule: true,
    ...originalModule,
    default: {
    //   ...originalModule.default,
      getRepository: jest.fn(),
      initialize: jest.fn().mockResolvedValue({}),
    },
  };
});

// Mock authMiddleware
jest.mock('../../src/middleware/auth', () => {
    return (req: Request, res: Response, next: NextFunction) => {
      next();
    };
  });

describe('materials', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    beforeAll(() => {
        server.close();
    });
    afterAll(() => {
        server.close();
    });
    test('should return a list of materials', async () => {
        const mockMaterials = [
            { materialId: "xxxmaterialid", type: 'shingles', coveragePerUnit: 100 },
            { materialId: "yyymaterialid", type: 'nails', coveragePerUnit: 50 },
        ];

        // Mock the find method of the repository
        const findMock = jest.fn().mockResolvedValue(mockMaterials);
        (appDataSource.getRepository as jest.Mock).mockReturnValue({
            find: findMock,
        });

        const response = await request(app).get('/materials');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockMaterials);
        expect(appDataSource.getRepository).toHaveBeenCalledWith(Material);
        expect(findMock).toHaveBeenCalledTimes(1);
    });


    test('should return material by passing id', async () => {
        const mockMaterial = { materialId: "xxxmaterialid" };
        const materialRepository = {
        findOneBy: jest.fn().mockResolvedValue(mockMaterial),
        };

        const dataSource = appDataSource.getRepository as jest.Mock;
        dataSource.mockImplementationOnce(() => materialRepository);

        const response = await request(app).get(`/material/${mockMaterial.materialId}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockMaterial);
    });

    test('should return created material', async () => {
        const material = {
            type: 'nails',
            coveragePerUnit: 200,
        };
    
        const mockMaterial = { materialId: "xxxmaterialid", type: 'nails', coveragePerUnit: 200 };
    
        const materialRepository = {
          save: jest.fn().mockResolvedValue(mockMaterial),
        };
    
        const dataSource = appDataSource.getRepository as jest.Mock;
        dataSource.mockImplementationOnce(() => materialRepository);
    
        const response = await request(app).post('/material').send(material);
    
        expect(response.status).toBe(201);
        expect(response.body).toEqual(mockMaterial);
    });
});
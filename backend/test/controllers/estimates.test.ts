process.env.PORT = '4000';
import request from 'supertest';
import appDataSource from '../../config/database';
import {app, server} from '../../src/index';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
jest.mock('jsonwebtoken');

// Mock the appDataSource.getRepository function
jest.mock('../../config/database', () => {
  const originalModule = jest.requireActual('../../config/database');

  return {
    __esModule: true,
    ...originalModule,
    default: {
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

describe('estimates', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  beforeAll(() => {
    server.close();
  });
  afterAll(() => {
    server.close();
  });
  test('should return token after successfullly creating estimate', async () => {
    const signMock = jwt.sign as jest.Mock;
    signMock.mockReturnValue('fake-jwt-token');

    const estimate = {
      roofSquareFootage: 2000,
      pitch: 6,
      bundleCoverage: 30,
      wastePercentage: 10,
      laborRate: 1000,
      tax: 8,
      materialId: 3,
      estimatedHour: 2,
    };

    const mockMaterial = { materialId: "xxxmaterialid" };
    const mockEstimate = { estimateId: "xxxestimateId", roofSquareFootage: 1000 };

    const materialRepository = {
      findOneBy: jest.fn().mockResolvedValue(mockMaterial),
    };
    const estimateRepository = {
      save: jest.fn().mockResolvedValue(mockEstimate),
    };

    const dataSource = appDataSource.getRepository as jest.Mock;
    dataSource.mockImplementationOnce(() => materialRepository);
    dataSource.mockImplementationOnce(() => estimateRepository);

    const response = await request(app).post('/estimate').send(estimate);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({message: "Estimate created", token: "fake-jwt-token"});
  });

  test('should return estimate', async () => {
    const verifyMock = jwt.verify as jest.Mock;
    verifyMock.mockReturnValue({estimateId: "xxxestimateId", exp: 1});

    const mockEstimate = { estimateId: "xxxestimateId" };
    const estimateRepository = {
      findOneBy: jest.fn().mockResolvedValue(mockEstimate),
    };

    const dataSource = appDataSource.getRepository as jest.Mock;
    dataSource.mockImplementationOnce(() => estimateRepository);

    const response = await request(app).get('/estimate-token/?token=test');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockEstimate);
  });

  test('should return estimate by passing id', async () => {
    const mockEstimate = { estimateId: "xxxestimateId" };
    const estimateRepository = {
      findOneBy: jest.fn().mockResolvedValue(mockEstimate),
    };

    const dataSource = appDataSource.getRepository as jest.Mock;
    dataSource.mockImplementationOnce(() => estimateRepository);

    const response = await request(app).get(`/estimate/${mockEstimate.estimateId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockEstimate);
  });
});

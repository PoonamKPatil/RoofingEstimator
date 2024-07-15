process.env.PORT = '4000';
import request from 'supertest';
import appDataSource from '../../config/database';
import {app, server} from '../../src/index';
import jwt from 'jsonwebtoken';
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

describe('estimates', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    server.close();
  });
  test('should return created estimate', async () => {
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

    const mockMaterial = { id: 1 };
    const mockEstimate = { id: 1, roofSquareFootage: 1000 };

    const materialRepository = {
      findOneBy: jest.fn().mockResolvedValue(mockMaterial),
    };
    const estimateRepository = {
      save: jest.fn().mockResolvedValue(mockEstimate),
    };

    (appDataSource.getRepository as jest.Mock)
      .mockImplementationOnce(() => materialRepository)
      .mockImplementationOnce(() => estimateRepository);

    const response = await request(app).post('/estimate').send(estimate);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({message: "Estimate created", token: "fake-jwt-token"});
  });

  test('should return created estimate', async () => {
    const verifyMock = jwt.verify as jest.Mock;
    verifyMock.mockReturnValue({estimateId: 1, exp: 1});

    const mockEstimate = { id: 1 };
    const estimateRepository = {
      findOneBy: jest.fn().mockResolvedValue(mockEstimate),
    };

    const dataSource = appDataSource.getRepository as jest.Mock;
    dataSource.mockImplementationOnce(() => estimateRepository);

    const response = await request(app).get('/estimate').set('Authorization', 'Bearer fake-jwt-token');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockEstimate);
  });
});

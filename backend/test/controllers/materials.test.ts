process.env.PORT = '4000';
import request from 'supertest';
import appDataSource from '../../config/database';
import {app, server} from '../../src/index';
import { Material } from '../../src/models/Material';

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


describe('getMaterials', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    afterAll(() => {
        server.close();
    });
    test('should return a list of materials', async () => {
        const mockMaterials = [
            { id: 1, type: 'shingles', coveragePerUnit: 100 },
            { id: 2, type: 'nails', coveragePerUnit: 50 },
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
});
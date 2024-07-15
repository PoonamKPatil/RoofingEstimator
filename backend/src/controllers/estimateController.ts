import { Request, Response } from 'express';
import { Estimate } from '../models/Estimate';
import { Material } from '../models/Material';
import jwt from 'jsonwebtoken';
import appDataSource from '../../config/database';
import { ESTIMATE } from '../utils/types';

export const createEstimate = async (req: Request, res: Response) => {
  const {roofSquareFootage, pitch, bundleCoverage, wastePercentage, laborRate, tax, materialId, estimatedHour} = req.body as ESTIMATE;
  try {
    //get repositories
    const materialRepository = appDataSource.getRepository(Material);
    const estimateRepository = appDataSource.getRepository(Estimate);
    //find material by id
    const material = await materialRepository.findOneBy({
      id: materialId,
    });
    if (!material) return res.status(404).send('Material not found');
  
    //create estimate
    const estimate = new Estimate();
    estimate.roofSquareFootage = roofSquareFootage;
    estimate.pitch = pitch;
    estimate.bundleCoverage = bundleCoverage;
    estimate.wastePercentage = wastePercentage;
    estimate.laborCost = laborRate * estimatedHour;
    estimate.tax = tax;

    estimate.material = material;

    const estimateCreateResponse = await estimateRepository.save(estimate);
    //create JWT token
    const payload = {
      estimateId : estimateCreateResponse.id
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    res.status(201).send({ message: "Estimate created", token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

export const getTotalEstimatedCostByToken = async (req: Request, res: Response) => {
  const estimateRepository = appDataSource.getRepository(Estimate)
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).send('Access Denied');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      estimateId: string;
      exp: number;
    };  
    const estimateId = parseInt(decoded.estimateId);
    const estimate = await estimateRepository.findOneBy({
      id: estimateId,
    });

    if (!estimate) return res.status(404).send('Estimate not found');

    res.status(200).json(estimate);
    
  } catch (error) {
    return res.status(400).send(error);
  }
}

export const getEstimate = async (req: Request, res: Response) => {
  const estimateRepository = appDataSource.getRepository(Estimate)
  const estimateId = parseInt(req.params.id);
  const estimate = await estimateRepository.findOneBy({
    id: estimateId,
  });

  if (!estimate) return res.status(404).send('Estimate not found');
  
  res.status(200).json(estimate);
};

export const updateEstimate = async (req: Request, res: Response) => {
  const estimateId = parseInt(req.params.id);
  const estimateRepository = appDataSource.getRepository(Estimate)
  const estimate = await estimateRepository.findOneBy({
    id: estimateId,
  });

  if (!estimate) return res.status(404).send('Estimate not found');
  
  const {roofSquareFootage, pitch, bundleCoverage, wastePercentage, laborRate, tax, materialId, estimatedHour} = req.body as ESTIMATE;
  try {
    const materialRepository = appDataSource.getRepository(Material);
     //find material by id
     const material = await materialRepository.findOneBy({
      id: materialId,
    });
  
    if (!material) return res.status(404).send('Material not found');
  
    //create estimate
    const estimate = new Estimate();
    estimate.roofSquareFootage = roofSquareFootage;
    estimate.pitch = pitch;
    estimate.bundleCoverage = bundleCoverage;
    estimate.wastePercentage = wastePercentage;
    estimate.laborCost = laborRate * estimatedHour;
    estimate.tax = tax;

    estimate.material = material;
  

    const estimateUpdateResponse = await estimateRepository.save(estimate)
    res.status(200).json(estimateUpdateResponse);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteEstimate = async (req: Request, res: Response) => {
  const estimateId = parseInt(req.params.id);
  const estimateRepository = appDataSource.getRepository(Estimate)
  const estimate = await estimateRepository.findOneBy({
    id: estimateId,
  });

  if (!estimate) return res.status(404).send('Estimate not found');

  try {
    await estimateRepository.remove(estimate)
    res.status(200).json("deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

// const calculateEstimate = (estimate: Estimate) => {
//   const {roofSquareFootage, bundleCoverage, wastePercentage, laborCost} = estimate;

//   //calculate total area
//   const wasteRoofArea = roofSquareFootage * (wastePercentage/100);
//   const totalArea = roofSquareFootage + wasteRoofArea;
  
//   const nailsCoverage = 200; //fixed
//   //Bundles needed
//   const shinglesBundlesNeeded = Math.ceil(totalArea/bundleCoverage);
//   const nailBoxesNeeded = Math.round(totalArea/nailsCoverage);

//   const materialCostPerBundle = 20; //assume
//   const nailsCostPerBox = 20; //assume
  
//   // each Material Cost (shingles and nails)
//   const materialCost = (shinglesBundlesNeeded * materialCostPerBundle) + (nailBoxesNeeded * nailsCostPerBox);
   
//   //total cost without tax
//   const totalCostWithoutTax = materialCost + laborCost;

//   const taxPercentage = 8; //assume

//   const taxAmount = totalCostWithoutTax * (taxPercentage/100);

//   const totalEstimateWithTax = totalCostWithoutTax + taxAmount;

//   return {totalArea, shinglesBundlesNeeded, nailBoxesNeeded, laborCost, materialCost, taxAmount, totalEstimateWithTax};
// }
 
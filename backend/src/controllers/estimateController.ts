import { Request, Response } from 'express';
import { Estimate } from '../models/Estimate';
import { Material } from '../models/Material';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import appDataSource from '../../config/database';
import { ESTIMATE } from '../utils/types';
import { v4 as uuidv4 } from 'uuid';

export const getEstimates = async (req: Request, res: Response) => {
  const estimateRepository = appDataSource.getRepository(Estimate);
  const user = (req as any).user;

  const estimates = await estimateRepository.createQueryBuilder("estimate")
  .leftJoin("estimate.user", "user")
  .leftJoin("estimate.material", "material")
  .select([
    "estimate.id",
    "estimate.estimateId",
    "estimate.roofSquareFootage",
    "estimate.pitch",
    "estimate.bundleCoverage",
    "estimate.token",
    "material.type",
  ])
  .where("estimate.userId = :userId", { userId: user.id })
  .getMany();

  if (estimates.length == 0) {
    return res.status(200).json({message: "No Estimates found"});
  }

  res.status(200).json(estimates);
};

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
    estimate.estimateId = uuidv4();
    estimate.material = material;
    estimate.user = (req as any).user;

    //create JWT token
    const payload = {
      estimateId : estimate.estimateId
    };

    estimate.token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '24h' });

    await estimateRepository.save(estimate);
    res.status(201).send({ message: "Estimate created", token : estimate.token });
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

export const getTotalEstimatedCostByToken = async (req: Request, res: Response) => {
  const estimateRepository = appDataSource.getRepository(Estimate)
  const token = req.query.token;
 
  if (!token || token == undefined) {
    return res.status(401).json("Access Denied");
  }

  try {
    const decoded = jwt.verify(token as string, process.env.JWT_SECRET as string) as {
      estimateId: string;
      exp: number;
    };
    const estimateId = decoded.estimateId;
    const estimate = await estimateRepository.findOneBy({
      estimateId,
    });

    if (!estimate) return res.status(404).send('Estimate not found');

    res.status(200).json(estimate);

  } catch (error) {
    if (error instanceof TokenExpiredError) return res.status(401).send(error);

    return res.status(500).send(error);
  }
}

export const getEstimate = async (req: Request, res: Response) => {
  const estimateRepository = appDataSource.getRepository(Estimate)
  const estimateId = req.params.estimateId;
  try {
    const user = (req as any).user;
  
    const estimate = await estimateRepository.findOneBy({
      estimateId,
      user
    });
  
    if (!estimate) return res.status(404).send('Estimate not found');
  
    res.status(200).json(estimate);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateEstimate = async (req: Request, res: Response) => {
  const estimateId = req.params.estimateId;
  const user = (req as any).user;

  const estimateRepository = appDataSource.getRepository(Estimate)
  const estimate = await estimateRepository.findOneBy({
    estimateId,
    user
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

    // const estimate = new Estimate();
    estimate.roofSquareFootage = roofSquareFootage;
    estimate.pitch = pitch;
    estimate.bundleCoverage = bundleCoverage;
    estimate.wastePercentage = wastePercentage;
    estimate.laborCost = laborRate * estimatedHour;
    estimate.tax = tax;

    estimate.material = material;
    //create JWT token
    const payload = {
      estimateId : estimate.estimateId
    };

    estimate.token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '24h' });

    const estimateUpdateResponse = await estimateRepository.save(estimate);
    res.status(200).json(estimateUpdateResponse);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteEstimate = async (req: Request, res: Response) => {
  const estimateId = req.params.estimateId;
  const user = (req as any).user;

  const estimateRepository = appDataSource.getRepository(Estimate)
  const estimate = await estimateRepository.findOneBy({
    estimateId,
    user
  });

  if (!estimate) return res.status(404).send('Estimate not found');

  try {
    await estimateRepository.remove(estimate)
    res.status(200).json("deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  //update JWT token
  const estimateId = req.params.estimateId;
  const user = (req as any).user;

  const estimateRepository = appDataSource.getRepository(Estimate)
  const estimate = await estimateRepository.findOneBy({
    estimateId,
    user
  });

  if (!estimate) return res.status(404).send('Estimate not found');

  try {
    estimate.token = jwt.sign({estimateId}, process.env.JWT_SECRET as string, { expiresIn: '24h' });;

    await estimateRepository.save(estimate);

    res.status(200).json({ message: "Token updated", token : estimate.token });
  } catch (error) {
    res.status(500).json(error);
  }
};

import { Request, Response } from 'express';
import appDataSource from '../../config/database';
import { Material } from '../models/Material';
import { MATERIAL } from '../utils/types';

export const getMaterials = async (req: Request, res: Response) => {
  const materialRepository = appDataSource.getRepository(Material)
  const materials = await materialRepository.find()
  res.status(200).json(materials);
};

export const createMaterial = async (req: Request, res: Response) => {
  const material = new Material();
  const {type, coveragePerUnit} = req.body as MATERIAL;
  material.type = type;
  material.coveragePerUnit = coveragePerUnit;
  try {
    const materialRepository = appDataSource.getRepository(Material)
    const materialCreateResponse = await materialRepository.save(material);
    res.status(201).json(materialCreateResponse);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getMaterial = async (req: Request, res: Response) => {
  const materialRepository = appDataSource.getRepository(Material)
  const materialId = parseInt(req.params.id);
  const material = await materialRepository.findOneBy({
    id: materialId,
  });

  if (!material) return res.status(404).send('Material not found');
  
  res.status(200).json(material);
};

export const updateMaterial = async (req: Request, res: Response) => {
  const materialId = parseInt(req.params.id);
  const materialRepository = appDataSource.getRepository(Material)
  const material = await materialRepository.findOneBy({
    id: materialId,
  });

  if (!material) return res.status(404).send('Material not found');
  const {type, coveragePerUnit} = req.body as MATERIAL;
  
  material.type = type;
  material.coveragePerUnit = coveragePerUnit;
  try {
    const materialUpdateResponse = await materialRepository.save(material)
    res.status(200).json(materialUpdateResponse);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteMaterial = async (req: Request, res: Response) => {
  const materialId = parseInt(req.params.id);
  const materialRepository = appDataSource.getRepository(Material)
  const material = await materialRepository.findOneBy({
    id: materialId,
  });

  if (!material) return res.status(404).send('Material not found');

  try {
    await materialRepository.remove(material)
    res.status(200).json("deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};
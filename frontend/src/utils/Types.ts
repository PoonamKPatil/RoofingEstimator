export type ESTIMATE = {
    roofSquareFootage : number,
    pitch : number,
    bundleCoverage : number,
    wastePercentage : number,
    laborRate : number,
    estimatedHour : number,
    materialId : number,
    tax: number
};

export type TOTALESTIMATE = {
    totalArea : number,
    shinglesBundlesNeeded : number,
    nailBoxesNeeded : number,
    laborCost : number,
    materialCost : number,
    taxAmount : number,
    totalEstimateWithTax : number
};

export type MATERIAL = {
    id: number,
    type: string,
    coveragePerUnit: number,
}[];

export type DB_ESTIMATE = {
    roofSquareFootage : number,
    pitch : number,
    bundleCoverage : number,
    wastePercentage : number,
    laborCost : number,
    material : MATERIAL,
    materialId : number,
    tax: number
};

export type LoginParams = {
    username: string;
    password: string;
}
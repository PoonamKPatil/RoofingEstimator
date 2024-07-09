import { DB_ESTIMATE, ESTIMATE } from "./Types";

export const calculateEstimate = (roofSquareFootage:number, bundleCoverage:number, wastePercentage:number, laborCost:number, tax:number) => {
    //calculate total area
    const wasteRoofArea = roofSquareFootage * (wastePercentage/100);
    const totalArea = roofSquareFootage + wasteRoofArea;
    
    const nailsCoverage = 200; //fixed
    //Bundles needed
    const shinglesBundlesNeeded = totalArea/bundleCoverage;
    const nailBoxesNeeded = totalArea/nailsCoverage;
  
    const materialCostPerBundle = 20; //assume
    const nailsCostPerBox = 20; //assume
    
    // each Material Cost (shingles and nails)
    const materialCost = (shinglesBundlesNeeded * materialCostPerBundle) + (nailBoxesNeeded * nailsCostPerBox);
  
    //total cost without tax
    const totalCostWithoutTax = materialCost + laborCost;
    
    const taxAmount = totalCostWithoutTax * (tax/100);
  
    const totalEstimateWithTax = totalCostWithoutTax + taxAmount;

    return { totalArea, shinglesBundlesNeeded, nailBoxesNeeded, materialCost, totalEstimateWithTax, taxAmount };
}

export const getTotalEstimatedCosts = (estimate: ESTIMATE) => {
    const {roofSquareFootage, bundleCoverage, wastePercentage, laborRate, estimatedHour, tax} = estimate;

    const laborCost = laborRate * estimatedHour
    
    const estimateCostDetail = calculateEstimate(roofSquareFootage, bundleCoverage, wastePercentage, laborCost, tax);
    
    return { ...estimateCostDetail, laborCost};
}

export const getEstimateDelivery = (estimate:DB_ESTIMATE) => {
    const {roofSquareFootage, bundleCoverage, wastePercentage, laborCost, tax} = estimate;

    const estimateCostDetail = calculateEstimate(roofSquareFootage, bundleCoverage, wastePercentage, laborCost, tax);

    return { ...estimateCostDetail, laborCost};
}
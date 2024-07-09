export type ESTIMATE = {
    roofSquareFootage : number,
    pitch : number,
    bundleCoverage : number,
    wastePercentage : number,
    laborRate : number,
    tax : number,
    materialId : number,
    estimatedHour: number
};

export type USER = {
    username : string,
    password : string,
};
 
export type MATERIAL = {
    type: string,
    coveragePerUnit: number,
};

import { Button, Grid, MenuItem, TextField, Typography, Alert, Snackbar } from "@mui/material"
import { useEffect, useState } from "react";
import { getEstimateById, postEstimate, updateEstimate } from "../../services/estimate";
import { getMaterials } from "../../services/material";
import { getTotalEstimatedCosts } from "../../utils/estimate";
import { ESTIMATE, MATERIAL, TOTALESTIMATE } from "../../utils/Types";
import config from "../../config";
import ViewCalculation from "./ViewCalculation";

export type ManageEstimateProps = {
  estimateId?: string | undefined;
};

const ManageEstimate: React.FC<ManageEstimateProps> = ({estimateId}) => {
  const initialEstimate: ESTIMATE = {
    roofSquareFootage: 0,
    pitch: 0,
    bundleCoverage: 0,
    wastePercentage: 0,
    laborRate: 0,
    materialId: 1,
    estimatedHour: 0,
    tax: config.taxPercentage,
  };

  const initialTotalEstimatedCosts: TOTALESTIMATE = {
    totalArea: 0,
    shinglesBundlesNeeded: 0,
    nailBoxesNeeded: 0,
    laborCost: 0,
    materialCost: 0,
    taxAmount: 0,
    totalEstimateWithTax: 0,
  };

  const [estimate, setEstimate] = useState<ESTIMATE>(initialEstimate);

  const [totalEstimatedCosts, setTotalEstimatedCosts] = useState<TOTALESTIMATE>(initialTotalEstimatedCosts);

  const [materials, setMaterials] = useState<MATERIAL[]>([{id: 1, type : "", coveragePerUnit: 0}]);
  const [errors, setErrors] = useState<{[key:string]: boolean}>({});
  const [message, setMessage] = useState<string>();
  const [severity, setSeverity] = useState<"success" | "error">();
  const [open, setOpen] = useState<boolean>(false);
  const [showCalculations, setShowCalculations] = useState<boolean>(false);
  const [disableSave, setDisableSave] = useState<boolean>(true);

  const onChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (value === "" || Number(value) > 0) {
      setEstimate((prevEstimate) => ({
        ...prevEstimate,
        [name]: name === "materialId" ? Number(value) : parseFloat(value) || 0
      }));
    }
  };

  const handleClose = () => {
    // if (reason === "clickaway") {
    //   return;
    // }
    setOpen(false);
  };

  const clearData = () => {
    setEstimate(initialEstimate);
    setTotalEstimatedCosts(initialTotalEstimatedCosts);
    setErrors({});
    setDisableSave(false);
  };

  const validateFields = () => {
    let newErrors: {[key:string]: boolean} = {};
    const estimateKeys = Object.keys(estimate);
    
    estimateKeys.map((key) => {
      const value = estimate[key as keyof ESTIMATE];
      if (value === 0 || value === undefined) {
        newErrors[key] = true;
      }    
      return newErrors
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const calEstimate = () => {
    if (validateFields()) {
      const totalEstimate : TOTALESTIMATE = getTotalEstimatedCosts(estimate);
      setTotalEstimatedCosts(totalEstimate);
      setDisableSave(false);
      setShowCalculations(true);
    }
  };
  
  const fetchMaterials = async () => {
    try {
      const materials = await getMaterials();
      if (materials.length > 0) {
          setMaterials(materials);
      }
    } catch (error) {
      console.error("Error fetching materials:", error);
    }
  };

  const saveEstimate = async () => {
    try {
      let saveResponse;
      if (estimateId) {
        saveResponse = await updateEstimate(estimateId, estimate);
      } else {
        saveResponse = await postEstimate(estimate);
      }
      setMessage("Estimate Saved");
      setSeverity("success");
      setOpen(true);
      setDisableSave(true);
    } catch (error) {
      setOpen(true);
      setSeverity("error");
      setMessage("Error While saving estimate");
      console.error("Error saving materials:", error);
    }
  }

  const fetchEstimateById = async () => {
    try {
      if (estimateId) {
        const estimate = await getEstimateById(estimateId);
        estimate.materialId = estimate.material.id;
        estimate.laborRate = 0;
        estimate.estimatedHour = 0;
        delete estimate.material;
        delete estimate.user;
        if (estimate) {
          setEstimate(estimate);
        }
      }
    } catch (error) {
      console.error("Error fetching estimate:", error);
    }
  };

  useEffect(() => {
    fetchMaterials();

    fetchEstimateById();
    
  }, []);

  return (
    <>
        {
          <Grid item xs={12} md={6}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
              {message}
              </Alert>
            </Snackbar>
          </Grid>
        }
        <Grid container rowSpacing={1} columnSpacing={2} sx={{
          px: 20
        }}>
          <Grid item xs={12} md={6}>
          <TextField
            label="Roof Square Footage"
            fullWidth
            margin="normal"
            type="number"
            name="roofSquareFootage"
            value={estimate.roofSquareFootage}
            onChange={onChange}
            inputProps={{ min: 1 }}
            error={errors.roofSquareFootage}
            helperText={errors.roofSquareFootage ? "This field is required and must be greater than 0" : ""}
          />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Pitch"
              fullWidth
              margin="normal"
              type="number"
              name="pitch"
              value={estimate.pitch}
              onChange={onChange}
              inputProps={{ min: 1 }}
              error={errors.pitch}
              helperText={errors.pitch ? "This field is required and must be greater than 0" : ""}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Bundle Coverage"
              fullWidth
              margin="normal"
              type="number"
              name="bundleCoverage"
              value={estimate.bundleCoverage}
              onChange={onChange}
              inputProps={{ min: 1 }}
              error={errors.bundleCoverage}
              helperText={errors.bundleCoverage ? "This field is required and must be greater than 0" : ""}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Waste Percentage"
              fullWidth
              margin="normal"
              type="number"
              name="wastePercentage"
              value={estimate.wastePercentage}
              onChange={onChange}
              inputProps={{ min: 1 }}
              error={errors.wastePercentage}
              helperText={errors.wastePercentage ? "This field is required and must be greater than 0" : ""}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Materials"
              fullWidth
              margin="normal"
              name="materialId"
              select
              onChange={onChange}
              value={estimate.materialId}
            >
              {materials.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.type}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          { !estimateId &&
            <>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Labor rate"
                  fullWidth
                  margin="normal"
                  type="number"
                  name="laborRate"
                  value={estimate.laborRate ?? 0}
                  onChange={onChange}
                  inputProps={{ min: 1 }}
                  error={errors.laborRate}
                  helperText={errors.laborRate ? "This field is required and must be greater than 0" : ""}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Estimated Hours"
                  fullWidth
                  margin="normal"
                  type="number"
                  name="estimatedHour"
                  value={estimate.estimatedHour ?? 0}
                  onChange={onChange}
                  inputProps={{ min: 1 }}
                  error={errors.estimatedHour}
                  helperText={errors.estimatedHour ? "This field is required and must be greater than 0" : ""}
                />
              </Grid>
            </>
          }
          <Grid item xs={12} md={12} sx={{display: "flex", justifyContent: "center", alignContent:"center"}}>
            <Button
              variant="outlined"
              size="medium"
              onClick={calEstimate}
            >
              Calculate Estimate
            </Button>
          </Grid>
        </Grid>
        <Grid container rowSpacing={1} columnSpacing={2} sx={{
          px: 15, mt: 5
        }}>
          {
            showCalculations &&
            <>
              <Grid item xs={12} md={12}>
              <Typography variant="h6" fontWeight="bold">
                Estimation Result
              </Typography>
              </Grid>
              <ViewCalculation totalEstimatedCosts={totalEstimatedCosts} />
            
              <Grid container rowSpacing={1} columnGap={5} sx={{ display: "flex", justifyContent: "center", alignContent:"center", mt : 2}}>
                  <Button
                    variant="contained"
                    size="medium"
                    onClick={saveEstimate}
                    disabled={disableSave}
                  >
                    {estimateId ? 'Update' : 'Create' }
                  </Button>
                  <Button
                    variant="contained"
                    size="medium"
                    onClick={clearData}
                    sx={{
                      backgroundColor: "grey", color: "white"
                    }}
                  >
                    Cancel
                  </Button>
              </Grid>
            </>
          }
        </Grid>
      </>
  )
}

export default ManageEstimate
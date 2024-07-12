import { Grid, Typography, Snackbar, Alert, TextField, Button } from '@mui/material'
import { AxiosError } from 'axios';
import React, {useState } from 'react'
import { getEstimateByToken } from '../services/estimate';
import { getEstimateDelivery } from '../utils/estimate';
import { DB_ESTIMATE, TOTALESTIMATE } from '../utils/Types';

const EstimateDelivery: React.FC = () => {
  const [token, setToken] = useState<string>('');
  const initialTotalEstimatedCosts: TOTALESTIMATE = {
    totalArea: 0,
    shinglesBundlesNeeded: 0,
    nailBoxesNeeded: 0,
    laborCost: 0,
    materialCost: 0,
    taxAmount: 0,
    totalEstimateWithTax: 0
  };
  const [totalEstimatedCosts, setTotalEstimatedCosts] = useState<TOTALESTIMATE>(initialTotalEstimatedCosts);

  const [open, setOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    // if (reason === 'clickaway') {
    //   return;
    // }
    setOpen(false);
  }
  const onChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setToken(event.target.value); 
  }

  const getEstimate = async () => {
    try {
      if (!token) {
        throw new Error('Token is required');
      }
      const estimate : DB_ESTIMATE = await getEstimateByToken(token);
      const totalEstimate : TOTALESTIMATE = getEstimateDelivery(estimate);
      console.log(totalEstimate);
      setTotalEstimatedCosts(totalEstimate);
    } catch (error) {
      setOpen(true);
      console.log(error)
      setTotalEstimatedCosts(initialTotalEstimatedCosts);
      const err = error as AxiosError
      if (err.response && err.response.status === 401) {
        setErrorMessage('Access denied. Token expired or not found');
      } else {
        setErrorMessage(err.message);
      }
    }
  }

  return (
    <>
    {
      <Grid item xs={12} md={6}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
            {errorMessage}
          </Alert>
        </Snackbar>
      </Grid>
    }
      <Grid container rowSpacing={1} columnSpacing={2} sx={{
        px: 15, mt: 5
      }}>
         <Grid container rowSpacing={1} columnGap={5} sx={{mt : 2}}>
          <TextField
            label="Token"
            fullWidth
            margin="normal"
            type="string"
            name="token"
            value={token}
            onChange={onChange}
          />
            <Button
              variant="contained"
              size="medium"
              onClick={getEstimate}
            >
              Submit token
            </Button>
          </Grid>
        <Grid item xs={12} md={6}>
        <Typography variant="subtitle1" fontWeight="bold">
          Estimated Costs
        </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
        <Typography variant="subtitle1" fontWeight="bold">
          Date: 2024-12-12 
        </Typography>
        </Grid>
        <Grid item xs={12} md={6} sx={{bgcolor:'secondary.main', height: 40}}>
          <Typography variant="subtitle1" fontWeight="bold" color='secondary.contrastText'>
            ITEM
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} sx={{bgcolor:'secondary.main', height: 40}}>
          <Typography variant="subtitle1" fontWeight="bold" color='secondary.contrastText'>
            TOTAL
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" fontWeight="bold">
            Total Area
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" fontWeight="bold">
            {totalEstimatedCosts.totalArea} Sqft
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" fontWeight="bold">
            Bundles Needed
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" fontWeight="bold">
            {totalEstimatedCosts.shinglesBundlesNeeded.toFixed(2)} Bundles
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" fontWeight="bold">
            Boxes of nails
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" fontWeight="bold">
            {Math.ceil(totalEstimatedCosts.nailBoxesNeeded)} Boxes
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" fontWeight="bold">
            Material Cost
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" fontWeight="bold">
          ${totalEstimatedCosts.materialCost.toFixed(2)}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" fontWeight="bold">
            Labor Cost
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" fontWeight="bold">
            ${totalEstimatedCosts.laborCost.toFixed(2)}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" fontWeight="bold">
            Tax Amount
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" fontWeight="bold">
          ${totalEstimatedCosts.taxAmount.toFixed(2)}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" fontWeight="bold">
          Total Cost
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" fontWeight="bold">
            ${totalEstimatedCosts.totalEstimateWithTax.toFixed(2)}
          </Typography>
        </Grid>
      </Grid>
    </>
  )
}

export default EstimateDelivery
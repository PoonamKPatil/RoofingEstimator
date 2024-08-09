import { Grid, Typography } from '@mui/material'
import { TOTALESTIMATE } from '../../utils/Types'

export type EstimateSummaryProps = {
  totalEstimatedCosts: TOTALESTIMATE;
};

const ViewCalculation = ({totalEstimatedCosts}:EstimateSummaryProps) => {
  return (
    <>
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
    </>
  );
};

export default ViewCalculation;
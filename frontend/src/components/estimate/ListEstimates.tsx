import * as React from 'react';
import { DB_ESTIMATE } from '../../utils/Types';
import { getEstimates, refreshToken } from '../../services/estimate';
import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, Tooltip, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RefreshIcon from '@mui/icons-material/Refresh';
import { getTokenExpiry } from '../../utils/estimate';

const ListEstimates: React.FC = () => {
    const [estimates, setEstimates] = useState<DB_ESTIMATE[]>();
    const navigate = useNavigate();
    const [copied, setCopied] = useState(false);
    
    const fetchEstimates = async () => {
        try {
            const estimates = await getEstimates();
            if (estimates.length > 0) {
                setEstimates(estimates);
            }
        } catch (error) {
            console.error("Error fetching materials:", error);
        }
    };

    useEffect(() => {
        fetchEstimates();
    }, []);

    const isTokenExpired = (token:string) => {
        return getTokenExpiry(token) < Date.now() / 1000;
    }

    const refreshTokenAndUpdate = async (estimateId: string) => {
        try {
            const tokenResponse = await refreshToken(estimateId);
            setEstimates((prevEstimates = []) => 
                prevEstimates.map((estimate) => 
                    estimate.estimateId === estimateId ? { ...estimate, token: tokenResponse.token } : estimate
                )
            );
        } catch (error) {
            console.error("Error refreshing token:", error);
        }
    };

    const columns: GridColDef[] = [
        { field: 'roofSquareFootage', headerName: 'Roof Sqft', width: 100 },
        { field: 'pitch', headerName: 'Pitch', width: 100 },
        { 
            field: 'material',
            headerName: 'Material',
            width: 200,
            valueGetter: (value, row) => row.material.type,
        },
        { 
            field: 'token',
            headerName: 'Token',
            width: 300,
            renderCell: (params) => {
                const onClick = (e : React.MouseEvent<HTMLElement>) => {
                    navigator.clipboard.writeText(params.row.token).then(() => {
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                    });
                };
                return  (
                    <>
                        {
                            !isTokenExpired(params.row.token) ?
                            <Tooltip title={copied ? 'Copied!' : 'Copy to clipboard'}>
                                <Button
                                variant="outlined"
                                color="primary"
                                startIcon={<ContentCopyIcon />}
                                onClick={onClick}
                                > 
                                    <Typography id="modal-modal-description" 
                                        sx={{ 
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            maxWidth: '200px',
                                            mb: 1
                                        }}
                                    >
                                        {params.row.token}
                                    </Typography>
                                </Button>
                            </Tooltip>
                            :
                            <Typography variant='subtitle2'>
                            ---
                            </Typography>
                        }
                    </>
                );
            }
        },
        {
            field: "action",
            headerName: "Action",
            width: 400,
            renderCell: (params) => {
                const onClickEdit = (e : React.MouseEvent<HTMLElement>) => {
                    navigate(`/estimate/${params.row.estimateId}`);
                };
                
                const onClickRefresh = async (e : React.MouseEvent<HTMLElement>) => {
                    await refreshTokenAndUpdate(params.row.estimateId);
                };
              
                return (
                    <>
                    <Button size="small" onClick={onClickEdit} variant="contained">Edit</Button>
                    {
                        isTokenExpired(params.row.token) &&
                        <Tooltip title="Refresh Token">
                            <IconButton size="small" aria-label="view" onClick={onClickRefresh}>
                                <RefreshIcon />
                            </IconButton>
                        </Tooltip>
                    }
                    </>
                );
            }
        }
    ];

    return (
        <div style={{ height: '600px' }}>
            <DataGrid
            rows={estimates}
            columns={columns}
            initialState={{
            pagination: {
                paginationModel: { page: 0, pageSize: 10 },
            },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            />
        </div>
    );
};

export default ListEstimates;
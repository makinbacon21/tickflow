'use client'
import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 50 },
  { field: 'user_emails', headerName: 'User Emails', width: 200 },
  { field: 'agent_emails', headerName: 'Agent Emails', width: 200 },
  { field: 'body', headerName: 'Body', width: 200 },
  { field: 'date_created', headerName: 'Date Created', width: 120 },
  { field: 'date_modified', headerName: 'Date Modified', width: 120 },
];

export default function TickGrid(props: any) {
    let rows = props.rows
    return (
        <div style={{ height: 400, width: '100%' }}>
        <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
            pagination: {
                paginationModel: { page: 0, pageSize: 5 },
            },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
        />
        </div>
    );
}

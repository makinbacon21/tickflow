'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import {
    GridRowsProp,
    GridRowModesModel,
    GridRowModes,
    DataGrid,
    GridColDef,
    GridToolbarContainer,
    GridActionsCellItem,
    GridEventListener,
    GridRowId,
    GridRowModel,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';
import Link from 'next/link';

interface EditToolbarProps {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
        newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
    ) => void;
}

function EditToolbar(props: EditToolbarProps) {
    const { setRows, setRowModesModel } = props;

    const handleClick = async () => {
        await fetch("/api/create_ticket", {
            method: "POST",
            body: JSON.stringify({
                user_emails: [""],
                agent_emails: [""],
                body: "",
                date_created: new Date(),
                date_modified: new Date(),
                subject: ""
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(async (response) => await response.json())
            .then((json) => {
                if (json['message'] == "Failure")
                    throw new Error("Failed to create ticket");
                const id = json['id'];
                const date_created = json['date_created']
                const date_modified = json['date_modified']
                setRows((oldRows) => [...oldRows, {
                    id, date_created: date_created,
                    date_modified: date_modified, isNew: true
                }]);
                setRowModesModel((oldModel) => ({
                    ...oldModel,
                    [id]: { mode: GridRowModes.Edit, fieldToFocus: 'user_emails' },
                }));
            })
            .catch(async (e) => {
                console.error(e);
            })
    };

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                Add record
            </Button>
        </GridToolbarContainer>
    );
}

export default function TickGrid(props: any) {
    const [rows, setRows] = React.useState(props.rows);
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        fetch("/api/delete_ticket", {
            method: "POST",
            body: JSON.stringify({
                id: parseInt(id.toString())
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then((response) => response.json())
            .then((json) => console.log(json));
        setRows(rows.filter((row: any) => row.id !== id));
    };

    const handleCancelClick = (id: GridRowId) => () => {
        fetch("/api/delete_ticket", {
            method: "POST",
            body: JSON.stringify({
                id: parseInt(id.toString())
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then((response) => response.json())
            .then((json) => console.log(json));
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row: any) => row.id === id);
        if (editedRow!.isNew) {
            setRows(rows.filter((row: any) => row.id !== id));
        }
    };

    const processRowUpdate = async (newRow: GridRowModel) => {
        const updatedRow = { ...newRow, isNew: false };

        let user_emails_arr = newRow.user_emails.split(',')
        let agent_emails_arr = newRow.agent_emails.split(',')

        await fetch("/api/edit_ticket", {
            method: "POST",
            body: JSON.stringify({
                id: parseInt(newRow.id.toString()),
                body: {
                    user_emails: user_emails_arr,
                    agent_emails: agent_emails_arr,
                    body: newRow.body,
                    date_modified: new Date(),
                    subject: newRow.subject,
                }
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(async (response) => await response.json())
            .then((json) => console.log(json));

        setRows(rows.map((row: any) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleProcessRowUpdateError = () => {
        console.log("errored")
    }

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'subject', headerName: 'Subject', width: 200, editable: true },
        { field: 'user_emails', headerName: 'User Emails', width: 200, editable: true },
        { field: 'agent_emails', headerName: 'Agent Emails', width: 200, editable: true },
        { field: 'date_created', headerName: 'Date Created', width: 120 },
        { field: 'date_modified', headerName: 'Date Modified', width: 120 },
        {
            field: 'actions', type: 'actions', headerName: 'Actions', width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
        {
            field: 'details', type: 'actions', headerName: 'Details', width: 80,
            cellClassName: 'details',
            getActions: ({ id }) => {
                return [
                    <Link href={"/ticket/" + id}>
                        <GridActionsCellItem
                            icon={<InfoIcon />}
                            label="Details"
                            className="textPrimary"
                            color="inherit"
                        />
                    </Link>
                ];
            },
        },
    ];

    return (
        <Box
            sx={{
                height: '100%',
                width: '100%',
                '& .actions': {
                    color: 'text.secondary',
                },
                '& .textPrimary': {
                    color: 'text.primary',
                },
            }}
        >
            <DataGrid
                rows={rows}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                onProcessRowUpdateError={handleProcessRowUpdateError}
                slots={{
                    toolbar: EditToolbar,
                }}
                slotProps={{
                    toolbar: { setRows, setRowModesModel },
                }}
            />
        </Box>
    );
}

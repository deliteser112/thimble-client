/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import { useTheme, withStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import { LoadingButton } from '@material-ui/lab';
import {
  Button,
  Card,
  CardContent,
  TextField,
  Box,
  Autocomplete
} from '@material-ui/core';

import EmojiButton from '../dashboard-component/EmojiButton';
import DeleteButton from '../dashboard-component/ConfirmDialog';

// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getUserList } from '../../redux/slices/user';
import { getOfficeList, getManagerList } from '../../redux/slices/adminSetting';

// hooks
import useAdmin from '../../hooks/useAdmin';
import useAuth from '../../hooks/useAuth';

function createData(id, emoji, name, capacity, members, managers) {
  return { id, emoji, name, capacity, members, managers };
}

let rows = [
  createData(0, '👨‍👨‍👦‍👦', 'Maxime quidem provident', 15, [], []),
  createData(1, '🏡', 'Atque pariatur', 7, [], []),
  createData(2, '💼', 'Quia iste', 28, [], [])
];

let officeManagersData = [];
let officeManagers = [];

const TableCellStyles = withStyles((theme) => ({
  root: {
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(2, 0.1),
      '&:first-of-type': {
        paddingLeft: 1
      },
      '&:last-of-type': {
        paddingRight: '1px !important',
        boxShadow: 'inset 0px 0 0 #fff'
      }
    }
  }
}))(TableCell);

export default function OfficeLists() {
  const theme = useTheme();
  const { user } = useAuth();

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { addOffice, deleteOffice, updateOfficeList } = useAdmin();
  const { userList } = useSelector((state) => state.user);
  const { officeList, managerList } = useSelector(
    (state) => state.adminSetting
  );
  const [offices, setOffices] = useState([]);
  const [isManager, setIsManager] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChanged, setIsChanged] = useState(true);

  const [plan, setPlan] = useState('');

  useEffect(() => {
    dispatch(getOfficeList());
    dispatch(getUserList());
    dispatch(getManagerList());
  }, [dispatch]);

  useEffect(() => {
    setPlan(user.planType.toUpperCase());
  }, [user]);

  useEffect(() => {
    officeManagersData = [];
    if (officeList.length > 0) {
      officeList.map((office) => {
        const eachOffice = [];
        userList.map((user) => {
          for (let i = 0; i < user.officeIds.length; i += 1) {
            if (office.id === Number(user.officeIds[i])) {
              eachOffice.push(user);
              break;
            }
          }
        });
        officeManagersData.push(eachOffice);
      });
    }

    officeManagers = [];
    if (managerList.length > 0) {
      officeList.map((office, oIndex) => {
        const eachOfficeManager = [];
        managerList.map((manager) => {
          if (manager.officeId === office.id) {
            for (let i = 0; i < officeManagersData[oIndex].length; i += 1) {
              if (officeManagersData[oIndex][i].id === manager.userId) {
                eachOfficeManager.push(officeManagersData[oIndex][i]);
                break;
              }
            }
          }
        });
        officeManagers.push(eachOfficeManager);
      });
    }

    rows = [];

    officeList.map((office, mIndex) => {
      rows.push(
        createData(
          office.id,
          office.emoji,
          office.name,
          office.capacity,
          officeManagersData[mIndex],
          officeManagers[mIndex]
        )
      );
    });
    const managerNames = [];
    rows.map((office) => {
      const rowData = {};
      rowData.officeId = office.id;
      const officeIsManagers = [];
      office.members.map((member) => {
        if (office.managers !== undefined) {
          office.managers.map((manager) => {
            if (member.id === manager.id) officeIsManagers.push(member);
          });
        }
      });
      rowData.isManagers = officeIsManagers;
      managerNames.push(rowData);
    });
    setIsManager(managerNames);
    setOffices([...rows]);
  }, [managerList, officeList, userList]);

  const handleAddOffice = async () => {
    const id = await addOffice();
    const data = createData(id, '🙂', '', '', [], []);
    rows.push(data);
    const addManager = isManager;
    addManager.push([]);
    setIsManager([...addManager]);
    setOffices([...rows]);
  };

  const handleSaveChanges = async () => {
    setIsSubmitting(true);
    const officeList = offices;
    const managerList = isManager;
    const updatedOfficeList = [];
    officeList.map((office, mIndex) => {
      updatedOfficeList.push(office);
      managerList.map((manager) => {
        if (office.id === manager.officeId)
          updatedOfficeList[mIndex].managers = manager.isManagers;
      });
    });
    await updateOfficeList({ updatedOfficeList });
    setIsChanged(true);
    setIsSubmitting(false);
    enqueueSnackbar('Update success', { variant: 'success' });
  };

  const changeIcon = (icon, index) => {
    offices.map((office, offIndex) => {
      if (index === offIndex) {
        rows[offIndex].emoji = icon;
      }
    });
    setOffices([...rows]);
    setIsChanged(false);
  };

  const handleDeleteOffice = (officeId) => {
    deleteOffice({ officeId });
  };

  return (
    <>
      <Box sx={{ textAlign: 'right', mb: 1, mr: 1 }}>
        <LoadingButton
          disabled={isChanged}
          variant="contained"
          pending={isSubmitting}
          onClick={handleSaveChanges}
        >
          Save Changes
        </LoadingButton>
      </Box>
      <Card>
        <CardContent sx={{ padding: theme.spacing(3, 0) }}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table" sx={{ marginBottom: '10px' }}>
              <TableHead>
                <TableRow>
                  <TableCellStyles
                    sx={{ [theme.breakpoints.down('md')]: { display: 'none' } }}
                  >
                    No
                  </TableCellStyles>
                  <TableCellStyles align="center">Emoji</TableCellStyles>
                  <TableCellStyles align="center">Office Name</TableCellStyles>
                  <TableCellStyles align="right">Capacity</TableCellStyles>
                  <TableCellStyles align="right" />
                </TableRow>
              </TableHead>
              <TableBody>
                {offices.map((row, index) => [
                  <TableRow key={row.id}>
                    <TableCellStyles
                      component="th"
                      scope="row"
                      rowSpan={2}
                      sx={{
                        [theme.breakpoints.down('md')]: { display: 'none' }
                      }}
                    >
                      {index + 1}
                    </TableCellStyles>
                    <TableCellStyles align="right" sx={{ textAlign: 'center' }}>
                      <EmojiButton
                        icon={row.emoji}
                        index={index}
                        changeIconProps={changeIcon}
                      />
                    </TableCellStyles>
                    <TableCellStyles align="right">
                      <TextField
                        id="outlined-basic"
                        label="Office Name"
                        variant="outlined"
                        value={row.name}
                        onChange={(e) => {
                          const office = offices;
                          office[index].name = e.target.value;
                          setOffices([...office]);
                          setIsChanged(false);
                        }}
                        sx={{ width: '100%' }}
                      />
                    </TableCellStyles>
                    <TableCellStyles align="right">
                      <TextField
                        id="outlined-basic"
                        label="Capacity"
                        variant="outlined"
                        type="number"
                        value={row.capacity}
                        onChange={(e) => {
                          const office = offices;
                          office[index].capacity = e.target.value;
                          setOffices([...office]);
                          setIsChanged(false);
                        }}
                        sx={{
                          width: '50px',
                          [theme.breakpoints.up('md')]: { width: '100%' }
                        }}
                      />
                    </TableCellStyles>
                    <TableCellStyles align="right">
                      <DeleteButton
                        deleteTitle={row.name}
                        deleteProps={handleDeleteOffice}
                        deleteId={row.id}
                      />
                    </TableCellStyles>
                  </TableRow>,
                  <TableRow key={`sub_${index}`}>
                    <TableCellStyles colSpan={5}>
                      <Autocomplete
                        multiple
                        id="tags-outlined"
                        options={row.members}
                        value={
                          isManager.length ? isManager[index].isManagers : []
                        }
                        getOptionLabel={(option) => option.name}
                        filterSelectedOptions
                        onChange={(event, value) => {
                          const autoTemp = isManager;
                          isManager.map((_, aIndex) => {
                            if (index === aIndex)
                              autoTemp[index].isManagers = value;
                          });
                          setIsManager([...autoTemp]);
                          setIsChanged(false);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            label="Office Manger"
                            placeholder="Select office manager..."
                          />
                        )}
                      />
                    </TableCellStyles>
                  </TableRow>
                ])}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ width: '100%', px: 3 }}>
            <Button
              disabled={plan === 'FREE'}
              onClick={handleAddOffice}
              variant="contained"
              sx={{ width: '100%', mt: 2 }}
            >
              <AddIcon />
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}

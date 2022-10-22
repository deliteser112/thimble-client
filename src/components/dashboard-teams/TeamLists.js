/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
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

import DeleteButton from '../dashboard-component/ConfirmDialog';

import ColorButton from '../dashboard-component/ColorButton';

// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getUserList } from '../../redux/slices/user';
import { getTeamList, getTManagerList } from '../../redux/slices/adminSetting';

import useAdmin from '../../hooks/useAdmin';
import useAuth from '../../hooks/useAuth';

const TableCellStyles = withStyles((theme) => ({
  root: {
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(2, 0),
      '&:first-of-type': {
        paddingLeft: 0
      },
      '&:last-of-type': {
        paddingRight: '1px !important',
        boxShadow: 'inset 0px 0 0 #fff'
      }
    }
  }
}))(TableCell);

function createData(id, color, name, capacity, members, managers) {
  return { id, color, name, capacity, members, managers };
}

let rows = [
  createData(0, '#00D084', 'Maxime quidem provident', 12, [], []),
  createData(1, '#0693E3', 'Atque pariatur', 3, [], []),
  createData(2, '#EB144C', 'Quia iste', 5, [], [])
];

let teamManagersData = [];
let teamManagers = [];

export default function TeamLists() {
  const theme = useTheme();
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { addTeam, deleteTeam, updateTeamList } = useAdmin();
  const { userList } = useSelector((state) => state.user);
  const { teamList, tmanagerList } = useSelector((state) => state.adminSetting);

  const [teams, setTeams] = useState([]);
  const [isManager, setIsManager] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChanged, setIsChanged] = useState(true);

  const [plan, setPlan] = useState('');

  useEffect(() => {
    dispatch(getTeamList());
    dispatch(getUserList());
    dispatch(getTManagerList());
  }, [dispatch]);

  useEffect(() => {
    setPlan(user.planType.toUpperCase());
  }, [user]);

  useEffect(() => {
    teamManagersData = [];
    if (teamList.length > 0) {
      teamList.map((team) => {
        const eachTeam = [];
        userList.map((user) => {
          for (let i = 0; i < user.teamIds.length; i += 1) {
            if (team.id === Number(user.teamIds[i])) {
              eachTeam.push(user);
              break;
            }
          }
        });
        teamManagersData.push(eachTeam);
      });
    }

    teamManagers = [];
    if (tmanagerList.length > 0) {
      teamList.map((team, oIndex) => {
        const eachTeamManager = [];
        tmanagerList.map((manager) => {
          if (manager.teamId === team.id) {
            for (let i = 0; i < teamManagersData[oIndex].length; i += 1) {
              if (teamManagersData[oIndex][i].id === manager.userId) {
                eachTeamManager.push(teamManagersData[oIndex][i]);
                break;
              }
            }
          }
        });
        teamManagers.push(eachTeamManager);
      });
    }

    rows = [];
    teamList.map((team, tIndex) => {
      rows.push(
        createData(
          team.id,
          team.color,
          team.name,
          team.capacity,
          teamManagersData[tIndex],
          teamManagers[tIndex]
        )
      );
    });
    const managerNames = [];
    rows.map((team) => {
      const rowData = {};
      rowData.teamId = team.id;
      const teamIsManagers = [];
      team.members.map((member) => {
        if (team.managers !== undefined) {
          team.managers.map((manager) => {
            if (member.id === manager.id) teamIsManagers.push(member);
          });
        }
      });
      rowData.isManagers = teamIsManagers;
      managerNames.push(rowData);
    });
    setIsManager(managerNames);
    setTeams([...rows]);
  }, [teamList, tmanagerList, userList]);

  const handleSaveChanges = async () => {
    setIsSubmitting(true);
    const teamList = teams;
    const managerList = isManager;
    const updatedTeamList = [];
    teamList.map((team, mIndex) => {
      updatedTeamList.push(team);
      managerList.map((manager) => {
        if (team.id === manager.teamId)
          updatedTeamList[mIndex].managers = manager.isManagers;
      });
    });
    await updateTeamList({ updatedTeamList });
    setIsChanged(true);
    setIsSubmitting(false);
    enqueueSnackbar('Update success', { variant: 'success' });
  };

  const handleAddTeam = async () => {
    const id = await addTeam();
    const data = createData(id, '#9900EF', '', '', [], []);
    rows.push(data);
    const addManager = isManager;
    addManager.push([]);
    setIsManager([...addManager]);
    setTeams([...rows]);
  };

  const handleDeleteTeam = (teamId) => {
    deleteTeam({ teamId });
  };

  const changeColor = (color, index) => {
    setIsChanged(false);
    teams.map((team, teamIndex) => {
      if (index === teamIndex) {
        rows[teamIndex].color = color;
      }
    });
    setTeams([...rows]);
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
            <Table aria-label="Team Table" sx={{ marginBottom: '10px' }}>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{ [theme.breakpoints.down('md')]: { display: 'none' } }}
                  >
                    No
                  </TableCell>
                  <TableCell>Color</TableCell>
                  <TableCellStyles align="center">Team Name</TableCellStyles>
                  <TableCellStyles align="right">Capacity</TableCellStyles>
                  <TableCellStyles align="right" />
                </TableRow>
              </TableHead>
              <TableBody>
                {teams.map((row, index) => [
                  <TableRow key={index}>
                    <TableCellStyles
                      component="th"
                      scope="row"
                      sx={{
                        [theme.breakpoints.down('md')]: { display: 'none' }
                      }}
                    >
                      {index + 1}
                    </TableCellStyles>
                    <TableCellStyles
                      align="right"
                      sx={{ [theme.breakpoints.down('md')]: { width: '80px' } }}
                    >
                      <ColorButton
                        color={row.color}
                        index={index}
                        changeColorProps={changeColor}
                      />
                    </TableCellStyles>
                    <TableCellStyles
                      align="right"
                      sx={{
                        [theme.breakpoints.down('md')]: { width: '235px' }
                      }}
                    >
                      <TextField
                        id="outlined-basic"
                        label="Team Name"
                        variant="outlined"
                        value={row.name}
                        onChange={(e) => {
                          const team = teams;
                          team[index].name = e.target.value;
                          setTeams([...team]);
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
                        value={row.capacity}
                        onChange={(e) => {
                          const team = teams;
                          team[index].capacity = e.target.value;
                          setTeams([...team]);
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
                        deleteProps={handleDeleteTeam}
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
                            label="Team Manger"
                            placeholder="Select team manager..."
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
              onClick={handleAddTeam}
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

// const Users = [
//   { name: 'Alexander Ryndin' },
//   { name: 'Zlenko Sofia' },
//   { name: 'Oleg Pablo' }
// ];

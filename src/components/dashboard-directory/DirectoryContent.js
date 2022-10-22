/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
// material
import {
  useTheme,
  experimentalStyled as styled
} from '@material-ui/core/styles';

import { Container } from '@material-ui/core';
// hooks
import useAdmin from '../../hooks/useAdmin';
import useAuth from '../../hooks/useAuth';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getOfficeList, getTeamList } from '../../redux/slices/adminSetting';
import { getUserList } from '../../redux/slices/user';
// ----------------------------------------------------------------------

import DayStatusButtonGroup from '../dashboard-component/DayStatusButtonGroup';
import TeamCategoryGroup from '../dashboard-component/TeamCategoryGroup';
import HasErrorDialog from '../dashboard-component/HasErrorDialog';
import UserLists from './UserList';
import CSVFileUpload from './CSVfileUpload';

const SpaceStyle = styled('div')(({ theme }) => ({
  height: theme.spacing(4)
}));

export default function DirectoryContent() {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const { addMemberList, makeAdmin } = useAdmin();
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { officeList, teamList } = useSelector((state) => state.adminSetting);
  const { userList } = useSelector((state) => state.user);

  const [hasError, setHasError] = useState(false);

  const [errorContent, setErrorContent] = useState('');

  const [teams, setTeams] = useState([]);
  const [teamIds, setTeamIds] = useState([]);

  const [offices, setOffices] = useState([]);
  const [officeIds, setOfficeIds] = useState([]);

  useEffect(() => {
    dispatch(getOfficeList());
    dispatch(getTeamList());
    dispatch(getUserList());
  }, [dispatch]);

  useEffect(() => {
    const { offices, teams, roles } = user;
    const OfficeStatus = [];
    const TeamStatus = [];
    if (roles === 'ADMIN') {
      officeList.map((office) => {
        const data = {
          id: office.id,
          label: office.name,
          icon: office.emoji
        };

        OfficeStatus.push(data);
      });

      teamList.map((team) => {
        const data = {
          id: team.id,
          label: team.name,
          color: team.color
        };

        TeamStatus.push(data);
      });
    } else {
      officeList.map((office) => {
        offices.map((uOfficeId) => {
          if (Number(office.id) === Number(uOfficeId)) {
            const data = {
              id: office.id,
              label: office.name,
              icon: office.emoji
            };

            OfficeStatus.push(data);
          }
        });
      });

      teamList.map((team) => {
        teams.map((uTeamId) => {
          if (Number(team.id) === Number(uTeamId)) {
            const data = {
              id: team.id,
              label: team.name,
              color: team.color
            };

            TeamStatus.push(data);
          }
        });
      });
    }

    setOffices([...OfficeStatus]);
    setTeams([...TeamStatus]);
  }, [officeList, teamList, user]);

  const setStatusProps = (selectedIds) => {
    setOfficeIds(selectedIds);
  };

  const handleTeamSelected = (teamStatus) => {
    setTeamIds(teamStatus);
  };

  const handleMembers = (members) => {
    let isEmpty = false;
    let isMatched = true;
    let isDuplicated = false;
    if (members[0].email === null) {
      isEmpty = true;
    } else {
      const initialDomain = members[0].email.split('@')[1];
      members.map((member) => {
        if (member.email === null) {
          isEmpty = true;
        } else {
          const domain = member.email.split('@')[1];
          if (initialDomain !== domain) {
            isMatched = false;
          }
        }
      });
      for (let i = 0; i < members.length; i += 1) {
        for (let j = i + 1; j < members.length; j += 1) {
          if (members[i].email === members[j].email) {
            isDuplicated = true;
            break;
          }
        }
      }
    }
    if (isEmpty) {
      setErrorContent('The email address must not empty!');
      setHasError(true);
    } else if (!isMatched) {
      setHasError(true);
      setErrorContent('Company domain is not the same!');
    } else if (isDuplicated) {
      setHasError(true);
      setErrorContent('The email is duplicated!');
    } else {
      const memberList = members;
      addMemberList(memberList);
      setTimeout(() => {
        enqueueSnackbar('Invited members successfully!', {
          variant: 'success'
        });
        dispatch(getUserList());
      }, 1500);
    }
  };

  const handleHasError = () => {
    setHasError(false);
  };

  const handleMakeAdmin = async (userId) => {
    await makeAdmin({ userId });
    setTimeout(() => {
      dispatch(getUserList());
    }, 500);
  };

  return (
    <Container maxWidth="xl">
      <Container
        maxWidth="lg"
        sx={{ [theme.breakpoints.down('md')]: { px: 0 } }}
      >
        <DayStatusButtonGroup
          officeInitProps={officeIds}
          statusProps={setStatusProps}
          officeGroups={offices}
          isMulti
        />
        <TeamCategoryGroup
          teamInitProps={teamIds}
          daygroups={teams}
          teamStatusProps={handleTeamSelected}
        />
        {user.roles === 'ADMIN' && (
          <>
            <CSVFileUpload membersProps={handleMembers} />
            <HasErrorDialog
              errorContent={errorContent}
              hasError={hasError}
              errorProps={handleHasError}
            />
          </>
        )}
        <SpaceStyle />
        <UserLists onMakeAdmin={handleMakeAdmin} userList={userList} />
      </Container>
    </Container>
  );
}

/* eslint-disable array-callback-return */
import { filter } from 'lodash';
// import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
// material
// import { useTheme } from '@material-ui/core/styles';
import {
  Card,
  Table,
  // Stack,
  // Avatar,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  // Typography,
  TableContainer,
  TablePagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel
} from '@material-ui/core';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getUserList } from '../../redux/slices/user';
import { getCompanyList } from '../../redux/slices/superAdmin';
import useSuperAdmin from '../../hooks/useSuperAdmin';
// components
// import Label from '../Label';
import Scrollbar from '../Scrollbar';
import SearchNotFound from '../SearchNotFound';

import UserListHead from './CompanyListHead';
import UserListToolbar from './CompanyListToolbar';
// import UserMoreMenu from './CompanyMoreMenu';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'companyName', label: 'Company Name', alignRight: false },
  { id: 'companyDomain', label: 'Domain', alignRight: false },
  { id: 'members', label: 'Members', alignRight: false },
  { id: 'offices', label: 'Offices', alignRight: false },
  { id: 'teams', label: 'Teams', alignRight: false },
  // { id: 'adminName', label: 'Admin Name', alignRight: false },
  { id: 'adminEmail', label: 'Admin Email', alignRight: false },
  { id: 'planType', label: 'Plan Type', alignRight: false },
  { id: 'auto', label: 'Auto/Manual', alignRight: false }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(arrays, comparator, query) {
  const array = arrays || [];
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) => _user.domain.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserList() {
  // const theme = useTheme();
  const dispatch = useDispatch();
  // const { userList } = useSelector((state) => state.user);
  const { companies } = useSelector((state) => state.superAdmin);
  const { updatePlan, updateIsManual } = useSuperAdmin();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('domain');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [companyList, setCompanyList] = useState([]);

  useEffect(() => {
    dispatch(getUserList());
    dispatch(getCompanyList());
  }, [dispatch]);

  useEffect(() => {
    setCompanyList([...companies]);
  }, [companies]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = companyList.map((n) => n.domain);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - companyList.length) : 0;

  const filteredUsers = applySortFilter(
    companyList,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Card>
      <UserListToolbar
        numSelected={selected.length}
        filterName={filterName}
        onFilterName={handleFilterByName}
      />

      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <UserListHead
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={companyList.length}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {filteredUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const {
                    id,
                    name,
                    domain,
                    members,
                    offices,
                    teams,
                    // adminAvatar,
                    // adminName,
                    adminEmail,
                    planType,
                    isSetBySuper
                  } = row;

                  const isItemSelected = selected.indexOf(domain) !== -1;

                  return (
                    <TableRow
                      hover
                      key={index}
                      tabIndex={-1}
                      role="checkbox"
                      selected={isItemSelected}
                      aria-checked={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          onChange={(event) => handleClick(event, domain)}
                        />
                      </TableCell>
                      <TableCell align="left">{name}</TableCell>
                      <TableCell align="left">{domain}</TableCell>
                      <TableCell align="left">{members}</TableCell>
                      <TableCell align="left">{offices}</TableCell>
                      <TableCell align="left">{teams}</TableCell>

                      {/* <TableCell component="th" scope="row" padding="none">
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Avatar alt={adminName} src={adminAvatar} />
                          <Typography variant="subtitle2" noWrap>
                            {adminName}
                          </Typography>
                        </Stack>
                      </TableCell> */}
                      <TableCell align="left">{adminEmail}</TableCell>
                      <TableCell align="left">
                        <FormControl variant="outlined">
                          <InputLabel id="demo-simple-select-outlined-label">
                            Plan Type
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={planType}
                            onChange={(e) => {
                              const tmpCompanies = [];
                              let tmpCompany = {};
                              companyList.map((company) => {
                                if (company.id === id) {
                                  tmpCompany = company;
                                }
                              });

                              const insData = {
                                ...tmpCompany,
                                planType: e.target.value,
                                isSetBySuper: 0
                              };

                              companyList.map((item) => {
                                if (item.id === id) {
                                  tmpCompanies.push(insData);
                                } else {
                                  tmpCompanies.push(item);
                                }
                              });
                              setCompanyList([...tmpCompanies]);
                              const data = { id, planType: e.target.value };
                              updatePlan({ data });
                              const manualData = {
                                id,
                                isSetBySuper: 0
                              };
                              updateIsManual({ manualData });
                            }}
                            label="Plan Type"
                          >
                            <MenuItem value="trial">Trial</MenuItem>
                            <MenuItem value="free">Free</MenuItem>
                            <MenuItem value="premium">Premium</MenuItem>
                            <MenuItem value="enterprise">Enterprise</MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell align="center">
                        <FormControlLabel
                          control={
                            <Switch
                              checked={!isSetBySuper}
                              onChange={() => {
                                const tmpCompanies = [];
                                let tmpCompany = {};
                                companyList.map((company) => {
                                  if (company.id === id) {
                                    tmpCompany = company;
                                  }
                                });

                                const insData = {
                                  ...tmpCompany,
                                  isSetBySuper: !isSetBySuper
                                };

                                companyList.map((item) => {
                                  if (item.id === id) {
                                    tmpCompanies.push(insData);
                                  } else {
                                    tmpCompanies.push(item);
                                  }
                                });
                                setCompanyList([...tmpCompanies]);
                                const manualData = {
                                  id,
                                  isSetBySuper: !isSetBySuper
                                };
                                updateIsManual({ manualData });
                              }}
                            />
                          }
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            {isUserNotFound && (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                    <SearchNotFound searchQuery={filterName} />
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Scrollbar>

      <TablePagination
        rowsPerPageOptions={[10, 15, 25]}
        component="div"
        count={companyList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
}

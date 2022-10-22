/* eslint-disable array-callback-return */
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
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
  TablePagination
} from '@material-ui/core';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getCompanyList, getInsightsList } from '../../redux/slices/superAdmin';

// components
import Label from '../Label';
import Scrollbar from '../Scrollbar';
import SearchNotFound from '../SearchNotFound';

import InsightListHead from './InsightListHead';
import InsightListToolbar from './InsightListToolbar';
// import UserMoreMenu from './CompanyMoreMenu';
// // ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'companyName', label: 'Company Name', alignRight: false },
  { id: 'companyDomain', label: 'Domain', alignRight: false },
  { id: 'plans', label: 'Plans', alignRight: false },
  { id: 'isPaid', label: 'Payment Status', alignRight: false },
  { id: 'trialDays', label: 'Trial Days', alignRight: false },
  { id: 'endOn', label: 'End On', alignRight: false },
  { id: 'passedDays', label: 'Passed Days', alignRight: false }
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
  const dispatch = useDispatch();
  const { insights, companies } = useSelector((state) => state.superAdmin);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('domain');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [companyList, setCompanyList] = useState([]);
  const [insightList, setInsightList] = useState([]);

  useEffect(() => {
    dispatch(getInsightsList());
    dispatch(getCompanyList());
  }, [dispatch]);

  useEffect(() => {
    setInsightList([...insights]);
  }, [insights]);

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
      const newSelecteds = insightList.map((n) => n.domain);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - insightList.length) : 0;

  const filteredUsers = applySortFilter(
    insightList,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Card>
      <InsightListToolbar
        numSelected={selected.length}
        filterName={filterName}
        onFilterName={handleFilterByName}
      />

      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <InsightListHead
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={insightList.length}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {filteredUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const {
                    // id,
                    name,
                    domain,
                    endOn,
                    isPaid,
                    passedDays,
                    plans,
                    trialDays
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
                      <TableCell align="left">
                        <Label
                          variant="filled"
                          color={
                            (plans === 'free' && 'error') ||
                            (plans === 'trial' && 'warning') ||
                            'success'
                          }
                        >
                          {sentenceCase(plans)}
                        </Label>
                      </TableCell>
                      <TableCell align="left">
                        <Label
                          variant="filled"
                          color={(isPaid !== 1 && 'error') || 'success'}
                        >
                          {/* {sentenceCase(role)} */}
                          {isPaid === 0 ? 'UNPAID' : 'PAID'}
                        </Label>
                      </TableCell>
                      <TableCell align="left">
                        {plans === 'trial' ? trialDays : '0'}
                      </TableCell>
                      <TableCell align="left">
                        {plans === 'trial' ? endOn : 'Infinity'}
                      </TableCell>
                      <TableCell align="left">{passedDays}</TableCell>
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

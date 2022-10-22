/* eslint-disable array-callback-return */
import PropTypes from 'prop-types';

import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import { LoadingButton } from '@material-ui/lab';
import { Box } from '@material-ui/core';

import CSVReader from 'react-csv-reader';

CSVfileUpload.propTypes = {
  membersProps: PropTypes.func
};

export default function CSVfileUpload({ membersProps }) {
  const [open, setOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isChanged, setIsChanged] = React.useState(true);

  const [members, setMembers] = React.useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.toLowerCase().replace(/\W/g, '_')
  };

  const handleInputFile = (data) => {
    const memberList = [];
    data.map((member) => {
      if (member.firstname !== null && member.lastname !== null) {
        memberList.push(member);
      }
    });
    setIsChanged(false);
    setMembers([...memberList]);
  };

  const handleSaveData = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsChanged(true);
    }, 1500);
    membersProps(members);
  };

  return (
    <div>
      <Box sx={{ width: '100%', textAlign: 'right' }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleClickOpen}
          startIcon={<CloudUploadIcon />}
        >
          Upload Employees
        </Button>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          '& .MuiPaper-root': {
            maxWidth: 'none'
          }
        }}
      >
        <DialogTitle id="alert-dialog-title">
          Upload your employee list using CSV file.
        </DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: 'right', mr: 2, mb: 1 }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleClickOpen}
              startIcon={<CloudUploadIcon />}
              sx={{ position: 'relative' }}
            >
              <CSVReader
                cssClass="csv-reader-input"
                onFileLoaded={handleInputFile}
                // onError={this.handleDarkSideForce}
                parserOptions={papaparseOptions}
                inputId="ObiWan"
                inputName="ObiWan"
                inputStyle={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  color: 'red',
                  opacity: 0,
                  width: 160,
                  height: 35
                }}
              />
              <Typography variant="body2">Upload CSV file</Typography>
            </Button>
          </Box>

          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Preffered Name</TableCell>
                  <TableCell>Job Title</TableCell>
                  <TableCell>Department Name</TableCell>
                  <TableCell>Offices</TableCell>
                  <TableCell>Teams</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {members.map((member, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell>{member.firstname}</TableCell>
                    <TableCell>{member.lastname}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>{member.prefferedname}</TableCell>
                    <TableCell>{member.jobtitle}</TableCell>
                    <TableCell>{member.departmentname}</TableCell>
                    <TableCell>{member.offices}</TableCell>
                    <TableCell>{member.teams}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <LoadingButton
            disabled={isChanged}
            variant="contained"
            pending={isSubmitting}
            startIcon={<GroupAddIcon />}
            onClick={handleSaveData}
          >
            Invite members
          </LoadingButton>

          <Button
            onClick={handleClose}
            color="error"
            variant="contained"
            autoFocus
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

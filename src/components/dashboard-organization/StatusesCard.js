/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';

import React, { useState, useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';

// import { useTheme } from '@material-ui/core/styles';

import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  Button,
  Grid,
  Checkbox,
  TextField,
  FormControlLabel
} from '@material-ui/core';

// HOOKS
import useAdmin from '../../hooks/useAdmin';

import EmojiButton from '../dashboard-component/EmojiButton';

function createData(id, emoji, title, description, isActive) {
  return { id, emoji, title, description, isActive };
}

function customData(id, emoji, title, isActive) {
  return { id, emoji, title, isActive };
}

let basicList = [
  createData(0, '🏡', 'From home', 'Remote (works with Cities feature)', true),
  createData(1, '🚶‍♂️', 'On the go', 'On the go / Out of the office', false),
  createData(2, '🏝', 'Not working', 'Holiday / Not working', true),
  createData(3, '🤒', 'Sick', 'Sick days (merged with "Not working")', true)
];

let customList = [customData(0, '🙂', 'Custom 1', true)];

StatusesCard.propTypes = {
  plan: PropTypes.string,
  dataProps: PropTypes.object,
  setStatusProps: PropTypes.func
};

export default function StatusesCard({ dataProps, setStatusProps, plan }) {
  const { addStatus } = useAdmin();

  const [basics, setBasics] = useState([]);
  const [customs, setCustoms] = useState([]);

  useEffect(() => {
    const sData = dataProps;
    const basic = sData.basicList !== undefined ? sData.basicList : [];
    const custom = sData.customList !== undefined ? sData.customList : [];
    setBasics(basic);
    setCustoms(custom);
  }, [dataProps]);

  useEffect(() => {
    const tempStatuses = {};
    tempStatuses.basicList = basics;
    tempStatuses.customList = customs;
    setStatusProps(tempStatuses);
  }, [basics, customs]);

  const changeIcon = (icon, index) => {
    basicList = [];
    const values = icon;
    const insData = {
      ...basics[index],
      emoji: values
    };
    basics.map((item, iconIndex) => {
      if (iconIndex === index) {
        basicList.push(insData);
      } else {
        basicList.push(item);
      }
    });
    setBasics([...basicList]);
  };

  const changeIconCustom = (icon, index) => {
    customList = [];
    const values = icon;
    const insData = {
      ...customs[index],
      emoji: values
    };
    customs.map((item, iconIndex) => {
      if (iconIndex === index) {
        customList.push(insData);
      } else {
        customList.push(item);
      }
    });
    setCustoms([...customList]);
  };

  const handleAddStatus = async () => {
    const id = await addStatus();
    customList.push(customData(id, '🙂', `Custom ${customList.length + 1}`, 0));
    setCustoms([...customList]);
  };

  return (
    <Card>
      <CardHeader subheader="STATUSES" />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">Basic</Typography>
          </Grid>
          {basics.map((item, index) => (
            <Grid item xs={12} key={item.id}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <EmojiButton
                  icon={item.emoji}
                  index={index}
                  changeIconProps={changeIcon}
                />
                <TextField
                  id="outlined-basic"
                  label="Title"
                  variant="outlined"
                  sx={{ mr: 1, width: '100%' }}
                  value={item.title}
                  onChange={(e) => {
                    const tmpBasics = [];
                    const values = e.target.value;
                    const insData = {
                      ...basics[index],
                      title: values
                    };
                    basics.map((item, bIndex) => {
                      if (index === bIndex) {
                        tmpBasics.push(insData);
                      } else {
                        tmpBasics.push(item);
                      }
                    });
                    setBasics([...tmpBasics]);
                  }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="checkedC"
                      checked={item.isActive === 1}
                      onChange={() => {
                        const tmpBasics = [];
                        const Checked = !basics[index].isActive ? 1 : 0;
                        const insData = {
                          ...basics[index],
                          isActive: Checked
                        };
                        basics.map((item, bIndex) => {
                          if (index === bIndex) {
                            tmpBasics.push(insData);
                          } else {
                            tmpBasics.push(item);
                          }
                        });
                        setBasics([...tmpBasics]);
                      }}
                    />
                  }
                  label="Active"
                />
              </Box>
              <Box sx={{ width: '100%', textAlign: 'center' }}>
                <Typography variant="caption">{item.description}</Typography>
              </Box>
            </Grid>
          ))}
          <Box m={2} />
          <Grid item xs={12}>
            <Typography variant="h5">Custom</Typography>
          </Grid>
          {customs.map((item, index) => (
            <Grid item xs={12} key={index}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <EmojiButton
                  icon={item.emoji}
                  index={index}
                  changeIconProps={changeIconCustom}
                />
                <TextField
                  id="outlined-basic"
                  label="Title"
                  variant="outlined"
                  value={item.title}
                  sx={{ mr: 1, width: '100%' }}
                  onChange={(e) => {
                    // const tmpCustoms = customs;
                    // tmpCustoms[index].title = e.target.value;
                    // setCustoms([...tmpCustoms]);

                    const tmpCustoms = [];
                    const values = e.target.value;
                    const insData = {
                      ...customs[index],
                      title: values
                    };
                    customs.map((item, bIndex) => {
                      if (index === bIndex) {
                        tmpCustoms.push(insData);
                      } else {
                        tmpCustoms.push(item);
                      }
                    });
                    setCustoms([...tmpCustoms]);
                  }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="checkedC"
                      checked={item.isActive === 1}
                      onChange={() => {
                        const tmpCustoms = [];
                        const Checked = !customs[index].isActive ? 1 : 0;
                        const insData = {
                          ...customs[index],
                          isActive: Checked
                        };
                        customs.map((item, bIndex) => {
                          if (index === bIndex) {
                            tmpCustoms.push(insData);
                          } else {
                            tmpCustoms.push(item);
                          }
                        });
                        setCustoms([...tmpCustoms]);
                      }}
                    />
                  }
                  label="Active"
                />
              </Box>
            </Grid>
          ))}
        </Grid>
        <Button
          disabled={plan === 'FREE'}
          onClick={handleAddStatus}
          variant="contained"
          sx={{ width: '100%', mt: 2 }}
        >
          <AddIcon />
        </Button>
      </CardContent>
    </Card>
  );
}

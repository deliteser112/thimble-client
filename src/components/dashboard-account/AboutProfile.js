/* eslint-disable no-use-before-define */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DatePicker from '@material-ui/lab/DatePicker';

import { Card, CardContent, Grid, Box, Autocomplete } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';

const TextFieldStyle = withStyles(() => ({
  root: {
    width: '100% !important'
  }
}))(TextField);

export default function AboutProfile() {
  const [value, setValue] = React.useState(null);
  return (
    <Card>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Birthday"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => <TextFieldStyle {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              multiple
              id="tags-outlined"
              options={CurrentCities}
              getOptionLabel={(option) => option.label}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Current City"
                  placeholder="Select City..."
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              minRows={4}
              maxRows={4}
              label="You, in 140 characters"
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              id="tags-outlined"
              options={Languages}
              getOptionLabel={(option) => option.label}
              defaultValue={[Languages[1]]}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Languages"
                  placeholder="Select Languages..."
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              id="tags-outlined"
              options={Hobbies}
              getOptionLabel={(option) => option.label}
              defaultValue={[Hobbies[4]]}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Hobbies"
                  placeholder="Select hobbies..."
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              id="tags-outlined"
              options={FavoriteFoods}
              getOptionLabel={(option) => option.label}
              defaultValue={[FavoriteFoods[3]]}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Favorite Food"
                  placeholder="Select favorite food..."
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              id="tags-outlined"
              options={Skills}
              getOptionLabel={(option) => option.label}
              defaultValue={[Skills[2]]}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Skills & Tools"
                  placeholder="Select skills..."
                />
              )}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <LoadingButton
            type="submit"
            variant="contained"
            // pending={isSubmitting}
          >
            Save Changes
          </LoadingButton>
        </Box>
      </CardContent>
    </Card>
  );
}

const Languages = [
  { label: 'Arabic' },
  { label: 'English' },
  { label: 'French' },
  { label: 'German' },
  { label: 'Hindi' },
  { label: 'Italian' },
  { label: 'Mandarin' },
  { label: 'Portuguese' }
];

const Hobbies = [
  { label: 'Animes' },
  { label: 'Crafting' },
  { label: 'Gardening' },
  { label: 'Manga' },
  { label: 'Music' },
  { label: 'Netflix' },
  { label: 'Read' },
  { label: 'TV shows' },
  { label: 'Travel' },
  { label: 'Video games' }
];

const FavoriteFoods = [
  { label: 'Burger' },
  { label: 'Burrito' },
  { label: 'Pasta' },
  { label: 'Pizza' },
  { label: 'Ramen' },
  { label: 'Salad' },
  { label: 'Sushi' },
  { label: 'Taco' },
  { label: 'Waffle' }
];

const Skills = [
  { label: 'Copywriting' },
  { label: 'Customer care' },
  { label: 'Data analysis' },
  { label: 'Marketing' },
  { label: 'Product management' },
  { label: 'React Native' },
  { label: 'Sales' },
  { label: 'Social media' },
  { label: 'UI design' },
  { label: 'UX' }
];

const CurrentCities = [{ label: 'No Option' }];

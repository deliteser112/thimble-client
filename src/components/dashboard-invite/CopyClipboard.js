import { useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import copyFill from '@iconify/icons-eva/copy-fill';
import { CopyToClipboard } from 'react-copy-to-clipboard';
// material
import {
  Tooltip,
  TextField,
  IconButton,
  InputAdornment
} from '@material-ui/core';

import EnqueueSnackBar from '../dashboard-component/EnqueueSnackBar';

CopyClipboard.propTypes = {
  value: PropTypes.string
};

export default function CopyClipboard({ value, ...other }) {
  const [state, setState] = useState({
    value,
    copied: false
  });
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setState({ value: event.target.value, copied: false });
  };

  const onCopy = () => {
    setState({ ...state, copied: true });
    if (state.value) {
      setOpen(true);
    }

    setTimeout(() => {
      setOpen(false);
    }, 4000);
  };

  return (
    <>
      <EnqueueSnackBar
        message="Copied in Clipboard!"
        isOpen={open}
        status="info"
        vertical="bottom"
        horizontal="right"
      />
      <TextField
        value={state.value}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <CopyToClipboard text={state.value} onCopy={onCopy}>
                <Tooltip title="Copy">
                  <IconButton>
                    <Icon icon={copyFill} width={24} height={24} />
                  </IconButton>
                </Tooltip>
              </CopyToClipboard>
            </InputAdornment>
          )
        }}
        {...other}
      />
    </>
  );
}

import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function MultiselectCheckbox(props) {
  return (
      <>
      {props.files.length > 0 &&
        <Autocomplete
        multiple
        id="checkboxes-tags-demo"
        options={props.files}
        disableCloseOnSelect
        getOptionLabel={(option) => option.fname}
        renderOption={(option, { selected }) => (
            <React.Fragment>
            <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
            />
            {option.fname}
            </React.Fragment>
        )}
        style={{ width: 500 }}
        onChange={(event, value) => props.updateFilesToAssociate(value)}
        renderInput={(params) => (
            <TextField {...params} variant="outlined" label="Files to associate with card" placeholder="Files" />
        )}
        />
      }
    </>
  );
}

export default MultiselectCheckbox;
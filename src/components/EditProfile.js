import React from 'react';

const EditProfile = props => {
  if (props.selectedProfile) {
    return (
      <div>
        <div className="editfields">
          <div>
            <label>id: </label>
            {props.addingProfile
              ? <input
                  type="number"
                  name="id"
                  placeholder="id"
                  value={props.selectedProfile.id}
                  onChange={props.onChange}
                />
              : <label className="value">
                  {props.selectedProfile.id}
                </label>}
          </div>
          <div>
            <label>first name: </label>
            <input
              name="first name"
              value={props.selectedProfile.name}
              placeholder="first name"
              onChange={props.onChange}
            />
          </div>
          <div>
            <label>last name: </label>
            <input
              name="last name"
              value={props.selectedProfile.saying}   
              placeholder="last name"
              onChange={props.onChange}
            />
          </div>
          <div>
            <label> email: </label>
            <input
              name="email"
              value={props.selectedProfile.name}
              placeholder="email"
              onChange={props.onChange}
            />
          </div>
          <div>
            <label>number: </label>
            <input
              name="number"
              value={props.selectedProfile.name}
              placeholder="number"
              onChange={props.onChange}
            />
          </div>
          <div>
            <label>dob: </label>
            <input
              name="date of birth"
              value={props.selectedProfile.name}
              placeholder="date of birth"
              onChange={props.onChange}
            />
          </div>
          <div>
            <label>gender: </label>
            <input
              name="gender"
              value={props.selectedProfile.name}
              placeholder="gender"
              onChange={props.onChange}
            />
          </div>
        </div>
        <button onClick={props.onCancel}>Cancel</button>
        <button onClick={props.onSave}>Save</button>
      </div>
    );
  } else {
    return <div />;
  }
};

export default EditProfile;

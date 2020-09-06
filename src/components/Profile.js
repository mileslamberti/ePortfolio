import React from 'react';

const Profile = props => {
  return (
    <li
      onClick={() => props.onSelect(props.profile)}
      className={props.profile === props.selectedProfile ? 'selected' : ''}
    >
      <button
        className="delete-button"
        onClick={e => props.onDelete(e, props.profile)}
      >
        Delete
      </button>
      <div className="profile-element">
        <div className="badge">
          {props.profile.id }
        </div>
        <div className="first name">
          {props.profile.first_name }
        </div>
        <div className="last name">
          {props.profile.last_name   }
        </div>
        <div className="email">
          {props.profile.email   }
        </div>
        <div className="number">
          {props.profile.number   }
        </div>
        <div className="dob">
          {props.profile.dob   }
        </div>
        <div className="gender">
          {props.profile.gender   }
        </div>
      </div>
    </li>
  );
};

export default Profile;

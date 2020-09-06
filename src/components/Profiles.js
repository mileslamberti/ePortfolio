import React, { Component } from 'react';

import EditProfile from './EditProfile';
import Profile from './Profile';

import api from '../api';

class Profiles extends Component {
  constructor() {
    super();

    this.state = {
      profiles: [],
      creatingProfile: false
    };

    this.handleEnableAddMode = this.handleEnableAddMode.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    api.get().then(json => this.setState({ profiles: json }));
  }

  handleSelect(profile) {
    this.setState({ selectedProfile: profile });
  }

  handleDelete(event, profile) {
    event.stopPropagation();

    api.destroy(profile).then(() => {
      let profiles = this.state.profiles;
      profiles = profiles.filter(h => h !== profile);
      this.setState({ profiles: profiles });

      if (this.selectedProfile === profile) {
        this.setState({ selectedProfile: null });
      }
    });
  }

  handleEnableAddMode() {
    this.setState({
      addingProfile: true,
      selectedProfile: { id: '', first_name: '', last_name: '', email: '', number: '', dob:'', gender:'' }
    });
  }

  handleCancel() {
    this.setState({ addingProfile: false, selectedProfile: null });
  }

  handleSave() {
    let profiles = this.state.profiles;

    if (this.state.addingProfile) {
      api
        .create(this.state.selectedProfile)
        .then(result => {
          console.log('Successfully created!');

          profiles.push(this.state.selectedProfile);
          this.setState({
            profiles: profiles,
            selectedProfile: null,
            addingProfile: false
          });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      api
        .update(this.state.selectedProfile)
        .then(() => {
          this.setState({ selectedProfile: null });
        })
        .catch(err => {});
    }
  }

  handleOnChange(event) {
    let selectedProfile = this.state.selectedProfile;
    selectedProfile[event.target.name] = event.target.value;
    this.setState({ selectedProfile: selectedProfile });
  }

  render() {
    return (
      <div>
        <ul className="profiles">
          {this.state.profiles.map(profile => {
            return (
              <Profile
                key={profile.id}
                profile={profile}
                onSelect={this.handleSelect}
                onDelete={this.handleDelete}
                selectedProfile={this.state.selectedProfile}
              />
            );
          })}
        </ul>
        <div className="editarea">
          <button onClick={this.handleEnableAddMode}>Add New Profile</button>
          <EditProfile
            addingProfile={this.state.addingProfile}
            onChange={this.handleOnChange}
            selectedProfile={this.state.selectedProfile}
            onSave={this.handleSave}
            onCancel={this.handleCancel}
          />
        </div>
      </div>
    );
  }
}

export default Profiles;

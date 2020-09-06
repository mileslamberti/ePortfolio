const baseAPI = '/api';

const profileService = {
  get() {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/profiles`)
        .then(response => response.json())
        .then(json => resolve(json))
        .catch(err => {
          reject(err);
        });
    });
  },

  create(profile) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/profile`, {
        method: 'PUT',
        body: JSON.stringify(profile),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(result => result.json())
        .then(json => resolve(json))
        .catch(err => {
          reject(err);
        });
    });
  },

  update(profile) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/profile`, {
        method: 'POST',
        body: JSON.stringify(profile),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  destroy(profile) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/profile/${profile.id}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(json => resolve(json))
        .catch(err => {
          reject(err);
        });
    });
  }
};

export default profileService;

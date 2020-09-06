const Profile = require('./profile-model');
const ReadPreference = require('mongodb').ReadPreference;

require('./mongo').connect();

function get(req, res) {
  const docquery = Profile.find({}).read(ReadPreference.NEAREST);
  docquery
    .exec()
    .then(profiles => {
      res.json(profiles);
    })
    .catch(err => {
      res.status(500).send(err);
    });
}

function create(req, res) {
  const { id, first_name, last_name, email, number, dob, gender } = req.body;

  const profile = new Profile({ id, first_name, last_name, email, number, dob, gender });
  profile
    .save()
    .then(() => {
      res.json(profile);
    })
    .catch(err => {
      res.status(500).send(err);
    });
}

function update(req, res) {
  const { id, first_name, last_name, email, number, dob, gender} = req.body;

  Profile.findOne({ id })
    .then(profile => {
      profile.first_name = first_name;
      profile.last_name = last_name;
      profile.email = email;
      profile.number = number;
      profile.dob = dob;
      profile.gender = gender;
      profile.save().then(res.json(profile));
    })
    .catch(err => {
      res.status(500).send(err);
    });
}

function destroy(req, res) {
  const { id } = req.params;

  Profile.findOneAndRemove({ id })
    .then(profile => {
      res.json(profile);
    })
    .catch(err => {
      res.status(500).send(err);
    });
}

module.exports = { get, create, update, destroy };

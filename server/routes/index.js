const express = require('express');
const router = express.Router();

const profilesService = require('../profile-services');

router.get('/profiles', (req, res) => {
  profilesService.get(req, res);
});

router.put('/profile', (req, res) => {
  profilesService.create(req, res);
});

router.post('/profile', (req, res) => {
  profilesService.update(req, res);
});

router.delete('/profile/:id', (req, res) => {
  profilesService.destroy(req, res);
});

module.exports = router;

const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth")
const router = express.Router();

const AboutMe = require("../models/AboutMe");

router.post("/add", async (req, res) => {
    const displayName = req.body.displayName;
    const inspirations = req.body.inspirations;
    const jobs = req.body.jobs;
    const experiences = req.body.experiences;

    const newAboutMe = new AboutMe({
        displayName,
        inspirations,
        jobs,
        experiences
    })
    newAboutMe.save()
        .then(() => res.json('About me added!'))
        .catch (err => res.status(400).json(`Error: ${err}`));
})

router.get("/:id", async (req, res) => {
    AboutMe.findById(req.params.id)
        .then(aboutMe => res.json(aboutMe))
        .catch(err => res.status(400).json(`Error: ${err}`));
})

router.route('/edit/:id').post((req, res) => {
    AboutMe.findById(req.params.id)
        .then(aboutMe => {
            aboutMe.displayName = req.body.displayName;
            aboutMe.inspirations = req.body.inspirations;
            aboutMe.jobs = req.body.jobs;
            aboutMe.experiences = req.body.experiences;

            aboutMe.save()
                .then(() => res.json('About me updated.'))
                .catch(err => res.status(400).json(`Erros: ${err}`));
        })
        .catch(err => res.status(400).json(`Erros: ${err}`));
});

module.exports = router;
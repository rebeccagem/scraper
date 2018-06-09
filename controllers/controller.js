// var path = require("path");
var axios = require("axios");
var cheerio = require("cheerio");
// // Require all models
var db = require("../models");

var path = require("path");

var Notes = ('../models/Note.js');
var Episodes = ('../models/Episode.js');

module.exports = function (app) {

    function scraper(cb) {
        var results = [];

        // First, we grab the body of the html with request
        axios.get("https://www.npr.org/podcasts/510313/how-i-built-this").then(function (response) {
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            var $ = cheerio.load(response.data);

            // Now, we grab every h2 within an article tag, and do the following:
            $("div.item-info").each(function (i, element) {
                // // Save an empty result object
                var result = {};

                // Add the text and href of every link, and save them as properties of the result object
                result.title = $(this)
                    .children("article")
                    .children(".audio-module")
                    .children("h4")
                    .text();
                result.blurb = $(this)
                    .children(".teaser")
                    .text();
                result.embed = $(this)
                    .children("article")
                    .children(".audio-module")
                    .children(".audio-module-tools")
                    .children("ul")
                    .children(".audio-tool-embed")
                    .children("button")
                    .attr("data-embed-url");
                result.postDate = $(this)
                    .children(".episode-date")
                    .children("time")
                    .children(".date")
                    .text();
                result.datetime = $(this)
                    .children(".episode-date")
                    .children("time")
                    .attr("datetime");
                results.push(result);
                // Create a new Episode using the `result` object built from scraping
                db.Episode.create(result)
                    .then(function (dbEpisode) {
                        // View the added result in the console
                        console.log(dbEpisode);
                    })
                    .catch(function (err) {
                        // If an error occurred, send it to the client
                        return res.json(err);
                    });
            });
            cb(results);
        });
    }

    // A GET route for scraping the website
    app.get("/", function (req, res) {
        db.Episode.find({}).sort({ _id: 1 })
            .then(function (data) {
                // View the added result in the console
                res.render("index", { episodes: data })
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                return res.json(err);
            });

    });

    // A GET route for scraping the website
    app.get("/saved", function (req, res) {
        db.Episode.find({}).sort({ _id: 1 })
            .then(function (data) {
                // View the added result in the console
                res.render("saved", { episodes: data })
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                return res.json(err);
            });

    });



    // A GET route for scraping the website
    app.get("/scrape", function (req, res) {
        scraper(function (data) {
            // window.location.reload();
            res.redirect("/");
        });
    });

    app.post("/save/:id", function (req, res) { 
        db.Episode.findOneAndUpdate({ _id: req.params.id }, {saved: true})
            .then(function (dbEpisode) {
                window.location.reload();
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                return res.json(err);
            });
    });

    app.post("/delete/:id", function (req, res) { 
        db.Episode.findOneAndUpdate({ _id: req.params.id }, {saved: false})
            .then(function (dbEpisode) {
                window.location.reload();
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                return res.json(err);
            });
    });



    // Route for getting all Articles from the db
    app.get("/episodes", function (req, res) {
        // Grab every document in the Articles collection
        db.Episode.find({})
            .then(function (dbEpisode) {
                // If we were able to successfully find Articles, send them back to the client
                res.json(dbEpisode);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });

    });



    // // Route for grabbing a specific Article by id, populate it with it's note
    // app.get("/episodes/:id", function (req, res) {
    //     // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    //     db.Episode.findOne({ _id: req.params.id })
    //         // ..and populate all of the notes associated with it
    //         .populate("note")
    //         .then(function (dbEpisode) {
    //             // If we were able to successfully find an Article with the given id, send it back to the client
    //             res.json(dbEpisode);
    //         })
    //         .catch(function (err) {
    //             // If an error occurred, send it to the client
    //             res.json(err);
    //         });
    // });


    // // Route for saving/updating an Article's associated Note
    // app.post("/episodes/:id", function (req, res) {
    //     // Create a new note and pass the req.body to the entry
    //     db.Note.create(req.body)
    //         .then(function (dbNote) {
    //             // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
    //             // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
    //             // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
    //             return db.Episode.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    //         })
    //         .then(function (dbEpisode) {
    //             // If we were able to successfully update an Article, send it back to the client
    //             res.json(dbEpisode);
    //         })
    //         .catch(function (err) {
    //             // If an error occurred, send it to the client
    //             res.json(err);
    //         });
    // });

    // app.get("/", function (req, res) {
    //     res.render("index");
    // });

};

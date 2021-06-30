"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var db = require('../model/Knex');
var jwt = require('jsonwebtoken');
var keys = require('../auth/auth');
var fetch = require('node-fetch');
var bcrypt = require('bcrypt');
var imageUpload = function (req, res) {
    if (req.files) {
        var imageUpload_1 = req.files.imageUpload;
        var user = JSON.parse(req.headers.user);
        var Token = user.Token, User_1 = user.User;
        jwt.verify(Token, keys.key, function (err, decoded) {
            if (decoded) {
                db.query('users', 'id', decoded.id)
                    .then(function (response) {
                    if (response[0].email === User_1) {
                        delete response[0].encrypted_password;
                        db.update('users', response[0].id, { user_image: imageUpload_1.data })
                            .then(function (response) {
                            res.status(200).json({ Auth: true, image: response[0].user_image });
                        });
                    }
                });
            }
            else {
                res.status(200).json({ Auth: false });
            }
        });
    }
};
var parkevents = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                db.deleteBigEvents();
                return [4 /*yield*/, fetch('https://www.nycgovparks.org/xml/events_300_rss.json')
                        .then(function (response) { return response.json(); })
                        .then(function (json) {
                        json = json.map(function (result) {
                            var title = result.title, description = result.description, parknames = result.parknames, startdate = result.startdate, enddate = result.enddate, starttime = result.starttime, endtime = result.endtime, location = result.location, coordinates = result.coordinates, image = result.image;
                            coordinates = coordinates.split(' ');
                            var latitude = Number(coordinates[0].slice(0, -1)).toFixed(3);
                            var longitude = Number(coordinates[1]).toFixed(3);
                            if (longitude === 'NaN') {
                                longitude = Number(coordinates[1].slice(0, -1)).toFixed(3);
                            }
                            result = { title: title, description: description, parknames: parknames, startdate: startdate, enddate: enddate, starttime: starttime, endtime: endtime, location: location, coordinates: coordinates, latitude: latitude, longitude: longitude, image: image };
                            return result;
                        });
                        db.select('parks')
                            .then(function (response) {
                            response.forEach(function (data) {
                                data.park_latitude = Number(data.park_latitude).toFixed(3);
                                data.park_longitude = Number(data.park_longitude).toFixed(3);
                                var obj = json.filter(function (item) { return item.latitude == data.park_latitude && item.longitude == data.park_longitude; });
                                if (obj.length) {
                                    obj.forEach(function (item) {
                                        item.park_name = data.park_name;
                                        db.add(item, 'park_events');
                                    });
                                }
                            });
                        });
                    })];
            case 1:
                _a.sent();
                res.sendStatus(201);
                return [2 /*return*/];
        }
    });
}); };
var deleteFavorite = function (req, res) {
    db.deleteFav(req.body);
};
var postFavorite = function (req, res) {
    console.log(req.body);
    if (!req.body)
        res.sendStatus(404);
    jwt.verify(req.body.user_id, keys.key, function (err, decoded) {
        if (decoded) {
            req.body.user_id = decoded.id;
            db.add(req.body, 'favorites');
            res.sendStatus(200);
        }
        else {
            res.sendStatus(404);
        }
    });
};
var favorites = function (req, res) {
    jwt.verify(req.body.Token, keys.key, function (err, decoded) {
        if (decoded) {
            db.join(decoded.id)
                .then(function (resData) {
                res.status(200).json(resData);
            });
        }
    });
};
var updateProfile = function (req, res) {
    var _a = req.body, first_name = _a.firstName, last_name = _a.lastName, email = _a.email, password = _a.password, user = _a.user;
    db.query('users', 'email', user)
        .then(function (response) { return __awaiter(void 0, void 0, void 0, function () {
        var match;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, bcrypt.compare(password, response[0].encrypted_password)];
                case 1:
                    match = _a.sent();
                    if (match) {
                        db.query('users', 'email', email)
                            .then(function (result) {
                            if (!result.length) {
                                db.updateTo({ first_name: first_name, last_name: last_name, email: email }, 'users', 'id', response[0].id)
                                    .then(function (nxtData) {
                                    delete nxtData[0].encrypted_password;
                                    delete nxtData[0].id;
                                    delete nxtData[0].user_image;
                                    res.status(200).json({ Auth: match, User: nxtData[0] });
                                });
                            }
                            else {
                                console.log('email exist', result);
                                res.status(200).json({ Auth: match, Duplicate: true, message: 'make it wrk' });
                            }
                        });
                    }
                    else {
                        res.status(200).json({ Auth: match, message: 'Wrong Password' });
                    }
                    return [2 /*return*/];
            }
        });
    }); });
};
var filter = function (req, res) {
    db.filterJoin(req.headers.filter)
        .then(function (result) { return res.status(200).json(result); });
};
var eventUpdate = function (req, res) {
    var file = JSON.parse(req.body.imageUpload);
    var user = JSON.parse(req.body.formData);
    jwt.verify(user.user_id, keys.key, function (err, decoded) {
        if (decoded) {
            req.body.user_id = decoded.id;
            user.image = file.data;
            var eventId = user.eventId;
            delete user.eventId;
            delete user.image;
            user.user_id = decoded.id;
            db.update('events', eventId, user)
                .then(function (response) { return res.status(200).json(response); });
        }
    });
};
var eventDelete = function (req, res) {
    db.deleteEvent(req.body.eventId)
        .then(function (result) { return res.status(200).json(result); });
};
module.exports = {
    imageUpload: imageUpload,
    postFavorite: postFavorite,
    parkevents: parkevents,
    updateProfile: updateProfile,
    favorites: favorites,
    deleteFavorite: deleteFavorite,
    filter: filter,
    eventUpdate: eventUpdate,
    eventDelete: eventDelete
};

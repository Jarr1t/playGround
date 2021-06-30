import express = require('express')
const db = require('../model/Knex');
const jwt = require('jsonwebtoken');
const keys = require('../auth/auth')
const fetch = require('node-fetch');
const bcrypt = require('bcrypt');

const imageUpload = (req: {files: {imageUpload: { data: string}}, headers: {user: string}}, res: express.Response) => {
    if(req.files) {
        const {imageUpload} = req.files
        const user = JSON.parse(req.headers.user)
        const {Token,User} = user
        jwt.verify(Token, keys.key, function(err: void, decoded: {id: number}) {
          if(decoded) {
            db.query('users','id',decoded.id)
            .then((response: any) => {
              if(response[0].email === User) {
                delete response[0].encrypted_password
                db.update('users',response[0].id,{user_image: imageUpload.data})
                .then((response: any) => {
                    res.status(200).json({Auth: true,image: response[0].user_image})
                })
              }
            })
          }else {
            res.status(200).json({Auth: false})
          }
        });
    }
  }

const parkevents = async (req: void, res: express.Response) => {
  db.deleteBigEvents()
  await fetch('https://www.nycgovparks.org/xml/events_300_rss.json')
  .then((response: any) => response.json())
  .then((json: any) => {
      json = json.map((result: {
        title: string, 
        description: string, 
        startdate: string, 
        enddate: string, 
        starttime: string,
        parknames: string,
        endtime: string, 
        location: string, 
        coordinates: any,
        latitude: string,
        longitude: string,
        image: string}) => {
        
        let {title,description,parknames,startdate,enddate,starttime,endtime,location,coordinates,image} = result
        coordinates = coordinates.split(' ')
        const latitude: string = Number(coordinates[0].slice(0, -1)).toFixed(3);
        let longitude = Number(coordinates[1]).toFixed(3)
        if(longitude === 'NaN') {
          longitude = Number(coordinates[1].slice(0, -1)).toFixed(3);
        }
        result = {title,description,parknames,startdate,enddate,starttime,endtime,location,coordinates,latitude,longitude,image}
        return result
      })
      db.select('parks')
      .then((response: any) => {
        response.forEach((data: {park_latitude: string,
           park_longitude: string,
            park_name: string}) => {     
            data.park_latitude = Number(data.park_latitude).toFixed(3)
            data.park_longitude = Number(data.park_longitude).toFixed(3)
              const obj = json.filter((item :{latitude: string, longitude: string}) => item.latitude == data.park_latitude && item.longitude == data.park_longitude)
              if(obj.length) {
                obj.forEach((item: {park_name: string}) => {
                  item.park_name = data.park_name
                  
                  db.add(item,'park_events')
                })
              }
        })
      })
  })
  res.sendStatus(201)
}
const deleteFavorite = (req: {body: {park_id: number}}, res: express.Response) => {
  db.deleteFav(req.body)
}

const postFavorite = (req: {body: {user_id: number}}, res: express.Response) => {
    console.log(req.body)
    if(!req.body)res.sendStatus(404);
    jwt.verify(req.body.user_id, keys.key, function(err: void, decoded: {id: number}) {
        if(decoded) {
            req.body.user_id = decoded.id
            db.add(req.body,'favorites')
            res.sendStatus(200)
        } else {
            res.sendStatus(404)
        }
    })
}

const favorites = (req: express.Request, res: express.Response) => {
  
    jwt.verify(req.body.Token, keys.key, function(err: void, decoded: {id: number}) {
        if(decoded) {
               db.join(decoded.id)
                .then((resData: any) => { 
                    res.status(200).json(resData)
                   })
    }
})
}

const updateProfile = (req: express.Request, res: express.Response) => {
  const {firstName:first_name,lastName:last_name,email,password,user} = req.body
  db.query('users','email',user)
            .then(async (response: any) => {
              const match = await bcrypt.compare(password, response[0].encrypted_password);
              if(match) {
                db.query('users','email',email)
                .then((result : string[])=> {
                   if(!result.length) {
                     db.updateTo({first_name,last_name,email},'users','id',response[0].id)
                     .then((nxtData: any) => {
                       delete nxtData[0].encrypted_password
                       delete nxtData[0].id
                       delete nxtData[0].user_image
                      res.status(200).json({Auth:match,User:nxtData[0]})
                     })
                  }else {
                    console.log('email exist',result) 
                    res.status(200).json({Auth:match,Duplicate:true,message: 'make it wrk'})
                  }
                })
              }else {
                res.status(200).json({Auth:match,message: 'Wrong Password'})
              }
            })
}
const filter = (req: express.Request, res: express.Response) => {
  db.filterJoin(req.headers.filter)
  .then((result: any) => res.status(200).json(result))
}
const eventUpdate = (req: express.Request,res: express.Response) => {
  const file = JSON.parse(req.body.imageUpload)
  const user = JSON.parse(req.body.formData)
  jwt.verify(user.user_id, keys.key, function(err: void, decoded: {id: number}) {
    if(decoded){
      req.body.user_id = decoded.id
      user.image = file.data
      const eventId = user.eventId
      delete user.eventId
      delete user.image
      user.user_id = decoded.id
  db.update('events',eventId,user)
  .then((response: any) => res.status(200).json(response))
}
  })
}
const eventDelete = (req: express.Request, res: express.Response) => {
  db.deleteEvent(req.body.eventId)
  .then((result: any) => res.status(200).json(result))
}
module.exports = {
    imageUpload,
    postFavorite,
    parkevents,
    updateProfile,
    favorites,
    deleteFavorite,
    filter,
    eventUpdate,
    eventDelete
}
/*=======================================°/

Public Key:
BCzXXVwWbTIbAwbH924B-mlVElAGBYJfYJOdrSYTA3S8_ZX_uaWvMTWts8kOLUi1tIWohmnUJeRmUQUl45UZVy4

Private Key:
NTRxKnK7ttTD1vHfkI59kBSLevjhdgw2kdI8N_5GEQc

/°=======================================*/


//Express
const express = require('express');

//web-push
const webpush = require('web-push');

//body-parser
const bodyParser = require('body-parser');

//path
const path = require('path');

//using express 
const app = express();

//using bodyparser
app.use(bodyParser.json())

//storing the keys in variables
const publicVapidKey = 'BCzXXVwWbTIbAwbH924B-mlVElAGBYJfYJOdrSYTA3S8_ZX_uaWvMTWts8kOLUi1tIWohmnUJeRmUQUl45UZVy4';
const privateVapidKey = 'NTRxKnK7ttTD1vHfkI59kBSLevjhdgw2kdI8N_5GEQc';

//setting vapid keys details
webpush.setVapidDetails('mailto:dpirlo@hotmail.com', publicVapidKey,privateVapidKey);

//subscribe route
app.post('/subscribe', (req, res)=>{
    //get push subscription object from the request
    const subscription = req.body;

    //send status 201 for the request
    res.status(201).json({})

    //create paylod: specified the detals of the push notification
    const payload = JSON.stringify({title: 'Section.io Push Notification' });

    //pass the object into sendNotification fucntion and catch any error
    webpush.sendNotification(subscription, payload).catch(err=> console.error(err));
})

app.use(express.static(path.join(__dirname, "client")));


const port = 3000;
app.listen(port, ()=>{
    console.log(`server started on ${port}`)
});
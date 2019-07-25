const openAPI = require('./openAPI');
const express = require('express');
const app = express();
const path = require('path');
const static = require('serve-static');
const template = require('./template')
const Mrequest = require('request');

app.use('/public', static(path.join(__dirname,'public')));

let dustKind = '미세먼지';

app.get('/',(request,response) => {
    var PM = openAPI.PM;
    var PMImage = template.image(dustKind,PM.pm10Value,PM.pm25Value);
    var PMinfo = template.info(dustKind,PM.pm10Value,PM.pm25Value);
    var weather = openAPI.weather;
    var detailWeather = openAPI.detailWeather;
    var html = template.html(PM,PMImage,PMinfo,weather,detailWeather);
    response.send(html);
});

app.get('/fine_Dust',(request,response) => {
    dustKind='미세먼지';
    response.redirect('/');
});

app.get('/fine_fine_Dust', (request,response) => {
    dustKind='초미세먼지';
    response.redirect('/');
});



app.get('/DoorLock_Open', (request, response) => {
    Mrequest.post({
        headers:{
            'Accept': 'application/json',
            'X-M2M-RI': 12345,
            'X-M2M-Origin': 'JongJin',
            'Content-Type': 'application/vnd.onem2m-res+json; ty=4',
        },
        url:'http://localhost:7579/Mobius/lock/update',
        body: {
            "m2m:cin": {
                "con": "123"
            }
        },
        json:true
    });
    response.redirect('/');    
});

app.listen(process.env.PORT || 3000, () => {
    console.log('3000번 포트에서 스마트 도어락 서버가 대기중입니다.');
});

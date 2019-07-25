const express = require('express');
const app = express();
const fs = require('fs');
const student = JSON.parse(fs.readFileSync('current.city.list.json'));

module.exports = {
    html:function(PM,image,info,weather,detailWeather){
        return `<!DOCTYPE html>
        <head>
            <title>스마트도어락</title>
            <h2 style="text-align:center">스마트 도어락</h2>
            <hr>
            <style>
                table,caption,tr,td{
                    border:1px solid #444444;
                    margin:0px;
                    padding:0px;
                    border-collapse:collapse;
                }
            </style>
        </head>
        <body style="background-color:Ivory">
        ${this.doorButton()}    
        ${this.weatherTable(weather,detailWeather)}<br>
        ${this.PMTable(PM,image,info)}
            
        </body>
        `;
    },    //${this.PMTable(PM,image,info)}
    image: function(dustKind,pm10Value,pm25Value){
        if(dustKind === '미세먼지'){
            if(pm10Value<=30)
                return `<img src="public/좋음.PNG" style="width:182px;height:170px;overflow:hidden">`;
            else if(pm10Value<=80)
                return `<img src="public/보통.PNG" style="width:182px;height:170px;overflow:hidden">`;
            else if(pm10Value<=150)
                return `<img src="public/나쁨.PNG" style="width:182px;height:170px;overflow:hidden">`;
            else
                return `<img src="public/매우 나쁨.PNG" style="width:182px;height:170px;overflow:hidden">`;
        }else{
            if(pm25Value<=15)
            return `<img src="public/좋음.PNG" style="width:179px;height:170px;overflow:hidden">`;
            else if(pm25Value<=35)
            return `<img src="public/보통.PNG" style="width:179px;height:170px;overflow:hidden">`;
            else if(pm25Value<=75)
            return `<img src="public/나쁨.PNG" style="width:179px;height:170px;overflow:hidden">`;
            else
            return `<img src="public/매우 나쁨.PNG" style="width:179px;height:170px;overflow:hidden">`;
        }
    },
    info : function(dustKind,pm10Value,pm25Value){
        if(dustKind==='미세먼지')
        return `미세먼지 농도 
        <h1>${pm10Value}㎍/㎥</h1>`;
        else
        return `초미세먼지 농도 
        <h1>${pm25Value}㎍/㎥</h1>`;
    },
    PMTable:function(PM,image,info){
        return `
        <table style="width:300px ;height:200px">
            <caption style="background-color:aqua"><h2>미세먼지 알림</h2><small>(${PM.dataTime}기준)(${PM.cityName})</small></caption>
            <thead>
                <tr style="height:40px">
                    <td>
                        <form action="/fine_Dust">
                            <input type="submit" value="미세먼지" style="width:100%;height:40px;background-color:whitesmoke">
                        </form>
                    </td>
                    <td>
                        <form action="/fine_fine_Dust">
                            <input type="submit" value="초미세먼지" style="width:100%;height:40px;background-color:whitesmoke">
                        </form>    
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td >
                        ${image}
                    </td>
                    <td style="table-layout:fixed">
                        ${info}
                    </td>
                </tr>
            </tbody>
        </table>
        `;
    },
    weatherTable:function(weather,detailWeather){
        for(var title ='',i=16;i<weather.title[0].length;i++){
            if(i<=weather.title[0].length-3 && i>=weather.title[0].length-4);
            else
            title +=weather.title[0].charAt(i);
        }
        list = `<tr>`;
        for(var i=0;i<7;i++){
            if(detailWeather[i].day>=1)
            list += `<td style="font-size:80%;text-align:center">내일${detailWeather[i].hour}시</td>`;
            else
            list += `<td style="font-size:80%;text-align:center">${detailWeather[i].hour}시</td>`;
        }
        list = list + `</thead><tbody><tr style="font-size:90%">`
        for(var i=0;i<7;i++){
            list+=`<td style="text-align:center">
                    날씨<br> ${detailWeather[i].wfKor}<br><br>
                    기온<br> ${detailWeather[i].temp}°C<br><br>
                    풍향<br> ${detailWeather[i].wdKor}
            </td>`;
        }
        
        return `
        <table style="width:450px ;height:200px">
            <caption style="background-color:aqua">
                ${title}<br>
                <small style="font-size:70%">${weather.pubDate}기준</small>
            </caption>
            <thead>
                ${list}
                </tr>
            </tbody>
        </table>
        `;
    },
    comboBox:function(){
        list = `<form action="/do_process>
        <select name="do" id="do">
            <option selected>특별/광역시</option>
            <option>경기도</option>
            <option>강원도</option>
            <option>충청북도</option>
            <option>충청남도</option>
            <option>전라북도</option>
            <option>전라남도</option>
            <option>경상북도</option>
            <option>경상남도</option>
        </select>
        <input type="submit" value="검색">
        </form>`;
        return `${list}`;
    },
    doorButton:() =>{
        return `
        <form action="/DoorLock_Open" >
            <input type="submit" value="문열기" style="width:200px;height:100px;background-color:YellowGreen;float:right">
        </form>   
        `;
    }
}
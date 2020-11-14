window.addEventListener('load',()=>{
    //initialising various elements of the DOM
    let long;              
    let lat;
    let temperatureDescription=document.querySelector('.temperature-description');
    let temperatureDegree=document.querySelector('.temperature-degree');
    let locationTimezone=document.querySelector('.location-timezone');
    let icon=document.querySelector('p');
    let CorF=document.querySelector('span');
    let degreeSection=document.querySelector('.degree-section');
    //using browser navigator API to get the current longitude and latitude
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            long= position.coords.longitude;
            lat=position.coords.latitude;
            const proxy=`https://cors-anywhere.herokuapp.com/`;
            const api=`http://api.weatherapi.com/v1/current.json?key=b481e56ae47e41628e6200454201311&q=${lat},${long}`;
            fetch(api).then(Response=>{
                return Response.json();
                console.log(Response);
            }).then(data =>{
                console.log(data);
                console.log(data.current.condition.icon);
                temperatureDegree.textContent=data.current.temp_c;
                locationTimezone.textContent=data.location.tz_id;
                temperatureDescription.textContent=data.current.condition.text;
                let imglink=data.current.condition.icon;
                icon.innerHTML=`<img src='https:${imglink}'>`;
                degreeSection.addEventListener('click',()=>{
                    if (CorF.textContent=='C'){
                        CorF.textContent='F';
                        temperatureDegree.textContent=data.current.temp_f;
                    }else{
                        CorF.textContent='C';
                        temperatureDegree.textContent=data.current.temp_c;
                    }
                })
            })
        });
    }
})

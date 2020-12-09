//Uses event data and inputs into 'event-sm' class. Sets the picture, Event name, and also the Date and time of the event

function setEvents(data,page){
  var results = [];
  var i;

  if(data != -1){
    var fbEvents = document.getElementById('eventCal');
    // fbEvents = document.getElementsByClassName('events-sm');
    for(i=0;i<data.length;i++){
      if(page=="index"){
        //  Creates Div to hold Event information
        var eventSm = document.createElement('DIV');
        if(data[i].id && data[i].id !== null){
        eventSm.style.cursor = 'pointer';
        eventSm.id = data[i].id;
        eventSm.addEventListener('mouseover', function bgColorChange(){this.style.backgroundColor = "#f7f6ee";});
        eventSm.addEventListener('mouseleave', function bgColorRevert(){this.style.backgroundColor = ''})
        eventSm.addEventListener('click', function fbLink(){window.location.href = "https://www.facebook.com/" + this.id + '/';});
      }

        eventSm.className = "events-sm";
      }

      if(data[i].cover && data[i].cover.source !== null){
        var eventSmImg = document.createElement('DIV');
        eventSmImg.className = "event-Img col-5 col-m-5"; //event-Img
        eventSmImg.style.backgroundImage = 'url(' + data[i].cover.source + ')';
        eventSm.appendChild(eventSmImg);
      }
      else{
        var eventNoImg = document.createElement('DIV');
        // eventNoImg.innerText = '???';
        // eventNoImg.style = "text-align: center; font-size: 50px; display: inline-block; float: left;";
        // eventNoImg.className = "col-m-5 col-5";
        eventNoImg.className = "event-Img col-5 col-m-5"; //event-Img
        eventNoImg.style.backgroundImage = 'url(' + "img/yeti_transparent_small.png" + ')';
        eventSm.appendChild(eventNoImg);
      }

      // var eventSmImg = document.createElement('IMG');
      // eventSmImg.className = "col-5 col-m-5";
      // eventSmImg.src = data[i].cover.source;
      // eventSm.appendChild(eventSmImg);


      //Create Text Div
      var eventSmText = document.createElement('DIV');
      eventSmText.style.marginLeft = "41.66%";
      eventSmText.className = "col-m-7";

      var eventSmName = document.createElement('H3');
      eventSmName.innerText = data[i].name;
      eventSmText.appendChild(eventSmName);

      var eventSmDate = document.createElement('H4');
      //Fetches Formatted Date Value
      if(data[i].start_time){

        if(data[i].end_time){
          eventSmDate.innerText = formatDate(data[i].start_time,data[i].end_time);
        }
        else{
          eventSmDate.innerText = formatDate(data[i].start_time,data[i].start_time);
        }
        // const todaysDate = new Date();
        // if(data[i].start_time.toString() < todaysDate){
        //   console.log(new Date().toString());
        //   eventSmDate.style.color = "red";
        // }
        eventSmText.appendChild(eventSmDate);
      }

      eventSm.appendChild(eventSmText);
      fbEvents.appendChild(eventSm);

      document.getElementById("load-wheel1").style.display = 'none';
    }
  }
};

// Formats Date and Time. In the case of matching Dates for the startTime and endTime the endTime date is dropped

function formatDate(startTime, endTime){
  if(startTime && startTime !== null && endTime && endTime != null){
  var start = startTime.split(/\T|\+/);
  var end = endTime.split(/\T|\+/);
  var formattedDate;
  if(start[0] === end[0])
    {
      formattedDate = parseDate(start[0]) + ' @ ' + start[1].substr(0,5); //+ ' - ' + end[1].substr(0,5);
    }
  else{
    formattedDate = parseDate(start[0]) + ' @ ' + start[1].substr(0,5) + ' - ' + parseDate(end[0]) + ' @ ' + end[1].substr(0,5);
  }
  return formattedDate;
};

//Takes date in YY-MM-DD format and parses into english readable format ex. 'January 10, 1995.'
function parseDate(date){
  tmpDate = date.split('-');
  switch(tmpDate[1]){
    case '01':
      tmpDate[1] = 'January';
    break;
    case '02':
      tmpDate[1] = 'February';
    break;
    case '03':
      tmpDate[1] = 'March';
    break;
    case '04':
      tmpDate[1] = 'April';
    break;
    case '05':
      tmpDate[1] = 'May';
    break;
    case '06':
      tmpDate[1] = 'June';
    break;
    case '07':
      tmpDate[1] = 'July';
    break;
    case '08':
      tmpDate[1] = 'August';
    break;
    case '09':
      tmpDate[1] = 'September';
    break;
    case '10':
      tmpDate[1] = 'October';
    break;
    case '11':
      tmpDate[1] = 'November';
    break;
    case '12':
      tmpDate[1] = 'December';
    break;
  }
  return tmpDate[1] + ' ' + tmpDate[2] + ', ' + tmpDate[0];
}
};

function changeplace(nameEn,nameJp) {
if(nameJp){
  document.getElementById("placePointer").innerHTML = nameEn + '<br>' + nameJp;
}
else{
  document.getElementById("placePointer").innerHTML = "Explore Yamanashi!";
}
}

function loadPlace(nameEn,nameJp){
  document.getElementById('placeName').innerHTML = nameEn + '<br>' + nameJp;
  document.getElementById("welcome-text").innerText = "Welcome to " + nameEn + '!';
  document.getElementById('blurbImage').src = "img/coverphoto.jpg";
  document.getElementById('blurb-text').innerText = "Hokuto is a city located in the north-western portion of Yamanashi Prefecture, Japan. The town is made up of 8 ‘towns’ or subdivisions; Hakushu, Nakasaka, Suta-ma, Takane, Akeno, Mukawa, Oizumi, and Kobuchisawa (where our elementary school is located). These towns merged in 2004 to make the city of Hokuto as we know it today. For the most part you can think of them as similar to areas such as Benbrook, Haltom City, and Forest Hill in Fort Worth.";
  document.getElementById("area-blurb").style.display = 'inline-block';
  document.getElementById("welcome-subtext").style.display = 'none';
}

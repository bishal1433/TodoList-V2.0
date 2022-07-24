//jshint esversion:6

module.exports.getdate=getdate;

function getdate(){
  var today= new Date();
  var currDay=today.getDay();

  //options for getting the days
  var options={
    weekday:"long",
    day:"numeric",
    month:"long"
  };

  var day=today.toLocaleString("en-US",options);
  return day;
}

module.exports.getday=getday;

function getday(){
  var today= new Date();
  var currDay=today.getDay();

  //options for getting the days
  var options={
    weekday:"long"
  };

  var day=today.toLocaleString("en-US",options);
  return day;
}

console.log(module.exports);

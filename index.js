var express=require('express');
var fs=require('fs');

var HashMap=require('hashmap');

var app=express();

var jobsArray=fs.readFileSync('jobs.json');

var jobsArray=JSON.parse(jobsArray);

var map=new HashMap();

jobsArray.forEach(function(arrayitem) {

	var jobrole=arrayitem.role;

	jobrole=jobrole.toLowerCase();

	if(map.get(jobrole))
	{
		var skills=[];

		var skills=arrayitem.skills;

		map.set(jobrole, map.get(jobrole).concat(skills));
	}
	else
	{
		map.set(jobrole,arrayitem.skills);
	}

});

app.get('/jobs/:jobtype',function(req,res){

var jobtype=req.params.jobtype;

var myArray=map.get(jobtype.toLowerCase());
//console.log(myArray);
var c = myArray.reduce(function(first, second) {

  first[second] = ++first[second] || 1;
  return first;
}, {});
var keys = Object.keys(c);
var result= keys.sort(function(first, second) {
  if (c[first] < c[second]) {
    return 1;
  } else {
    return -1;
  }
}).map(function(first) {return String(first)});
res.send(result);
});

app.use(express.static(__dirname+'/public'));
var port=3000;
app.listen(port,function(err){
	if(err)
		throw err;
	console.log("Server listening at 3000");
});
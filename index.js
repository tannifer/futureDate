var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port =8080
const path = require('path');


 app.use(bodyParser.urlencoded({ extended: true }));
 app.set('view engine', 'pug');
 app.set('views','./views');


app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '/index.html'));
 });


app.post('/future',function(req,res){
    var startDate = req.body.futureDate;
    console.log(req.body.futureDate);
    var newDate = addTwelveWeeksRounded(startDate)
    //res.send(newDate.toLocaleString('en-GB'));
    res.render('answer',{
        result: newDate.toLocaleString('en-GB')
    });
});




function addTwelveWeeksRounded(date_str) {
    // Parse the input string to obtain a Date object
    let dateComponents = date_str.split('-');
    let inputDate = new Date(
        parseInt(dateComponents[0], 10),
        parseInt(dateComponents[1], 10) - 1, // Months are zero-indexed
        parseInt(dateComponents[2], 10)
    );

    // Add 12 weeks (84 days) to the date object
    let twelveWeeksLater = new Date(inputDate);
    twelveWeeksLater.setDate(twelveWeeksLater.getDate() + 84);

    // Round the new date object to the nearest Monday
    let daysToMonday = (1 - twelveWeeksLater.getDay() + 7) % 7;
    twelveWeeksLater.setDate(twelveWeeksLater.getDate() + daysToMonday);

    // Format the new date object to a string in the desired format
    let new_date_str =
        ("0" + twelveWeeksLater.getDate()).slice(-2) +
        '-' +
        ("0" + (twelveWeeksLater.getMonth() + 1)).slice(-2) +
        '-' +
        twelveWeeksLater.getFullYear();

    return new_date_str;
}






app.listen(port);
console.log('Server started at http://localhost:' + port);
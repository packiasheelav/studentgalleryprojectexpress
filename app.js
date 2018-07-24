const express = require("express");
const bodyParser = require('body-parser');
const app = express();
upload=require('express-fileupload');
app.use(upload());
const ejs = require('ejs');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
const students = require('./public/data');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/' + 'index.html')
});

app.get('/students/:id', function (req, rep) {
    const number = Number(req.params.id);
    rep.render('displayStudentInfo', {
        firstName: students[number].firstName,
        lastName: students[number].lastName,
        nationality: students[number].nationality,
        title: students[number].title,
        skills: students[number].skills,
        whySofterDeveloper: students[number].whySofterDeveloper,
        longTermVision: students[number].longTermVision,
        motivatesMe: students[number].motivatesMe,
        src: students[number].src
    })

})
app.get('/students', function (req, rep) {
    const number = Number(req.params.id);
    rep.render('displayStudentInfo', {
        firstName: students[number].firstName
    });
});

app.get('/gallery', function (req, rep) {
    rep.render('gallery', {
        students
    });
});
app.get('/api', function (req, rep) {
  rep.send({students});
    });

app.get('/AllStudentsDetails', (req, rep) => {
    rep.render('AllStudentsDetails', {
        students
    });
});

app.get('/addnewstudents', (req, rep) => {
    rep.sendFile(__dirname + '/' + 'addnewstudents.html');
});
app.post('/addnewstudents', (req, res) => {
    if(req.files){
        var file=req.files.src;
        filename=file.name;
        let {
            firstName,
            lastName,
            title,
            skills,
            nationality,
            whySofterDeveloper,
            longTermVision,
            motivatesMe,
            favoriteQuote,
            joinedOn,
            src
        } = req.body;
        students.push({
            firstName,
            lastName,
            src:filename,
            title,
            skills,
            nationality,
            whySofterDeveloper,
            longTermVision,
            favoriteQuote,
            joinedOn,
            motivatesMe
        });
        file.mv(__dirname+"/public/images/"+filename,function(err){
            if(err){
                console.log(err);
                res.send("error occured during upload");
            }
            else{
                res.send("done");
                console.log('done');
                res.end();
            }
        })
    }
})
//  app.get('/delete', (req, rep) => {
//     res.sendFile(__dirname + '/' + 'delete.html')
//    console.log('hi from delete');
//  });

// app.delete('/delete/:id', function(req, res) {
//     var id = req.param("id");
//         students.remove({
//             _id: id 
//         }, function(err){
//             if (err) {
//                 console.log(err)
//             }
//             else {
//                return res.send("Removed");
//             }
//         });
//     });
app.listen(3000, () => {
    console.log('Server is running on port 3000....')
});
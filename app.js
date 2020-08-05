const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function (req,res) {
  res.sendFile(__dirname + "/signup.html")

});

app.post("/", function(req,res){
  const firstName=req.body.fName;
  const lastName= req.body.lName;
  const email=req.body.email;

  const data ={
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:firstName,
          LNAME:lastName
        }
      }
    ]
  };

  var jsonData=JSON.stringify(data);

  const url="https://us19.api.mailchimp.com/3.0/lists/3efe746e3a";

  const option={
    method:"POST",
    auth:"fazal1:06cc5f12371265fa4e1945e8264cbe22-us19"
  }

const request =https.request(url,option,function(response){

  if(response.statusCode ===200){
    res.sendFile(__dirname + "/Success.html")
  }else{
    res.sendFile(__dirname + "/failure.html")
  }
    response.on("data", function(data) {
      console.log(JSON.parse(data));

    })

  })
  request.write(jsonData);
  request.end();
});

app.post("/failure", function(req,res){
  res.redirect("/")
})
app.listen(process.env.PORT || 3000 ,function () {
  console.log("Server is running");

})


// api key
// 06cc5f12371265fa4e1945e8264cbe22-us19

// list id
// 3efe746e3a

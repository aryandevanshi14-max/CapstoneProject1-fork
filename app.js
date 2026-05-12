const path = require('path');
const fs = require('fs');


const express = require('express')
const app = express()
const port = 3000
app.use(express.static('./public'))

app.use(express.urlencoded({ extended: false }));




app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'view', 'index.html'))

});
app.get('/api', (req, res) => {

  const jsonData = fs.readFileSync("./db.json", "utf8");
  const data = JSON.parse(jsonData);



  const newData = data.map((value, index, array) => {
    return {
      id: value.id,
      monumentName: value.monumentName,
      img: value.img,
      href: value.href
    }
  })
  res.json(newData)
});

app.get('/about', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'view', 'about.html'))
});

app.get('/contactUs', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'view', 'contact.html'))
});


app.get('/password/:id', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'view', 'password.html'))
});



app.post('/checkPassword/:id', (req, res) => {
  if (req.body.password == '123@admin') {
    if (req.query.aim == 'delete') {

      const jsonData = fs.readFileSync("./db.json", "utf8");
      const data = JSON.parse(jsonData);


      const id = parseInt(req.params.id);


      const reqDataIndex = data.findIndex((val, index, arr) => { val.id == id });

      data.splice(reqDataIndex, 1);




      fs.writeFileSync('./db.json', JSON.stringify(data));

      res.sendFile(path.resolve(__dirname, 'view', 'edit.html'))


    }

    else {
      res.sendFile(path.resolve(__dirname, 'view', 'add.html'))
    }



  }
  else { res.status(404).send("Sorry can't find that!") }
});



app.post('/editFile/:id', (req, res) => {

  if (req.params.id == 0) {
    const jsonData = fs.readFileSync("./db.json", "utf8");
    const data = JSON.parse(jsonData);


    const newData = req.body
    newData.hotelName = newData.hotelName.split('|')
    newData.hotelLink = newData.hotelLink.split('|')
    newData.hospitalName = newData.hospitalName.split('|')
    newData.hospitalLink = newData.hospitalLink.split('|')
    newData.exampleImg = newData.exampleImg.split('|')
    newData.id = data[data.length - 1].id + 1
    // console.log(newData);



    data.push(newData);
    // console.log(data);

    fs.writeFileSync('./db.json', JSON.stringify(data));

  }
  else {
    const jsonData = fs.readFileSync("./db.json", "utf8");
    const data = JSON.parse(jsonData);


    const id = parseInt(req.params.id);
    const oldData = data.find((val, index, array) => { return val.id == id })

    const newData = req.body
    oldData.hotelName = newData.hotelName.split('|')
    oldData.hotelLink = newData.hotelLink.split('|')
    oldData.hospitalName = newData.hospitalName.split('|')
    oldData.hospitalLink = newData.hospitalLink.split('|')
    oldData.exampleImg = newData.exampleImg.split('|')
    oldData.monumentName = newData.monumentName
    oldData.img = newData.img
    oldData.description = newData.description
    oldData.price = newData.price
    oldData.location = newData.location




    fs.writeFileSync('./db.json', JSON.stringify(data));


  }

  res.sendFile(path.resolve(__dirname, 'view', 'edit.html'))


});


app.get('/:id', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'view', 'card.html'))
});

app.get('/:id/api', (req, res) => {

  const jsonData = fs.readFileSync("./db.json", "utf8");
  const data = JSON.parse(jsonData);


  const id = parseInt(req.params.id);
  const reqData = data.find((val, index, array) => { return val.id == id })
  res.json(reqData)

});










app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



//db.json->
// [
//   {
//     "monumentName": "Amber Fort",
//     "img": "https://images.unsplash.com/photo-1718528565888-18e2d9239b82?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGFtYmVyJTIwZm9ydHxlbnwwfHwwfHx8MA%3D%3D",
//     "description": "A majestic fort in Jaipur known for its artistic blend of Rajput and Mughal architecture.",
//     "price": "100",
//     "location": "https://www.google.com/maps?q=Amber+Fort+Jaipur",
//     "exampleImg": [
//       "https://plus.unsplash.com/premium_photo-1661963054563-ce928e477ff3?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YW1iZXIlMjBmb3J0fGVufDB8fDB8fHww",
//       "https://images.unsplash.com/photo-1649074705058-9d1579429e37?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGFtYmVyJTIwZm9ydHxlbnwwfHwwfHx8MA%3D%3D",
//       "https://images.unsplash.com/photo-1682321136734-8cc95d0912be?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGFtYmVyJTIwZm9ydHxlbnwwfHwwfHx8MA%3D%3D",
//       "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YW1iZXIlMjBmb3J0fGVufDB8fDB8fHww",
//       "https://images.unsplash.com/photo-1649073868642-bcbbd06239d8?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YW1iZXIlMjBmb3J0fGVufDB8fDB8fHww"
//     ],
//     "hotelName": ["Trident Jaipur", "Umaid Bhawan", "Jai Mahal Palace"],
//     "hotelLink": [
//       "https://www.tridenthotels.com",
//       "https://www.umaidbhawan.com",
//       "https://www.tajhotels.com"
//     ],
//     "hospitalName": ["Trident Jaipur", "Umaid Bhawan", "Jai Mahal Palace"],
//     "hospitalLink": [
//       "https://www.tridenthotels.com",
//       "https://www.umaidbhawan.com",
//       "https://www.tajhotels.com"
//     ],
//     "id": 1
//   }]
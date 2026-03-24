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
    res.sendFile(path.resolve(__dirname, 'view', 'add.html'))


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
    oldData.exampleImg = newData.exampleImg.split('|')
    oldData.monumentName=newData.monumentName
    oldData.img=newData.img
    oldData.description=newData.description
    oldData.price=newData.price
    oldData.location=newData.location

    


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



// db.json->{
//   monumentName: 'Hawa Mahal',
//   img: 'https://cdn.getyourguide.com/img/tour/0fbad54de9a8f88abd54fde9dfaf428e41d4e54b81bbd58a213389595a243b0f.png/132.jpg',
//   description: '',
//   price: '41',
//   location: 'https://cdn.getyourguide.com/img/tour/0fbad54de9a8f88abd54fde9dfaf428e41d4e54b81bbd58a213389595a243b0f.png/132.jpg',
//   exampleImg: [
//     'https://cdn.getyourguide.com/img/tour/0fbad54de9a8f88abd54fde9dfaf428e41d4e54b81bbd58a213389595a243b0f.png/132.jpg',
//     'https://cdn.getyourguide.com/img/tour/0fbad54de9a8f88abd54fde9dfaf428e41d4e54b81bbd58a213389595a243b0f.png/132.jpg',
//     'https://cdn.getyourguide.com/img/tour/0fbad54de9a8f88abd54fde9dfaf428e41d4e54b81bbd58a213389595a243b0f.png/132.jpg'
//   ],
//   hotelName: [ 'dwk', 'hejk', 'bbjed' ],
//   hotelLink: [ 'edndkj', 'bsdbds', 'bsdh' ],
//   id: 1
// }





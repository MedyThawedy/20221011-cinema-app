import express from 'express';
import cors from 'cors';
import fs from 'fs';
import {places} from './data.js';

const app = express();
const PORT = 9898;

app.use(cors());
    

app.get('/', (req, res) => {
  return new Promise((resolve, reject) => {
    fs.readFile('data.json', (err, data) => {
        if(err)
            reject(err)
        else    
            resolve(data)
    })
}).then( data => res.status(200).json(JSON.parse(data)))
.catch( err => {
    console.log(err)
    res.status(500).end()
})
});

app.get('/seat/:id', async(req,res)=>{
  console.log(req.params.id)
  return new Promise((resolve, reject) => {
      fs.readFile('data.json', (err, data) => {
          if(err)
              reject(err)
          else    
              resolve(data)
      })
  }).then( data =>{ 
     // console.log('Hier Test ',  JSON.parse(data).find(item => item.id === '45f5c0dc'));
      res.status(200).json(JSON.parse(data).find(item => item.id == `${req.params.id}`));
  } )
  .catch( err => {
      console.log(err)
      res.status(500).end()
  })
})


app.get('/reservation/:id', (req, res) => {
    let id = req.params.id;
  console.log('req.params.id = ', req.params.id);
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
          return console.log(err);
        }
        console.log('------- 1 --------');
        console.log(data);
        console.log('------- 2 --------');  
        //https://www.w3schools.com/js/js_json_parse.asp      
        let copyData = JSON.parse(data);
        console.log('1. ', copyData);
        console.log('2. ',  copyData[id-1])
        console.log('3. ', copyData[id-1].reserved);
        console.log('4. ', (!(copyData[id-1].reserved)))
        copyData[id-1].reserved=(!(copyData[id-1].reserved));
        console.log('5. ', '-------- 3 --------');
        console.log('6. ', copyData);
       // https://www.tutorialrepublic.com/faq/how-to-convert-js-object-to-json-string.php#:~:text=Answer%3A%20Use%20the%20JSON.,JavaScript%20object%20a%20JSON%20string.
       let jsonData = JSON.stringify(copyData);

        fs.writeFile('data.json', jsonData, (err) => {
          if (err) {
            return console.log(err);
          }
        });
       // res.status(200).json(JSON.parse(jsonData).find(item => item.id == `${req.params.id}`));
    });

    return new Promise((resolve, reject) => {
      fs.readFile('data.json', (err, data) => {
          if(err)
              reject(err)
          else    
              resolve(data)
      })
  }).then( data => res.status(200).json(JSON.parse(data)))
  .catch( err => {
      console.log(err)
      res.status(500).end()
  })
    
})

app.listen(PORT, () => console.log('Server started on Port : ', PORT));
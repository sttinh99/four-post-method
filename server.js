// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require('express');
const app = express();
const bodyParser = require('body-parser')

app.set('view engine', 'pug');
app.set('views', './views')

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//var lists = ['Đi làm','Nấu cơm','Rửa chén','Học codersX']
var lists =[
  {todo: 'Đi làm'},
  {todo: 'Nấu cơm'},
  {todo: 'Học codersX'},
  {todo: 'Rửa chén'}
]
// https://expressjs.com/en/starter/basic-routing.html
app.get('/', (request, response) => {
  response.send('I love CodersX');
});

app.get('/todos', (req, res) => {
  var q = req.query.q ;
  if(q){
    var matchLList = lists.filter(function(list){
    return list.todo.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    })
  }
  else
    {
      var matchLList = lists
    }
  res.render('index',{
    listToDo : matchLList
  });
});
app.get('/todos/create',function(req,res){
  res.render('create');
});
app.post('/todos/create',function(req,res){
  lists.push(req.body);
  res.redirect('/todos');
})
// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});

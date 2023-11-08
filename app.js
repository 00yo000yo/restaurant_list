const express = require('express')
const app = express()
const port=3000
const exphbs= require('express-handlebars')
const resli=require('./restaurant.json').results
//resli=> REStaurant LIst


app.engine('handlebars',exphbs({defaultLayout:'main'}))
app.set('view engine','handlebars')
app.use(express.static('public'))

app.get('/',(req,res)=>{
  
    res.render('index',{resli})
})

app.get('/restaurants/:id',(req,res)=>{
  const restaurant=resli.find(restaurant=>restaurant.id==req.params.id)
  res.render('show',{restaurant})
  console.log(req.params.id)
})

app.get('/search',(req,res)=>{
  // console.log(req.query.keyword)
  const keyword=req.query.keyword
  const search=resli.filter(a=>{
    return a.name.toLowerCase().includes(keyword.toLowerCase()) 
    || a.name_en.toLowerCase().includes(keyword.toLowerCase())
  })
  
  res.render('index',{resli:search,keyword})

})

app.listen(port,()=>{
    console.log('express gogo')
})
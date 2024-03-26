const express = require('express')
const mongoose = require('mongoose')
const Article = require('./model/article')
const articlesRouter = require("./routes/articles")
const dotenv = require("dotenv");
const methodOverride = require('method-override');
const app = express();

dotenv.config();

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.y7xww5v.mongodb.net/BlogData`, {
  useNewUrlParser:true,
  useUnifiedTopology:true,
})

app.set('view engine','ejs');
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:false}))
app.get('/', async(req,res)=>{

  const articles = await Article.find().sort({createdAt:'desc'});

  res.render('articles/index',{articles:articles});
})

app.use('/articles',articlesRouter)

app.listen(3000)
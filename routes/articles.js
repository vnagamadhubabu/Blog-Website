const express = require('express')
const router = express.Router()
const Article = require('../model/article')

router.get('/new',(req,res)=>{
  res.render('articles/new',{article: new Article()})
})
router.get('/edit/:id', async (req,res)=>{
  const article = await Article.findById(req.params.id)
  console.log(article)
  res.render('articles/edit',{article: article})
})
router.delete('/:id', async (req,res)=>{
  await Article.findByIdAndDelete(req.params.id);
  res.redirect('/')
})

router.put('/:id', async (req, res) => {
  let article;
  try {
    article = await Article.findById(req.params.id);
    article.title = req.body.title;
    article.description = req.body.description;
    article.markdown = req.body.markdown;
    article.createdAt = req.body.createdAt;
    article = await article.save();
    res.redirect(`/articles/${article.slug}`);
  } catch (err) {
    console.error(err); 
  }
});

router.get('/:slug', async (req, res) => {
  const article = await Article.findOne({slug: req.params.slug})
  if (article == null) res.redirect('/')
  res.render('articles/show', { article: article })

})

router.post('/', async(req,res)=>{
  let article = new Article({
    title:req.body.title,
    description:req.body.description,
    markdown:req.body.markdown,
    createdAt:req.body.createdAt
  })
  try{
    article = await article.save();
    res.redirect(`/articles/${article.slug}`);
  }catch(e){
    res.render('articles/new',{article:article})
  }
})

module.exports = router
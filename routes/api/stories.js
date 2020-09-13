const express= require('express');
const router= express.Router();
const Story = require('../../models/Story')

router.post('/all',async (req,res)=>{
    try{
        stories = await Story.find().sort({ date: 'desc' }).exec()
      }catch { stories = {}}
      res.send(stories);
});

router.post('/new', (req,res)=>{
    const newStory=new Story({
        title:req.body.title,
        createdby:req.body.createdby,
        post:req.body.post
    });
    console.log(newStory);
    newStory
		.save()
		.then(res.send('Post Created'))
		    .catch(err =>console.log(err))
});

router.post('/read/:id',async (req,res)=>{
    Story.findById(req.params.id)    
        .then( post => res.send(post))
});

router.put('/readby',async (req,res)=>{
    let st    
    st = await Story.findById(req.body.post)
    st.readby.addToSet(req.body.user)
    var count = st.readby.length
    await st.save();
    res.json({read:count})
});

router.put('/addreader', async (req,res)=>{
    let st    
    st = await Story.findById(req.body.post)
    console.log('user'+req.body.user)
    st.currentreader.addToSet(req.body.user)
    var current= st.currentreader.length
    const people=st.currentreader
    await st.save();
    res.json({currentreader:current, people:people})
});
router.put('/remreader', async (req,res)=>{
    let st    
    st = await Story.findById(req.body.post)
    st.currentreader.pull(req.body.user)
    var current= st.currentreader.length
    const people=st.currentreader
    await st.save();
    res.json({currentreader:current,people:people})
});
module.exports=router;
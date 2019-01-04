const express = require('express')
const router = express.Router()

//Item Model
const Item = require('../../models/Item');

//@route GET api/items
//@description Get All Items
//@access public
// / - represents the endpoint /api/items, see server.js 
router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items))
})
//@route POST api/items
//@description Create an Item
//@access public
router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name
    })
    newItem.save().then(item => res.json(item))
})
//@route DELETE api/items
//@description Delete an Item by Id
//@access public
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json("item deleted")))
        .catch(error => res.status(404).json("item not deleted"))

})



module.exports = router;
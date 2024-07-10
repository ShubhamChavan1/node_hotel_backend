const express = require('express');

const router = express.Router();

const menu = require('./../models/menu');

router.post('/', async (req, res) => {

     try {
          const data = req.body;
          const newMenu = new menu(data);
          const respnose = await newMenu.save();
          console.log("menu data is saved");
          res.status(200).json(respnose);
     } catch (error) {
          console.log(error);
          res.status(500).json({ error: 'internal server error' });
     }
})

router.get('/', async (req, res) => {
     try {

          const data = await menu.find();
          console.log("data is fetched")
          res.status(200).json(data)

     } catch (error) {

          res.status(500).json({ error: "internal server error" })

     }
})


router.get('/:tasteType', async (req, res) => {
     try {
          const tasteType = req.params.tasteType;
          if (tasteType == 'spicy' || tasteType == 'salty' || tasteType == 'sweet') {
               const response = await menu.find({ taste: tasteType });
               console.log("data is fetched");
               res.status(200).json(response);
          }
     } catch (error) {
          res.status(404).json({ error: "no such dish of this Taste Type" })
     }
})

router.put('/:id', async (req, res) => {
     try {
          const menu_ID = req.params.id;
          const updatedMenu = req.body;

          const response = await menu.findByIdAndUpdate(menu_ID, updatedMenu, {
               new: true,
               runValidators: true
          })

          if (!response) {
               return res.status(404).json({ error: "item not found" });
          }

          console.log("data is updated");
          res.status(200).json(response);

     } catch (error) {
          res.status(500).json({ error: "internal server error" });
     }
})


router.delete('/:id', async (req, res) => {
     try {
          const menu_ID = req.params.id;

          const respnose = await menu.findByIdAndDelete(menu_ID);

          console.log("data deleted");

          if (!respnose) {
               return res.status(404).json({ error: "person not found" });
          }
          res.status(200).json({ message: 'data  deleted succesfully' });
     } catch (error) {
          res.status(500).json({ error: "internal server error" })
     }
})




module.exports = router
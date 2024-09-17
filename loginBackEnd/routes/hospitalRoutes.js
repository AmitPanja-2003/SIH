const express = require("express");
const router = express.Router();
const Hospital = require("../models/hospital"); // Import the Hospital model

// // POST route for hospital login
router.post("/hospitalLogin", async (req, res) => {
    const { hospitalID, password } = req.body;

    try {
        const hospital = await Hospital.findOne({ hospitalID });

        if (!hospital) {
            return res.status(404).json({ success: false, message: "Hospital not found" });
        }

        if (hospital.hospitalPassword === password) {
            return res.status(200).json({ success: true, hospitalName: hospital.hospitalName });
        } else {
            return res.status(401).json({ success: false, message: "Incorrect password" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Error logging in" });
    }
});


// const Inventory = require("../models/inventry");

// // POST request to add or update hospital inventory
// // router.post("/addinventory", async (req, res) => {
// //     console.log(req.body)
// //     const { hospitalID, products } = req.body;

// //     try {
// //         const hospital = await Hospital.findOne({ hospitalID });
// //         console.log(hospital);
// //         products.forEach(product => {
// //             const existingItem = hospital.inventory.find(item => item.name === product.name);
// //             if (existingItem) {
// //                 existingItem.quantity += product.quantity;
// //             } else {
// //                 hospital.inventory.push(product);
// //             }
// //         });

// //         console.log("Updated inventory:", hospital.inventory);
// //         console.log("hii - 1");

// //         await hospital.save();

// //         console.log("hii");
// //         res.status(200).json({message:"sucessfull"});
// //         console.log("hello");
        
// //            // await Hospital.updateOne({hospitalID:hospitalID},{$set:{inventory:products}})
         
// //     } catch (error) {
// //         res.status(400).json({ message: error.message });
// //     }
// // });
// router.post("/addinventory", async (req, res) => {
//     const { hospitalID, products } = req.body;
  
//     try {
//       // Find the hospital by its ID
//       const hospital = await Hospital.findOne({ hospitalID });
  
//       if (!hospital) {
//         return res.status(404).json({ message: "Hospital not found" });
//       }
  
//       const product = products;
  
//       // Check if the product already exists in inventory
//       const existingProduct = hospital.inventory.find(
//         (item) => item.name === product.productName
//       );
  
//       if (existingProduct) {
//         // Update quantity if product exists
//         existingProduct.quantity += product.productQuantity;
//       } else {
//         // Add new product to inventory
//         hospital.inventory.push({
//           type: product.productType,
//           name: product.productName,
//           quantity: product.productQuantity,
//           price: product.price,
//           expiredDate: product.expiryDate,
//           inDate: product.inDate,
//         });
//       }
  
//       // Save the updated hospital document
//       await hospital.save();
  
//       res.status(200).json({ message: "Inventory updated successfully!" });
//     } catch (error) {
//       console.error("Error updating inventory:", error);
//       res.status(500).json({ message: "Internal Server Error" });
//     }
//   });
  







// // GET route to fetch inventory by hospital ID
// router.get("/:hospitalID", async (req, res) => {
//     const { hospitalID } = req.params;
//     try {
//         const inventory = await Inventory.findOne({ hospitalID });
//         if (!inventory) {
//             return res.status(404).json({ message: "Hospital not found" });
//         }
//         res.status(200).json(inventory);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });

// // Search route for product
// router.get("/searchProduct", async (req, res) => {
//     const { productName } = req.query;

//     try {
//         const hospitals = await Inventory.find({
//             "products.productName": { $regex: new RegExp(productName, "i") },
//         });

//         if (!hospitals.length) {
//             return res.status(404).json({ message: "No hospitals found with this product" });
//         }

//         const results = hospitals.flatMap((hospital) =>
//             hospital.products
//                 .filter((product) =>
//                     product.productName.toLowerCase().includes(productName.toLowerCase())
//                 )
//                 .map((product) => ({
//                     hospitalName: hospital.hospitalName,
//                     productName: product.productName,
//                     productType: product.productType,
//                     productQuantity: product.productQuantity,
//                     phoneNumber: hospital.phoneNumber,
//                 }))
//         );

//         res.status(200).json(results);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });


// module.exports = router;

router.post("/addinventory", async (req, res) => {
    const { inventoryData, hospitalID } = req.body;
  
    try {
      // Find the hospital by its hospitalID
      const hospital = await Hospital.findOne({ hospitalID });
  
      if (!hospital) {
        return res.status(404).json({ message: "Hospital not found" });
      }
  
      // Check if the product already exists in the inventory
      const existingProduct = hospital.inventory.find(
        (item) => item.name === inventoryData.name
      );
  
      if (existingProduct) {
        // Update quantity if product exists
        existingProduct.quantity += parseInt(inventoryData.quantity);
        existingProduct.price = parseFloat(inventoryData.price); // You may want to update the price too
        existingProduct.expiredDate = new Date(inventoryData.expiredDate);
      } else {
        // Add new product to inventory if it doesn't exist
        hospital.inventory.push({
          type: inventoryData.type,
          name: inventoryData.name,
          quantity: parseInt(inventoryData.quantity),
          inDate: new Date(Date.now()).toLocaleDateString("en-GB"),
          price: parseFloat(inventoryData.price),
          expiredDate: new Date(inventoryData.expiredDate),
        });
      }
  
      // Save updated hospital document
      await hospital.save();
      res.status(200).json({ message: "Inventory updated successfully!" });
    } catch (error) {
      console.error("Error updating inventory:", error);
      res.status(500).json({ message: "Internal server error" });
    }


    
  });  module.exports=router;
  

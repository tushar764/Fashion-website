const Feature=require("../../Models/Feature")


const addFeatureImage=async(req,res)=>{
    try {
        const {image}=req.body;
        const featuresImages=new Feature({
            image
        })
        await featuresImages.save();
        res.status(201).json({
            success:true,
            data:featuresImages
        })
        
    } catch (e) {
        console.log(e)
        res.status(500).json({
            success: false,
            message: "Error occurred",
        });
        
    }
}
const getFeatureImages=async(req,res)=>{
    try {
        
        const images=await Feature.find({})
        res.status(200).json({
            success:true,
            data:images
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            success: false,
            message: "Error occurred",
        });
        
    }
}
module.exports = {
  addFeatureImage,
  getFeatureImages,
};
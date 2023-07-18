const { User } = require("../../models/user")
const path = require("path")
const fs = require("fs/promises")
const Jimp = require("jimp");
const avatarsDir = path.join(__dirname, "../../", "public", "avatars") 

const updateAvatar = async (req, res, next) => {
    try {
        const { path: tempUpload, originalname } = req.file;
          
await Jimp.read(tempUpload)
  .then((lenna) => {
    return lenna
      .resize(250, 250)
      .write(tempUpload); // save
  })
  .catch((err) => {
    console.error(err);
  });
        const { _id } = req.user;
        const filename = `${_id}_${originalname}`;
        const resultUpload = path.join(avatarsDir, filename);
        await fs.rename(tempUpload, resultUpload);
        const avatarURL = path.join("avatars", filename);
        await User.findByIdAndUpdate(_id, { avatarURL });
        
        res.json(avatarURL);
    }  
    catch (error) {
       next(error)  
    }
}

module.exports = updateAvatar
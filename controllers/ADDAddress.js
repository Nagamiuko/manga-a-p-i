import ADDAddress from "../models/UserAddress.js";

export const UserAddress = async (req, res, next) => {
  const {
    naddress,
    tels,
    uaddress,
    dit,
    dits,
    provin,
    postalcode,
    typeAddres,
  } = req.body;
  // userId
  //  const naddress = req.body.usernameaddres
  //  const tels = req.body.usertel
  //  const uaddress = req.body.useraddress
  //  const dit = req.body.userdit
  //  const dits = req.body.userdits
  //  const provin = req.body.userprovin
  //  const postalcode = req.body.userpostalcode
  const userId = req.params.userid;

  console.log(naddress);
  console.log(tels);
  console.log(uaddress);
  console.log(dit);
  console.log(dits);
  console.log(provin);
  console.log(postalcode);
  console.log(userId);
  console.log(typeAddres);

  try {
    const saveAddress = await ADDAddress.create({
      nameaddress: naddress,
      tel: tels,
      address: uaddress,
      distrct: dit,
      dists: dits,
      province: provin,
      postalcode: postalcode,
      typeAddress: typeAddres,
      mangauser: userId,
    });
    const save = await saveAddress.save();
    res.status(200).json(save);
    //   res.send({succeess:true ,msg:"Add Address Successfully !"})
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
    next(err);
  }
};
export const UserAddAndUpAddress = async (req, res, next) => {
  const {
    naddress,
    tels,
    uaddress,
    dit,
    dits,
    provin,
    postalcode,
    typeAddres,
  } = req.body;
  const userId = req.params.userid;
  try {
    const data = {
      nameaddress: naddress,
      tel: tels,
      address: uaddress,
      distrct: dit,
      dists: dits,
      province: provin,
      postalcode: postalcode,
      typeAddress: typeAddres,
      mangauser: userId,
    };
    var user = await ADDAddress.findOneAndUpdate(
      { mangauser: userId },
      { new: true }
    );
    if (user) {
      console.log("user updata");
    } else {
      user = new ADDAddress(data);
      await user.save();
      console.log("new user ");
    }
    res.status(200).json(user);
    //   res.send({succeess:true ,msg:"Add Address Successfully !"})
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
    next(err);
  }
};
export const UserUpdataAddress = async (req, res, next) => {
  const {
    naddress,
    tels,
    uaddress,
    dit,
    dits,
    provin,
    postalcode,
    typeAddres,
  } = req.body;
  // userId
  //  const naddress = req.body.usernameaddres
  //  const tels = req.body.usertel
  //  const uaddress = req.body.useraddress
  //  const dit = req.body.userdit
  //  const dits = req.body.userdits
  //  const provin = req.body.userprovin
  //  const postalcode = req.body.userpostalcode
  const adreid = req.params.adreid;

  console.log(naddress);
  console.log(tels);
  console.log(uaddress);
  console.log(dit);
  console.log(dits);
  console.log(provin);
  console.log(postalcode);
  console.log(adreid);

  try {
    const saveUpdataAddress = await ADDAddress.findByIdAndUpdate(
      adreid,
      {
        $set: {
          nameaddress: naddress,
          tel: tels,
          address: uaddress,
          distrct: dit,
          dists: dits,
          province: provin,
          postalcode: postalcode,
          typeAddress: typeAddres,
        },
      },
      { new: true }
    );
    //   const save = await saveAddress.save()
    res.status(200).json(saveUpdataAddress);
    //   res.send({succeess:true ,msg:"Add Address Successfully !"})
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
    next(err);
  }
};

export const allAddress = async (req, res, next) => {
  const userId = req.params.userid;
  try {
    const alladdressuser = await ADDAddress.find({
      mangauser: userId,
    }).populate("mangauser");
    res.status(200).json(alladdressuser);
  } catch (err) {
    next(err);
  }
};
export const OneAddress = async (req, res, next) => {
  const addresId = req.params.adreid;
  try {
    const alladdressuser = await ADDAddress.findById(addresId).populate(
      "mangauser"
    );
    res.status(200).json(alladdressuser);
  } catch (err) {
    next(err);
  }
};
export const DeletAddress = async (req, res, next) => {
  const addresId = req.params.adreid;
  try {
    const alladdressuser = await ADDAddress.findByIdAndDelete(
      addresId
    ).populate("mangauser");
    res.status(200).json("Delete Succesfully ('-')");
  } catch (err) {
    next(err);
  }
};

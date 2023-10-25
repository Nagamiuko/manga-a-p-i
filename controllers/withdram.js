import NodeMail from "nodemailer";
import Withdram from "../models/Withdraw.js";
export const CreateWithdram = async (req, res, next) => {
  const {
    shopId,
    moneyTotal,
    bankHolderName,
    bankName,
    mailShop,
    bankAddress,
    bankAccountId,
  } = req.body;
  let mailAdnim = "puttisan.7353@gmail.com";
  try {
    const transporter = NodeMail.createTransport({
      service: "gmail",
      auth: {
        user: "puttisan.7353@gmail.com",
        pass: "xxnbfrwwxiplcuwj",
      },
    });
    let mailAdmin = {
      from: `${mailShop}`,
      to: `${mailAdnim}`,
      subject: `แจ้งถอนเงินจากลูกค้าโปรดตรวจสอบรายการของร้านค้าผู้ขาย`,
      html: `<b>มีจำนวนเงินทั้งสิน ${moneyTotal} บาท จากรายการแจ้งถอนเงินจากหมายเลขร้านค้า ${shopId} โปรดตรวจสอบความถูกต้อง และ จำนวนเงินจากรายการขายของร้านค้าผู้ขาย</b>,<br/>
      <b>รายละเอียด</b><br/>
      <p>ธนาคาร: ${bankName}</p>
      <p>ธนาคารสาขา: ${bankAddress}</p>
      <p>หมายเลขบัญชีธนาคาร: ${bankAccountId}</p>
      <p>ชื่อผู้รับเงิน: ${bankHolderName}</p>
      `,
    };

    let mailSeller = {
      from: '"CommicBook Novels" <puttisan.7353@gmail.com>',
      to: `${mailShop}`,
      subject: `สวัดดีคุณ ${bankHolderName} คุณได้มีการแจ้งถอดเงินผ่านแพลตฟอร์มของเราโปรดตรวจสอบความถูกต้อง`,
      html: `
      <b>เป็นจำนวนเงินทั้งสิน ${moneyTotal} บาท ถ้าคุณไม่ได้แจ้งถอดเงินโปรดติดต่อเรา ได้ที่ : puttisan.7353@gmail.com </b><br/>
      <b>รายละเอียดการแจ้งถอดเงิน</b>
      <p>ธนาคาร: ${bankName}</p>
      <p>ธนาคารสาขา: ${bankAddress}</p>
      <p>หมายเลขบัญชีธนาคาร: ${bankAccountId}</p>
      <p>ชื่อผู้รับเงิน: ${bankHolderName}</p>
      `,
    };
    transporter.sendMail(mailAdmin, function (err, info) {
      if (err) console.log(err);
      else console.log(info);
    });
    transporter.sendMail(mailSeller, function (err, info) {
      if (err) console.log(err);
      else console.log(info);
    });
    try {
      const required = Withdram.create({
        shopId,
        moneyTotal,
        bankHolderName,
        bankName,
        mailShop,
        bankAddress,
        bankAccountId,
      });
      const save = await required.save();
      res.status(200).json(save);
    } catch (err) {
      console.log(err);
    }
    res.status(201).json({ message: "sendMail Successfully!" });
  } catch (err) {
    console.log(err);
  }
};

export const AdminCheckShopWihtdram = async (req, res) => {
  try {
    const serachWithdram = await Withdram.find();
    res.status(201).json({ success: true, serachWithdram });
  } catch (err) {
    console.log(err);
  }
};

export const UserAllWihtdram = async (req, res) => {
  const userId = req.params.userid;
  try {
    const userWithdram = await Withdram.find({ shopId: userId });
    res.status(201).json({ success: true, userWithdram });
  } catch (err) {
    console.log(err);
  }
};

export const DeleteWihtdram = async (req, res) => {
  const Wid = req.params.wid;
  try {
    const DeleteWithdram = await Withdram.findByIdAndDelete(Wid);
    res.status(201).json({ success: true, DeleteWithdram });
  } catch (err) {
    console.log(err);
  }
};

export const DetailWihtdram = async (req, res) => {
  const Wid = req.params.wid;
  try {
    const DetailWithdram = await Withdram.findById(Wid);
    res.status(201).json({ success: true, DetailWithdram });
  } catch (err) {
    console.log(err);
  }
};

export const AdminUpdateStatusWihtdram = async (req, res) => {
  const { status } = req.body;
  let Wid = req.params.wid;
  try {
    const DetailWithdram = await Withdram.findById(Wid);
    const transporter = NodeMail.createTransport({
      service: "gmail",
      auth: {
        user: "puttisan.7353@gmail.com",
        pass: "xxnbfrwwxiplcuwj",
      },
    });
    let mailSeller = {
      from: '"CommicBook Novels" <puttisan.7353@gmail.com>',
      to: `${DetailWithdram.mailShop}`,
      subject: `สวัดดีคุณ ${DetailWithdram.bankHolderName} คุณได้รับการอนุมัติถอนเงินผ่านแพลตฟอร์มของเราเรียบร้อยแล้วโปรดรอเวลาทำการ 1 - 3 วัน  `,
      html: `
      <h2>ถ้าหากคุณมีปัญหาสามารถติดต่อได้ที่ : puttisan.7353@gmail.com </h2>
      <b>จำนวนเงินทั้งสิน ${DetailWithdram.moneyTotal} บาท </b><br/>
      <b>รายละเอียดการแจ้งถอดเงิน</b>
      <p>ธนาคาร: ${DetailWithdram.bankName}</p>
      <p>ธนาคารสาขา: ${DetailWithdram.bankAddress}</p>
      <p>หมายเลขบัญชีธนาคาร: ${DetailWithdram.bankAccountId}</p>
      <p>ชื่อผู้รับเงิน: ${DetailWithdram.bankHolderName}</p>
      <p>ขอบคุณที่ใช้บริการของเรา</p>
      `,
    };
    transporter.sendMail(mailSeller, function (err, info) {
      if (err) console.log(err);
      else console.log(info);
    });
    const updatehWithdram = await Withdram.findByIdAndUpdate(
      Wid,
      {
        $set: {
          status: status,
        },
      },
      { $new: true }
    );
    res.status(201).json({ success: true, updatehWithdram });
  } catch (err) {
    console.log(err);
  }
};

// export const sendMail = async (req, res, next) => {
//   const {
//     shopId,
//     moneyTotal,
//     bankHolderName,
//     bankName,
//     mailShop,
//     bankAddress,
//     bankAccountId,
//   } = req.body;
//   let mailAdnim = "puttisan.7353@gmail.com";
//   try {
//     const transporter = NodeMail.createTransport({
//       service: "gmail",
//       auth: {
//         user: `${mailAdnim}`,
//         pass: "xxnbfrwwxiplcuwj",
//       },
//     });

//     let mailAdmin = {
//       from: '"CommicBook Novels" <puttisan.7353@gmail.com>',
//       to: `puttisan.7353@gmail.com`,
//       subject: `แจ้งถอนเงินจากลูกค้าโปรดตรวจสอบรายการของร้านค้าผู้ขาย`,
//       html: `<!DOCTYPE html>
//       <html lang="en">
//         <head>
//           <meta charset="UTF-8" />
//           <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//         </head>
//         <body>
//           <div style="max-width: 800px; margin: 0 auto; ">
//             <div style="border: 1px solid #ddd;">
//               <div style="display: flex; flex-direction: row;">
//                 <div style="margin-top: 1.rem; width: 100%; display: flex; justify-content: center; align-items: center;">
//                   <div style="max-width: 400px; overflow: hidden;">
//                     <img
//                       src="https://res.cloudinary.com/dz4xrddoy/image/upload/v1694258055/Screenshot_2566-09-09_at_18.11.11_aedfvb.png"
//                       alt=""
//                       style="width: 100%;"
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div style="display: flex; flex-direction: row;">
//                 <div style="padding: 1.5rem;display: flex; align-items: center;">
//                   <h3>ขอบคุณที่ช้อปปิ้งกับ</h3>
//                   <p style="color: #00c3ffdd; font-size: 20px; margin-left: 10px;">ComicBook Novels</p>
//                 </div>
//               </div>
//               <div style="display: flex; flex-direction: row;">
//                 <div style="width: 100%; padding:1.75rem; margin-top: -2rem;">
//                   <h3>
//                     เราได้รับคำสั่งซื้อหมายเลข MQC1EHB22476415 จากคุณแล้ว
//                     ทางเราจะแจ้งร้านค้าให้จัดส่งสินค้าให้กับคุณโดยเร็วที่สุด
//                   </h3>
//                 </div>
//               </div>
//               <div style="border: 1px solid #ddd; width: 90%; margin: 0 auto;"></div>
//               <div style="display: flex; flex-direction: row;">
//                 <div style="width: 100%; padding:1.75rem; top: -1.5rem;">
//                   <h3>รายการสั่งชื้อ</h3>
//                   <div style="display: flex; justify-content: space-between; width: 100%; margin-top: 15px;">
//                     <p>รหัสสั่งชื้อ# MQC1EHB22476415</p>
//                     <p>ขายโดย: ComicBook Novels</p>
//                   </div>
//                   <div style="display: flex; justify-content: space-between; width: 100%; margin-top: 15px;">
//                     <p>เกิดใหม่ทั้งทีก็เป็นสไลม์ไปซะแล้ว 19 (อีบุ๊ค) x 1 </p>
//                     <p> ราคา 55.00 บาท</p>
//                   </div>
//                   <div style="display: flex; justify-content: space-between; width: 100%;">
//                     <p>การจัดส่ง ไม่มีค่าจัดส่ง </p>
//                     <p> ราคา 0.00 บาท</p>
//                   </div>
//                   <div style="display: flex; justify-content: space-between; width: 100%; margin-top: 15px;">
//                     <p>รวม </p>
//                     <p>ราคา 55.00 บาท</p>
//                   </div>
//                   <div style="display: flex; justify-content: space-between; width: 100%; margin-top: 25px;">
//                     <p>รวมทั้งหมด </p>
//                     <p>ราคา 55.00 บาท</p>
//                   </div>
//                 </div>
//               </div>
//               <div style="border: 1px solid #ddd; width: 90%; margin: 0 auto;"></div>
//               <div style="display: flex; flex-direction: row;">
//                 <div style="display: flex; flex-direction: column; padding: 2rem;">
//                   <h3>รายละเอียดการชำระเงิน </h3>
//                   <div style="display: flex; flex-direction: column;">
//                     <p style="margin-top:10px; margin-bottom: 10px;">
//                      สแกนจ่าย/Thai QR/PromptPay
//                     </p>
//                     <p>2022-08-15 05:12:48</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </body>
//       </html>
//       `,
//     };

//     let mailSeller = {
//       from: '"CommicBook Novels" <puttisan.7353@gmail.com>',
//       to: `${mailShop}`,
//       subject: `สวัดดีคุณ ${bankHolderName} คุณได้มีการแจ้งถอดเงินผ่านแพลตฟอร์มของเราโปรดตรวจสอบความถูกต้อง`,
//       html: `
//       <b>เป็นจำนวนเงินทั้งสิน ${moneyTotal} บาท ถ้าคุณไม่ได้แจ้งถอดเงินโปรดติดต่อเรา ได้ที่ : puttisan.7353@gmail.com </b><br/>
//       <b>รายละเอียดการแจ้งถอดเงิน</b>
//       <p>ธนาคาร: ${bankName}</p>
//       <p>ธนาคารสาขา: ${bankAddress}</p>
//       <p>หมายเลขบัญชีธนาคาร: ${bankAccountId}</p>
//       <p>ชื่อผู้รับเงิน: ${bankHolderName}</p>
//       `,
//     };
//     transporter.sendMail(mailAdmin, function (err, info) {
//       if (err) console.log(err);
//       else console.log(info);
//     });
//     transporter.sendMail(mailSeller, function (err, info) {
//       if (err) console.log(err);
//       else console.log(info);
//     });

//     res.status(201).json({ message: "sendMail Successfully!" });
//   } catch (err) {
//     console.log(err);
//   }
// };

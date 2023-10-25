import Order from "../models/Order.js";
import NodeMail from "nodemailer";
import User from "../models/UserModels.js";

export const createOrderProduct = async (req, res, next) => {
  const { cart, shippingAddress, user, totalPrice, status, paymentInfo ,informationPayment} =
    req.body;
  try {
    const transporter = NodeMail.createTransport({
      service: "gmail",
      auth: {
        user: "puttisan.7353@gmail.com",
        pass: "xxnbfrwwxiplcuwj",
      },
    });
    // const shopItemMap = new Map();
    // for (const item of cart) {
    //   const shopId = item.shopId;
    //   if (!shopItemMap.has(shopId)) {
    //     shopItemMap.set(shopId, []);
    //   }
    //   shopItemMap.get(shopId).push(item);
    //   console.log("Id:", shopId, "Email:", item.mangauser.email);
    //   meil = item
    //   console.log(meil);
    // }
    const orders = [];
      const order = await Order.create({
        cart,
        shippingAddress,
        user,
        totalPrice,
        paymentInfo,
        status,
      });
      orders.push(order);
      let mailUser = {
        from: '"CommicBook Novels" <puttisan.7353@gmail.com>',
        to: `${informationPayment.email}`,
        subject: `สวัดดีคุณ ${informationPayment.name} ยืนยันคำสั่งซื้อหมายเลข ${order._id} แพลตฟอร์มของเราโปรดตรวจสอบ`,
        html: `
        <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body>
          <div style="max-width: 800px; margin: 0 auto; ">
            <div style="border: 1px solid #ddd;">
              <div style="display: flex; flex-direction: row;">
                <div style="margin-top: 1.rem; width: 100%; display: flex; justify-content: center; align-items: center;">
                  <div style="max-width: 400px; overflow: hidden;">
                    <img
                      src="https://res.cloudinary.com/dz4xrddoy/image/upload/v1694258055/Screenshot_2566-09-09_at_18.11.11_aedfvb.png"
                      alt=""
                      style="width: 100%;"
                    />
                  </div>
                </div>
              </div>
              <div style="display: flex; flex-direction: row;">
                <div style="padding: 1.5rem;display: flex; align-items: center;">
                  <h3>ขอบคุณที่ช้อปปิ้งกับ</h3>
                  <p style="color: #00c3ffdd; font-size: 20px; margin-left: 10px;">ComicBook Novels</p>
                </div>
              </div>
              <div style="display: flex; flex-direction: row;">
                <div style="width: 100%; padding:1.75rem; margin-top: -2rem;">
                  <h3>
                    เราได้รับคำสั่งซื้อหมายเลข ${order._id} จากคุณแล้ว
                    ทางเราจะแจ้งร้านค้าให้จัดส่งสินค้าให้กับคุณโดยเร็วที่สุด
                  </h3>
                </div>
              </div>
              <div style="border: 1px solid #ddd; width: 90%; margin: 0 auto;"></div>
              <div style="display: flex; flex-direction: row;">
                <div style="width: 100%; padding:1.75rem; top: -1.5rem;">
                  <h3>รายการสั่งชื้อ</h3>
                  <div style="display: flex; justify-content: space-between; width: 100%; margin-top: 15px;">
                    <p>รหัสสั่งชื้อ# ${order._id}&nbsp;&nbsp;&nbsp;&nbsp;</p>
                    <p>ขายโดย: ComicBook Novels</p>
                  </div>
                  <div style="display: flex; justify-content: space-between; width: 100%; margin-top: 15px;">
                    <p>${cart.title} (อีบุ๊ค) x 1 &nbsp; &nbsp; &nbsp;</p>
                    <p> ราคา ${cart.price_of_free} บาท</p>
                  </div>
                  <div style="display: flex; justify-content: space-between; width: 100%;">
                    <p>การจัดส่ง ไม่มีค่าจัดส่ง &nbsp;&nbsp; </p>
                    <p> ราคา 0.00 บาท</p>
                  </div>
                  <div style="display: flex; justify-content: space-between; width: 100%; margin-top: 15px;">
                    <p>รวม &nbsp;&nbsp;</p>
                    <p>ราคา ${totalPrice} บาท</p>
                  </div>
                  <div style="display: flex; justify-content: space-between; width: 100%; margin-top: 25px;">
                    <p>รวมทั้งหมด&nbsp;&nbsp; </p>
                    <p>ราคา ${totalPrice} บาท</p>
                  </div>
                </div>
              </div>
              <div style="border: 1px solid #ddd; width: 90%; margin: 0 auto;"></div>
              <div style="display: flex; flex-direction: row;">
                <div style="display: flex; flex-direction: column; padding: 2rem;">
                  <h3>รายละเอียดการชำระเงิน &nbsp; &nbsp;</h3><br/>
                  <div style="display: flex; flex-direction: column;">
                  <p style="margin-top:10px; margin-bottom: 10px;">
                  <p> ชำโดย: ${paymentInfo.type}&nbsp;&nbsp;&nbsp;</p> 
                 </p><br/>
                 <p>วันที่ชำระเงิน: ${order.paidAt}&nbsp;&nbsp;</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>      
      `,
      };
      let mailOrder = {
        from: '"CommicBook Novels" <puttisan.7353@gmail.com>',
        to: `${cart.mangauser.email}`,
        subject: `สวัดดีคุณ ${cart.mangauser.fullname} มีรายการคำสั่งชื้อผ่านแพลตฟอร์มของเราโปรดตรวจสอบ`,
        html: `
        <b>มีรายการสั่งชื้อจากคุณ ${user.fullname} มีรายการที่สั่งชื้อดังนี้ </b><br/>
        <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body>
          <div style="max-width: 800px; margin: 0 auto; ">
            <div style="border: 1px solid #ddd;">
              <div style="display: flex; flex-direction: row;">
                <div style="margin-top: 1.rem; width: 100%; display: flex; justify-content: center; align-items: center;">
                  <div style="max-width: 400px; overflow: hidden;">
                    <img
                      src="https://res.cloudinary.com/dz4xrddoy/image/upload/v1694258055/Screenshot_2566-09-09_at_18.11.11_aedfvb.png"
                      alt=""
                      style="width: 100%;"
                    />
                  </div>
                </div>
              </div>
              <div style="display: flex; flex-direction: row;">
                <div style="padding: 1.5rem;display: flex; align-items: center;">
                  <h3>มีรายการสั่งชื้อจากคุณ ${user.fullname} มีรายการที่สั่งชื้อดังนี้</h3>
                </div>
              </div>
              <div style="display: flex; flex-direction: row;">
                <div style="width: 100%; padding:1.75rem; margin-top: -2rem;">
                  <h3>
                    หมายเลขคำสั่งซื้อ ${order._id} ของลูกค้า
                  </h3>
                </div>
              </div>
              <div style="border: 1px solid #ddd; width: 90%; margin: 0 auto;"></div>
              <div style="display: flex; flex-direction: row;">
                <div style="width: 100%; padding:1.75rem; top: -1.5rem;">
                  <h3>รายการสั่งชื้อ</h3>
                  <div style="display: flex; justify-content: space-between; width: 100%; margin-top: 15px;">
                    <p>รหัสสั่งชื้อ# ${order._id}&nbsp;&nbsp;&nbsp;&nbsp;</p>
                    <p>ขายโดย: ComicBook Novels</p>
                  </div>
                  <div style="display: flex; justify-content: space-between; width: 100%; margin-top: 15px;">
                    <p>${cart.title} (อีบุ๊ค) x 1 &nbsp;&nbsp;&nbsp;</p>
                    <p> ราคา ${cart.price_of_free} บาท</p>
                  </div>
                  <div style="display: flex; justify-content: space-between; width: 100%;">
                    <p>การจัดส่ง ไม่มีค่าจัดส่ง&nbsp;&nbsp; </p>
                    <p> ราคา 0.00 บาท</p>
                  </div>
                  <div style="display: flex; justify-content: space-between; width: 100%; margin-top: 15px;">
                    <p>รวม &nbsp;&nbsp;</p>
                    <p>ราคา ${totalPrice} บาท</p>
                  </div>
                  <div style="display: flex; justify-content: space-between; width: 100%; margin-top: 25px;">
                    <p>รวมทั้งหมด &nbsp;&nbsp; </p>
                    <p>ราคา ${totalPrice} บาท</p>
                  </div>
                </div>
              </div>
              <div style="border: 1px solid #ddd; width: 90%; margin: 0 auto;"></div>
              <div style="display: flex; flex-direction: row;">
              <div style="display: flex; flex-direction: column; padding: 2rem;">
              <h3>รายละเอียดการชำระเงิน &nbsp; &nbsp;</h3><br/>
              <div style="display: flex; flex-direction: column;">
                <p style="margin-top:10px; margin-bottom: 10px;">
                 <p> ชำโดย: ${paymentInfo.type}&nbsp;&nbsp;&nbsp;</p> 
                </p><br/>
                <p>วันที่ชำระเงิน: ${order.paidAt}&nbsp;&nbsp;</p>
              </div>
            </div>
              </div>
            </div>
          </div>
        </body>
      </html>      
        `,
      };
      transporter.sendMail(mailOrder, function (err, info) {
        if (err) console.log(err);
        else console.log(info);
      });
      transporter.sendMail(mailUser, function (err, info) {
        if (err) console.log(err);
        else console.log(info);
      });
      res.status(201).json({
        success: true,
        orders,
      });
  } catch (err) {
    next(err.message, 500);
    console.log(err);
  }
};
export const getOrderUser = async (req, res, next) => {
  const userID = req.params.userid;
  try {
    const orders = await Order.find({ "user._id": userID });
    res.status(200).json({ success: true, orders });
  } catch (err) {
    console.log(err);
  }
};
export const getOrderShop = async (req, res, next) => {
  const shopID = req.params.shopid;
  try {
    const orders = await Order.find({ "cart.shopId": shopID });
    res.status(200).json({ success: true, orders });
  } catch (err) {
    console.log(err);
  }
};
export const getOrderOneBookAllShop = async (req, res, next) => {
  const bookId = req.params.bookid;
  try {
    const orders = await Order.find({ "cart._id": bookId });
    res.status(200).json({ success: true, orders });
  } catch (err) {
    console.log(err);
  }
};
export const getOrderOneUser = async (req, res, next) => {
  const orderuserID = req.params.orderid;
  try {
    const orders = await Order.findById(orderuserID);
    res.status(200).json({ success: true, orders });
  } catch (err) {
    console.log(err);
  }
};

export const getReceiptId = async (req, res, next) => {
  const receiptId = req.params.receiptId;
  try {
    const receiptDetail = await Order.findById(receiptId);
    res.status(200).json({ success: true, receiptDetail });
  } catch (err) {
    console.log(err);
  }
};

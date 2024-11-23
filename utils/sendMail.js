import NodeMail from "nodemailer";
import jwt from "jsonwebtoken";
import dot from "dotenv";

dot.config();

export const sendMailActivateUser = async (data) => {
  try {
    const byPassd = jwt.sign(
      {
        userId: data.userId,
        email: data.email,
        fullname: data.fullname,
        username: data.username,
        password: data.password,
      },
      process.env.JWT
    );

    const transporter = NodeMail.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_VERIFY,
        pass: process.env.PASS_MAIL,
      },
    });
    let activate = {
      from: `"CommicBook Novels" <${process.env.MAIL_VERIFY}>`,
      to: `${data.email}`,
      subject: `การดำเนินการที่จำเป็นเพื่อเปิดใช้งานการเป็นสมาชิกสำหรับคุณ ${data.fullname}`,
      html: `
      สวัสดีคุณ ${data.fullname} <br />
      ขอขอบคุณที่ลงทะเบียนกับ <p> Commic Books Novels </p> สามารถเปิดใช้งานบัญชีของคุณได้ <br />
      ต้องดำเนินการขั้นตอนสุดท้ายเพื่อให้การลงทะเบียนของคุณเสร็จสมบูรณ์ <br />
      โปรดทราบ - คุณต้องดำเนินการตามขั้นตอนสุดท้ายนี้เพื่อเป็นสมาชิก คุณจะต้องไปที่ URL นี้เพียงครั้งเดียวเพื่อเปิดใช้งานบัญชีของคุณ <br />
      หากต้องการลงทะเบียนให้เสร็จสมบูรณ์ กรุณาเข้าไปที่ URL นี้ http://localhost:4002/registration/activateUser?token=${data.userId} <br />

     <p>**** โปรดอย่าเว้นวรรคและมีช่องว่าง **** </p><br />
     คุณจะต้องพิมพ์หมายเลขเปิดใช้งานในช่องที่ปรากฏขึ้นบนหน้าเว็บ <br />
     รหัสการเปิดใช้งานของคุณคือ: <p style="color:'#ff0040dd'">${byPassd}</p>
            `,
    };
    transporter.sendMail(activate, function (err, info) {
      if (err) console.log(err);
      else console.log(info);
    });
  } catch (error) {
    console.log(error);
  }
};

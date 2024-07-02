import nodemailer from "nodemailer";
import "dotenv/config";
let nombreEquipo = process.env.NOMBRE_EQUIPO;

const htmlContactanos = (nombre) => {
  let html = `
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 5px;">
        <h2 style="color: #333;">¡Gracias por contactarnos!</h2>
        <p>Estimado/a ${nombre},</p>
        <p>¡Gracias por contactarnos! Hemos recibido su mensaje y nos pondremos en contacto con usted lo antes posible.</p>
        <p>Si tiene alguna pregunta, necesita ayuda adicional o tiene alguna sugerencia, no dude en contactarnos nuevamente.</p>
        <p>¡Gracias por elegirnos!</p>
        <br>
        <p>Atentamente,</p>
        <p>${nombreEquipo}</p>
    </div>
`;
  return html;
};

const htmlRegistro = (nombre) => {
  let html = `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 5px;">
            <h2 style="color: #333;">¡Gracias por unirte a nuestro sistema de gestión de tareas!</h2>
            <p>Estimado/a ${nombre},</p>
            <p>¡Nos complace darle la bienvenida a nuestro sistema de gestión de tareas! Estamos emocionados de tenerlo/a a bordo.</p>
            <p>A partir de ahora, podrá disfrutar de todas las funcionalidades que ofrecemos para ayudarle a organizar y gestionar sus tareas de manera eficiente.</p>
            <p>No dude en explorar todas las características y no dude en contactarnos si tiene alguna pregunta, necesita ayuda o si tiene una sugerencia.</p>
            <p>¡Gracias nuevamente por unirse a nosotros!</p>
            <br>
            <p>Atentamente,</p>
            <p>${nombreEquipo}</p>
        </div>
    `;
  return html;
};

export class mailer {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "gestordetareas2024@gmail.com",
        pass: "hydc xomm etll hyno",
      },
    });
  }

  sendEmail(toEmail, subject, nombre, type) {
    if (type === "contactanos") {
      this.sendContactanos(toEmail, subject, nombre);
    } else {
      this.sendRegistro(toEmail, subject, nombre);
    }
  }

  sendContactanos(toEmail, subject, nombre) {
    const mailOptions = {
      from: "gestordetareas2024@gmail.com",
      to: toEmail,
      subject: subject,
      html: htmlContactanos(nombre),
    };

    this.transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Error al enviar el correo:", error);
      } else {
        console.log("Correo enviado:", info.response);
      }
    });
  }

  sendRegistro(toEmail, subject, nombre) {
    const mailOptions = {
      from: "gestordetareas2024@gmail.com",
      to: toEmail,
      subject: subject,
      html: htmlRegistro(nombre),
    };

    this.transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Error al enviar el correo:", error);
      } else {
        console.log("Correo enviado:", info.response);
      }
    });
  }
}

package com.example.rterserver.email.service;

import com.example.rterserver.email.dto.EmailRequest;
import com.example.rterserver.ngo.model.Ngo;
import com.example.rterserver.ngo.repository.NgoRepo;
import com.example.rterserver.user.model.User;
import com.example.rterserver.user.repository.UserRepo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import java.util.Properties;

@Service
public class EmailService {
    private final UserRepo userRepo;
    private final NgoRepo ngoRepo;

    @Value("${spring.mail.username}")
    private String username;
    @Value("${spring.mail.password}")
    private String password;

    public EmailService(UserRepo userRepo, NgoRepo ngoRepo) {
        this.userRepo = userRepo;
        this.ngoRepo = ngoRepo;
    }

    public void sendEmail(EmailRequest emailRequest) {
        // We extract the data from the request
        String bodyMessage = emailRequest.body();
        Long idUser = emailRequest.idUser();
        Long idNgo = emailRequest.idNgo();
        User user = userRepo.findById(idUser).orElseThrow(() -> new RuntimeException("User not found"));
        Ngo ngo = ngoRepo.findById(idNgo).orElseThrow(() -> new RuntimeException("Ngo not found"));

        // We add the _test suffix to the email address to avoid sending emails to real NGOs :)
        String to = ngo.getEmail() + "_test";

        Properties prop = new Properties();
        prop.put("mail.smtp.host", "smtp.gmail.com");
        prop.put("mail.smtp.port", "465");
        prop.put("mail.smtp.auth", "true");
        prop.put("mail.smtp.socketFactory.port", "465");
        prop.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");

        Session session = Session.getInstance(prop,
                new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(username, password);
                    }
                });

        try {

            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(username));
            message.setRecipients(
                    Message.RecipientType.TO,
                    InternetAddress.parse(to)
            );
            String subject = "New message from a user within our platform";
            message.setSubject(subject);

            // We are using a multipart message because we want to format the email as HTML.
            MimeMultipart multipart = new MimeMultipart();
            BodyPart htmlBodyPart = new MimeBodyPart();
            String htmlContent = "<html><body><p>Hello, <strong>" + ngo.getName() + "</strong>!</p>"
                    + "<p><strong>" + user.getName() + "</strong> has sent you a message:</p>"
                    + "<p>" + bodyMessage + "</p>"
                    + "<p>You can contact him at <a href='mailto:" + user.getEmail() + "'>" + user.getEmail() + "</a>.</p>"
                    + "<p>Have a nice day!<br>The RTER Team</p></body></html>";
            htmlBodyPart.setContent(htmlContent, "text/html; charset=utf-8");
            multipart.addBodyPart(htmlBodyPart);
            message.setContent(multipart);

            Transport.send(message);

        } catch (MessagingException e) {
            e.printStackTrace();
            throw new RuntimeException("Couldn't send the email.");
        }
    }
}

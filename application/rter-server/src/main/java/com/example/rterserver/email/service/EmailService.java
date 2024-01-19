package com.example.rterserver.email.service;

import com.example.rterserver.donation.model.Donation;
import com.example.rterserver.email.dto.EmailRequest;
import com.example.rterserver.enums.DonationType;
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

    public void sendDonationEmail(Donation emailRequest) {
        // Extract the data from the email request
        Long idUser = emailRequest.getIduser();
        User user = userRepo.findById(idUser).orElseThrow(() -> new RuntimeException("User not found"));
        Long idNgo = emailRequest.getIdngo();
        Ngo ngo = ngoRepo.findById(idNgo).orElseThrow(() -> new RuntimeException("Ngo not found"));
        DonationType donationType = emailRequest.getType();
        String deliveryDate = emailRequest.getCreatedat().toString().substring(0, 10);

        System.out.println(deliveryDate);
        // Add a prefix to the email address to avoid sending emails to real NGOs
        String to = "matei.otniel20@gmail.com";

        // Create a Properties object to store mail-related configuration settings
        Properties prop = new Properties();

        // Configure SMTP server settings for Gmail
        prop.put("mail.smtp.host", "smtp.gmail.com");
        prop.put("mail.smtp.port", "465");
        prop.put("mail.smtp.auth", "true");
        prop.put("mail.smtp.socketFactory.port", "465");
        prop.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");

        // Create a mail session with the specified properties and an Authenticator for username and password
        Session session = Session.getInstance(prop,
                new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(username, password);
                    }
                });

        try {
            // Create a MimeMessage for composing the email
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(username));
            message.setRecipients(
                    Message.RecipientType.TO,
                    InternetAddress.parse(to)
            );
            String subject = "New donation from a user within our platform";
            message.setSubject(subject);

            // We are using a multipart message because we want to format the email as HTML
            MimeMultipart multipart = new MimeMultipart();
            BodyPart htmlBodyPart = new MimeBodyPart();

            // Compose the HTML content of the email
            String htmlContent = "<html><body><p>Dear <strong>" + ngo.getName() + "</strong> Team,</p>"
                    + "<p>We hope this email finds you well. </p>"
                    + "<p>One of our platform users, <strong>" + user.getName() + "</strong>, has expressed interest in making a donation to your organization.</p>"
                    + "<p><strong>Donation Details:</strong></p>"
                    + "<ul>\n" +
                    "        <li><strong>Donor:</strong> " + user.getName() + "</li>\n" +
                    "        <li><strong>Donation Type:</strong> " + donationType.toString() + "</li>\n" +
                    "        <li><strong>Donation Date:</strong> " + deliveryDate + "</li>\n" +
                    "    </ul>"
                    + "<p>" + user.getName() + " will be coming to your location on " + deliveryDate + " to deliver the donation.</p>"
                    + "<p>We kindly request you to coordinate with the donor and ensure a smooth donation process.</p>"
                    + "<p>Our user can be contacted at <a href='mailto:" + user.getEmail() + "'>" + user.getEmail() + "</a>.</p>"
                    + "<p>If you have any questions or need further information, please feel free to contact us or the donor directly.</p>\n"
                    + "<p>Best regards,<br>The RTER Team</p></body></html>";

            htmlBodyPart.setContent(htmlContent, "text/html; charset=utf-8");
            multipart.addBodyPart(htmlBodyPart);
            message.setContent(multipart);

            // Send the email using the Transport class
            Transport.send(message);

        } catch (MessagingException e) {
            // Handle any exceptions related to sending the email
            e.printStackTrace();
            throw new RuntimeException("Couldn't send the email.");
        }
    }

    public void sendEmail(EmailRequest emailRequest) {
        // We extract the data from the email request
        String bodyMessage = emailRequest.body();
        Long idUser = emailRequest.idUser();
        Long idNgo = emailRequest.idNgo();
        User user = userRepo.findById(idUser).orElseThrow(() -> new RuntimeException("User not found"));
        Ngo ngo = ngoRepo.findById(idNgo).orElseThrow(() -> new RuntimeException("Ngo not found"));

        // Add a prefix to the email address to avoid sending emails to real NGOs and spamming them :)
        String to = "matei.otniel20@gmail.com";

        // Create a Properties object to store mail-related configuration settings
        Properties prop = new Properties();

        // Configure SMTP server settings for Gmail
        prop.put("mail.smtp.host", "smtp.gmail.com");
        prop.put("mail.smtp.port", "465");
        prop.put("mail.smtp.auth", "true");
        prop.put("mail.smtp.socketFactory.port", "465");
        prop.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");

        // Create a mail session with the specified properties and an Authenticator for username and password
        Session session = Session.getInstance(prop,
                new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(username, password);
                    }
                });

        try {
            // Create a MimeMessage for composing the email
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(username));
            message.setRecipients(
                    Message.RecipientType.TO,
                    InternetAddress.parse(to)
            );
            String subject = "New message from a user within our platform";
            message.setSubject(subject);

            // We are using a multipart message because we want to format the email as HTML
            MimeMultipart multipart = new MimeMultipart();
            BodyPart htmlBodyPart = new MimeBodyPart();

            // Compose the HTML content of the email
            String htmlContent = "<html><body><p>Dear <strong>" + ngo.getName() + "</strong> Team,</p>"
                    + "<p>We hope this email finds you well. </p>"
                    + "<p>One of our platform users, <strong>" + user.getName() + "</strong> has sent you a message:</p>"
                    + "<p><em>\"" + bodyMessage + "\"</em></p>"
                    + "<p>Our user can be contacted at <a href='mailto:" + user.getEmail() + "'>" + user.getEmail() + "</a>.</p>"
                    + "<p>If you have any questions or need further information, please feel free to contact us or the user directly.</p>"
                    + "<p>Best regards,<br>The RTER Team</p></body></html>";
            htmlBodyPart.setContent(htmlContent, "text/html; charset=utf-8");
            multipart.addBodyPart(htmlBodyPart);
            message.setContent(multipart);

            // Send the email using the Transport class
            Transport.send(message);

        } catch (MessagingException e) {
            // Handle any exceptions related to sending the email
            e.printStackTrace();
            throw new RuntimeException("Couldn't send the email.");
        }
    }

}

package com.example.rterserver.ngo.service;

import com.example.rterserver.config.TrustAllManager;
import com.example.rterserver.ngo.model.Ngo;
import com.example.rterserver.ngo.repository.NgoRepo;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

@Service
public class NgoService {
    private final NgoRepo ngoRepo;

    public NgoService(NgoRepo ngoRepo) {
        this.ngoRepo = ngoRepo;
        // am o rugaminte, sa rulati toti o data cu linia 28 comentata/stearsa pentru a se repopula corect baza de date
        // cu ong urile si imaginile lor, iar dupa sa o decomentati
        //if (ngoRepo.count() == 0)
            fetchNGOs(50);
    }

    public void fetchNGOs(int nrOfNgos) {
        ngoRepo.deleteAll();
        int page = nrOfNgos / 10;
        if (nrOfNgos % 10 != 0) {
            page = page + 1;
        }
        int currentPage = 1;
        while (currentPage <= page) {
            String url = "https://www.sustinebinele.ro/organizatii" + "/pagina-" + currentPage;
            try {
                try {
                    SSLContext sslContext = SSLContext.getInstance("TLS");
                    sslContext.init(null, new TrustManager[]{new TrustAllManager()}, null);
                    HttpsURLConnection.setDefaultSSLSocketFactory(sslContext.getSocketFactory());
                } catch (Exception e) {
                    e.printStackTrace();
                }
                Document document = Jsoup.connect(url).get();

                Elements ngos = document.select(".card");

                for (Element ngo : ngos) {
                    Ngo ngoToBeAdded = new Ngo();
                    Element header = ngo.selectFirst(".card-header");
                    if (header != null) {
                        String name = header.text();
                        ngoToBeAdded.setName(name);
                    } else {
                        ngoToBeAdded.setName("null");
                    }

                    Element body = ngo.selectFirst(".card-body");
                    if (body != null) {
                        String link = "https://www.sustinebinele.ro" + body.select("a").attr("href");
                        try {
                            Document linkedDocument = Jsoup.connect(link).get();
                            Element contact = linkedDocument.selectFirst("#contact");
                            if (contact != null) {
                                String contactText = contact.select("#contact > *:not(:first-child)").text();
                                ngoToBeAdded.setContact(contactText);
                            } else {
                                ngoToBeAdded.setContact("null");
                            }
                            Element website = linkedDocument.selectFirst("#main-website");
                            if (website != null) {
                                ngoToBeAdded.setWebsite(website.select("a").attr("href"));
                            } else {
                                ngoToBeAdded.setWebsite("null");
                            }
                            Element imageElement = ngo.selectFirst("img");
                            if (imageElement != null) {
                                String imageUrl = "https://www.sustinebinele.ro/" + imageElement.attr("src");
                                ngoToBeAdded.setImageUrl(imageUrl);
                            }
                            else {
                                ngoToBeAdded.setImageUrl("https://img.freepik.com/premium-vector/charity-abstract-logo-healthy-lifestyle_660762-34.jpg");
                            }
                            ngoRepo.save(ngoToBeAdded);
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    } else {
                        ngoToBeAdded.setContact("null");
                        ngoToBeAdded.setWebsite("null");
                    }
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
            currentPage++;
        }
    }

    public List<Ngo> getAllNGOs() {
        return ngoRepo.findAll();
    }
}

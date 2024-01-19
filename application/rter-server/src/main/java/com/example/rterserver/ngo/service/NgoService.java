package com.example.rterserver.ngo.service;

import com.example.rterserver.config.TrustAllManager;
import com.example.rterserver.ngo.exception.AlreadyExistsException;
import com.example.rterserver.ngo.model.FavoriteNgo;
import com.example.rterserver.ngo.model.Ngo;
import com.example.rterserver.ngo.repository.FavoriteNgoRepo;
import com.example.rterserver.ngo.repository.NgoRepo;
import com.example.rterserver.user.exception.NotFoundException;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * This class represents the service for the Ngo entity.
 */
@Service
public class NgoService {
    private final NgoRepo ngoRepo;
    private final FavoriteNgoRepo favoriteNgoRepo;

    public NgoService(NgoRepo ngoRepo, FavoriteNgoRepo favoriteNgoRepo) {
        this.ngoRepo = ngoRepo;
        this.favoriteNgoRepo = favoriteNgoRepo;
        // we fetch the NGOs only if the database is empty, so we don't fetch them every time we start the application
        if (ngoRepo.count() == 0)
            fetchNGOs(50);
    }

    /**
     * This method is used to fetch NGOs from a website and save them in the database.
     * The method uses Jsoup to parse the HTML of the website and a custom TrustManager to avoid SSLHandshakeException.
     * We use web scraping to fetch the NGOs by their elements' class names.
     * We preferred to fetch the NGOs from a website instead of using mock data because we wanted to have a more
     * realistic scenario.
     * @param nrOfNgos the number of NGOs to be fetched
     */
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
                                String[] words = contactText.split(" ");
                                String foundEmail = "null";
                                for (String word : words) {
                                    if (word.contains("@")) {
                                        foundEmail = word.trim();
                                        break;
                                    }
                                }
                                ngoToBeAdded.setEmail(foundEmail);
                            } else {
                                ngoToBeAdded.setContact("null");
                                ngoToBeAdded.setEmail("null");
                            }


                            Element location = linkedDocument.selectFirst("#ong-hero > div > div > div.col-12.col-sm-8.col-md-9.col-lg-10 > div > div.col > p");
                            if (location != null) {
                                String locationText = location.text();
                                ngoToBeAdded.setAddress(locationText);
                            } else {
                                ngoToBeAdded.setAddress(null);
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
                            } else {
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

    public void addNgoToFavorites(FavoriteNgo favoriteNgo) {
        Optional<FavoriteNgo> favoriteNgoOptional = favoriteNgoRepo.findByIdUserAndIdNgo(favoriteNgo.getIdUser(),
                favoriteNgo.getIdNgo());
        if (favoriteNgoOptional.isPresent()) {
            throw new AlreadyExistsException("Ngo already added to favorites");
        } else {
            favoriteNgoRepo.save(favoriteNgo);
        }
    }

    public List<Ngo> getFavoritesNgos(Long idUser) {
        List<FavoriteNgo> favoriteNgos = favoriteNgoRepo.findAllByIdUser(idUser);
        List<Ngo> ngos = new ArrayList<>();
        for (FavoriteNgo favoriteNgo : favoriteNgos) {
            Ngo ngo = ngoRepo.findById(favoriteNgo.getIdNgo()).orElseThrow();
            ngos.add(ngo);
        }
        return ngos;
    }

    public void removeNgoFromFavorites(FavoriteNgo favoriteNgo) {
        FavoriteNgo favoriteNgoToDelete = favoriteNgoRepo.findByIdUserAndIdNgo(favoriteNgo.getIdUser(),
                favoriteNgo.getIdNgo()).orElseThrow();
        favoriteNgoRepo.delete(favoriteNgoToDelete);
    }

    public Ngo findByName(String name) {
        return ngoRepo.findByName(name)
                .orElseThrow(() -> new NotFoundException("Ngo not found with name: " + name));
    }

    public Ngo getNgoById(Long id) {
        return ngoRepo.findById(id)
                .orElseThrow(() -> new NotFoundException("NGO not found with ID: " + id));
    }
}
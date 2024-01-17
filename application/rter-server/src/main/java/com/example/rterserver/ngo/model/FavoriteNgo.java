package com.example.rterserver.ngo.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;

@Entity
@Table(name = "favorite_ngo")
public class FavoriteNgo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Schema(description = "The id of the ngo (required)")
    Long idNgo;
    @Schema(description = "The id of the user (required)")
    Long idUser;


    public FavoriteNgo(Long idNgo, Long idUser) {
        this.idNgo = idNgo;
        this.idUser = idUser;
    }

    public FavoriteNgo() {

    }

    public Long getIdNgo() {
        return idNgo;
    }

    public void setIdNgo(Long idNgo) {
        this.idNgo = idNgo;
    }

    public Long getIdUser() {
        return idUser;
    }

    public void setIdUser(Long idUser) {
        this.idUser = idUser;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}

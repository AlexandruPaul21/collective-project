package com.example.rterserver.ngo.repository;

import com.example.rterserver.ngo.model.FavoriteNgo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * This interface represents the repository for the FavoriteNgo entity.
 */
@Repository
public interface FavoriteNgoRepo extends JpaRepository<FavoriteNgo, Long> {
    List<FavoriteNgo> findAllByIdUser(Long idUser);

    Optional<FavoriteNgo> findByIdUserAndIdNgo(Long idUser, Long idNgo);
}

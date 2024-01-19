package com.example.rterserver.ngo.repository;

import com.example.rterserver.ngo.model.Ngo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * This interface represents the repository for the Ngo entity.
 */
@Repository
public interface NgoRepo extends JpaRepository<Ngo, Long> {
    Optional<Ngo> findByName(String name);

    Optional<Ngo> findById(Long id);
}
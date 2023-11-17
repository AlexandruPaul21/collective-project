package com.example.rterserver.ngo.repository;

import com.example.rterserver.ngo.model.Ngo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NgoRepo extends JpaRepository<Ngo, Long> {
}
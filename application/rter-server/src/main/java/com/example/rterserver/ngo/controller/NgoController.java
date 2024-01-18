package com.example.rterserver.ngo.controller;

import com.example.rterserver.common.ResponseDto;
import com.example.rterserver.ngo.model.FavoriteNgo;
import com.example.rterserver.ngo.model.Ngo;
import com.example.rterserver.ngo.service.NgoService;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * This class represents the controller for the NGO endpoints.
 */
@RestController
@RequestMapping("/ngos")
@OpenAPIDefinition(info = @Info(title = "NGO API", version = "v1"))
@Validated
public class NgoController {
    private final NgoService ngoService;

    @Autowired
    public NgoController(NgoService ngoService) {
        this.ngoService = ngoService;
    }

    @Operation(summary = "Get all NGOs", description = "This endpoint is used to retrieve all NGOs. ")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "NGOs found successfully",
                    content = {@Content(mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = Ngo.class)))}),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))})
    })
    @GetMapping
    public ResponseEntity<List<Ngo>> getAllNGOs() {
        List<Ngo> ngos = ngoService.getAllNGOs();
        return ResponseEntity.ok(ngos);
    }

    @Operation(summary = "Add a NGO to favorites", description = "This endpoint is used to add a NGO to favorites. ")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "NGO added to favorites successfully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))}),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))})
    })
    @PostMapping("/favorites")
    public ResponseEntity<ResponseDto> addNgoToFavorites(@Valid @RequestBody FavoriteNgo favoriteNgo) {
        ngoService.addNgoToFavorites(favoriteNgo);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Remove a NGO from favorites", description = "This endpoint is used to remove a NGO from favorites. ")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "NGO removed from favorites successfully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))}),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))})
    })
    @DeleteMapping("/favorites")
    public ResponseEntity<ResponseDto> removeNgoFromFavorites(@Valid @RequestBody FavoriteNgo favoriteNgo) {
        ngoService.removeNgoFromFavorites(favoriteNgo);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Get all favorite NGOs for user", description = "This endpoint is used to retrieve all favorite" +
            " NGOs of a user. ")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "NGOs found successfully",
                    content = {@Content(mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = Ngo.class)))}),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))})
    })
    @GetMapping("/favorites/{userId}")
    public ResponseEntity<List<Ngo>> getAllFavoriteNGOs(@Parameter(description = "User id", required = true)
                                                        @PathVariable("userId") Long userId) {
        List<Ngo> ngos = ngoService.getFavoritesNgos(userId);
        return ResponseEntity.ok(ngos);
    }

    @Operation(summary = "Get an NGO by ID", description = "This endpoint is used to retrieve an NGO by its ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "NGO found successfully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = Ngo.class))}),
            @ApiResponse(responseCode = "404", description = "NGO not found",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))}),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))})
    })
    @GetMapping("/{ngoId}")
    public ResponseEntity<?> getNgoById(@Parameter(description = "NGO id", required = true)
                                        @PathVariable("ngoId") Long ngoId) {
        Ngo ngo = ngoService.getNgoById(ngoId);
        return ResponseEntity.ok(ngo);
    }
}

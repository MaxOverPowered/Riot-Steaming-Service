package com.src.riot.controller;

import com.src.riot.model.Movie;
import com.src.riot.model.MovieGenre;
import com.src.riot.service.MovieGenreService;
import com.src.riot.service.MovieService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api")
public class WelcomeController {

    private final MovieService movieService;
    int count = 1;

    public WelcomeController(MovieService movieService) {
        this.movieService = movieService;

    }

    @GetMapping
    public List<Movie> movieList() {
        if (count == 1) {
            movieService.jsonMovieInDatabase();
            count++;
        }
        return movieService.movieList();
    }
}



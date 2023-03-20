package com.src.riot.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "movies")
public class Movie {
    @Id
    @Column(unique = true)
    private Long id;

    private Long tmbd_id;

    private String imdb_id;
    private String title;
    private String english_title;
    private String backdrop_path;
    private float imdb;
    private String release_date;
    private int runtime;
    @ElementCollection
    private List<Integer> genre_ids;
    private String hash;
    private String update;
    @ManyToMany(cascade = {CascadeType.ALL})
    @JoinTable(name = "favorite_ids",
            joinColumns = @JoinColumn(name = "favorite_movie_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<User> userSet = new HashSet<>();


    public void addFavoriteMovie(User user){
        userSet.add(user);
        user.getFavorite_movie_id().add(this);
    }

}


package com.src.riot.service;
;
import org.json.JSONArray;
import org.json.JSONObject;
import com.src.riot.model.Movie;
import com.src.riot.service.DAO.*;
import org.springframework.stereotype.Service;
import java.io.BufferedReader;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class MovieService extends BaseService {


    public MovieService(UserRepository userRepository, MovieRepository movieRepository, RoleRepository roleRepository, MovieGenreRepository movieGenreRepository) {
        super(userRepository, movieRepository, roleRepository, movieGenreRepository);
    }

    public void saveNewMovie(Movie movie) {
        movieRepository.save(movie);
    }

    public List<Movie> movieList() {
        return movieRepository.findAll();
    }

    public Optional<Movie> getMovieById(Long movieId) {
        return movieRepository.findById(movieId);
    }

    public List<Movie> getMoviesByYearRelease(String id) {
        return movieRepository.getMoviesByYear(id);
    }

    public List<String> getYear() {
        return movieRepository.getYears();
    }

    public Optional<Movie> findById(Long id) {
        return movieRepository.findById(id);
    }
    public void jsonMovieInDatabase() {
        String filename = "src/main/java/com/src/riot/config/jsonMovie.json";

        try {
            BufferedReader br = new BufferedReader(new FileReader(filename));
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = br.readLine()) != null) {
                sb.append(line);
            }
            br.close();
            JSONArray jsonArray = new JSONArray(sb.toString());

            for (int i = 0; i < jsonArray.length(); i++) {
                JSONObject jsonObj = jsonArray.getJSONObject(i);
                Movie movie = new Movie();
                movie.setId(jsonObj.getLong("id"));
                movie.setImdb_id(jsonObj.getString("imdb_id"));
                movie.setTitle(jsonObj.getString("title"));
                movie.setEnglish_title(jsonObj.getString("english_title"));
                movie.setBackdrop_path(jsonObj.getString("backdrop_path"));
                movie.setImdb(jsonObj.getFloat("imdb"));
                movie.setRelease_date(jsonObj.getString("release_date"));
                movie.setRuntime(jsonObj.getInt("runtime"));
                JSONArray genreIdsArray = jsonObj.getJSONArray("genre_ids");
                List<Integer> genreIdsList = new ArrayList<>();
                for (int j = 0; j < genreIdsArray.length(); j++) {
                    int genreId = genreIdsArray.getInt(j);
                    genreIdsList.add(genreId);
                }
                movie.setGenre_ids(genreIdsList);
                movie.setHash(jsonObj.getString("hash"));
                movie.setUpdate(jsonObj.getString("updated"));
                movieRepository.save(movie);
            }
            System.out.println("JSON data inserted successfully!");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public Set<String> findGenresByMovieId(Long movieId) {
        return movieRepository.findGenresByMovieId(movieId);
    }
}

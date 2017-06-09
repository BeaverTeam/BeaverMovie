package beaver.backend.repository;

import beaver.backend.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by parda on 2017/9.
 */
@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
}

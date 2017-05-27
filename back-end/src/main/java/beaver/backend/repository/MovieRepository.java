package beaver.backend.repository;

import beaver.backend.entity.Movie;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by parda on 2017/5/27.
 */
@Repository
public interface MovieRepository extends CrudRepository<Movie, Long> {
}

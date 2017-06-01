package beaver.backend.repository;

import beaver.backend.entity.Cinema;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by parda on 2017/6/1.
 */
@Repository
public interface CinemaRepository extends JpaRepository<Cinema, Long> {
}

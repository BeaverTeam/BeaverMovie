package beaver.backend.repository;

import beaver.backend.entity.Showtime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by parda on 2017/6/1.
 */
@Repository
public interface ShowtimeRepository extends JpaRepository<Showtime, Long> {
}

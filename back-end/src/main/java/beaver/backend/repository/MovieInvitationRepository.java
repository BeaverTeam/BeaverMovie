package beaver.backend.repository;

import beaver.backend.entity.MovieInvitation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by parda on 2017/6/10.
 */
@Repository
public interface MovieInvitationRepository extends JpaRepository<MovieInvitation, Long> {
}

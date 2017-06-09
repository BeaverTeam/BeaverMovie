package beaver.backend.repository;

import beaver.backend.entity.FriendInvitation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by parda on 2017/3/29.
 */
@Repository
public interface FriendInvitationRepository extends JpaRepository<FriendInvitation, Long> {
}

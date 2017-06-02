package beaver.backend.repository;

import beaver.backend.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by parda on 2017/6/2.
 */
@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
}

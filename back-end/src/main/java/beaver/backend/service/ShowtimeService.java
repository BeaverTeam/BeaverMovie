package beaver.backend.service;

import beaver.backend.entity.Ticket;
import beaver.backend.repository.ShowtimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

/**
 * Created by parda on 2017/6/2.
 */
@Service
public class ShowtimeService {

    @Autowired
    ShowtimeRepository showtimeRepository;

    public boolean checkSeatsAvailable(long id, Set<Integer> seats) {
        // Todo: 删除尚未支付的ticket
        return showtimeRepository.findOne(id)
                .getTickets()
                .stream()
                .filter(ticket -> seats.contains(ticket.getSeat()))
                .count() == 0;
    }

    public Set<Integer> getUnavailableSeats(long id) {
        // Todo: 删除尚未支付的ticket
        return showtimeRepository.findOne(id)
                .getTickets()
                .stream()
                .map(Ticket::getSeat)
                .collect(Collectors.toSet());
    }
}

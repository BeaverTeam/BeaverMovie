package beaver.backend.service;

import beaver.backend.entity.Showtime;
import beaver.backend.entity.Ticket;
import beaver.backend.entity.TicketOrder;
import beaver.backend.repository.ShowtimeRepository;
import beaver.backend.repository.TicketOrderRepository;
import beaver.backend.repository.TicketRepository;
import beaver.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Created by parda on 2017/6/2.
 */
@Service
public class TicketOrderService {

    @Autowired
    TicketOrderRepository ticketOrderRepository;

    @Autowired
    TicketRepository ticketRepository;

    @Autowired
    ShowtimeRepository showtimeRepository;

    @Autowired
    UserRepository userRepository;

    public boolean checkOrderAvailable(long orderId) {
        return ticketOrderRepository.exists(orderId);
    }

    public void changePayment(long orderId) {
        TicketOrder order = ticketOrderRepository.findOne(orderId);
        order.setPaid(true);
        ticketOrderRepository.save(order);
    }

    public void addOrder(long userId, long showtimeId, Set<Integer> seats) {
        TicketOrder ticketOrder = ticketOrderRepository.save(new TicketOrder(userRepository.findOne(userId), Calendar.getInstance().getTime(), false));
        Showtime showtime = showtimeRepository.findOne(showtimeId);

        ticketRepository.save(seats
                .stream()
                .map(seat -> {
                    Ticket ticket = new Ticket();
                    ticket.setTicketOrder(ticketOrder);
                    ticket.setSeat(seat);
                    ticket.setShowtime(showtime);
                    return ticket;
                }).collect(Collectors.toSet()));
    }
}

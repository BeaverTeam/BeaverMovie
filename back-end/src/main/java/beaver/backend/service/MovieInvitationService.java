package beaver.backend.service;

import beaver.backend.entity.Showtime;
import beaver.backend.entity.Ticket;
import beaver.backend.entity.TicketOrder;
import beaver.backend.entity.User;
import beaver.backend.entity.MovieInvitation;
import beaver.backend.entity.responseType.MovieInvitationItem;
import beaver.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Created by parda on 2017/6/10.
 */
@Service
public class MovieInvitationService {
    @Autowired
    MovieInvitationRepository movieInvitationRepository;

    @Autowired
    TicketOrderRepository ticketOrderRepository;

    @Autowired
    ShowtimeRepository showtimeRepository;

    @Autowired
    TicketRepository ticketRepository;

    @Autowired
    UserRepository userRepository;

    public void addInvitation(long posterId, Set<Long> receiverIds, long showtimeId, Set<Integer> seats) {
        TicketOrder ticketOrder = ticketOrderRepository.save(new TicketOrder(Calendar.getInstance().getTime(), false));
        Showtime showtime = showtimeRepository.findOne(showtimeId);
        User poster = userRepository.findOne(posterId);

        ticketRepository.save(seats
                .stream()
                .map(seat -> {
                    Ticket ticket = new Ticket();
                    ticket.setTicketOrder(ticketOrder);
                    ticket.setSeat(seat);
                    ticket.setShowtime(showtime);
                    return ticket;
                }).collect(Collectors.toSet()));

        movieInvitationRepository.save(receiverIds.stream()
                                        .map(id -> {
                                            User receiver = userRepository.findOne(id);
                                            return new MovieInvitation(ticketOrder, poster, receiver, Calendar.getInstance().getTime());
                                        }).collect(Collectors.toList()));
    }

    public Set<MovieInvitationItem> getReceivedButUnhandledInvitation(long receiverId) {
        return userRepository.findOne(receiverId)
                .getMovieInvitationAsReceiver()
                .stream()
                .filter(movieInvitation -> !movieInvitation.isAccepted() && !movieInvitation.isRejected())
                .map(movieInvitation -> {
                    User poster = movieInvitation.getPoster();
                    Showtime showtime = movieInvitation.getOrder().getTickets().iterator().next().getShowtime();
                    return new MovieInvitationItem(movieInvitation.getId(), poster, showtime, movieInvitation.getLatestAlterTime(), false, false);
                }).collect(Collectors.toSet());
    }

    public Set<MovieInvitationItem> getPostedAndHandledInvitation(long posterId) {
        return userRepository.findOne(posterId)
                .getMovieInvitationAsPoster()
                .stream()
                .filter(movieInvitation -> movieInvitation.isAccepted() || movieInvitation.isRejected())
                .map(movieInvitation -> {
                    User receiver = movieInvitation.getReceiver();
                    Showtime showtime = movieInvitation.getOrder().getTickets().iterator().next().getShowtime();
                    return new MovieInvitationItem(movieInvitation.getId(), receiver, showtime, movieInvitation.getLatestAlterTime(), movieInvitation.isAccepted(), movieInvitation.isRejected());
                }).collect(Collectors.toSet());
    }
}

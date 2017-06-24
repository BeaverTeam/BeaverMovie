package beaver.backend.service;

import java.util.*;
import beaver.backend.entity.*;
import beaver.backend.entity.responseType.MovieInvitationItem;
import beaver.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.constraints.Null;
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

    public TicketOrder addInvitation(long posterId, Set<Integer> posterSeats, Set<String> receiverNames,  Set<Integer> receiverSeats, long showtimeId) {
        Showtime showtime = showtimeRepository.findOne(showtimeId);

        //receiver
        TicketOrder receiverOrder = ticketOrderRepository.save(new TicketOrder(Calendar.getInstance().getTime(), false));
        User poster = userRepository.findOne(posterId);

        ticketRepository.save(receiverSeats
                .stream()
                .map(seat -> {
                    Ticket ticket = new Ticket();
                    ticket.setTicketOrder(receiverOrder);
                    ticket.setSeat(seat);
                    ticket.setShowtime(showtime);
                    return ticket;
                }).collect(Collectors.toSet()));

        movieInvitationRepository.save(receiverNames.stream()
                                        .map(receiverName -> {
                                            User receiver = userRepository.findByUsername(receiverName);
                                            return new MovieInvitation(receiverOrder, poster, receiver, Calendar.getInstance().getTime());
                                        }).collect(Collectors.toList()));


        //poster
        TicketOrder posterOrder = ticketOrderRepository.save(new TicketOrder(userRepository.findOne(posterId), Calendar.getInstance().getTime(), false));

        ticketRepository.save(posterSeats
                .stream()
                .map(seat -> {
                    Ticket ticket = new Ticket();
                    ticket.setTicketOrder(posterOrder);
                    ticket.setSeat(seat);
                    ticket.setShowtime(showtime);
                    return ticket;
                }).collect(Collectors.toSet()));

        return posterOrder;
    }

    public Set<MovieInvitationItem> getReceivedButUnhandledInvitation(long receiverId) {
        return userRepository.findOne(receiverId)
                .getMovieInvitationAsReceiver()
                .stream()
                .filter(movieInvitation -> !movieInvitation.isAccepted() && !movieInvitation.isRejected())
                .map(movieInvitation -> {
                    User poster = movieInvitation.getPoster();
                    Showtime showtime = movieInvitation.getOrder().getTickets().iterator().next().getShowtime();
                    Set<Integer> seats = movieInvitation
                            .getOrder()
                            .getTickets()
                            .stream()
                            .map(ticket -> {
                                int seat = ticket.getSeat();
                                return seat;
                                }).collect(Collectors.toSet());

                    return new MovieInvitationItem(movieInvitation.getId(), poster, showtime, movieInvitation.getLatestAlterTime(), false, false, seats);
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

                    Set<Integer> seats = movieInvitation
                            .getOrder()
                            .getTickets()
                            .stream()
                            .map(ticket -> {
                                int seat = ticket.getSeat();
                                return seat;
                            }).collect(Collectors.toSet());

                            return new MovieInvitationItem(movieInvitation.getId(), receiver, showtime, movieInvitation.getLatestAlterTime(), movieInvitation.isAccepted(), movieInvitation.isRejected(), seats);
                }).collect(Collectors.toSet());
    }


    public TicketOrder acceptInvitation(long userId, long invitationId, Set<Integer> seats) {
        MovieInvitation invitation = movieInvitationRepository.findOne(invitationId);

        invitation.setAccepted(true);
        invitation.setLatestAlterTime(Calendar.getInstance().getTime());
        movieInvitationRepository.save(invitation);

        //poster
        TicketOrder order = ticketOrderRepository.save(new TicketOrder(userRepository.findOne(userId), Calendar.getInstance().getTime(), false));

        ticketRepository.save(seats
                .stream()
                .map(seat -> {
                    Ticket result = null;
                    Set<Ticket> tickets = invitation.getOrder().getTickets();
                    for(Ticket ticket : tickets) {
                        if(ticket.getSeat() == seat) {
                            result = ticket;
                            break;
                        }
                    }
                    result.setTicketOrder(order);
                    return result;
                }).collect(Collectors.toSet()));

        return order;
    }


    public void rejectInvitation(long invitationId) {
        MovieInvitation invitation = movieInvitationRepository.findOne(invitationId);
        invitation.setRejected(true);
        invitation.setLatestAlterTime(Calendar.getInstance().getTime());
        movieInvitationRepository.save(invitation);
    }

}

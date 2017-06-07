package beaver.backend.controller;

import beaver.backend.entity.TicketOrder;
import beaver.backend.entity.User;
import beaver.backend.entity.requestType.OrderRequest;
import beaver.backend.entity.responseType.Info;
import beaver.backend.exception.NotLogin;
import beaver.backend.exception.SeatUnavaliable;
import beaver.backend.exception.UserNotFound;
import beaver.backend.service.ShowtimeService;
import beaver.backend.service.TicketOrderService;
import beaver.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

/**
 * Created by parda on 2017/6/2.
 */
@RestController
@RequestMapping("/order")
public class TicketOrderController {

    @Autowired
    UserService userService;

    @Autowired
    ShowtimeService showtimeService;

    @Autowired
    TicketOrderService ticketOrderService;

    @GetMapping
    public ResponseEntity<Info> getOrders(HttpSession session) throws NotLogin, Exception {
        if (session.getAttribute("currentUser") == null)
            throw new NotLogin();
        return new ResponseEntity<Info>(userService.getOne((long)session.getAttribute("currentUser"))
                .map(user -> new Info<>("success", "Get Orders", user.getOrders())).get(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Info> orderTicket(@RequestBody OrderRequest orderRequest, HttpSession session) throws NotLogin, SeatUnavaliable, Exception {
        if (session.getAttribute("currentUser") == null)
            throw new NotLogin();
        if (orderRequest.getSeats().stream().anyMatch(seat -> seat <= 0 || seat > 30) || !showtimeService.checkSeatsAvailable(orderRequest.getShowtimeId(), orderRequest.getSeats()))
            throw new SeatUnavaliable();
        // Todo: 检查场次是否已开始
        TicketOrder order = ticketOrderService.addOrder((long)session.getAttribute("currentUser"), orderRequest.getShowtimeId(), orderRequest.getSeats());
        return new ResponseEntity<Info>(new Info("success", "Order Success", order.getId()), HttpStatus.OK);
    }

    @GetMapping("/pay/{id}")
    public ResponseEntity<Info> payOrder(@PathVariable long id) {
        if (!ticketOrderService.checkOrderAvailable(id))
            return new ResponseEntity<Info>(new Info("failed", "Order Deleted"), HttpStatus.OK);
        ticketOrderService.changePayment(id);
        return new ResponseEntity<Info>(new Info("success", "Pay Success"), HttpStatus.OK);
    }
}

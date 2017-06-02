package beaver.backend.entity.requestType;

import java.util.HashSet;
import java.util.Set;

/**
 * Created by parda on 2017/6/2.
 */
public class OrderRequest {
    private long showtimeId;
    private Set<Integer> seats = new HashSet<>();

    public OrderRequest() {
    }

    public long getShowtimeId() {
        return showtimeId;
    }

    public void setShowtimeId(long showtimeId) {
        this.showtimeId = showtimeId;
    }

    public Set<Integer> getSeats() {
        return seats;
    }

    public void setSeats(Set<Integer> seats) {
        this.seats = seats;
    }
}

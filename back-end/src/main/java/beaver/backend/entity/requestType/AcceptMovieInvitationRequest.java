package beaver.backend.entity.requestType;

import java.util.HashSet;
import java.util.Set;

/**
 * Created by parda on 2017/6/20.
 */
public class AcceptMovieInvitationRequest {
    private long movieInvitationId;
    private Set<Integer> seats = new HashSet<>();

    public long getMovieInvitationId() {
        return movieInvitationId;
    }

    public void setMovieInvitationId(long movieInvitationId) {
        this.movieInvitationId = movieInvitationId;
    }

    public Set<Integer> getSeats() {
        return seats;
    }

    public void setSeats(Set<Integer> seats) {
        this.seats = seats;
    }
}

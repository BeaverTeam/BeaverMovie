package beaver.backend.entity.requestType;

import java.util.HashSet;
import java.util.Set;

/**
 * Created by parda on 2017/6/20.
 */
public class MovieInvitationRequest {
    private Set<Integer> posterSeats = new HashSet<>();
    private Set<String> receiverNames = new HashSet<>();
    private Set<Integer> receiverSeats = new HashSet<>();
    private long showtimeId;

    public MovieInvitationRequest() {
    }

    public Set<Integer> getPosterSeats() {
        return posterSeats;
    }

    public void setPosterSeats(Set<Integer> posterSeats) {
        this.posterSeats = posterSeats;
    }

    public Set<String> getReceiverNames() {
        return receiverNames;
    }

    public void setReceiverNames(Set<String> receiverNames) {
        this.receiverNames = receiverNames;
    }

    public Set<Integer> getReceiverSeats() {
        return receiverSeats;
    }

    public void setReceiverSeats(Set<Integer> receiverSeats) {
        this.receiverSeats = receiverSeats;
    }

    public long getShowtimeId() {
        return showtimeId;
    }

    public void setShowtimeId(long showtimeId) {
        this.showtimeId = showtimeId;
    }
}

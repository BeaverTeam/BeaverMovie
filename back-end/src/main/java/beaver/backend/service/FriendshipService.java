package beaver.backend.service;

import beaver.backend.entity.FriendInvitation;
import beaver.backend.entity.User;
import beaver.backend.entity.responseType.FriendInvitationItem;
import beaver.backend.repository.FriendInvitationRepository;
import beaver.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by parda on 2017/6/9.
 */
@Service
public class FriendshipService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    FriendInvitationRepository friendInvitationRepository;

    public void acceptInvitation(long userId, long invitationId) {
        FriendInvitation invitation = friendInvitationRepository.findOne(invitationId);

        User receiver = userRepository.findOne(userId);
        User poster = invitation.getPoster();

        receiver.getFriends().add(poster);
        userRepository.save(receiver);

        poster.getFriends().add(receiver);
        userRepository.save(receiver);

        invitation.setAccepted(true);
        invitation.setLatestAlterTime(Calendar.getInstance().getTime());
        friendInvitationRepository.save(invitation);
    }

    public void rejectInvitation(long invitationId) {
        FriendInvitation invitation = friendInvitationRepository.findOne(invitationId);
        invitation.setRejected(true);
        invitation.setLatestAlterTime(Calendar.getInstance().getTime());
        friendInvitationRepository.save(invitation);
    }

    public boolean addFriendInvitation(long posterId, String receiverName) {
        User poster = userRepository.findOne(posterId);
        if(userRepository.findByUsername(receiverName) == null) return false;

        User receiver = userRepository.findByUsername(receiverName);
        FriendInvitation invitation = new FriendInvitation(poster, receiver);
        invitation.setLatestAlterTime(Calendar.getInstance().getTime());
        friendInvitationRepository.save(invitation);
        return true;
    }

    public List<FriendInvitationItem> getReceivedButUnhandledInvitation(long id) {
        return userRepository.findOne(id).getAsReceiver().stream()
                .filter(item -> !item.isAccepted() && !item.isRejected())
                .map(item -> new FriendInvitationItem(item.getId(), item.getPoster(), item.isAccepted(), item.isRejected(), item.getLatestAlterTime()))
                .collect(Collectors.toList());
    }

    public List<FriendInvitationItem> getPostedAndHandledInvitation(long id) {
        return userRepository.findOne(id).getAsPoster().stream()
                .filter(item -> item.isAccepted() || item.isRejected())
                .map(item -> new FriendInvitationItem(item.getId(), item.getReceiver(), item.isAccepted(), item.isRejected(), item.getLatestAlterTime()))
                .collect(Collectors.toList());
    }
}

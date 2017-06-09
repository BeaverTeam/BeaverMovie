package beaver.backend.service;

import beaver.backend.entity.FriendInvitation;
import beaver.backend.entity.User;
import beaver.backend.entity.responseType.FriendInvitationItem;
import beaver.backend.repository.FriendshipRepository;
import beaver.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
    FriendshipRepository friendshipRepository;

    public boolean addFriendship(long posterId, String receiverName) {
        User poster = userRepository.findOne(posterId);
        if(userRepository.findByUsername(receiverName) == null) return false;
        User receiver = userRepository.findByUsername(receiverName);
        FriendInvitation f = new FriendInvitation(poster, receiver);
        friendshipRepository.save(f);
        return true;
    }

    public List<FriendInvitationItem> getInvitationItem(long id) {
        return userRepository.findOne(id).getAsReceiver()
                .stream()
                .map(item -> new FriendInvitationItem(item.getId(), item.getPoster(), item.isAck()))
                .collect(Collectors.toList());
    }
}

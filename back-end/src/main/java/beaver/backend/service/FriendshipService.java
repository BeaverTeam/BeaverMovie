package beaver.backend.service;

import beaver.backend.entity.FriendInvitation;
import beaver.backend.entity.User;
import beaver.backend.repository.FriendshipRepository;
import beaver.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        System.out.println(receiverName);
        User poster = userRepository.findOne(posterId);
        if(userRepository.findByUsername(receiverName) == null) return false;
        User receiver = userRepository.findByUsername(receiverName);
        FriendInvitation f = new FriendInvitation(poster, receiver);
        friendshipRepository.save(f);
        return true;
    }
}

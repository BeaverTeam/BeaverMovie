package beaver.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by parda on 2017/3/29.
 */
@Entity
public class User {
    @Id
    @GeneratedValue
    @JsonIgnore
    private long id;

    @Column(nullable = false, unique = true)
    private String username;

    @JsonIgnore
    @Column(nullable = false)
    private String password;

    private String avatar;
    private String phone;

    @OneToMany(mappedBy = "user", cascade = {CascadeType.ALL})
    @JsonIgnore
    private Set<TicketOrder> orders = new HashSet<>();

    @ManyToMany
    @JsonIgnore
    private Set<User> friends = new HashSet<>();

    @OneToMany(mappedBy = "poster")
    @JsonIgnore
    private List<FriendInvitation> asPoster = new ArrayList<>();

    @OneToMany(mappedBy = "receiver")
    @JsonIgnore
    private List<FriendInvitation> asReceiver = new ArrayList<>();

    public User() { }

    public Set<User> getFriends() {
        return friends;
    }

    public void setFriends(Set<User> friends) {
        this.friends = friends;
    }

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Set<TicketOrder> getOrders() {
        return orders;
    }

    public void setOrders(Set<TicketOrder> orders) {
        this.orders = orders;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<FriendInvitation> getAsPoster() {
        return asPoster;
    }

    public void setAsPoster(List<FriendInvitation> asPoster) {
        this.asPoster = asPoster;
    }

    public List<FriendInvitation> getAsReceiver() {
        return asReceiver;
    }

    public void setAsReceiver(List<FriendInvitation> asReceiver) {
        this.asReceiver = asReceiver;
    }
}

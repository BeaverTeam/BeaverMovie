package beaver.backend.service;

import beaver.backend.entity.Cinema;
import beaver.backend.entity.Showtime;
import beaver.backend.repository.CinemaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Created by parda on 2017/6/2.
 */
@Service
public class CinemaService {
    @Autowired
    CinemaRepository cinemaRepository;

    public Set<Showtime> getShowtimes(long id) {
//        System.out.println(Calendar.getInstance().getTime());
        return cinemaRepository.findOne(id).getShowtimes()
                .stream()
                .filter(showtime -> {
//                    System.out.println(showtime.getStartTime() + " " + showtime.getStartTime().after(Calendar.getInstance().getTime()));
                    return showtime.getStartTime().after(Calendar.getInstance().getTime());
                })
                .collect(Collectors.toSet());
    }

    public Set<Cinema> getCinemas(int startCount) {
        return cinemaRepository.findAll()
                .stream()
                .skip(startCount)
                .limit(10)
                .collect(Collectors.toSet());
    }
}

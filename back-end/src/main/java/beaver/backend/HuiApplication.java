package beaver.backend;

import beaver.backend.entity.Cinema;
import beaver.backend.repository.CinemaRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.session.data.mongo.JdkMongoSessionConverter;
import org.springframework.session.data.mongo.config.annotation.web.http.EnableMongoHttpSession;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import java.io.InputStream;
import java.util.Arrays;
import java.util.List;

@SpringBootApplication
@EnableMongoHttpSession
public class HuiApplication {

	public static void main(String[] args) {
		SpringApplication.run(HuiApplication.class, args);
	}

	@Bean
	public CommandLineRunner runner(CinemaRepository cinemaRepository) {
		return args -> {
			ObjectMapper mapper = new ObjectMapper();
			TypeReference<List<Cinema>> mapType = new TypeReference<List<Cinema>>() {};
			ClassPathResource resource = new ClassPathResource("cinema.json");
			InputStream is = resource.getInputStream();
			try {
				List<Cinema> cinemas = mapper.readValue(is, mapType);
				cinemaRepository.save(cinemas);
			} catch (Exception e) {
				e.printStackTrace();
			}
		};
	}

	@Bean
	public JdkMongoSessionConverter jdkMongoSessionConverter() {
		return new JdkMongoSessionConverter();
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurerAdapter() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
						.allowedHeaders("*")
						.allowedMethods("*")
						.allowedOrigins("*");
			}
		};
	}

	@Bean
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}
}

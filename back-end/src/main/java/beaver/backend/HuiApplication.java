package beaver.backend;

import beaver.backend.entity.Cinema;
import beaver.backend.repository.CinemaRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.session.data.mongo.JdkMongoSessionConverter;
import org.springframework.session.data.mongo.config.annotation.web.http.EnableMongoHttpSession;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import java.util.Arrays;

@SpringBootApplication
@EnableMongoHttpSession
public class HuiApplication {

	public static void main(String[] args) {
		SpringApplication.run(HuiApplication.class, args);
	}

	@Bean
	public CommandLineRunner runner(CinemaRepository cinemaRepository) {
		return args -> {
			Arrays.asList("大学城影院,科技中心影院,天河城影院".split(","))
					.forEach(name -> {
						cinemaRepository.save(new Cinema(name, "xx街道xx号"));
					});
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

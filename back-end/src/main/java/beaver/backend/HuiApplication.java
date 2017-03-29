package beaver.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.session.data.mongo.JdkMongoSessionConverter;
import org.springframework.session.data.mongo.config.annotation.web.http.EnableMongoHttpSession;

@SpringBootApplication
@EnableMongoHttpSession
public class HuiApplication {

	public static void main(String[] args) {
		SpringApplication.run(HuiApplication.class, args);
	}

	@Bean
	public JdkMongoSessionConverter jdkMongoSessionConverter() {
		return new JdkMongoSessionConverter();
	}
}

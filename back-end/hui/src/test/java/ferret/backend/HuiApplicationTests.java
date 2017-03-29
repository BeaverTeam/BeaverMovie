package ferret.backend;

import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.embedded.LocalServerPort;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class HuiApplicationTests {

	@LocalServerPort
	private int port;

	@Autowired
	private TestRestTemplate restTemplate;

//	@Test
//	public void testSignUp() throws Exception {
//		assertThat(this.restTemplate.postForObject("http://localhost:" + port + "/api/sign-up", new SignRequest("a", "b"),
//				SignResult.class).isSuccess());
//	}

}

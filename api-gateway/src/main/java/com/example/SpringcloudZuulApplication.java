package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.cloud.client.SpringCloudApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;

@EnableZuulProxy
@SpringCloudApplication
public class SpringcloudZuulApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(SpringcloudZuulApplication.class, args);
	}

}

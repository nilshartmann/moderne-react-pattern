package nh.recipify;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.test.context.TestConfiguration;

@TestConfiguration(proxyBeanMethods = false)
public class TestBackendApplication {

    private static final Logger log = LoggerFactory.getLogger(TestBackendApplication.class);

    public static void main(String[] args) {
        log.info("""
            ### LOCAL DEVELOPMENT. SETTING 'dev' PROFILE! ###
            			""");


        System.setProperty("spring.profiles.active", "dev");
        SpringApplication.from(BackendApplication::main).with(PostgresDbTestContainer.class).run(args);
    }

}

package com.src.riot.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.stereotype.Component;
import javax.sql.DataSource;


@Component
public class InitializeData {

    @Autowired
    private DataSource dataSource;

    @EventListener(ApplicationReadyEvent.class)
    public void loadData() {
        Resource resource1 = new ClassPathResource("roles.sql");
        Resource resource2 = new ClassPathResource("moviegenre.sql");
        ResourceDatabasePopulator populator1 = new ResourceDatabasePopulator(false, false, "UTF-8", resource1);
        ResourceDatabasePopulator populator2 = new ResourceDatabasePopulator(false, false, "UTF-8", resource2);
        populator1.execute(dataSource);
        populator2.execute(dataSource);
    }
}
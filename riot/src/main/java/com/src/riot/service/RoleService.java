package com.src.riot.service;

import com.src.riot.model.Role;
import com.src.riot.model.types.RoleName;
import com.src.riot.service.DAO.MovieRepository;
import com.src.riot.service.DAO.RoleRepository;
import com.src.riot.service.DAO.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoleService extends BaseService{
    public RoleService(UserRepository userRepository, MovieRepository movieRepository, RoleRepository roleRepository) {
        super(userRepository, movieRepository, roleRepository);
    }

    public Optional<Role> findRoleByName(int roleId){return roleRepository.findById((long) roleId);}
}

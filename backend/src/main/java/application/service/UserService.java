package application.service;

import application.model.user.User;
import application.model.user.UserDetailsImpl;
import application.repository.UserRepository;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    public User addUser(User user) {
        return userRepository.save(user);
    }

    public boolean existsByLogin(String login) {
        return userRepository.existsByLogin(login);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByLogin(username);
        user.orElseThrow(() -> new UsernameNotFoundException("Not found: " + username));
        return user.map(UserDetailsImpl::new).get();
    }
}

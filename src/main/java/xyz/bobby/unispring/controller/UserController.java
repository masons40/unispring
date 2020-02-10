package xyz.bobby.unispring.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import xyz.bobby.unispring.exception.UserNotFoundException;
import xyz.bobby.unispring.model.User;
import xyz.bobby.unispring.repository.UserRepository;

import javax.validation.Valid;
import java.util.List;

@RestController
public class UserController {
	@Autowired
	private UserRepository userRepository;

	@GetMapping("/users")
	public List<User> getUsers() {
		return userRepository.findAll();
	}

	@PostMapping(value = "/users", consumes = MediaType.ALL_VALUE)
	public User createUser(@Valid @RequestBody User user) {
		return userRepository.save(user);
	}

	@GetMapping(value = "/users/{id}")
	public User getUser(@PathVariable("id") long userId) throws UserNotFoundException {
		return userRepository.findById(userId)
				.orElseThrow(() -> new UserNotFoundException(userId));
	}
}

package xyz.bobby.unispring.repository;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import xyz.bobby.unispring.controller.UserController;
import xyz.bobby.unispring.exception.ResourceNotFoundException;
import xyz.bobby.unispring.model.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
	Optional<User> findByEmailAddressIgnoreCase(String email);

	default User getUser(int id) throws ResourceNotFoundException {
		return this.findById(id).orElseThrow(() -> new ResourceNotFoundException(User.class.getSimpleName(), id));
	}

	List<FilteredUser> findAllProjectedBy();

	interface FilteredUser {
		String getEmailAddress();
	}
}
package xyz.bobby.unispring.model;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Table;
import javax.validation.constraints.Digits;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@NotBlank
	@Column(unique = true, length = 32)
	@Length(max = 32)
	@Getter @Setter
	private String username;

	@NotBlank
	@Column(length = 64)
	@Length(max = 64)
	@Getter @Setter
	private String forename;

	@NotBlank
	@Column(length = 64)
	@Length(max = 64)
	@Getter	@Setter
	private String surname;

	@NotNull
	@Column(unique = true)
	@Digits(integer = 8, fraction = 0)
	@Min(1)
	@Getter @Setter
	private int studentNumber;

	@NotBlank
	@Getter @Setter
	private String address;

	@NotBlank
	@Getter @Setter
	private String phoneNumber;

	@NotBlank
	@Column(unique = true)
	@Getter @Setter
	private String emailAddress;

	@Enumerated(EnumType.STRING)
	@Column(columnDefinition = "ENUM('staff', 'student')")
	@Getter @Setter
	private Role role;

	@Enumerated(EnumType.STRING)
	@Column(columnDefinition = "ENUM('male', 'female', 'other')")
	@Getter @Setter
	private Gender gender;

	@NotBlank
	@Column(length = 64)
	@Length(max = 64)
	@Getter @Setter
	private String nationality;

	@ElementCollection(fetch = FetchType.LAZY)
	@CollectionTable(name = "user_modules", joinColumns = @JoinColumn(name = "user_id"))
	@Column(name = "module_id")
	@Getter @Setter
	private Set<Integer> enrolledModules;

	public User() {
		super();
	}

	public User(String forename, String surname, Integer studentNumber, String address, String phoneNumber,
				String emailAddress, Role role, Gender gender, String nationality) {
		super();
		this.forename = forename;
		this.surname = surname;
		this.studentNumber = studentNumber;
		this.address = address;
		this.phoneNumber = phoneNumber;
		this.emailAddress = emailAddress;
		this.role = role;
		this.gender = gender;
		this.nationality = nationality;
		this.enrolledModules = new HashSet<>();
	}

	public enum Role {
		STAFF, STUDENT
	}

	public enum Gender {
		MALE, FEMALE, OTHER
	}
}
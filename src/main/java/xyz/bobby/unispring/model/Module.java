package xyz.bobby.unispring.model;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import org.springframework.context.annotation.Lazy;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.Year;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Entity
@Table(name = "modules")
public class Module {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Getter
	private int id;

	@NotBlank
	@Length(min = 9, max = 9)
	@Getter @Setter
	private String code;

	@NotBlank
	@Getter @Setter
	private String name;

	@Column(nullable = false)
	@Getter @Setter
	private int coordinatorId;

	@NotBlank
	@Getter @Setter
	private String description;

	@Getter @Setter
	private Year year;

	@Enumerated(EnumType.STRING)
	@Column(columnDefinition = "ENUM('SPRING', 'SUMMER', 'AUTUMN')")
	@Getter @Setter
	private Trimester trimester;

	@Enumerated(EnumType.STRING)
	@Column(columnDefinition = "ENUM('AVAILABLE', 'FULL', 'TERMINATED')")
	@Getter @Setter
	private Status status;

	@Getter @Setter
	private String password;

	@NotNull
	@Getter @Setter
	private int capacity;

	@ManyToMany(fetch = FetchType.LAZY)
	@Getter @Setter
	private Set<User> students;

	@ManyToMany
	@Getter @Setter
	private List<Topic> topics;

	@OneToMany(fetch = FetchType.LAZY)
	@Getter @Setter
	private Set<Grade> grades;

	public enum Status {
		AVAILABLE, FULL, TERMINATED
	}

	public enum Trimester {
		SPRING, SUMMER, AUTUMN
	}
}

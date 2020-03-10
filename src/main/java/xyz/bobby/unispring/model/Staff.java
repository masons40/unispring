package xyz.bobby.unispring.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import java.util.HashSet;
import java.util.Set;


@EqualsAndHashCode(exclude = {"modules"}, callSuper = true)
@Data
@Entity
public class Staff extends User {
	@OneToMany(fetch = FetchType.LAZY)
	@JoinColumn(name = "coordinator_id")
	private final Set<Module> modules = new HashSet<>();
}

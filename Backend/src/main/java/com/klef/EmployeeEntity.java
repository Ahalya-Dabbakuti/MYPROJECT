package com.klef;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "employee") // explicitly set table name
public class EmployeeEntity {

    @Id
    private Long id;

    private String name;
    private String depart;
    private String jobTitle;

    public EmployeeEntity() {}

    public EmployeeEntity(String name, String depart, String jobTitle) {
        this.name = name;
        this.depart = depart;
        this.jobTitle = jobTitle;
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDepart() {
		return depart;
	}

	public void setDepart(String depart) {
		this.depart = depart;
	}

	public String getJobTitle() {
		return jobTitle;
	}

	public void setJobTitle(String jobTitle) {
		this.jobTitle = jobTitle;
	}

   
}

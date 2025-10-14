package com.klef;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepo employeeRepository;

    public List<EmployeeEntity> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Optional<EmployeeEntity> getEmployeeById(Long id) {
        return employeeRepository.findById(id);
    }

    public EmployeeEntity addEmployee(EmployeeEntity employee) {
        if (employeeRepository.existsById(employee.getId())) {
            throw new IllegalArgumentException("Employee with ID " + employee.getId() + " already exists.");
        }
        return employeeRepository.save(employee);
    }

    public EmployeeEntity updateEmployee(Long id, EmployeeEntity updatedEmployee) {
        return employeeRepository.findById(id).map(employee -> {
            employee.setName(updatedEmployee.getName());
            employee.setDepart(updatedEmployee.getDepart());
            employee.setJobTitle(updatedEmployee.getJobTitle());
            return employeeRepository.save(employee);
        }).orElseThrow(() -> new RuntimeException("Employee not found with ID " + id));
    }

    public void deleteEmployee(Long id) {
        if (!employeeRepository.existsById(id)) {
            throw new RuntimeException("Employee not found with ID " + id);
        }
        employeeRepository.deleteById(id);
    }
}

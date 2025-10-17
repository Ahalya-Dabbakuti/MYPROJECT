package com.klef;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employeeapi")
@CrossOrigin(origins = "*") 
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping("/")
    public String Demo(){
        return "Employee Full Stack Project";
    }

    @GetMapping("/view")
    public List<EmployeeEntity> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    @GetMapping("/get/{id}")
    public EmployeeEntity getEmployeeById(@PathVariable Long id) {
        return employeeService.getEmployeeById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with id " + id));
    }


    @PostMapping("/add")
    public ResponseEntity<?> addEmployee(@RequestBody EmployeeEntity employee) {
        try {
            EmployeeEntity added = employeeService.addEmployee(employee);
            return ResponseEntity.ok(added);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error adding employee");
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateEmployee(@PathVariable Long id, @RequestBody EmployeeEntity employee) {
        try {
            EmployeeEntity updated = employeeService.updateEmployee(id, employee);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error updating employee");
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable Long id) {
        try {
            employeeService.deleteEmployee(id);
            return ResponseEntity.ok("Employee deleted with ID " + id);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error deleting employee");
        }
    }
}

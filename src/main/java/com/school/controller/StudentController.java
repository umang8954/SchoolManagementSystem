package com.school.controller;

import com.school.dto.StudentDTO;
import com.school.service.StudentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * StudentController - REST endpoints for Student operations
 * Access Swagger UI at: http://localhost:8080/swagger-ui.html
 */
@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = {
    "http://localhost:3000",
    "http://localhost:5173",
    "https://school-management-ui.azurewebsites.net"
})
@Slf4j
@Tag(name = "Student Management", description = "APIs for managing students")
public class StudentController {
    
    private final StudentService studentService;
    
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }
    
    /**
     * Create a new student
     * POST /api/students
     */
    @PostMapping
    @Operation(summary = "Create a new student", description = "Creates a new student in the database")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Student created successfully",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = StudentDTO.class))),
        @ApiResponse(responseCode = "400", description = "Invalid input")
    })
    public ResponseEntity<StudentDTO> createStudent(@RequestBody StudentDTO studentDTO) {
        log.info("Creating student: {}", studentDTO.getEmail());
        StudentDTO created = studentService.createStudent(studentDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
    
    /**
     * Get all students
     * GET /api/students
     */
    @GetMapping
    @Operation(summary = "Get all students", description = "Retrieves all students from the database")
    @ApiResponse(responseCode = "200", description = "List of students")
    public ResponseEntity<List<StudentDTO>> getAllStudents() {
        log.info("Fetching all students");
        List<StudentDTO> students = studentService.getAllStudents();
        return ResponseEntity.ok(students);
    }
    
    /**
     * Get student by ID
     * GET /api/students/{id}
     */
    @GetMapping("/{id}")
    @Operation(summary = "Get student by ID", description = "Retrieves a student by their ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Student found"),
        @ApiResponse(responseCode = "404", description = "Student not found")
    })
    public ResponseEntity<StudentDTO> getStudentById(@PathVariable Long id) {
        log.info("Fetching student with ID: {}", id);
        StudentDTO student = studentService.getStudentById(id);
        return ResponseEntity.ok(student);
    }
    
    /**
     * Update a student
     * PUT /api/students/{id}
     */
    @PutMapping("/{id}")
    @Operation(summary = "Update a student", description = "Updates student information in the database")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Student updated successfully"),
        @ApiResponse(responseCode = "404", description = "Student not found")
    })
    public ResponseEntity<StudentDTO> updateStudent(@PathVariable Long id, @RequestBody StudentDTO studentDTO) {
        log.info("Updating student with ID: {}", id);
        StudentDTO updated = studentService.updateStudent(id, studentDTO);
        return ResponseEntity.ok(updated);
    }
    
    /**
     * Delete a student
     * DELETE /api/students/{id}
     */
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a student", description = "Deletes a student from the database")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Student deleted successfully"),
        @ApiResponse(responseCode = "404", description = "Student not found")
    })
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        log.info("Deleting student with ID: {}", id);
        studentService.deleteStudent(id);
        return ResponseEntity.noContent().build();
    }
}

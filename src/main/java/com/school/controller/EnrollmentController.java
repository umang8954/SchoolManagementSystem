package com.school.controller;

import com.school.dto.EnrollmentDTO;
import com.school.service.EnrollmentService;
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
 * EnrollmentController - REST endpoints for Enrollment operations
 * Access Swagger UI at: http://localhost:8080/swagger-ui.html
 */
@RestController
@RequestMapping("/api/enrollments")
@Slf4j
@Tag(name = "Enrollment Management", description = "APIs for managing student course enrollments")
public class EnrollmentController {
    
    private final EnrollmentService enrollmentService;
    
    public EnrollmentController(EnrollmentService enrollmentService) {
        this.enrollmentService = enrollmentService;
    }
    
    /**
     * Enroll a student in a course
     * POST /api/enrollments
     */
    @PostMapping
    @Operation(summary = "Enroll a student in a course", description = "Creates an enrollment record in the database")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Enrollment created successfully",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = EnrollmentDTO.class))),
        @ApiResponse(responseCode = "400", description = "Invalid input"),
    })
    public ResponseEntity<EnrollmentDTO> createEnrollment(@RequestBody EnrollmentDTO enrollmentDTO) {
        log.info("Creating enrollment for student ID: {} in course ID: {}", 
                enrollmentDTO.getStudentId(), enrollmentDTO.getCourseId());
        EnrollmentDTO created = enrollmentService.createEnrollment(enrollmentDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
    
    /**
     * Get all enrollments
     * GET /api/enrollments
     */
    @GetMapping
    @Operation(summary = "Get all enrollments", description = "Retrieves all enrollments from the database")
    @ApiResponse(responseCode = "200", description = "List of enrollments")
    public ResponseEntity<List<EnrollmentDTO>> getAllEnrollments() {
        log.info("Fetching all enrollments");
        List<EnrollmentDTO> enrollments = enrollmentService.getAllEnrollments();
        return ResponseEntity.ok(enrollments);
    }
    
    /**
     * Get enrollment by ID
     * GET /api/enrollments/{id}
     */
    @GetMapping("/{id}")
    @Operation(summary = "Get enrollment by ID", description = "Retrieves an enrollment by their ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Enrollment found"),
        @ApiResponse(responseCode = "404", description = "Enrollment not found"),
    })
    public ResponseEntity<EnrollmentDTO> getEnrollmentById(@PathVariable Long id) {
        log.info("Fetching enrollment with ID: {}", id);
        EnrollmentDTO enrollment = enrollmentService.getEnrollmentById(id);
        return ResponseEntity.ok(enrollment);
    }
    
    /**
     * Get all enrollments for a student
     * GET /api/enrollments/student/{studentId}
     */
    @GetMapping("/student/{studentId}")
    @Operation(summary = "Get enrollments by student ID", description = "Retrieves all enrollments for a specific student")
    @ApiResponse(responseCode = "200", description = "List of enrollments for the student")
    public ResponseEntity<List<EnrollmentDTO>> getEnrollmentsByStudentId(@PathVariable Long studentId) {
        log.info("Fetching enrollments for student ID: {}", studentId);
        List<EnrollmentDTO> enrollments = enrollmentService.getEnrollmentsByStudentId(studentId);
        return ResponseEntity.ok(enrollments);
    }
    
    /**
     * Update an enrollment
     * PUT /api/enrollments/{id}
     */
    @PutMapping("/{id}")
    @Operation(summary = "Update an enrollment", description = "Updates enrollment information in the database")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Enrollment updated successfully"),
        @ApiResponse(responseCode = "404", description = "Enrollment not found"),
    })
    public ResponseEntity<EnrollmentDTO> updateEnrollment(@PathVariable Long id, @RequestBody EnrollmentDTO enrollmentDTO) {
        log.info("Updating enrollment with ID: {}", id);
        EnrollmentDTO updated = enrollmentService.updateEnrollment(id, enrollmentDTO);
        return ResponseEntity.ok(updated);
    }
    
    /**
     * Delete an enrollment (student drops course)
     * DELETE /api/enrollments/{id}
     */
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete an enrollment", description = "Deletes an enrollment (student drops course) from the database")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Enrollment deleted successfully"),
        @ApiResponse(responseCode = "404", description = "Enrollment not found"),
    })
    public ResponseEntity<Void> deleteEnrollment(@PathVariable Long id) {
        log.info("Deleting enrollment with ID: {}", id);
        enrollmentService.deleteEnrollment(id);
        return ResponseEntity.noContent().build();
    }
}

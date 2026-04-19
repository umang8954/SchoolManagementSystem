package com.school.controller;

import com.school.dto.CourseDTO;
import com.school.service.CourseService;
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
 * CourseController - REST endpoints for Course operations
 * 
 * Access Swagger UI at: http://localhost:8080/swagger-ui.html
 */
@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = {
    "http://localhost:3000",
    "http://localhost:5173",
    "https://school-management-ui.azurewebsites.net"
})
@Slf4j
@Tag(name = "Course Management", description = "APIs for managing courses")
public class CourseController {
    
    private final CourseService courseService;
    
    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }
    
    /**
     * Create a new course
     * POST /api/courses
     */
    @PostMapping
    @Operation(summary = "Create a new course", description = "Creates a new course in the system")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Course created successfully",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = CourseDTO.class))),
        @ApiResponse(responseCode = "400", description = "Invalid input"),
    })
    public ResponseEntity<CourseDTO> createCourse(@RequestBody CourseDTO courseDTO) {
        log.info("Creating course: {}", courseDTO.getCourseCode());
        CourseDTO created = courseService.createCourse(courseDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
    
    /**
     * Get all courses
     * GET /api/courses
     */
    @GetMapping
    @Operation(summary = "Get all courses", description = "Retrieves all courses from the database")
    @ApiResponse(responseCode = "200", description = "List of courses")
    public ResponseEntity<List<CourseDTO>> getAllCourses() {
        log.info("Fetching all courses");
        List<CourseDTO> courses = courseService.getAllCourses();
        return ResponseEntity.ok(courses);
    }
    
    /**
     * Get course by ID
     * GET /api/courses/{id}
     */
    @GetMapping("/{id}")
    @Operation(summary = "Get course by ID", description = "Retrieves a course by their ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Course found"),
        @ApiResponse(responseCode = "404", description = "Course not found"),
    })
    public ResponseEntity<CourseDTO> getCourseById(@PathVariable Long id) {
        log.info("Fetching course with ID: {}", id);
        CourseDTO course = courseService.getCourseById(id);
        return ResponseEntity.ok(course);
    }
    
    /**
     * Update a course
     * PUT /api/courses/{id}
     */
    @PutMapping("/{id}")
    @Operation(summary = "Update a course", description = "Updates course information")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Course updated successfully"),
        @ApiResponse(responseCode = "404", description = "Course not found"),
    })
    public ResponseEntity<CourseDTO> updateCourse(@PathVariable Long id, @RequestBody CourseDTO courseDTO) {
        log.info("Updating course with ID: {}", id);
        CourseDTO updated = courseService.updateCourse(id, courseDTO);
        return ResponseEntity.ok(updated);
    }
    
    /**
     * Delete a course
     * DELETE /api/courses/{id}
     */
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a course", description = "Deletes a course from the system")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Course deleted successfully"),
        @ApiResponse(responseCode = "404", description = "Course not found"),
    })
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {
        log.info("Deleting course with ID: {}", id);
        courseService.deleteCourse(id);
        return ResponseEntity.noContent().build();
    }
}

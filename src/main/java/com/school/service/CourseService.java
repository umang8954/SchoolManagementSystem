package com.school.service;

import com.school.dto.CourseDTO;
import com.school.entity.Course;
import com.school.repository.CourseRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * CourseService - Business logic for Course operations
 */
@Service
@Slf4j
@Transactional
public class CourseService {
    
    private final CourseRepository courseRepository;
    
    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }
    
    /**
     * Create a new course
     */
    public CourseDTO createCourse(CourseDTO courseDTO) {
        Course course = new Course();
        BeanUtils.copyProperties(courseDTO, course);
        course.setCreatedAt(LocalDateTime.now());
        course.setUpdatedAt(LocalDateTime.now());
        
        Course savedCourse = courseRepository.save(course);
        log.info("Course created with ID: {}", savedCourse.getId());
        
        return convertToDTO(savedCourse);
    }
    
    /**
     * Get all courses
     */
    public List<CourseDTO> getAllCourses() {
        return courseRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Get course by ID
     */
    public CourseDTO getCourseById(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found with ID: " + id));
        return convertToDTO(course);
    }
    
    /**
     * Update an existing course
     */
    public CourseDTO updateCourse(Long id, CourseDTO courseDTO) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found with ID: " + id));
        
        BeanUtils.copyProperties(courseDTO, course, "id", "createdAt");
        course.setUpdatedAt(LocalDateTime.now());
        
        Course updatedCourse = courseRepository.save(course);
        log.info("Course updated with ID: {}", updatedCourse.getId());
        
        return convertToDTO(updatedCourse);
    }
    
    /**
     * Delete a course
     */
    public void deleteCourse(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found with ID: " + id));
        
        courseRepository.delete(course);
        log.info("Course deleted with ID: {}", id);
    }
    
    /**
     * Convert Course entity to CourseDTO
     */
    private CourseDTO convertToDTO(Course course) {
        CourseDTO dto = new CourseDTO();
        BeanUtils.copyProperties(course, dto);
        return dto;
    }
}

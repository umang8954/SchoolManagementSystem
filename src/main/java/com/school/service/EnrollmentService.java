package com.school.service;

import com.school.dto.EnrollmentDTO;
import com.school.entity.Enrollment;
import com.school.entity.Student;
import com.school.entity.Course;
import com.school.repository.EnrollmentRepository;
import com.school.repository.StudentRepository;
import com.school.repository.CourseRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

/**
 * EnrollmentService - Business logic for Enrollment operations
 */
@Service
@Slf4j
@Transactional
@SuppressWarnings("null")
public class EnrollmentService {
    
    private final EnrollmentRepository enrollmentRepository;
    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;
    
    public EnrollmentService(EnrollmentRepository enrollmentRepository,
                            StudentRepository studentRepository,
                            CourseRepository courseRepository) {
        this.enrollmentRepository = enrollmentRepository;
        this.studentRepository = studentRepository;
        this.courseRepository = courseRepository;
    }
    
    /**
     * Enroll a student in a course
     */
    public EnrollmentDTO createEnrollment(EnrollmentDTO enrollmentDTO) {
        Enrollment enrollment = new Enrollment();
        BeanUtils.copyProperties(enrollmentDTO, enrollment);
        
        // Set default values if not provided
        if (enrollment.getEnrollmentStatus() == null) {
            enrollment.setEnrollmentStatus("ACTIVE");
        }
        if (enrollment.getGrade() == null) {
            enrollment.setGrade(0.0);
        }
        if (enrollment.getEnrollmentDate() == null) {
            enrollment.setEnrollmentDate(LocalDate.now());
        }
        
        enrollment.setCreatedAt(LocalDateTime.now());
        enrollment.setUpdatedAt(LocalDateTime.now());
        
        Enrollment savedEnrollment = enrollmentRepository.save(enrollment);
        log.info("Enrollment created with ID: {}", savedEnrollment.getId());
        
        return convertToDTO(savedEnrollment);
    }
    
    /**
     * Get all enrollments
     */
    public List<EnrollmentDTO> getAllEnrollments() {
        return enrollmentRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Get enrollment by ID
     */
    public EnrollmentDTO getEnrollmentById(Long id) {
        Enrollment enrollment = enrollmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Enrollment not found with ID: " + id));
        return convertToDTO(enrollment);
    }
    
    /**
     * Get all enrollments for a student
     */
    public List<EnrollmentDTO> getEnrollmentsByStudentId(Long studentId) {
        return enrollmentRepository.findByStudentId(studentId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Update an enrollment
     */
    public EnrollmentDTO updateEnrollment(Long id, EnrollmentDTO enrollmentDTO) {
        Enrollment enrollment = enrollmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Enrollment not found with ID: " + id));
        
        BeanUtils.copyProperties(enrollmentDTO, enrollment, "id", "createdAt", "enrollmentDate");
        enrollment.setUpdatedAt(LocalDateTime.now());
        
        Enrollment updatedEnrollment = enrollmentRepository.save(enrollment);
        log.info("Enrollment updated with ID: {}", updatedEnrollment.getId());
        
        return convertToDTO(updatedEnrollment);
    }
    
    /**
     * Delete an enrollment (student drops course)
     */
    public void deleteEnrollment(Long id) {
        Enrollment enrollment = enrollmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Enrollment not found with ID: " + id));
        
        enrollmentRepository.delete(enrollment);
        log.info("Enrollment deleted with ID: {}", id);
    }
    
    /**
     * Convert Enrollment entity to EnrollmentDTO
     * Fetches student name and course name from database
     */
    private EnrollmentDTO convertToDTO(Enrollment enrollment) {
        EnrollmentDTO dto = new EnrollmentDTO();
        BeanUtils.copyProperties(enrollment, dto);
        
        // Fetch student name
        if (enrollment.getStudentId() != null) {
            Student student = studentRepository.findById(enrollment.getStudentId()).orElse(null);
            if (student != null) {
                dto.setStudentName(student.getFirstName() + " " + student.getLastName());
            } else {
                dto.setStudentName("N/A");
            }
        }
        
        // Fetch course name
        if (enrollment.getCourseId() != null) {
            Course course = courseRepository.findById(enrollment.getCourseId()).orElse(null);
            if (course != null) {
                dto.setCourseName(course.getCourseName());
            } else {
                dto.setCourseName("N/A");
            }
        }
        
        return dto;
    }
}

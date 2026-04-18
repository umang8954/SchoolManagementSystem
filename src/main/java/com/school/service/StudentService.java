package com.school.service;

import com.school.dto.StudentDTO;
import com.school.entity.Student;
import com.school.repository.StudentRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * StudentService - Business logic for Student operations
 * 
 * This service performs CRUD operations on students
 */
@Service
@Slf4j
@Transactional
@SuppressWarnings("null")
public class StudentService {
    
    private final StudentRepository studentRepository;
    
    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }
    
    /**
     * Create a new student
     * Saves the student to database
     */
    public StudentDTO createStudent(StudentDTO studentDTO) {
        Student student = new Student();
        BeanUtils.copyProperties(studentDTO, student);
        student.setCreatedAt(LocalDateTime.now());
        student.setUpdatedAt(LocalDateTime.now());
        
        Student savedStudent = studentRepository.save(student);
        log.info("Student created with ID: {}", savedStudent.getId());
        
        return convertToDTO(savedStudent);
    }
    
    /**
     * Get all students
     */
    public List<StudentDTO> getAllStudents() {
        return studentRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Get student by ID
     */
    public StudentDTO getStudentById(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with ID: " + id));
        return convertToDTO(student);
    }
    
    /**
     * Update an existing student
     */
    public StudentDTO updateStudent(Long id, StudentDTO studentDTO) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with ID: " + id));
        
        BeanUtils.copyProperties(studentDTO, student, "id", "createdAt");
        student.setUpdatedAt(LocalDateTime.now());
        
        Student updatedStudent = studentRepository.save(student);
        log.info("Student updated with ID: {}", updatedStudent.getId());
        
        return convertToDTO(updatedStudent);
    }
    
    /**
     * Delete a student
     */
    public void deleteStudent(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with ID: " + id));
        
        studentRepository.delete(student);
        log.info("Student deleted with ID: {}", id);
    }
    
    /**
     * Convert Student entity to StudentDTO
     */
    private StudentDTO convertToDTO(Student student) {
        StudentDTO dto = new StudentDTO();
        BeanUtils.copyProperties(student, dto);
        return dto;
    }
}

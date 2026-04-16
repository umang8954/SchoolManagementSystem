package com.school.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

/**
 * EnrollmentDTO - Data Transfer Object for Enrollment
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EnrollmentDTO {
    private Long id;
    private Long studentId;
    private Long courseId;
    private String enrollmentStatus;
    private Double grade;
    
    // Accept both date and datetime formats
    @JsonFormat(pattern = "yyyy-MM-dd", shape = com.fasterxml.jackson.annotation.JsonFormat.Shape.STRING)
    private LocalDate enrollmentDate;
    
    private String studentName;
    private String courseName;
}

package com.school.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * CourseDTO - Data Transfer Object for Course
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseDTO {
    private Long id;
    private String courseName;
    private String courseCode;
    private String description;
    private Integer credits;
    private String instructor;
}

package com.school.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * StudentDTO - Data Transfer Object for Student
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String grade;
    private String phone;
    private String dateOfBirth;
}

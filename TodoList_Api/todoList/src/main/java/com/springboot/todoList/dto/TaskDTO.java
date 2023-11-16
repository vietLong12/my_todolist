package com.springboot.todoList.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskDTO {
    private Integer id;
    private String taskName;
    private String taskInit;
    private String taskTime;
    private Boolean isCompleted;
    private Boolean isImportant;
    private Integer accountId;



}

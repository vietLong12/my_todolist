package com.springboot.todoList.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "tasks")
public class TaskEntity {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "task_name")
    private String taskName;
    @Column(name = "task_init")
    private String taskInit;
    @Column(name = "task_time")
    private String taskTime;
    @Column(name = "is_completed")
    private Boolean isCompleted;
    @Column(name = "is_important")
    private Boolean isImportant;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "account_id", nullable = false)
    private AccountEntity accountEntity;
}

package com.springboot.todoList.service;

import com.springboot.todoList.dto.TaskDTO;
import com.springboot.todoList.entity.AccountEntity;
import com.springboot.todoList.entity.TaskEntity;

import java.util.ArrayList;
import java.util.List;

public interface ITaskService {
    List<TaskDTO> findAllByUsername(String username);

    TaskDTO createTask(TaskDTO taskDTO);

    String updateTask(TaskDTO taskDTO);
    List<TaskDTO> changeAllCompleted(String username);

    String changeImportant(Integer id);

    String changeCompleted(Integer id);

    String deleteById(Integer id);

    String deleteAllTask(String username);
    List<TaskDTO> searchTasks(String username,String query);

    List<TaskDTO> sortWithImportant(String username);

    List<TaskDTO> sortWithDeadline(String username);

}

package com.springboot.todoList.service.impl;

import com.springboot.todoList.dto.TaskDTO;
import com.springboot.todoList.entity.AccountEntity;
import com.springboot.todoList.entity.TaskEntity;
import com.springboot.todoList.repository.AccountRepository;
import com.springboot.todoList.repository.TaskRepository;
import com.springboot.todoList.service.ITaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.todo.list.mapper.TaskMapping;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@RequiredArgsConstructor
public class TaskService implements ITaskService {
    private final TaskRepository taskRepository;
    private final AccountRepository accountRepository;

    @Override
    public List<TaskDTO> findAllByUsername(String username) {
        List<TaskDTO> result = new ArrayList<>();
        AccountEntity accountEntity = accountRepository.findByUsername(username);
        if (accountEntity == null) {
            return result;
        }
        List<TaskEntity> list = taskRepository.findAllByUsername(username);
        for (TaskEntity taskEntity : list) {
            result.add(TaskMapping.toDTO(taskEntity));
        }
        return result;
    }

    public TaskDTO createTask(TaskDTO taskDTO) {
        Integer accountId = taskDTO.getAccountId();
        if (accountId == null || accountId < -1) {
            return null;
        }
        Optional<AccountEntity> accountEntityOptional = accountRepository.findById(accountId);
        if (accountEntityOptional.isPresent()) {
            AccountEntity accountEntity = accountEntityOptional.get();
            TaskEntity taskEntity = TaskMapping.toEntity(taskDTO);
            taskEntity.setId(-1);
            taskEntity.setAccountEntity(accountEntity);
            taskEntity.setIsCompleted(false);
            taskEntity.setIsImportant(false);
            TaskEntity savedEntity = taskRepository.save(taskEntity);
            return TaskMapping.toDTO(savedEntity);
        }
        return null;
    }

    @Override
    public String updateTask(TaskDTO taskDTO) {
        TaskEntity taskEntityResult = null;
        TaskEntity taskEntity = TaskMapping.toEntity(taskDTO);
        Optional<AccountEntity> accountEntity = accountRepository.findById(taskDTO.getAccountId());
        if (accountEntity.isPresent()) {
            AccountEntity result = accountEntity.get();
            taskEntity.setAccountEntity(result);
            taskEntityResult = taskRepository.save(taskEntity);
            return "updated";
        }


        return "update fail";
    }

    @Override
    public List<TaskDTO> changeAllCompleted(String username) {
        List<TaskDTO> result = new ArrayList<>();
        AccountEntity accountEntity = accountRepository.findByUsername(username);
        if (accountEntity == null) {
            return result;
        }
        List<TaskEntity> list = taskRepository.findAllByUsername(username);
        for (TaskEntity taskEntity : list) {
            taskEntity.setIsCompleted(true);
            result.add(TaskMapping.toDTO(taskEntity));
            taskRepository.save(taskEntity);
        }
        return result;
    }

    @Override
    public String changeImportant(Integer id) {
        Optional<TaskEntity> taskEntity = taskRepository.findById(id);
        if (taskEntity.isPresent()) {
            TaskEntity result = taskEntity.get();
            result.setIsImportant(!result.getIsImportant());
            taskRepository.save(result);
            return "Success";
        }
        return "fail";
    }

    @Override
    public String changeCompleted(Integer id) {
        Optional<TaskEntity> taskEntity = taskRepository.findById(id);
        if (taskEntity.isPresent()) {
            TaskEntity result = taskEntity.get();
            result.setIsCompleted(!result.getIsCompleted());
            taskRepository.save(result);
            return "Success";
        }
        return "fail";
    }

    @Override
    public String deleteById(Integer id) {
        Optional<TaskEntity> taskEntity = taskRepository.findById(id);
        if (taskEntity.isPresent()) {
            taskRepository.deleteById(id);
            return "Success";
        }
        return "fail";
    }

    @Override
    public String deleteAllTask(String username) {
        AccountEntity accountEntity = accountRepository.findByUsername(username);
        if (accountEntity == null) {
            return "fail";
        }
        List<TaskEntity> list = taskRepository.findAllByUsername(username);
        for (TaskEntity taskEntity : list) {
            if (taskEntity.getIsCompleted()) {
                taskRepository.deleteById(taskEntity.getId());
            }
        }
        return "Deleted";
    }

    @Override
    public List<TaskDTO> searchTasks(String username, String query) {
        List<TaskDTO> result = new ArrayList<>();
        AccountEntity accountEntity = accountRepository.findByUsername(username);
        if (accountEntity == null) {
            return result;
        }
        List<TaskEntity> list = taskRepository.findAllByUsername(username);
        for (TaskEntity taskEntity : list) {
            if (taskEntity.getTaskName().toLowerCase().contains(query.toLowerCase())) {
                result.add(TaskMapping.toDTO(taskEntity));
            }
        }
        return result;
    }

    @Override
    public List<TaskDTO> sortWithImportant(String username){
        List<TaskDTO> result = new ArrayList<>();
        AccountEntity accountEntity = accountRepository.findByUsername(username);
        if (accountEntity == null) {
            return result;
        }
        List<TaskEntity> list = taskRepository.findAllByUsername(username);
        for (TaskEntity taskEntity : list) {
                result.add(TaskMapping.toDTO(taskEntity));
        }
        result.sort((a, b) -> Boolean.compare(a.getIsImportant(), b.getIsImportant()));
        Collections.reverse(result);
        return result;
    }
    @Override
    public List<TaskDTO> sortWithDeadline(String username){
        List<TaskDTO> result = new ArrayList<>();
        AccountEntity accountEntity = accountRepository.findByUsername(username);
        if (accountEntity == null) {
            return result;
        }
        List<TaskEntity> list = taskRepository.findAllByUsername(username);
        for (TaskEntity taskEntity : list) {
            result.add(TaskMapping.toDTO(taskEntity));
        }

        result.sort((a, b) -> CharSequence.compare(a.getTaskTime(), b.getTaskTime()));
        return result;
    }
}




package com.todo.list.mapper;

import com.springboot.todoList.dto.TaskDTO;
import com.springboot.todoList.entity.TaskEntity;
import org.springframework.beans.BeanUtils;

public class TaskMapping {

    public static TaskDTO toDTO(TaskEntity taskEntity){
        TaskDTO dto = new TaskDTO();
        BeanUtils.copyProperties(taskEntity, dto);
        dto.setAccountId(taskEntity.getAccountEntity().getId());
        return dto;
    }


    public static TaskEntity toEntity(TaskDTO taskDTO){
        TaskEntity entity = new TaskEntity();
        BeanUtils.copyProperties(taskDTO, entity);
        return entity;
    }
}

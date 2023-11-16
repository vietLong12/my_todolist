package com.todo.list.mapper;

import com.springboot.todoList.dto.AccountDTO;
import com.springboot.todoList.dto.TaskDTO;
import com.springboot.todoList.entity.AccountEntity;
import com.springboot.todoList.entity.TaskEntity;
import org.springframework.beans.BeanUtils;

public class AccountMapping {

    public static AccountDTO toDTO(AccountEntity accountEntity){
        AccountDTO dto = new AccountDTO();
        BeanUtils.copyProperties(accountEntity, dto);
        dto.setId(accountEntity.getId());
        return dto;
    }


    public static AccountEntity toEntity(AccountDTO accountDTO){
        AccountEntity entity = new AccountEntity();
        BeanUtils.copyProperties(accountDTO, entity);
        return entity;
    }
}

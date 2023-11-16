package com.springboot.todoList.service.impl;

import com.springboot.todoList.dto.AccountDTO;
import com.springboot.todoList.dto.TaskDTO;
import com.springboot.todoList.entity.AccountEntity;
import com.springboot.todoList.repository.AccountRepository;
import com.springboot.todoList.service.IAccountService;
import com.springboot.todoList.service.ITaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.config.Task;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AccountService implements IAccountService {
    private final AccountRepository accountRepository;

    @Override
    public String findAccountByUsernameAndPassword(String username, String password) {
        AccountEntity accountEntity = accountRepository.findByUsernameAndPassword(username,password);
        if(accountEntity != null){
            return accountEntity.getId() + "";
        }

        return "not exist";
    }

    public String forgetPassword(String username, String email) {
        AccountEntity accountEntity = accountRepository.findByUsernameAndEmail(username, email);
        if (accountEntity != null) {
            return accountEntity.getPassword();
        }
        return "not found";
    }

    @Override
    public String createAccount(AccountDTO accountDTO) {
        AccountEntity result = accountRepository.findByUsername(accountDTO.getUsername());
        if (result == null) {
            AccountEntity accountEntity = com.todo.list.mapper.AccountMapping.toEntity(accountDTO);
            accountEntity.setId(-1);
            accountRepository.save(accountEntity);
            return "success";
        } else {
            return "fail";
        }

    }
}

package com.springboot.todoList.service;

import com.springboot.todoList.dto.AccountDTO;
import com.springboot.todoList.entity.AccountEntity;

public interface IAccountService {
    String findAccountByUsernameAndPassword(String username, String password);

    String forgetPassword(String username, String email);
    String createAccount(AccountDTO accountDTO);
}

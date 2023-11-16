package com.springboot.todoList.controller;

import com.springboot.todoList.dto.AccountDTO;
import com.springboot.todoList.dto.TaskDTO;
import com.springboot.todoList.entity.AccountEntity;
import com.springboot.todoList.service.IAccountService;
import com.springboot.todoList.service.ITaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/login")
@CrossOrigin(origins = {"*"})
@RequiredArgsConstructor
public class AccountController {
    private final ITaskService taskService;
    private final IAccountService accountService;

    @PostMapping
    public String createAccount(@RequestBody AccountDTO accountDTO) {
        return accountService.createAccount(accountDTO);
    }

    @GetMapping("/checkLogin/{username}/{password}")
    public String checkLogin(@PathVariable("username") String username, @PathVariable("password") String password) {
        return accountService.findAccountByUsernameAndPassword(username, password);
    }

    @PostMapping("findPassword/{username}/{email}")
    public String findPassword(@PathVariable("username") String username, @PathVariable("email") String email) {
        return accountService.forgetPassword(username, email);
    }
}

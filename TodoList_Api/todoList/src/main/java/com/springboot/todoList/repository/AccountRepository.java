package com.springboot.todoList.repository;

import com.springboot.todoList.entity.AccountEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AccountRepository extends JpaRepository<AccountEntity, Integer> {
    AccountEntity findByUsername(String username);

    AccountEntity findByUsernameAndEmail(String username, String email);

    AccountEntity findByUsernameAndPassword(String username, String password);

}

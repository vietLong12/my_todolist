package com.springboot.todoList.repository;

import com.springboot.todoList.entity.AccountEntity;
import com.springboot.todoList.entity.TaskEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TaskRepository extends JpaRepository<TaskEntity, Integer> {

    @Query(value = "select t.* from tasks t, accounts a where a.id = t.account_id and a.username = :username", nativeQuery = true)
    List<TaskEntity> findAllByUsername(@Param("username") String username);

    @Query(value = "select * from tasks t, accounts a where t.task_name = :query and a.username = :username", nativeQuery = true)
    List<TaskEntity> searchByTaskname(@Param("username") String username, @Param("query") String query);

}

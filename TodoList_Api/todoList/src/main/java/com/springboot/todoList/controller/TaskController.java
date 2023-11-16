package com.springboot.todoList.controller;

import com.springboot.todoList.dto.TaskDTO;
import com.springboot.todoList.service.IAccountService;
import com.springboot.todoList.service.ITaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
@CrossOrigin("*")
public class TaskController {
    private final ITaskService taskService;
    private final IAccountService accountService;

    @GetMapping("{username}")
    public List<TaskDTO> getAllTaskByUsername(@PathVariable("username") String username) {
        return taskService.findAllByUsername(username);
    }
    @GetMapping("/changeCompleteAll/{username}")
    public List<TaskDTO> changeCompleteAll(@PathVariable("username") String username) {
        return taskService.changeAllCompleted(username);
    }
    @PutMapping("/changeImportant/{id}")
    public String changeImportant(@PathVariable("id") Integer id) {
        return taskService.changeImportant(id);
    }
    @PutMapping("/changeCompleted/{id}")
    public String changeCompleted(@PathVariable("id") Integer id) {
        return taskService.changeCompleted(id);
    }

    @PostMapping
    public TaskDTO createTask(@RequestBody TaskDTO taskDTO) {
        return taskService.createTask(taskDTO);
    }

    @PutMapping("/updateTask")
    private String updateTask(@RequestBody TaskDTO taskDTO){
        return taskService.updateTask(taskDTO);
    }

    @DeleteMapping("/delete/{id}")
    private String deleteTask(@PathVariable("id") Integer id){
        return taskService.deleteById(id);
    }
    @DeleteMapping("deleteAll/{username}")
    private String deleteAllTask(@PathVariable("username") String username){
        return taskService.deleteAllTask(username);
    }
    @PostMapping("search/{username}/{query}")
    private List<TaskDTO> searchTasks(@PathVariable("query")String query, @PathVariable("username") String username){
        return taskService.searchTasks(username, query);
    }
    @GetMapping("sortWithImportant/{username}")
    private List<TaskDTO> sortWithImportant(@PathVariable("username") String username){
        return taskService.sortWithImportant(username);
    }
    @GetMapping("sortWithDeadline/{username}")
    private List<TaskDTO> sortWithDeadline(@PathVariable("username") String username){
        return taskService.sortWithDeadline(username);
    }

}

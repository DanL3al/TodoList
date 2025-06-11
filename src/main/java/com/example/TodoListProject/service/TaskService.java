package com.example.TodoListProject.service;

import com.example.TodoListProject.model.Task;
import com.example.TodoListProject.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> findAll() {
        return taskRepository.findAll();
    }

    public Task addTask(Task task) {
        return taskRepository.save(task);
    }

    public Task findTaskById(Long id) {
        return taskRepository.findById(id).get();
    }

    public void deleteTaskById(Long id) {
        Task task = findTaskById(id);
        taskRepository.delete(task);
    }

    public void updateTaskById(Long taskId,Task task) {
        Task task1 = findTaskById(taskId);
        task1.setTaskName(task.getTaskName());
        task1.setCompleted(task.isCompleted());
        taskRepository.save(task1);
    }

    public void updateTaskStatus(Long taskId,boolean status) {
        Task task = findTaskById(taskId);
        task.setCompleted(status);
        taskRepository.save(task);
    }
}

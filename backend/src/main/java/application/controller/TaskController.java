package application.controller;

import application.model.tasks.Task;
import application.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class TaskController {
    @Autowired
    private TaskService taskService;

    @GetMapping("/task")
    public List<Task> findAll() {
        return taskService.findAll();
    }

    @PostMapping(path = "/task",
            consumes = MediaType.APPLICATION_JSON_VALUE)
    public Task addTask(@RequestBody Task task) {
        taskService.addTask(task);
        return task;
    }
  
    @PutMapping("/task/{id}/previous")
    Task addPreviousTask(@RequestBody Task previousTask, @PathVariable Long id) {
            return taskService.addPreviousTask(id, previousTask);
    }

    @DeleteMapping("/task/{id}/previous")
    public void deletePreviousTask(@RequestBody Task previousTask, @PathVariable Long id) {
        taskService.deletePreviousTask(id, previousTask);
    }

    @PutMapping("/task/{id}")
    Task updateTask(@RequestBody Task newTask, @PathVariable Long id) {
        return taskService.updateTask(id, newTask);
    }

    @PutMapping("/task/{id}/check")
    Task setTaskFinishedValue(@PathVariable Long id) {
        return taskService.setTaskFinished(id, true);
    }

    @PutMapping("/task/{id}/uncheck")
    Task setTaskUnfinishedValue(@PathVariable Long id) {
        return taskService.setTaskFinished(id, false);
    }

    @DeleteMapping("/task/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
    }

    @GetMapping("/task/{id}")
    public Task getTask(@PathVariable Long id) {
        return taskService.getTask(id);
    }

    @GetMapping("/task/{startDate}/{endDate}")
    public List<Task> getTaskInGivenPeriodOfTime(@PathVariable String startDate, @PathVariable  String endDate) {
        return  taskService.getTasksInGivenPeriodOfTime(startDate, endDate);
    }

    @GetMapping("/task/tag/{tagName}")
    public List<Task> getTaskByTagName(@PathVariable String tagName) {
        return taskService.getTasksByTagName(tagName);
    }

    @PutMapping("/task/{id}/alternative")
    Task addAlternativeTask(@RequestBody Task alternativeTask, @PathVariable Long id) {
        return taskService.addAlternativeTask(id, alternativeTask);
    }

    @DeleteMapping("/task/{id}/alternative")
    public void deleteAlternativeTask(@RequestBody Task alternativeTask, @PathVariable Long id) {
        taskService.deleteAlternativeTask(id, alternativeTask);
    }
}


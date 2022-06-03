package application.service;

import application.model.tasks.SubTask;
import application.model.tasks.Task;
import application.payroll.TaskCanNotBeFinishedException;
import application.payroll.TaskNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import application.repository.TaskRepository;

import java.util.List;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    public List<Task> findAll() {
        return taskRepository.findAll();
    }

    public void addTask(Task task) {
        for (SubTask subTask : task.getSubTasks()) {
            subTask.setMainTask(task);
        }

        setTaskPreviousTasks(task, task);
        taskRepository.save(task);
    }

    public Task getTask(Long id) throws TaskNotFoundException {
        return taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException(id));
    }

    public Task addPreviousTask(Long id, Task previousTask) throws TaskNotFoundException {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException(id));
        task.addPreviousTask(previousTask);

        return taskRepository.save(task);
    }

    public void deletePreviousTask(Long id, Task previousTask) throws TaskNotFoundException {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException(id));
        task.removePreviousTask(previousTask);

        taskRepository.save(task);
    }

    public Task updateTask(Long id, Task newTask) throws TaskNotFoundException {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException(id));
        task.setName(newTask.getName());
        task.setDescription(newTask.getDescription());
        task.setDate(newTask.getDate());
        task.setSubTasks(newTask.getSubTasks());
        task.setTags(newTask.getTags());
        setTaskPreviousTasks(task, newTask);
        if (newTask.isFinished()) {
            task.setFinished();
        } else {
            task.setUnfinished();
        }

        return taskRepository.save(task);
    }

    public void deleteTask(Long id) {
        List<Task> dependentTasks = taskRepository.getDependentTasks(id);
        Task previousTask = taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException(id));
        for (Task task : dependentTasks) {
            deletePreviousTask(task.getId(), previousTask);
        }
        taskRepository.deleteById(id);
    }

    public Task setTaskFinished(Long id, boolean checked) throws TaskNotFoundException, TaskCanNotBeFinishedException {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException(id));
        if (checked) {
            task.setFinished();
            if (task.canBeFinished()) {
                task.setFinished();
            } else {
                throw new TaskCanNotBeFinishedException(task.getName());
            }
        } else {
            task.setUnfinished();
        }
        return taskRepository.save(task);
    }

    public List<Task> getTasksInGivenPeriodOfTime(String startDate, String endDate) {
        return taskRepository.getTasksByTime(startDate, endDate);
    }

    public void setTaskPreviousTasks(Task task, Task newTask) {
        List<Task> prevTasks = List.copyOf(newTask.getPreviousTasks());
        task.clearPreviousTasks();

        for (Task prevTask : prevTasks) {
            Long id = prevTask.getId();
            Task foundTask = taskRepository.findById(id)
                    .orElseThrow(() -> new TaskNotFoundException(id));
            task.addPreviousTask(foundTask);
        }
    }

    public List<Task> getTasksByTagName(String tagName) {
        return taskRepository.getTasksByTagName(tagName);
    }
}

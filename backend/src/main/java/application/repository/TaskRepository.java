package application.repository;

import application.model.tasks.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    @Query("from Task where date > :startDate and date < :endDate ")
    List<Task> getTasksByTime(String startDate, String endDate);

    @Query("from Task task join task.previousTasks prevTask where prevTask.id = :prevTaskId")
    List<Task> getDependentTasks(Long prevTaskId);

    @Query("from Task task join task.tags tag where tag.tagName = :tagName")
    List<Task> getTasksByTagName(String tagName);
}

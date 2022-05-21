package application.model.tasks;

import application.Commons;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@Table(name = Commons.SUBTASKS)
public class SubTask implements Completable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
    private boolean isFinished;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = Commons.TASK_ID, nullable = false)
    private Task mainTask;

    public SubTask() {
    }

    public SubTask(Long id, String name, Task mainTask) {
        this.id = id;
        this.name = name;
        this.mainTask = mainTask;
        this.isFinished = false;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setMainTask(Task mainTask) {
        this.mainTask = mainTask;
    }

    @Override
    public boolean isFinished() {
        return isFinished;
    }

    @Override
    public void setFinished() {
        isFinished = true;
    }

    @Override
    public void setUnfinished() {
        isFinished = false;
    }

    public void setFinishedValue(boolean value) {
        isFinished = value;
    }

    public Task getMainTask() {
        return mainTask;
    }
}

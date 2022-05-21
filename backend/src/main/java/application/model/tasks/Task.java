package application.model.tasks;

import application.Commons;
import application.model.tag.Tag;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = Commons.TASKS)
public class Task implements Completable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
    private String description;
    private String date;
    private boolean isFinished;

    @ManyToMany(
            cascade = CascadeType.ALL
    )
    private List<Task> previousTasks = new ArrayList<>();

    @OneToMany(
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @OrderBy("id")
    private List<SubTask> subTasks = new ArrayList<>();

    @Getter
    @Setter
    @ManyToMany
    private List<Tag> tags = new ArrayList<>();

    public Task() {
    }

    public Task(Long id, String name, String description, String date, List<SubTask> subTasks) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.date = date;
        this.isFinished = false;
        this.subTasks = subTasks;
    }

    public Task(Long id, String name, String date) {
        this(id, name, "no description", date, new ArrayList<>());
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
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

    public List<SubTask> getSubTasks() {
        return subTasks;
    }

    public void setPreviousTasks(List<Task> previousTasks) {
        this.previousTasks = previousTasks;
    }

    public void clearPreviousTasks() {
        this.previousTasks.clear();
    }

    public void setSubTasks(List<SubTask> subTasks) {
        for (SubTask newSubTask : subTasks) {
            for (SubTask oldSubTask : this.subTasks) {
                if (newSubTask.getName().equals(oldSubTask.getName())) {
                    newSubTask.setFinishedValue(oldSubTask.isFinished());
                }
            }
        }

        this.subTasks.retainAll(subTasks);
        this.subTasks.addAll(subTasks);
        for (SubTask subTask : this.subTasks) {
            subTask.setMainTask(this);
        }
    }

    public void addSubTask(SubTask subTask) {
        if (subTasks == null) {
            subTasks = new LinkedList<>();
        }
        subTasks.add(subTask);
    }

    public void removeSubTask(SubTask subTask) {
        if (subTasks.size() == 1) {
            subTasks = null;
        } else {
            subTasks.remove(subTask);
        }
    }

    public List<Task> getPreviousTasks() {
        return previousTasks;
    }

    public void addPreviousTask(Task previousTask) {
        this.previousTasks.add(previousTask);
    }

    public void removePreviousTask(Task previousTask) {
        this.previousTasks.remove(previousTask);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Task task = (Task) o;
        return isFinished == task.isFinished &&
                Objects.equals(id, task.id) &&
                Objects.equals(name, task.name) &&
                Objects.equals(description, task.description) &&
                Objects.equals(date, task.date) &&
                Objects.equals(previousTasks, task.previousTasks) &&
                Objects.equals(subTasks, task.subTasks);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, description, date, isFinished, previousTasks, subTasks);
    }

    public boolean canBeFinished() {
        for (Task previousTask : previousTasks) {
            if (!previousTask.isFinished) {
                return false;
            }
        }
        return true;
    }

    public void addTag(Tag tag) {
        tags.add(tag);
    }

    public void removeTag(Tag tag) {
        tags.remove(tag);
    }
}

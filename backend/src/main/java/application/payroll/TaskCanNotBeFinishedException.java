package application.payroll;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.FORBIDDEN, reason = "Task can not be finished")
public class TaskCanNotBeFinishedException extends RuntimeException {

    public TaskCanNotBeFinishedException(String name) {
        super(String.format("Task %s can not be finished", name));
    }
}

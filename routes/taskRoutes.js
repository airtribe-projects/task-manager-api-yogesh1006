const express = require("express");
const router = express.Router();

const tasks = require("../task.json");

//get all tasks
router.get("/tasks", (req, res) => {
	const { completed } = req.query;
	// Implement filtering by completion status for GET /tasks (e.g., GET /tasks?completed=true).
	if (typeof completed !== "undefined") {
		const isCompleted = completed === "true";
		const filteredTasks = tasks.filter(
			(task) => task.completed === isCompleted,
		);
		return res.status(200).json(filteredTasks);
	}

	//Implement sorting by creation date for GET /tasks.
	const { sort } = req.query;
	if (sort === "asc") {
		const sortedTasksAsc = [...tasks].sort((a, b) => a.createdAt - b.createdAt);
		return res.status(200).json(sortedTasksAsc);
	} else if (sort === "desc") {
		const sortedTasksDesc = [...tasks].sort(
			(a, b) => b.createdAt - a.createdAt,
		);
		return res.status(200).json(sortedTasksDesc);
	}

	res.status(200).json(tasks);
});

// get a tasks by priority
router.get("/tasks/priority/:level", (req, res) => {
	const priorityLevel = req.params.level;
	const filteredTasks = tasks.filter((task) => task.priority === priorityLevel);
	res.status(200).json(filteredTasks);
});

// get a task by id
router.get("/tasks/:id", (req, res) => {
	const taskId = parseInt(req.params.id);
	const task = tasks.find((t) => t.id === taskId);

	if (!task) {
		return res.status(404).json({ message: "Task not found" });
	}
	res.status(200).json(task);
});

//create a new task
router.post("/tasks", (req, res) => {
	const { title, description, completed, priority } = req.body;

	if (!title || !description) {
		return res
			.status(400)
			.json({ message: "Title and description are required" });
	}

	if (typeof completed !== "undefined" && typeof completed !== "boolean") {
		return res
			.status(400)
			.json({ message: "Completed must be a boolean value" });
	}

	const newTask = {
		id: tasks.length + 1,
		title,
		description,
		completed: completed || false,
		priority: priority || "medium",
		createdAt: new Date(),
	};

	tasks.push(newTask);

	res.status(201).json({
		message: "Task created successfully",
		task: newTask,
	});
});

// update a task by id
router.put("/tasks/:id", (req, res) => {
	const taskId = parseInt(req.params.id);
	const task = tasks.find((t) => t.id === taskId);

	if (!task) {
		return res.status(404).json({ message: "Task not found" });
	}

	const { title, description, completed, priority } = req.body;

	if (!title || !description) {
		return res
			.status(400)
			.json({ message: "Title and description are required" });
	}

	if (typeof completed !== "undefined" && typeof completed !== "boolean") {
		return res
			.status(400)
			.json({ message: "Completed must be a boolean value" });
	}
	task.title = title ?? task.title;
	task.description = description ?? task.description;
	task.completed = completed ?? task.completed;
	task.priority = priority ?? task.priority;
	task.createdAt = createdAt ?? task.createdAt;
	res.status(200).json({
		message: "Task updated successfully",
		task,
	});
});

// delete a task by id
router.delete("/tasks/:id", (req, res) => {
	const taskId = parseInt(req.params.id);
	const taskIndex = tasks.findIndex((t) => t.id === taskId);

	if (taskIndex === -1) {
		return res.status(404).json({ message: "Task not found" });
	}
	tasks.splice(taskIndex, 1);

	res.status(200).json({ message: "Task deleted successfully" });
});

module.exports = router;

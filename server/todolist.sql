CREATE TABLE toDoList (
    "id" serial PRIMARY KEY,
    "task" varchar(80),
    "date" date,
    "complete" boolean,
    "notes" varchar (250)
);
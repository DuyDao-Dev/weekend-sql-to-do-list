CREATE TABLE todolist (
    "id" serial PRIMARY KEY,
    "task" varchar(80),
    "date" date,
    "complete" varchar (20),
    "notes" varchar (250)
);
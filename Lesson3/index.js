import express from "express"


const todoList = [
    {
        id: "74d2e282-3229-44de-bb90-9f4d15354f04",
        todoName: "Làm gì đó 1",
        date: "24/07/2023",
        status: "PENDING",
    },
    {
        id: "c99b9192-6dd2-4ef8-864e-37d2360a55a4",
        todoName: "Làm gì đó 2",
        date: "23/07/2023",
        status: "TODO",
    },
    {
        id: "36128291-709e-466f-8567-966deae2f1b2",
        todoName: "Làm gì đó 3",
        date: "22/07/2023",
        status: "DOING",
    },
    {
        id: "63ae7e0d-2ea7-47f2-8dad-398b625911d8",
        todoName: "Làm gì đó 4",
        date: "21/07/2023",
        status: "DONE",
    },
];

const app = express();
app.use(express.json())

app.get('/api/v1/todo-list', (req, res) => {
    const queryParams = req.query;
    // const getDataConfig
})

app.put('/api/v1/todo-list/:id', (req, res) => {
    try {
        const fieldUpdate = req.body;
        const { id} =  req.params;
        const findToDoItem = todoList.find((item) => item.id === id);
        if (!findToDoItem) throw new Error("Khong tim thay todo itemt voi id" + id);
        for (const key in fieldUpdate) {
            if(findToDoItem[key] !== 'undefined') {
                findToDoItem[key] = fieldUpdate[key];
            }
        }
        res.status(201).send({
            data:todoList,
            sucsess: true,
            messages: "Thanh cong"
        })
    } catch (error) {
        res.status(404).send({
            data: null, 
            messages: error.messages,
            sucsess: false
        })
    }

});

app.delete('/api/v1/todo-list/:id', (req, res) => {
    /**
        
     **/
    // const find 
})


app.listen(3001, (req, res) => {
    console.log("Server is running on port 3001")
})


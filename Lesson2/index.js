import express, { query } from "express";
import crypto from "crypto";

const app = express();
app.use(express.json());

//params 
const todoList = [
    {
        id: crypto.randomUUID(),
        todoName: 'Làm việc nhà cho mẹ',
        date: new Date(),
        status: "SPENDING",

    },
    {
        id: crypto.randomUUID(),
        todoName: 'Làm việc nhà cho mẹ',
        date: new Date(),
        status: "SPENDING",

    }, {
        id: crypto.randomUUID(),
        todoName: 'Làm việc nhà cho mẹ',
        date: new Date(),
        status: "SPENDING",

    }
];

// api todo list không id
app.get('/api/v1/todo-list', (req, res) => {
    try {
        const queryParams = req.query;
        // console.log(queryParams);

        const getToDoByFields = todoList.map(item => {

            if (Object.keys(queryParams.length !== 0)) {
                // console.log(item)
                // vòng duyệt object
                let mapPigToDo = {};
                for (const key in item) {
                    //    console.log(queryParams[key])
                    if (Number(queryParams[key])) { // nếu có key query params thì gán vào mảng mapPigToDo
                        mapPigToDo[key] = item[key];
                    }
                    //else if kiểm tra nó có bằng 0 hay không nếu có loại bỏ thuộc tính đó
                    else if (Number(queryParams[key]) === 0) {
                        const getNewItem = {
                            ...item
                        }; // tạo 1 item mới sau dó xóa phần tử đó đi là phần tử ta cho = 0

                        // duyệt thêm lần nữa để xóa trường key 
                        for (const keyOfQuery in queryParams) {
                            delete getNewItem[keyOfQuery];
                            
                        }
                        console.log(mapPigToDo)
                        mapPigToDo = {
                            ...getNewItem
                        }

                    }

                }
                return mapPigToDo;
            }
            //Nếu nó khôn g bằng 0 hoặc bằng số nào đó thì nó sẽ undefined

            else {
                return item;
            }

        });
        res.send({
            data: getToDoByFields,
            messager: "Thành công",
            success: true,
        })
    } catch (error) {
        res.send({
            data: null,
            messager: error.messager,
            success: false,
        })
    }
})

//api todo list có id
app.get('/api/v1/todo-list/:id', (req, res) => {
    try {
        console.log("show todo list nè có id cơ");
        const { id } = req.params;

        const findRecordTodoList = todoList.find(item => item.id === id);
        if (!findRecordTodoList) throw new Error("Không tìm thấy")
        res.send({
            data: findRecordTodoList,
            messager: "Thành công",
            success: true,
        })

    } catch (error) {
        res.send({
            data: null,
            messager: error.messager,
            success: f,
        })
    }
})

app.post('/api/v1/todo-list', (req, res) =>{
    const dataBody = req.body;
    todoList.shift({
        ...dataBody, 
        id: crypto.randomUUID(),
    }); 
    res.send({
            data: todoList,
        })

});

app.listen(5001, (req, res) => {
    console.log("Dang chay tren port 5001 nè")
})
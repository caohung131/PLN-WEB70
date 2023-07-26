import express, { request } from 'express';

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

app.listen(5021, (req, res) => {
    console.log("Đang chạy trên port 5001 nè")
})
//   Bài 1
//   1:Nếu params trùng với key của data và có giá trị là 1 thì hiển thị dữ liệu với field đó
// 2:Nếu params trùng với key của data và có giá trị bằng 0 thì xoá field đó đi
// 3: Nếu params không trùng với key nào của data thì sẽ không làm gì cả, vẫn hiển thị đầy đủ các field



// Bài 2.1. Trả ra danh sách các users với những điều kiện được truyền vào query params
    // a. Query `username`
    // ⇒ Trả ra danh sách các users có `username` chứa kí tự trong query `username`, không phân biệt chữ hoa chữ thường
//     b. Query sort = DESC hoặc ASC
// ⇒ Trả ra danh sách các users theo thứ tự tăng dần theo age (khi sort = ASC), theo thứ tự giảm dần theo age (khi sort = DESC)
//     c. Tạo mới một user với điều kiện `username` không được trùng với những users hiện có

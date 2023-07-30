import express from 'express';
import crypto from "crypto";
const app = express();
app.use(express.json());


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


app.get('/api/todo-list', (req, res) => {
    const queryParams = req.query;
    console.log(queryParams);
    const getItemArr = todoList.map((itemt) => {
        if (Object.keys(queryParams).length !== 0) {
            let returnObj = {};
            for (const key in itemt) {
                // console.log(queryParams);
                if (Number(queryParams[key])) {
                    console.log(itemt[key]);
                    returnObj[key] = itemt[key];
                } else if (Number(queryParams[key]) === 0) {
                    let newItem = { ...itemt };
                    for (const keyOfQueryParam in queryParams) {
                        delete newItem[keyOfQueryParam]
                    }
                    returnObj = {
                        ...newItem
                    }
                }
            }
            return returnObj;
        } else {
            return itemt;
        }
    })
    res.send({
        data: getItemArr,
    })
});


//   Bài 1
//   1:Nếu params trùng với key của data và có giá trị là 1 thì hiển thị dữ liệu với field đó
// 2:Nếu params trùng với key của data và có giá trị bằng 0 thì xoá field đó đi
// 3: Nếu params không trùng với key nào của data thì sẽ không làm gì cả, vẫn hiển thị đầy đủ các field




const users = [
    {
        id: "74d2e282-3229-44de-bb90-9f4d15354f04",
        username: "vanA",
        fullname: "Nguyen Van A",
        age: 19,
    },
    {
        id: "c99b9192-6dd2-4ef8-864e-37d2360a55a4",
        username: "nguyenvanB",
        fullname: "Nguyen Van B",
        age: 20,
    },
    {
        id: "36128291-709e-466f-8567-966deae2f1b2",
        username: "NVanC",
        fullname: "Nguyen Van C",
        age: 21,
    },
    {
        id: "63ae7e0d-2ea7-47f2-8dad-398b625911d8",
        username: "VAND",
        fullname: "Nguyen Van D",
        age: 22,
    },
];

app.get('/api/users', (req, res) => {
    console.log("User chạy r nè")

    const queryParams = req.query;
    const { sort, todoName } = req.query;
    try {
        const result = users.filter((user) => {

            if (Object.keys(queryParams).length !== 0) {
                for (const key in queryParams) {
                    if (key === 'username' && queryParams[key] !== undefined) {
                        return user[key].toLowerCase().includes(queryParams[key].toLowerCase());
                    }
                    else if (sort.toUpperCase() === 'DESC') {
                        return users.sort((a, b) => a.age - b.age)
                    }
                    else if (sort.toUpperCase() === 'ASC') {
                        return users.sort((a, b) => b.age - a.age)
                        console.log('first2')
                    }
                }
            }
        })
        res.send({
            data: result,
            messeger: 'thanh cong',
            sucsess: true
        })
    } catch (error) {
        data = null,
            messeger = error.showErrorMessage,
            sucsess = false
    }




});

app.post("/api/users/add", (req, res) => {
    const { username, fullname, age } = req.body;
  
    try {
      const checkExisted = users.some(
        (user) => user.username.toLowerCase() === username.toLowerCase()
      );
  
      if (checkExisted) {
        res.send({
          data: null,
          message: "Thất bại! User đã tồn tại",
          success: false,
        });
      } else {
        const newUser = {
          id: crypto.randomUUID(),
          username,
          fullname,
          age,
        };
  
        users.push(newUser);
  
        res.send({
          data: newUser,
          message: "Tạo mới user thành công",
          success: true,
        });
      }
    } catch (error) {
      res.send({
        message: "Đã xảy ra lỗi",
        success: false,
      });
    }
  });

// Bài 2.1. Trả ra danh sách các users với những điều kiện được truyền vào query params
    // a. Query `username`
    // ⇒ Trả ra danh sách các users có `username` chứa kí tự trong query `username`, không phân biệt chữ hoa chữ thường
//     b. Query sort = DESC hoặc ASC
// ⇒ Trả ra danh sách các users theo thứ tự tăng dần theo age (khi sort = ASC), theo thứ tự giảm dần theo age (khi sort = DESC)
//     c. Tạo mới một user với điều kiện `username` không được trùng với những users hiện có
app.listen(5001, (req, res) => {
    console.log("Sever chạy r nè")
})
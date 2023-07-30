import express from 'express';

const app = express();

const users = [
    {
        id: "74d2e282-3229-44de-bb90-9f4d15354f04",
        username: "vanA",
        fullname: "Nguyen Van A",
    },
    {
        id: "c99b9192-6dd2-4ef8-864e-37d2360a55a4",
        username: "nguyenvanB",
        fullname: "Nguyen Van B",
    },
    {
        id: "36128291-709e-466f-8567-966deae2f1b2",
        username: "NVanC",
        fullname: "Nguyen Van C",
    },
    {
        id: "63ae7e0d-2ea7-47f2-8dad-398b625911d8",
        username: "VAND",
        fullname: "Nguyen Van D",
    },
];
const posts = [
    {
        id: "e415de27-0d85-4c35-bf51-70173b5844c9",
        userId: "74d2e282-3229-44de-bb90-9f4d15354f04",
        title: "TP HCM cho thuê lòng đường, vỉa hè từ tháng 9",
        body: {
            content:
                "Một phần lòng đường, vỉa hè ở những vị trí đủ điều kiện tại TP HCM sẽ được cho thuê làm điểm giữ xe, kinh doanh, tổ chức hoạt động văn hóa... từ tháng 9 tới.",
            image:
                "https://vcdn-vnexpress.vnecdn.net/2023/07/26/3-JPG-9385-1675933270-jpeg-8296-1690374843.jpg",
        },
    },
    {
        id: "d749618e-53e9-4cea-b97a-6cb2aaeb9b20",
        userId: "74d2e282-3229-44de-bb90-9f4d15354f04",
        title: "Đề xuất đường sắt tốc độ cao Bắc Nam xuất phát từ ga Hà Nội",
        body: {
            content:
                "Thay vì ga Ngọc Hồi như quy hoạch trước đây, đơn vị tư vấn đề xuất tuyến đường sắt tốc độ cao Bắc Nam có điểm đầu tại ga Hà Nội.",
            image:
                "https://vcdn-vnexpress.vnecdn.net/2023/07/26/ga-HN-2125-1660812030-4731-1690364520.jpg",
        },
    },
    {
        id: "dadbb8bc-d900-47a4-97ed-244d15c2cd7b",
        userId: "c99b9192-6dd2-4ef8-864e-37d2360a55a4",
        title:
            "Hun Manet - từ học viên West Point đến Thủ tướng Campuchia tương lai",
        body: {
            content:
                "Hun Manet, con trai ông Hun Sen, là người Campuchia đầu tiên tốt nghiệp trường quân sự West Point của Mỹ và sẽ thay cha trở thành thủ tướng Campuchia tiếp theo. ",
            image:
                "https://vcdn1-vnexpress.vnecdn.net/2023/07/26/Hun-Manet-10-1690362018.jpg",
        },
    },
    {
        id: "02b64399-ecbf-46d5-aba5-bf2c0375798b",
        userId: "74d2e282-3229-44de-bb90-9f4d15354f04",
        title: "Sẽ rà soát những nơi bố trí người nhà làm cán bộ",
        body: {
            content:
                "Bà Trương Thị Mai cho biết vẫn còn một số nơi bố trí cán bộ là người có quan hệ gia đình, Ban Tổ chức Trung ương sẽ rà soát để thực hiện nghiêm quy định của Bộ Chính trị.",
            image:
                "https://i1-vnexpress.vnecdn.net/2023/07/26/Truong-thi-mai-3-1703-1690369295.png",
        },
    },
];

app.get('/api/users', (req, res) => {
    res.send({
        data: users,
    });
});

//2 
app.get('/api/posts/user/:userID', (req, res) => {
    try {
        const { userID } = req.params;
        const { title, content } = req.query;
        let dataPost = posts.filter(post => post.userId.includes(userID));
        console.log(dataPost)
        let filterDataPost = dataPost;
        if (title) {
            filterDataPost = dataPost.filter(post => post.title.includes(title));
        }
        else if (content) {
            filterDataPost = dataPost.filter(post => post.body.content.includes(content));
        }
        res.send({
            data: filterDataPost,
        });

    } catch (error) {
        res.status(404).send({
            data: null,
            success: false,
            messeger: error.message
        })
    }
    // if(userId === 1) 
});

//3 Lay cac bai posts 

app.get('/api/users/posts', (req, res) => {
    try {
        const userPosts = users.map(user => ({
            user: {
                id: user.id,
                username: user.username,
                fullname: user.fullname,
            },
            post: posts.filter((post) => user.id === post.userId),
        }))
        res.send({
            data: userPosts
        })
    } catch (error) {
        res.status(404).send({
            data: null,
            success: false,
            messeger: error.message
        })
    }

});

app.listen(3001, () => {
    console.log('Example app listening on port 3000!');
});
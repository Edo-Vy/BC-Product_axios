//------------------------------------------- Phương thức get ------------------------------------------------------

function getProductApi() {
    //Kết nối với api (đường dẫn backend cung cấp)
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/GetAll',
        method: 'GET'
    });

    //Xử lý thành công
    promise.then(function (result) {
        console.log('result', result.data);
        //Gọi hàm tạo table 
        renderProduct(result.data);
    });

    //Xử lý thất bại
    promise.catch(function (err) {
        console.log('result', err.response.data);

    });

}
//Gọi hàm khi page vừa load 
window.onload = function () {
    getProductApi();
}

/**
 * Hàm này sẽ nhận vào 1 array (Product) và trả ra output là string <tr>....</tr>
 * @param {*} arrProduct arrProduct là mảng các object 
 *  * @returns trả ra 1 giá trị là 1 htmlString '<tr>...</tr> <tr>...</tr>'
 */
function renderProduct(arrProduct) { //param : input :arrProduct
    var html = ''; //output: string html 
    for (var i = 0; i < arrProduct.length; i++) {
        var pr = arrProduct[i]; //Mỗi lần duyệt lấy ra 1 object Product từ mảng {id:'1',name:'...',...}
        html += `
            <tr>
                <td>${pr.id}</td>
                <td><img src="${pr.img}" width="30%" /></td>
                <td>${pr.name}</td>
                <td>${pr.price}</td>
                <td>${pr.description}</td>
                <td>${pr.type}</td>
                <td>
                    <button class="btn btn-primary mr-2" onclick="chinhSua('${pr.id}')">Sửa</button>
                    <button class="btn btn-danger" onclick="xoaProduct('${pr.id}')">Xoá</button>
                </td>
              
            </tr>
        `;
    }
    document.querySelector('.tblProduct').innerHTML = html;
}

//---------------------------------------- POST: Create Product ----------------------------------------------

document.querySelector('#btnCreate').onclick = function () {

    // {
    //     "id": "string",
    //     "name": "string",
    //     "price": "string",
    //     "img": "string",
    //     "description": "string",
    //     "type": "string"
    //   }

    //Lấy thông tin khách hàng đúng format backend qui định
    var pr = new Product();
    pr.id = document.querySelector('#id').value;
    pr.name = document.querySelector('#name').value;
    pr.price = document.querySelector('#price').value;
    pr.img = document.querySelector('#img').value;
    pr.description = document.querySelector('#description').value;
    pr.type = document.querySelector('#type').value;

    console.log('pr', pr);

    //Gọi api 
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/CreateProduct',
        method: 'POST',
        data: pr //format backend yêu cầu
    });

    //Xử lý thành công 
    promise.then(function (result) {
        console.log('result', result.data);
        //gọi lại api load lại table
        getProductApi();
    });


    //Xử lý thất bại
    promise.catch(function (error) {
        console.log('error', error.response.data);
    })
}

// --------------------------- GET: Product ------------------------------
function chinhSua(idClick) {
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/GetById/' + idClick,
        method: 'GET'
    });

    //Xử lý thành công
    promise.then(function (result) {
        var ttpr = result.data;
        //Load thông sản phẩm lên giao diện
        document.querySelector('#id').value = ttpr.id;
        document.querySelector('#name').value = ttpr.name;
        document.querySelector('#price').value = ttpr.price;
        document.querySelector('#img').value = ttpr.img;
        document.querySelector('#description').value = ttpr.description;
        document.querySelector('#type').value = ttpr.type;

    })
    //Xử lý thất bại
    promise.catch(function (error) {

    })
}
//------------------------ PUT: Tính năng cập nhật dữ liệu --------------------------
document.querySelector('#btnCapNhat').onclick = function () {
    //Lấy dữ liệu từ người dùng nhập ở giao diện => gửi về api
    var pr = new Product();
    pr.id = document.querySelector('#id').value;
    pr.name = document.querySelector('#name').value;
    pr.price = document.querySelector('#price').value;
    pr.img = document.querySelector('#img').value;
    pr.description = document.querySelector('#description').value;
    pr.type = document.querySelector('#type').value;
    console.log('pr', pr);

    //Gọi api 
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/UpdateProduct/' + pr.id,
        method: 'PUT',
        data: pr
    });

    promise.then(function (result) {
        console.log(result.data);
        //Gọi lại api load table
        getProductApi();
    });

    promise.then(function (err) {
        console.log(err)
    })

}
// --------------------------------------- DEL : Delete Product ------------------------------------------------

function xoaProduct(idClick) {
    console.log(idClick);

    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/DeleteProduct/' + idClick,
        method: 'DELETE'
    });

    //Xử lý thành công 
    promise.then(function (result) {
        console.log('result', result.data);
        //load lại table = api lay danh sach nguoi dung
        getProductApi();
    });

    //Xử lý thất bại
    promise.catch(function (error) {
        console.log(error);
    })

}

// --------------------------- GET:Tìm Kiếm  Product ------------------------------

document.querySelector('#btnSearch').onclick = function () {

    var search = document.getElementById('search_name').value;
    if (search) {
        axios({
            url: `http://svcy.myclass.vn/api/Product/SearchByName?name=${search}`,
        }).then((result) => {
            console.log({ result })
        }).catch((err) => {
            console.log({ err })
        })
    } else {
        getProductApi();
    }
}
 // let search = document.getElementById('#search_name').value;  

    // search.onclick = function(){

    //     promise.then(function (result) {
    //         var ttpr = result.data;
    //         //Load thông sản phẩm lên giao diện
    //         document.querySelector('#id').value = ttpr.id;
    //         document.querySelector('#name').value = ttpr.name;
    //         document.querySelector('#price').value = ttpr.price;
    //         document.querySelector('#img').value = ttpr.img;
    //         document.querySelector('#description').value = ttpr.description;
    //         document.querySelector('#type').value = ttpr.type;

    //     })
    //     //Xử lý thất bại
    //     promise.catch(function (error) {
    //     })
    // }

    // //Gọi api
    // var promise = axios({
    //     url: `http://svcy.myclass.vn/api/Product/SearchByName?name=`+ttpr.name,
    //     method: 'GET',
    //     data: ttpr
    // });




import React, { useState, useEffect } from "react";
import { Row, Col } from "reactstrap";
import moment from "moment";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import { useParams } from "react-router-dom";
import * as productsApi from "../../api/productsApi";
function Detail() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const getProduct = await productsApi.get(id);
      setProduct(getProduct.products[0]);
      setImages(
        getProduct.products[0].hinhs.map((img) => ({
          original: `http://127.0.0.1:8887/${img.h_ten}`,
          thumbnail: `http://127.0.0.1:8887/${img.h_ten}`,
        }))
      );
    };
    fetchApi();
  }, [id]);

  return (
    <div className="detail">
      <h2>Chi tiết sản phẩm</h2>
      <Row>
        <Col className="col-6">
          <ul>
            {" "}
            <li>
              <strong className="fs-4">Tên sản phẩm: </strong>
              <span className="fs-4">{product.sp_ten}</span>
            </li>
            <li>
              <strong className="fs-4">Loại sản phẩm: </strong>
              <span className="fs-4">{product.loai?.l_ten}</span>
            </li>
            <li>
              <strong className="fs-4">Mô tả: </strong>
              <span className="fs-4">{product.sp_mota}</span>
            </li>
            <li>
              <strong className="fs-4">Số lượng: </strong>
              <span className="fs-4">{product.sp_soluong}</span>
            </li>
            <li>
              <strong className="fs-4">Màu sắc:</strong>
              <ol className="fs-4">
                {product.mausacs?.map((mau) => (
                  <li>{mau.ms_mau}</li>
                ))}
              </ol>
            </li>
            <li>
              <strong className="fs-4">Dung lượng:</strong>
              <ol className="fs-4">
                {product.giatiens?.map((giatien) => (
                  <li>
                    <span>{giatien.dungluong.dl_dungluong}</span>
                    &nbsp; &nbsp;
                    <span>
                      Giá tiền: &nbsp;
                      {giatien.gt_gia
                        ? parseInt(giatien.gt_gia).toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })
                        : "Đang cập nhật"}
                    </span>
                  </li>
                ))}
              </ol>

              <li>
                <strong className="fs-4">Giảm giá: </strong>
                <span className="fs-4">{product.giam?.g_phantram}%</span>
                <br />
                {product.giam?.g_phantram !== 0 && (
                  <>
                    <strong className="fs-4">Ngày bắt đầu: </strong>
                    <span className="fs-4">
                      {moment(product.giam?.g_ngaybd).format("DD-MM-YYYY")}
                    </span>
                    <br />
                    <strong className="fs-4">Ngày kết thúc: </strong>
                    <span className="fs-4">
                      {moment(product.giam?.g_ngaykt).format("DD-MM-YYYY")}
                    </span>
                  </>
                )}
              </li>
            </li>
          </ul>
        </Col>
        <Col className="col-1"></Col>
        <Col className="col-4">
          {images ? <ImageGallery items={images} /> : <p>Hình đang cập nhật</p>}
        </Col>
      </Row>
    </div>
  );
}

export default Detail;

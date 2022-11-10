import React, { useState, useEffect } from "react";
import moment from "moment";
import { Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import * as staffsApi from "../../api/staffsApi";
import { useNavigate, useParams } from "react-router-dom";

function Update() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [staff, setStaff] = useState([]);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const genders = [0, 1];

  useEffect(() => {
    const fetchApi = async () => {
      const getstaff = await staffsApi.get(id);
      setStaff(getstaff.staffs[0]);
    };
    fetchApi();
  }, [id]);

  useEffect(() => {
    setName(staff?.nv_hoten);
    setPassword(staff?.nv_matkhau);
    setGender(staff?.nv_gioitinh);
    setEmail(staff?.nv_email);
    setBirthDay(moment(staff?.nv_ngaysinh).format("YYYY-MM-DD"));
    setAddress(staff?.nv_diachi);
    setPhone(staff?.nv_sdt);
  }, [staff]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      nv_hoten: name,
      nv_matkhau: password,
      nv_gioitinh: gender,
      nv_email: email,
      nv_ngaysinh: birthDay,
      nv_diachi: address,
      nv_sdt: phone,
    };
    await staffsApi.patch(id, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    alert("Cập nhật thông tin nhân viên thành công");
    navigate("/staffs");
  };
  return (
    <div className="product">
      <h2>Cập nhật thông tin nhân viên</h2>
      <Row>
        <Col className="col-6">
          <Form onSubmit={(e) => handleSubmit(e)}>
            <FormGroup>
              <Label>Họ tên: </Label>
              <Input
                name="product"
                placeholder="Nhập họ tên"
                type="text"
                required
                defaultValue={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </FormGroup>

            <FormGroup
              tag="fieldset"
              className="d-flex"
              onChange={(e) => {
                setGender(e.target.value);
              }}
            >
              <Label className="me-3">Giới tính:</Label>
              {genders.map((g, i) => (
                <div key={i}>
                  {g === gender ? (
                    <FormGroup className="me-3" check>
                      <Input
                        name="radio1"
                        type="radio"
                        value={g}
                        defaultChecked
                      />
                      <Label check>{parseInt(g) === 0 ? "Nam" : "Nữ"}</Label>
                    </FormGroup>
                  ) : (
                    <FormGroup className="me-3" check>
                      <Input name="radio1" type="radio" value={g} />
                      <Label check>{parseInt(g) === 0 ? "Nam" : "Nữ"}</Label>
                    </FormGroup>
                  )}
                </div>
              ))}
            </FormGroup>

            <FormGroup>
              <Label>Email: </Label>
              <Input
                name="product"
                placeholder="Nhập email"
                type="email"
                required
                defaultValue={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </FormGroup>

            <FormGroup>
              <Label>Ngày sinh: </Label>
              <Input
                name="product"
                type="date"
                required
                defaultValue={birthDay}
                onChange={(e) => {
                  setBirthDay(e.target.value);
                }}
              />
            </FormGroup>

            <FormGroup>
              <Label>Địa chỉ: </Label>
              <Input
                name="product"
                placeholder="Nhập địa chỉ"
                type="text"
                required
                defaultValue={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </FormGroup>

            <FormGroup>
              <Label>Số điện thoại: </Label>
              <Input
                name="product"
                placeholder="Nhập số điện thoại"
                type="text"
                required
                defaultValue={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </FormGroup>

            <Button color="primary" block>
              Cập nhật
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Update;

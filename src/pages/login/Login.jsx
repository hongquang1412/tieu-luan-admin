import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import * as staffsApi from "../../api/staffsApi";
var bcrypt = require("bcryptjs");
function Login() {
  const navigate = useNavigate();
  const [staffs, setStaffs] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    const fetchApi = async () => {
      const getStaffs = await staffsApi.get();
      setStaffs(getStaffs.staffs);
    };
    fetchApi();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let check = false;
    let nv_id = "";
    let nv_hoten = "";
    if (localStorage.getItem("infoStaff") !== null) {
      localStorage.removeItem("infoStaff");
    }
    staffs.map((staff) => {
      if (
        staff.nv_email === email &&
        bcrypt.compareSync(password, staff.nv_matkhau)
      ) {
        check = true;
        nv_id = staff.nv_id;
        nv_hoten = staff.nv_hoten;
      }
      return check;
    });

    if (check) {
      localStorage.setItem(
        "infoStaff",
        JSON.stringify({
          nv_id,
          nv_hoten,
        })
      );
      alert("Đăng nhập thành công");
      navigate("/");
    } else {
      alert("Tài khoản hoặc mật khẩu sai!!!");
    }
  };
  return (
    <section className="vh-100">
      <Container className="py-5 h-100">
        <Row className="d-flex align-items-center justify-content-center h-100">
          <Col className="col-md-8 col-lg-7 col-xl-6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid"
              alt="img"
            />
          </Col>
          <Col className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <h2 className="text-center">Đăng nhập</h2>
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <div className="form-outline mb-4">
                <input
                  type="email"
                  id="form1Example13"
                  className="form-control form-control-lg"
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <label className="form-label" for="form1Example13">
                  Email
                </label>
              </div>

              <div className="form-outline mb-4">
                <input
                  type="password"
                  id="form1Example23"
                  className="form-control form-control-lg"
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <label classNameName="form-label" for="form1Example23">
                  Mật khẩu
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
              >
                Đăng nhập
              </button>
            </form>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Login;

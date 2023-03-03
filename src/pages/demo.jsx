import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card } from "react-bootstrap";
const FHForm = () => {
  const [data, setData] = useState({});
  const [checkbox, setCheckbox] = useState([]);
  const [name, setName] = useState("");
  const onSubmit = (e) => {
    fetch(e.target.action, {
      method: form.method,
      body: data,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onChangeHandler = (e) => {
    if (e.target.checked) {
      setCheckbox([...checkbox, e.target.value]);
    } else {
      setCheckbox(checkbox.filter((elem) => elem != e.target.value));
    }
    setName(e.target.name);
  };

  useEffect(() => {
    if (name && checkbox.length > 0) {
      setData({ ...data, [name]: checkbox });
    }
  }, [checkbox, name]);
  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col md={5}>
            <Card className="my-4 p-4">
              <form
                id="my-form"
                action="https://data.formhouse.pro/36rKEtcDFRtv0ZhwnONnFK"
                method="post"
              >
                <div>
                  <label
                    className="form-label"
                    htmlFor="autocomplete-1677826897512-0"
                  >
                    Autocomplete
                  </label>
                  <input
                    onChange={(e) =>
                      setData({ ...data, [e.target.name]: e.target.value })
                    }
                    name="autocomplete-1677826897512-0"
                    list="datalistOptions"
                    className="form-control mb-3"
                    id="autocomplete-1677826897512-0"
                  />
                  <datalist id="datalistOptions">
                    <option value="option-1">Option 1</option>,
                    <option value="option-2">Option 2</option>,
                    <option value="option-3">Option 3</option>
                  </datalist>
                </div>
                <div>
                  <label className="form-label">Checkbox Group</label>
                  <div className="input-group mb-3">
                    <div className="form-check">
                      <label
                        className="form-check-label "
                        style={{ marginRight: "30px" }}
                        htmlFor="checkbox-group-1677828809736-0-0"
                      >
                        <input
                          name="checkbox-group-1677828809736-0"
                          className="form-check-input "
                          onChange={onChangeHandler}
                          type="checkbox"
                          value="option-1"
                          id="checkbox-group-1677828809736-0-0"
                        />
                        Option 1
                      </label>
                      <label
                        className="form-check-label "
                        style={{ marginRight: "30px" }}
                        htmlFor="checkbox-group-1677828809736-0-1"
                      >
                        <input
                          name="checkbox-group-1677828809736-0"
                          className="form-check-input "
                          onChange={onChangeHandler}
                          type="checkbox"
                          value="dt"
                          id="checkbox-group-1677828809736-0-1"
                        />
                        rw
                      </label>
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="btn btn-primary mb-3"
                    onClick={onSubmit}
                    id="button-1677827392055-0"
                  >
                    Button
                  </button>
                </div>
              </form>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default FHForm;

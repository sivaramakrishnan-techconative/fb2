import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card } from "react-bootstrap";
const FHForm = () => {
  const [data, setData] = useState({});
  const [checkbox, setCheckbox] = useState([]);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  var hasFiles = false;
  var jsonData = {},
    finalData;
  useEffect(() => {
    if (name && checkbox.length > 0) {
      setData({ ...data, [name]: checkbox });
    }
  }, [checkbox, name]);
  const onSubmit = (e) => {
    console.log(data);
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      if (hasFiles) {
        formData.append(key, value);
      } else {
        jsonData[key] = value;
      }
    }
    if (hasFiles) {
      finalData = formData;
    } else {
      finalData = JSON.stringify(jsonData);
    }
    fetch("https://data.formhouse.pro/36rKEtcDFRtv0ZhwnONnFK", {
      method: "post",
      body: finalData,
    })
      .then((response) => {
        if (response.ok) {
          setMsg("Thank you for your submission");
        } else {
          setMsg("Oops! Something went wrong");
        }
      })
      .catch((error) => {
        setMsg("Oops! Something went wrong");
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

  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col md={5}>
            <Card className="my-4 p-4">
              <p>{msg ? msg : ""}</p>

              <div>
                <label
                  className="form-label"
                  htmlFor="autocomplete_1678178539285_0"
                >
                  Autocomplete
                </label>
                <input
                  onChange={(e) =>
                    setData({ ...data, [e.target.name]: e.target.value })
                  }
                  name="autocomplete_1678178539285_0"
                  list="datalistOptions"
                  className="form-control mb-3"
                  id="autocomplete_1678178539285_0"
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
                      htmlFor="checkbox_group_1678178540059_0-0"
                    >
                      <input
                        name="checkbox_group_1678178540059_0"
                        className="form-check-input "
                        onChange={onChangeHandler}
                        type="checkbox"
                        value="option-1"
                        id="checkbox_group_1678178540059_0-0"
                      />
                      Option 1
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <label className="form-label" htmlFor="date_1678178540887_0">
                  Date Field
                </label>
                <input
                  type="date"
                  className="form-control mb-3"
                  onChange={(e) =>
                    setData({ ...data, [e.target.name]: e.target.value })
                  }
                  name="date_1678178540887_0"
                  id="date_1678178540887_0"
                />
              </div>
              <div className="mb-3">
                <label
                  className="form-label"
                  htmlFor="radio_group_1678178543523_0"
                >
                  Radio Group
                </label>
                <div className="form-check ">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="radio_group_1678178543523_0"
                    value="option-1"
                    onChange={(e) =>
                      setData({ ...data, [e.target.name]: e.target.value })
                    }
                    id="radio_group_1678178543523_0-0"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="radio_group_1678178543523_0-0"
                  >
                    Option 1
                  </label>
                </div>
                <div className="form-check ">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="radio_group_1678178543523_0"
                    value="option-2"
                    onChange={(e) =>
                      setData({ ...data, [e.target.name]: e.target.value })
                    }
                    id="radio_group_1678178543523_0-1"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="radio_group_1678178543523_0-1"
                  >
                    Option 2
                  </label>
                </div>
                <div className="form-check ">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="radio_group_1678178543523_0"
                    value="option-3"
                    onChange={(e) =>
                      setData({ ...data, [e.target.name]: e.target.value })
                    }
                    id="radio_group_1678178543523_0-2"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="radio_group_1678178543523_0-2"
                  >
                    Option 3
                  </label>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-primary mb-3"
                  onClick={onSubmit}
                  id="button_1678178544850_0"
                >
                  Button
                </button>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default FHForm;

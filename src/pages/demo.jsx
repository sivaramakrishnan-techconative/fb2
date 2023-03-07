import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card } from "react-bootstrap";
const FHForm = () => {
  const [data, setData] = useState({});
  const [checkbox, setCheckbox] = useState([]);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [hasFiles, sethasFiles] = useState(false);
  var jsonData = {},
    finalData;
  useEffect(() => {
    if (name && checkbox.length > 0) {
      setData({ ...data, [name]: checkbox });
    }
  }, [checkbox, name]);
  const onSubmit = (e) => { 
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
    debugger;
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
  function handleFile(e) {
    setData({ ...data, [e.target.name]: e.target.files });
    sethasFiles(true);
  }
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
                  htmlFor="autocomplete_1678180013794_0"
                >
                  Autocomplete
                </label>
                <input
                  onChange={(e) =>
                    setData({ ...data, [e.target.name]: e.target.value })
                  }
                  name="autocomplete_1678180013794_0"
                  list="datalistOptions"
                  className="form-control mb-3"
                  id="autocomplete_1678180013794_0"
                />
                <datalist id="datalistOptions">
                  <option value="option-1">Option 1</option>,
                  <option value="option-2">Option 2</option>,
                  <option value="option-3">Option 3</option>
                </datalist>
              </div>
              <div className="mb-3">
                <label for="formFile" className="form-label" htmlFor="formFile">
                  File Upload
                </label>
                <input
                  name="file_1678180014736_0"
                  undefined
                  onChange={(e) => handleFile(e)}
                  className="form-control"
                  type="file"
                  id="formFile"
                />
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-primary mb-3"
                  onClick={onSubmit}
                  id="button_1678180015855_0"
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

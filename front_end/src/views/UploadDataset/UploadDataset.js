import React, { useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import avatar from "assets/img/faces/marc.jpg";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import IconButton from "@material-ui/core/IconButton";
import styles from "assets/jss/material-dashboard-react/components/tasksStyle.js";
import Container from "@material-ui/core/Container";
import { Grid } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const styles2 = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
  flexFooter: {
    display: "flex",
    flexDirection: "row-reverse",
    flexWrap: " nowrap",
    justifyContent: "flex-start",
    alignItems: "stretch",
    alignContent: "stretch",
  },
};

const useStyles = makeStyles(styles2);
const useStyles2 = makeStyles(styles);
function UploadDataset() {
  const classes = useStyles();

  const [state, setstate] = useState({
    name: "",
    type: "",
    points: "",
    description: "",
    files: [],
  });
  const [labels, setLabels] = useState([""]);
  const [total, setTotal] = useState(0);
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    console.log(state.files);
    formData.set("type", state.type);
    formData.set("name", state.name);
    formData.set("description", state.description);
    formData.set("points", state.points);
    //hedha pour le moment khalito statique
    formData.set("labels", "1"); // riguelhom baad kif tzid win bech yhot l labels taa dataset li possible

    Array.from(state.files).forEach((file) => {
      formData.append("files", file);
    });
    console.log(state);
    //appel au backend
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    //upload files to bakend , create new dataset
    axios({
      method: "post",
      url: "http://localhost:5000/api/datasets/upload",
      config: { headers: { "Content-Type": "multipart/form_data" } },
      data: formData,
    })
      .then((res) => {
        if (res.data.success) {
          console.log("data : ", res.data);
        } else {
          console.log("data error : ", res.data);
        }
      })
      .catch((e) => {
        console.log("erreur : ", e);
      });
  };

  const handleTextLabels = (i) => (e) => {
    const Labels = [...labels];
    Labels[i] = e.target.value;
    setLabels([...Labels]);
  };

  const DeleteLable = (i) => (e) => {
    e.preventDefault();
    const Labels = [...labels.slice(0, i), ...labels.slice(i + 1)];
    setLabels([...Labels]);
  };

  const addLabel = (e) => {
    e.preventDefault();
    const Labels = labels.concat([""]);
    setLabels([...Labels]);
  };

  //fct w7adha khater chnaccedi l target.files et non pas target.value
  const onChangeFile = (e) => {
    setstate({
      ...state,
      files: e.target.files,
    });
    setTotal(e.target.files.length);
  };

  const onChange = (e) => {
    console.log(e.target);
    const { id, value } = e.target;
    console.log(id, value);
    setstate({
      ...state,
      [id]: value,
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <GridContainer>
        <GridItem xs={12} sm={12} md={2}></GridItem>
        <GridItem xs={12} sm={12} md={10}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={8}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>
                    Upload your Dataset
                  </h4>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="DataSet name"
                        id="name"
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Type"
                        id="type"
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Points accorded to each row"
                        id="points"
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={12}>
                      {labels.map((label, index) => (
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={7}>
                            <CustomInput
                              labelText="label"
                              id="label"
                              onChange={handleTextLabels(index)}
                              formControlProps={{
                                fullWidth: true,
                              }}
                            />
                          </GridItem>

                          {index ? (
                            <GridItem xs={12} sm={12} md={2}>
                              <IconButton
                                aria-label="Edit"
                                className={classes.tableActionButton}
                                onClick={DeleteLable(index)}
                              >
                                <DeleteIcon
                                  className={
                                    classes.tableActionButtonIcon +
                                    " " +
                                    classes.edit
                                  }
                                />
                              </IconButton>
                            </GridItem>
                          ) : (
                            <div></div>
                          )}

                          <GridItem xs={12} sm={12} md={3}>
                            <IconButton
                              aria-label="Edit"
                              className={classes.tableActionButton}
                              onClick={addLabel}
                            >
                              <AddCircleOutlineRoundedIcon
                                className={
                                  classes.tableActionButtonIcon +
                                  " " +
                                  classes.edit
                                }
                              />
                            </IconButton>
                          </GridItem>
                        </GridContainer>
                      ))}
                    </GridItem>

                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="description"
                        id="description"
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={12}>
                      <div className="custom-file">
                        <label
                          className="custom-file-label"
                          htmlFor="customFile"
                        >
                          Upload files here
                        </label>
                        <input
                          type="file"
                          onChange={onChangeFile}
                          className="custom-file-input"
                          id="customFile"
                          multiple
                        />
                      </div>
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter className="flexFooter">
                  <input type="submit" value="upload" color="primary" />
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </form>
  );
}

export default UploadDataset;
